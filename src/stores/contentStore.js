import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/shared/api'

/**
 * @typedef {Object} ContentCategory
 * @property {number|string} id
 * @property {string} name
 * @property {string} slug
 */

/**
 * @typedef {Object} ContentBlock
 * @property {number|string} id
 * @property {number|string} categoryId
 * @property {string} key
 * @property {string} type - 'text' | 'html' | 'image' | 'json'
 * @property {string|Object} value
 */

export const useContentStore = defineStore('content', () => {
  // ==================== State ====================
  const categories = ref([])
  const blocks = ref([])
  const currentCategory = ref(null)
  const currentBlocks = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ==================== Getters ====================
  /**
   * Поиск категории по slug
   * @param {string} slug
   * @returns {ContentCategory|undefined}
   */
  function getCategoryBySlug(slug) {
    return categories.value.find(c => c.slug === slug)
  }

  /**
   * Получение блоков для категории
   * @param {number|string} categoryId
   * @returns {ContentBlock[]}
   */
  function getBlocksByCategory(categoryId) {
    return blocks.value.filter(b => b.categoryId === categoryId)
  }

  /** @type {import('vue').ComputedRef<number>} */
  const totalCategories = computed(() => categories.value.length)

  /** @type {import('vue').ComputedRef<number>} */
  const totalBlocks = computed(() => blocks.value.length)

  // ==================== Actions ====================

  // ========== Categories ==========

  /**
   * Получение списка категорий
   */
  async function fetchCategories() {
    loading.value = true
    error.value = null
    try {
      const res = await api.get('/content/categories')
      categories.value = res.data
    } catch (err) {
      error.value = err.message || 'Ошибка загрузки категорий'
      console.error('[ContentStore] fetchCategories error:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Получение одной категории по ID
   * @param {number|string} id
   */
  async function fetchCategoryById(id) {
    loading.value = true
    error.value = null
    try {
      const res = await api.get(`/content/categories/${id}`)
      currentCategory.value = res.data
    } catch (err) {
      error.value = err.message || 'Ошибка загрузки категории'
      console.error('[ContentStore] fetchCategoryById error:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Создание категории
   * @param {Omit<ContentCategory, 'id'>} data
   * @returns {Promise<ContentCategory>}
   */
  async function createCategory(data) {
    loading.value = true
    error.value = null
    try {
      const res = await api.post('/content/categories', data)
      categories.value.push(res.data)
      return res.data
    } catch (err) {
      error.value = err.message || 'Ошибка создания категории'
      console.error('[ContentStore] createCategory error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Обновление категории
   * @param {number|string} id
   * @param {Partial<ContentCategory>} data
   * @returns {Promise<ContentCategory>}
   */
  async function updateCategory(id, data) {
    loading.value = true
    error.value = null
    try {
      const res = await api.put(`/content/categories/${id}`, data)
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value[index] = res.data
      }
      if (currentCategory.value?.id === id) {
        currentCategory.value = res.data
      }
      return res.data
    } catch (err) {
      error.value = err.message || 'Ошибка обновления категории'
      console.error('[ContentStore] updateCategory error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Удаление категории
   * @param {number|string} id
   */
  async function deleteCategory(id) {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/content/categories/${id}`)
      categories.value = categories.value.filter(c => c.id !== id)
      if (currentCategory.value?.id === id) {
        currentCategory.value = null
      }
    } catch (err) {
      error.value = err.message || 'Ошибка удаления категории'
      console.error('[ContentStore] deleteCategory error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // ========== Blocks ==========

  /**
   * Получение блоков для категории
   * @param {number|string} categoryId
   */
  async function fetchBlocksByCategory(categoryId) {
    loading.value = true
    error.value = null
    try {
      const res = await api.get(`/content/categories/${categoryId}/blocks`)
      currentBlocks.value = res.data
      // Также обновляем общий список блоков
      const existingIds = new Set(res.data.map(b => b.id))
      blocks.value = [
        ...blocks.value.filter(b => b.categoryId !== categoryId),
        ...res.data
      ]
    } catch (err) {
      error.value = err.message || 'Ошибка загрузки блоков'
      console.error('[ContentStore] fetchBlocksByCategory error:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Создание блока
   * @param {Omit<ContentBlock, 'id'>} data
   * @returns {Promise<ContentBlock>}
   */
  async function createBlock(data) {
    loading.value = true
    error.value = null
    try {
      const res = await api.post('/content/blocks', data)
      blocks.value.push(res.data)
      currentBlocks.value.push(res.data)
      return res.data
    } catch (err) {
      error.value = err.message || 'Ошибка создания блока'
      console.error('[ContentStore] createBlock error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Обновление блока
   * @param {number|string} id
   * @param {Partial<ContentBlock>} data
   * @returns {Promise<ContentBlock>}
   */
  async function updateBlock(id, data) {
    loading.value = true
    error.value = null
    try {
      const res = await api.put(`/content/blocks/${id}`, data)
      const index = blocks.value.findIndex(b => b.id === id)
      if (index !== -1) {
        blocks.value[index] = res.data
      }
      const currentIndex = currentBlocks.value.findIndex(b => b.id === id)
      if (currentIndex !== -1) {
        currentBlocks.value[currentIndex] = res.data
      }
      return res.data
    } catch (err) {
      error.value = err.message || 'Ошибка обновления блока'
      console.error('[ContentStore] updateBlock error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Удаление блока
   * @param {number|string} id
   */
  async function deleteBlock(id) {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/content/blocks/${id}`)
      blocks.value = blocks.value.filter(b => b.id !== id)
      currentBlocks.value = currentBlocks.value.filter(b => b.id !== id)
    } catch (err) {
      error.value = err.message || 'Ошибка удаления блока'
      console.error('[ContentStore] deleteBlock error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Сброс текущего состояния
   */
  function resetCurrent() {
    currentCategory.value = null
    currentBlocks.value = []
  }

  return {
    // State
    categories,
    blocks,
    currentCategory,
    currentBlocks,
    loading,
    error,
    // Getters
    getCategoryBySlug,
    getBlocksByCategory,
    totalCategories,
    totalBlocks,
    // Actions
    fetchCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    fetchBlocksByCategory,
    createBlock,
    updateBlock,
    deleteBlock,
    resetCurrent
  }
})
