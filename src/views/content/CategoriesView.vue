<script setup>
import MainLayout from '../../components/templates/MainLayout.vue'
import DataTable from '../../components/organisms/DataTable.vue'
import UiButton from '../../components/atoms/UiButton.vue'

const categories = [
  { id: 1, title: 'Homepage', slug: 'homepage', blocks: 5 },
  { id: 2, title: 'Product Page', slug: 'product-page', blocks: 8 },
  { id: 3, title: 'About Us', slug: 'about-us', blocks: 3 }
]

const columns = [
  { key: 'title', label: 'Title', sortable: true },
  { key: 'slug', label: 'Slug' },
  { key: 'blocks', label: 'Blocks' }
]
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-80">Content Categories</h1>
        <UiButton variant="primary">
          <span class="material-icons text-lg">add</span>
          Add Category
        </UiButton>
      </div>

      <DataTable
        :columns="columns"
        :rows="categories"
        :current-page="1"
        :total-pages="1"
        :total-items="categories.length"
      >
        <template #actions="{ row }">
          <button class="text-primary hover:underline">Edit</button>
        </template>
      </DataTable>
    </div>
  </MainLayout>
</template>
