import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/shared/api'

/**
 * @typedef {Object} OrderItem
 * @property {number|string} productId
 * @property {string} productName
 * @property {number} quantity
 * @property {number} price
 */

/**
 * @typedef {Object} OrderCustomer
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} [address]
 */

/**
 * @typedef {Object} Order
 * @property {number|string} id
 * @property {string} number - номер заказа
 * @property {OrderCustomer} customer
 * @property {number} total
 * @property {string} status - 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
 * @property {OrderItem[]} items
 * @property {string} createdAt
 */

/**
 * @typedef {Object} OrderStats
 * @property {number} totalOrders
 * @property {number} totalRevenue
 * @property {number} pendingOrders
 * @property {number} processingOrders
 * @property {number} avgOrderValue
 */

export const useOrderStore = defineStore('orders', () => {
  // ==================== State ====================
  const orders = ref([])
  const currentOrder = ref(null)
  const stats = ref({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    processingOrders: 0,
    avgOrderValue: 0
  })
  const loading = ref(false)
  const error = ref(null)

  // ==================== Getters ====================
  /** @type {import('vue').ComputedRef<Order[]>} */
  const pendingOrders = computed(() =>
    orders.value.filter(o => o.status === 'pending')
  )

  /** @type {import('vue').ComputedRef<Order[]>} */
  const recentOrders = computed(() =>
    [...orders.value]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)
  )

  /**
   * Фильтрация заказов по статусу
   * @param {string} status
   * @returns {Order[]}
   */
  function getOrdersByStatus(status) {
    return orders.value.filter(o => o.status === status)
  }

  /** @type {import('vue').ComputedRef<number>} */
  const totalRevenue = computed(() =>
    orders.value
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0)
  )

  // ==================== Actions ====================

  /**
   * Получение списка заказов
   * @param {Object} [params]
   * @param {string} [params.status]
   * @param {string} [params.search]
   * @param {number} [params.page]
   * @param {number} [params.limit]
   */
  async function fetchOrders(params = {}) {
    loading.value = true
    error.value = null
    try {
      const res = await api.get('/orders', { params })
      orders.value = res.data
      calculateStats()
    } catch (err) {
      error.value = err.message || 'Ошибка загрузки заказов'
      console.error('[OrderStore] fetchOrders error:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Получение одного заказа по ID
   * @param {number|string} id
   */
  async function fetchOrderById(id) {
    loading.value = true
    error.value = null
    try {
      const res = await api.get(`/orders/${id}`)
      currentOrder.value = res.data
    } catch (err) {
      error.value = err.message || 'Ошибка загрузки заказа'
      console.error('[OrderStore] fetchOrderById error:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Обновление статуса заказа
   * @param {number|string} id
   * @param {string} status - 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
   * @returns {Promise<Order>}
   */
  async function updateOrderStatus(id, status) {
    loading.value = true
    error.value = null
    try {
      const res = await api.patch(`/orders/${id}/status`, { status })
      
      // Обновление в общем списке
      const index = orders.value.findIndex(o => o.id === id)
      if (index !== -1) {
        orders.value[index] = res.data
      }
      
      // Обновление текущего заказа
      if (currentOrder.value?.id === id) {
        currentOrder.value = res.data
      }
      
      // Пересчёт статистики
      calculateStats()
      
      return res.data
    } catch (err) {
      error.value = err.message || 'Ошибка обновления статуса'
      console.error('[OrderStore] updateOrderStatus error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Создание заказа
   * @param {Omit<Order, 'id' | 'number' | 'createdAt'>} data
   * @returns {Promise<Order>}
   */
  async function createOrder(data) {
    loading.value = true
    error.value = null
    try {
      const res = await api.post('/orders', data)
      orders.value.unshift(res.data)
      calculateStats()
      return res.data
    } catch (err) {
      error.value = err.message || 'Ошибка создания заказа'
      console.error('[OrderStore] createOrder error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Удаление заказа
   * @param {number|string} id
   */
  async function deleteOrder(id) {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/orders/${id}`)
      orders.value = orders.value.filter(o => o.id !== id)
      if (currentOrder.value?.id === id) {
        currentOrder.value = null
      }
      calculateStats()
    } catch (err) {
      error.value = err.message || 'Ошибка удаления заказа'
      console.error('[OrderStore] deleteOrder error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Пересчёт статистики для дашборда
   */
  function calculateStats() {
    const activeOrders = orders.value.filter(o => o.status !== 'cancelled')
    
    stats.value = {
      totalOrders: orders.value.length,
      totalRevenue: activeOrders.reduce((sum, o) => sum + o.total, 0),
      pendingOrders: orders.value.filter(o => o.status === 'pending').length,
      processingOrders: orders.value.filter(o => o.status === 'processing').length,
      avgOrderValue: activeOrders.length > 0
        ? activeOrders.reduce((sum, o) => sum + o.total, 0) / activeOrders.length
        : 0
    }
  }

  /**
   * Сброс текущего заказа
   */
  function resetCurrentOrder() {
    currentOrder.value = null
  }

  return {
    // State
    orders,
    currentOrder,
    stats,
    loading,
    error,
    // Getters
    pendingOrders,
    recentOrders,
    getOrdersByStatus,
    totalRevenue,
    // Actions
    fetchOrders,
    fetchOrderById,
    updateOrderStatus,
    createOrder,
    deleteOrder,
    calculateStats,
    resetCurrentOrder
  }
})
