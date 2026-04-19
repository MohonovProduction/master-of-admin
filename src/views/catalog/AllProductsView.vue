<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../../components/templates/MainLayout.vue'
import DataTable from '../../components/organisms/DataTable.vue'
import SearchFilterBar from '../../components/molecules/SearchFilterBar.vue'
import UiButton from '../../components/atoms/UiButton.vue'
import UiBadge from '../../components/atoms/UiBadge.vue'
import { useProductsStore } from '../../stores/products'

const router = useRouter()
const productsStore = useProductsStore()

const searchQuery = ref('')
const filterType = ref('')
const filterStatus = ref('')

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'sku', label: 'SKU' },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'updated_at', label: 'Updated', sortable: true }
]

const filteredProducts = computed(() => {
  let result = productsStore.products
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.sku.toLowerCase().includes(query)
    )
  }
  
  if (filterType.value) {
    result = result.filter(p => p.type === filterType.value)
  }
  
  if (filterStatus.value) {
    result = result.filter(p => p.status === filterStatus.value)
  }
  
  return result
})

const filterOptions = [
  { value: 'box', label: 'Box' },
  { value: 'slider', label: 'Slider' },
  { value: 'accessory', label: 'Accessory' },
  { value: 'preconfigured_box', label: 'Preconfigured Box' }
]

const getTypeBadgeVariant = (type) => {
  const variants = {
    box: 'primary',
    slider: 'info',
    accessory: 'default',
    preconfigured_box: 'success'
  }
  return variants[type] || 'default'
}
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-80">All Products</h1>
          <p class="text-sm text-gray-60 mt-1">Manage your products, boxes, sliders, and accessories</p>
        </div>
        <UiButton variant="primary" @click="router.push('/catalog/products/create')">
          <span class="material-icons text-lg">add</span>
          Create Product
        </UiButton>
      </div>

      <SearchFilterBar
        v-model:search="searchQuery"
        v-model:filter="filterType"
        :filter-options="filterOptions"
      />

      <DataTable
        :columns="columns"
        :rows="filteredProducts"
        :loading="productsStore.loading"
        :current-page="1"
        :total-pages="1"
        :total-items="filteredProducts.length"
        empty-message="No products found"
      >
        <template #cell-type="{ value }">
          <UiBadge :variant="getTypeBadgeVariant(value)" size="sm" class="capitalize">
            {{ value.replace('_', ' ') }}
          </UiBadge>
        </template>

        <template #cell-status="{ value }">
          <UiBadge :variant="value === 'active' ? 'success' : 'danger'" size="sm" class="capitalize">
            {{ value }}
          </UiBadge>
        </template>

        <template #cell-price="{ value }">
          <span class="font-medium">${{ value.toFixed(2) }}</span>
        </template>

        <template #actions="{ row }">
          <div class="flex items-center justify-end gap-2">
            <button
              class="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors"
              @click="router.push(`/catalog/products/${row.id}/edit`)"
            >
              <span class="material-icons text-lg">edit</span>
            </button>
            <button
              class="p-1.5 text-dangerous-medium hover:bg-dangerous-light rounded-md transition-colors"
              @click="productsStore.deleteProduct(row.id)"
            >
              <span class="material-icons text-lg">delete</span>
            </button>
          </div>
        </template>
      </DataTable>
    </div>
  </MainLayout>
</template>
