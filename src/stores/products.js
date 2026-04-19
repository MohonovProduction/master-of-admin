import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  // State
  const products = ref([
    { id: 1, name: 'Gaming Box Pro', type: 'box', sku: 'BOX-001', price: 299.99, status: 'active', description: 'Complete gaming setup', min_sliders: 2, max_sliders: 5, updated_at: '2024-01-15' },
    { id: 2, name: 'RGB LED Slider', type: 'slider', sku: 'SLD-001', price: 49.99, status: 'active', description: 'RGB lighting control', updated_at: '2024-01-14' },
    { id: 3, name: 'USB Cable', type: 'accessory', sku: 'ACC-001', price: 9.99, status: 'active', description: 'USB-C cable', updated_at: '2024-01-13' },
    { id: 4, name: 'Starter Box', type: 'preconfigured_box', sku: 'PRE-001', price: 199.99, status: 'active', description: 'Preconfigured starter kit', updated_at: '2024-01-12' },
    { id: 5, name: 'Premium Box', type: 'box', sku: 'BOX-002', price: 499.99, status: 'inactive', description: 'Premium gaming setup', min_sliders: 3, max_sliders: 8, updated_at: '2024-01-11' },
    { id: 6, name: 'Volume Slider', type: 'slider', sku: 'SLD-002', price: 29.99, status: 'active', description: 'Volume control slider', updated_at: '2024-01-10' },
  ])
  
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const boxes = computed(() => products.value.filter(p => p.type === 'box'))
  const sliders = computed(() => products.value.filter(p => p.type === 'slider'))
  const accessories = computed(() => products.value.filter(p => p.type === 'accessory'))
  const preconfiguredBoxes = computed(() => products.value.filter(p => p.type === 'preconfigured_box'))
  
  const getProductById = (id) => {
    return products.value.find(p => p.id === id)
  }

  // Actions
  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (productData) => {
    loading.value = true
    error.value = null
    try {
      const newProduct = {
        id: products.value.length + 1,
        ...productData,
        updated_at: new Date().toISOString().split('T')[0]
      }
      products.value.push(newProduct)
      return newProduct
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProduct = async (id, productData) => {
    loading.value = true
    error.value = null
    try {
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = {
          ...products.value[index],
          ...productData,
          updated_at: new Date().toISOString().split('T')[0]
        }
        return products.value[index]
      }
      throw new Error('Product not found')
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async (id) => {
    loading.value = true
    error.value = null
    try {
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value.splice(index, 1)
      }
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const toggleProductStatus = async (id) => {
    const product = getProductById(id)
    if (product) {
      product.status = product.status === 'active' ? 'inactive' : 'active'
      product.updated_at = new Date().toISOString().split('T')[0]
    }
  }

  return {
    products,
    loading,
    error,
    boxes,
    sliders,
    accessories,
    preconfiguredBoxes,
    getProductById,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus
  }
})
