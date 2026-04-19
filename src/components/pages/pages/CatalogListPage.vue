<script setup>
import { ref, computed } from 'vue'
import MainLayout from '../../templates/MainLayout.vue'
import DataTable from '../../organisms/DataTable.vue'
import SearchFilterBar from '../../molecules/SearchFilterBar.vue'
import UiButton from '../../atoms/UiButton.vue'
import UiBadge from '../../atoms/UiBadge.vue'
import ConfirmModal from '../../molecules/ConfirmModal.vue'
import UiToast from '../../atoms/UiToast.vue'

// Mock data
const products = ref([
  { id: 1, name: 'Gaming Box Pro', type: 'box', status: 'active', price: 299.99, stock: 45 },
  { id: 2, name: 'Starter Slider', type: 'slider', status: 'active', price: 49.99, stock: 120 },
  { id: 3, name: 'Accessory Kit', type: 'accessory', status: 'draft', price: 29.99, stock: 200 },
  { id: 4, name: 'Premium Box', type: 'box', status: 'inactive', price: 499.99, stock: 0 },
  { id: 5, name: 'RGB Slider', type: 'slider', status: 'active', price: 79.99, stock: 85 },
])

const loading = ref(false)
const searchQuery = ref('')
const filterType = ref('')
const showDeleteModal = ref(false)
const selectedProduct = ref(null)
const toast = ref({ show: false, message: '', type: 'success' })

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'stock', label: 'Stock', sortable: true }
]

const filteredProducts = computed(() => {
  let result = products.value
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => p.name.toLowerCase().includes(query))
  }
  
  if (filterType.value) {
    result = result.filter(p => p.type === filterType.value)
  }
  
  return result
})

const filterOptions = [
  { value: 'box', label: 'Box' },
  { value: 'slider', label: 'Slider' },
  { value: 'accessory', label: 'Accessory' }
]

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
}

const handleDelete = (product) => {
  selectedProduct.value = product
  showDeleteModal.value = true
}

const confirmDelete = () => {
  products.value = products.value.filter(p => p.id !== selectedProduct.value.id)
  showDeleteModal.value = false
  showToast('Product deleted successfully')
}

const getStatusVariant = (status) => {
  return status === 'active' ? 'success' : status === 'draft' ? 'warning' : 'danger'
}

const getTypeBadgeVariant = (type) => {
  return type === 'box' ? 'primary' : type === 'slider' ? 'info' : 'default'
}
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-80">Catalog</h1>
          <p class="text-sm text-gray-60 mt-1">Manage your products, boxes, sliders, and accessories</p>
        </div>
        <UiButton variant="primary" @click="showToast('Navigate to create product')">
          <span class="material-icons text-lg">add</span>
          Add Product
        </UiButton>
      </div>

      <!-- Search and Filter -->
      <SearchFilterBar
        v-model:search="searchQuery"
        v-model:filter="filterType"
        :filter-options="filterOptions"
      />

      <!-- Data Table -->
      <DataTable
        :columns="columns"
        :rows="filteredProducts"
        :loading="loading"
        :current-page="1"
        :total-pages="1"
        :total-items="filteredProducts.length"
        empty-message="No products found"
      >
        <!-- Type Column -->
        <template #cell-type="{ value }">
          <UiBadge :variant="getTypeBadgeVariant(value)" size="sm" class="capitalize">
            {{ value }}
          </UiBadge>
        </template>

        <!-- Status Column -->
        <template #cell-status="{ value }">
          <UiBadge :variant="getStatusVariant(value)" size="sm" class="capitalize">
            {{ value }}
          </UiBadge>
        </template>

        <!-- Price Column -->
        <template #cell-price="{ value }">
          <span class="font-medium">${{ value.toFixed(2) }}</span>
        </template>

        <!-- Stock Column -->
        <template #cell-stock="{ value }">
          <span :class="value === 0 ? 'text-dangerous-medium font-medium' : ''">
            {{ value === 0 ? 'Out of stock' : value }}
          </span>
        </template>

        <!-- Actions Column -->
        <template #actions="{ row }">
          <div class="flex items-center justify-end gap-2">
            <button
              class="p-1.5 text-gray-60 hover:bg-gray-2 rounded-md transition-colors"
              title="Edit"
              @click="showToast('Edit product: ' + row.name, 'info')"
            >
              <span class="material-icons text-lg">edit</span>
            </button>
            <button
              class="p-1.5 text-dangerous-medium hover:bg-dangerous-light rounded-md transition-colors"
              title="Delete"
              @click="handleDelete(row)"
            >
              <span class="material-icons text-lg">delete</span>
            </button>
          </div>
        </template>
      </DataTable>
    </div>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      v-if="showDeleteModal"
      title="Delete Product"
      :message="`Are you sure you want to delete '${selectedProduct?.name}'? This action cannot be undone.`"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />

    <!-- Toast Notification -->
    <Teleport to="body">
      <div class="fixed bottom-4 right-4 z-50 space-y-2">
        <UiToast
          v-if="toast.show"
          :message="toast.message"
          :type="toast.type"
          @close="toast.show = false"
        />
      </div>
    </Teleport>
  </MainLayout>
</template>
