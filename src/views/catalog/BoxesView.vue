<script setup>
import { computed, ref } from 'vue'
import MainLayout from '../../components/templates/MainLayout.vue'
import DataTable from '../../components/organisms/DataTable.vue'
import UiBadge from '../../components/atoms/UiBadge.vue'
import { useProductsStore } from '../../stores/products'

const productsStore = useProductsStore()
const typeFilter = 'box'

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'sku', label: 'SKU' },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'updated_at', label: 'Updated' }
]

const filteredProducts = computed(() => productsStore[typeFilter + 's'] || productsStore.products.filter(p => p.type === typeFilter))
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-80 capitalize">{{ typeFilter }}s</h1>

      <DataTable
        :columns="columns"
        :rows="filteredProducts"
        :current-page="1"
        :total-pages="1"
        :total-items="filteredProducts.length"
      >
        <template #cell-status="{ value }">
          <UiBadge :variant="value === 'active' ? 'success' : 'danger'" size="sm">{{ value }}</UiBadge>
        </template>
        <template #cell-price="{ value }">
          <span class="font-medium">${{ value.toFixed(2) }}</span>
        </template>
        <template #actions="{ row }">
          <button class="text-primary hover:underline">Edit</button>
        </template>
      </DataTable>
    </div>
  </MainLayout>
</template>
