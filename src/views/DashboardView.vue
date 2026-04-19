<script setup>
import MainLayout from '../components/templates/MainLayout.vue'
import UiCard from '../components/atoms/UiCard.vue'
import UiBadge from '../components/atoms/UiBadge.vue'

const stats = [
  { title: 'Total Products', value: '156', icon: 'inventory_2', change: '+12%', changeType: 'positive' },
  { title: 'Total Orders', value: '1,247', icon: 'shopping_cart', change: '+8%', changeType: 'positive' },
  { title: 'Revenue', value: '$45,678', icon: 'attach_money', change: '+15%', changeType: 'positive' },
  { title: 'Active Users', value: '89', icon: 'people', change: '-3%', changeType: 'negative' }
]

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', total: 299.99, status: 'paid', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Jane Smith', total: 499.99, status: 'pending', date: '2024-01-14' },
  { id: 'ORD-003', customer: 'Bob Johnson', total: 149.99, status: 'shipped', date: '2024-01-13' },
  { id: 'ORD-004', customer: 'Alice Williams', total: 599.99, status: 'paid', date: '2024-01-12' },
  { id: 'ORD-005', customer: 'Charlie Brown', total: 89.99, status: 'pending', date: '2024-01-11' }
]
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-80">Dashboard</h1>
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <UiCard v-for="stat in stats" :key="stat.title">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-60">{{ stat.title }}</p>
              <p class="text-3xl font-bold mt-2 text-gray-80">{{ stat.value }}</p>
            </div>
            <div class="flex flex-col items-end gap-2">
              <span class="material-icons text-2xl text-primary">{{ stat.icon }}</span>
              <UiBadge v-if="stat.change" :variant="stat.changeType === 'positive' ? 'success' : 'danger'">
                {{ stat.change }}
              </UiBadge>
            </div>
          </div>
        </UiCard>
      </div>

      <!-- Recent Orders -->
      <UiCard>
        <h2 class="text-lg font-semibold mb-4 text-gray-80">Recent Orders</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-20">
            <thead class="bg-gray-2">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Order #</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Customer</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Total</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Status</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Date</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-20">
              <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-2">
                <td class="px-4 py-3 text-sm font-medium text-primary">{{ order.id }}</td>
                <td class="px-4 py-3 text-sm text-gray-80">{{ order.customer }}</td>
                <td class="px-4 py-3 text-sm font-medium">${{ order.total.toFixed(2) }}</td>
                <td class="px-4 py-3 text-sm">
                  <UiBadge :variant="order.status === 'paid' ? 'success' : order.status === 'shipped' ? 'info' : 'warning'">
                    {{ order.status }}
                  </UiBadge>
                </td>
                <td class="px-4 py-3 text-sm text-gray-60">{{ order.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </UiCard>
    </div>
  </MainLayout>
</template>
