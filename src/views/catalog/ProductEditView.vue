<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '../../components/templates/MainLayout.vue'
import UiCard from '../../components/atoms/UiCard.vue'
import UiButton from '../../components/atoms/UiButton.vue'
import { useProductsStore } from '../../stores/products'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const product = computed(() => productsStore.getProductById(Number(route.params.id)))
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-80">Edit Product: {{ product?.name }}</h1>
        <div class="flex gap-3">
          <UiButton variant="ghost" @click="router.back()">Cancel</UiButton>
          <UiButton variant="primary">Save Changes</UiButton>
        </div>
      </div>

      <UiCard>
        <p class="text-gray-60">Product editing form will be implemented here.</p>
        <p class="text-sm text-gray-50 mt-2">Product Type: {{ product?.type }}</p>
      </UiCard>
    </div>
  </MainLayout>
</template>
