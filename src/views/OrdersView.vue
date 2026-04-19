<script setup>
import { ref } from 'vue'
import MainLayout from '../components/templates/MainLayout.vue'
import DataTable from '../components/organisms/DataTable.vue'
import SearchFilterBar from '../components/molecules/SearchFilterBar.vue'
import UiBadge from '../components/atoms/UiBadge.vue'

const searchQuery = ref('')

const orders = [
  { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', total: 299.99, status: 'paid', created_at: '2024-01-15' },
  { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', total: 499.99, status: 'pending', created_at: '2024-01-14' },
  { id: 'ORD-003', customer: 'Bob Johnson', email: 'bob@example.com', total: 149.99, status: 'shipped', created_at: '2024-01-13' },
  { id: 'ORD-004', customer: 'Alice Williams', email: 'alice@example.com', total: 599.99, status: 'paid', created_at: '2024-01-12' },
  { id: 'ORD-005', customer: 'Charlie Brown', email: 'charlie@example.com', total: 89.99, status: 'cancelled', created_at: '2024-01-11' }
]

const columns = [
  { key: 'id', label: 'Order #', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'total', label: 'Total', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'created_at', label: 'Date', sortable: true }
]

const getStatusVariant = (status) => {
  const variants = { paid: 'success', pending: 'warning', shipped: 'info', cancelled: 'danger' }
  return variants[status] || 'default'
}
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-80">Orders</h1>

      <SearchFilterBar
        v-model:search="searchQuery"
        :filter-options="[
          { value: 'paid', label: 'Paid' },
          { value: 'pending', label: 'Pending' },
          { value: 'shipped', label: 'Shipped' },
          { value: 'cancelled', label: 'Cancelled' }
        ]"
      />

      <DataTable
        :columns="columns"
        :rows="orders"
        :current-page="1"
        :total-pages="1"
        :total-items="orders.length"
      >
        <template #cell-id="{ value }">
          <span class="font-medium text-primary">{{ value }}</span>
        </template>
        <template #cell-total="{ value }">
          <span class="font-medium">${{ value.toFixed(2) }}</span>
        </template>
        <template #cell-status="{ value }">
          <UiBadge :variant="getStatusVariant(value)" size="sm" class="capitalize">{{ value }}</UiBadge>
        </template>
        <template #actions="{ row }">
          <button class="text-primary hover:underline">View Details</button>
        </template>
      </DataTable>
    </div>
  </MainLayout>
</template>
