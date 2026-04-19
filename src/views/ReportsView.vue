<script setup>
import MainLayout from '../components/templates/MainLayout.vue'
import UiCard from '../components/atoms/UiCard.vue'

const stats = [
  { label: 'Total Orders', value: '1,247' },
  { label: 'Revenue', value: '$45,678' },
  { label: 'Avg Order Value', value: '$36.62' },
  { label: 'Conversion Rate', value: '3.2%' }
]

const topProducts = [
  { name: 'Gaming Box Pro', sales: 156, revenue: 46798.44 },
  { name: 'RGB LED Slider', sales: 89, revenue: 4449.11 },
  { name: 'Premium Box', sales: 67, revenue: 33499.33 }
]
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-80">Reports</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <UiCard v-for="stat in stats" :key="stat.label">
          <p class="text-sm text-gray-60">{{ stat.label }}</p>
          <p class="text-3xl font-bold mt-2 text-gray-80">{{ stat.value }}</p>
        </UiCard>
      </div>

      <UiCard>
        <h3 class="text-lg font-semibold mb-4">Top Products</h3>
        <table class="min-w-full divide-y divide-gray-20">
          <thead class="bg-gray-2">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Product</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Sales</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Revenue</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-20">
            <tr v-for="product in topProducts" :key="product.name">
              <td class="px-4 py-3 text-sm font-medium">{{ product.name }}</td>
              <td class="px-4 py-3 text-sm">{{ product.sales }}</td>
              <td class="px-4 py-3 text-sm font-medium">${{ product.revenue.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </UiCard>
    </div>
  </MainLayout>
</template>
