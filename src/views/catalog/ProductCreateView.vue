<script setup>
import MainLayout from '../../components/templates/MainLayout.vue'
import UiCard from '../../components/atoms/UiCard.vue'
import UiButton from '../../components/atoms/UiButton.vue'

const productTypes = [
  { id: 'box', label: 'Box', icon: 'category', description: 'Customizable product box' },
  { id: 'slider', label: 'Slider', icon: 'view_carousel', description: 'Individual slider component' },
  { id: 'accessory', label: 'Accessory', icon: 'extension', description: 'Accessory item' },
  { id: 'preconfigured_box', label: 'Preconfigured Box', icon: 'shopping_cart', description: 'Pre-built product bundle' }
]
</script>

<template>
  <MainLayout>
    <div class="max-w-4xl mx-auto space-y-6">
      <h1 class="text-2xl font-bold text-gray-80">Create Product</h1>
      <p class="text-gray-60">Select the type of product you want to create</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UiCard
          v-for="type in productTypes"
          :key="type.id"
          class="cursor-pointer hover:border-primary transition-colors"
        >
          <div class="text-center">
            <span class="material-icons text-5xl text-primary mb-4">{{ type.icon }}</span>
            <h3 class="text-lg font-semibold text-gray-80">{{ type.label }}</h3>
            <p class="text-sm text-gray-60 mt-2">{{ type.description }}</p>
          </div>
        </UiCard>
      </div>
    </div>
  </MainLayout>
</template>
