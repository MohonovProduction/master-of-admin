<script setup>
import MainLayout from '../components/templates/MainLayout.vue'
import UiCard from '../components/atoms/UiCard.vue'
import UiButton from '../components/atoms/UiButton.vue'
import UiBadge from '../components/atoms/UiBadge.vue'

const order = {
  id: 'ORD-001',
  customer: 'John Doe',
  email: 'john@example.com',
  address: '123 Main St, City, Country',
  payment: 'Credit Card',
  status: 'paid',
  created_at: '2024-01-15',
  items: [
    { name: 'Gaming Box Pro', quantity: 1, price: 299.99 },
    { name: 'RGB LED Slider', quantity: 2, price: 49.99 }
  ],
  total: 399.97
}
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-80">Order {{ order.id }}</h1>
        <UiBadge :variant="order.status === 'paid' ? 'success' : 'warning'" size="lg">
          {{ order.status }}
        </UiBadge>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UiCard>
          <h3 class="font-semibold mb-3">Customer Information</h3>
          <p class="text-sm"><strong>Name:</strong> {{ order.customer }}</p>
          <p class="text-sm mt-2"><strong>Email:</strong> {{ order.email }}</p>
          <p class="text-sm mt-2"><strong>Address:</strong> {{ order.address }}</p>
        </UiCard>

        <UiCard>
          <h3 class="font-semibold mb-3">Payment Information</h3>
          <p class="text-sm"><strong>Method:</strong> {{ order.payment }}</p>
          <p class="text-sm mt-2"><strong>Date:</strong> {{ order.created_at }}</p>
        </UiCard>
      </div>

      <UiCard>
        <h3 class="font-semibold mb-4">Order Items</h3>
        <table class="min-w-full divide-y divide-gray-20">
          <thead class="bg-gray-2">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Product</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Qty</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Price</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Total</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-20">
            <tr v-for="item in order.items" :key="item.name">
              <td class="px-4 py-3 text-sm">{{ item.name }}</td>
              <td class="px-4 py-3 text-sm">{{ item.quantity }}</td>
              <td class="px-4 py-3 text-sm">${{ item.price.toFixed(2) }}</td>
              <td class="px-4 py-3 text-sm font-medium">${{ (item.quantity * item.price).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4 text-right">
          <p class="text-2xl font-bold text-primary">Total: ${{ order.total.toFixed(2) }}</p>
        </div>
      </UiCard>
    </div>
  </MainLayout>
</template>
