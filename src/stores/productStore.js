import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/shared/api'

/**
 * @typedef {Object} ProductItem
 * @property {number|string} sliderId
 * @property {number} priceInBox
 */

/**
 * @typedef {Object} Product
 * @property {number|string} id
 * @property {string} name
 * @property {string} sku
 * @property {number} price
 * @property {string} type - 'box' | 'slider' | 'accessory' | 'preconfigured'
 * @property {string} status - 'active' | 'draft' | 'archived'
 * @property {string} updatedAt
 * @property {number} [minSliders] - только для Box
 * @property {number} [maxSliders] - только для Box
 * @property {ProductItem[]} [items] - только для Box
 */

/**
 * @typedef {Object} ProductFilters
 * @property {string} [search]
 * @property {string} [type]
 * @property {string} [status]
 */

export const useProductStore = defineStore('products', () => {
  // ==================== State ====================
  const products = ref([])
  const currentProduct = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const filters = ref({
    search: '',
    type: '',
    status: ''
  })

  // ==================== Getters ====================
  /** @type {import('vue').ComputedRef<Product[]>} */
  const activeProducts = computed(() =>
    products.value.filter(p => p.status === 'active')
  )

  /** @type {import('vue').ComputedRef<Product[]>} */
  const boxProducts = computed(() =>
    products.value.filter(p => p.type === 'box')
  )

  /**
   * Фильтрация продуктов по типу
   * @param {string} type
   * @returns {Product[]}
   */
  function getProductsByType(type) {
    return products.value.filter(p => p.type === type)
  }

  // ==================== Actions ====================

  /**
   * Получение списка продуктов с фильтрацией
   * @param {ProductFilters} [params]
   */
  async function fetchProducts(params = {}) {
    loading.value = true
    error.value = null
    try {
      const queryParams = { ...filters.value, ...params }
      const res = await api.get('/products', { params: queryParams })
      products.value = res.data
    } catch (err) {
      error.value = err.message || 'Ошибка загрузки продуктов'
      console.error('[ProductStore] fetchProducts error:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Получение одного продукта по ID
   * @param {number|string} id
   */
  async function fetchProductById(id) {
    loading.value = true
    error.value = null
    try {
      const res = await api.get(`/products/${id}`)
      currentProduct.value = res.data
    } catch (err) {
      error.value = err.message || 'Ошибка загрузки продукта'
      console.error('[ProductStore] fetchProductById error:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Создание нового продукта
   * @param {Product} data
   * @returns {Promise<Product>}
   */
  async function createProduct(data) {
    loading.value = true
    error.value = null
    try {
      const res = await api.post('/products', data)
      products.value.push(res.data)
      return res.data
    } catch (err) {
      error.value = err.message || 'Ошибка создания продукта'
      console.error('[ProductStore] createProduct error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Обновление продукта (поддерживает вложенные items для Box)
   * @param {number|string} id
   * @param {Partial<Product>} data
   * @returns {Promise<Product>}
   */
  async function updateProduct(id, data) {
    loading.value = true
    error.value = null
    try {
      const res = await api.put(`/products/${id}`, data)
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = res.data
      }
      if (currentProduct.value?.id === id) {
        currentProduct.value = res.data
      }
      return res.data
    } catch (err) {
      error.value = err.message || 'Ошибка обновления продукта'
      console.error('[ProductStore] updateProduct error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Удаление продукта
   * @param {number|string} id
   */
  async function deleteProduct(id) {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/products/${id}`)
      products.value = products.value.filter(p => p.id !== id)
      if (currentProduct.value?.id === id) {
        currentProduct.value = null
      }
    } catch (err) {
      error.value = err.message || 'Ошибка удаления продукта'
      console.error('[ProductStore] deleteProduct error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Сброс фильтров
   */
  function resetFilters() {
    filters.value = {
      search: '',
      type: '',
      status: ''
    }
  }

  return {
    // State
    products,
    currentProduct,
    loading,
    error,
    filters,
    // Getters
    activeProducts,
    boxProducts,
    getProductsByType,
    // Actions
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    resetFilters
  }
})
