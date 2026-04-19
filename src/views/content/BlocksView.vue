<script setup>
import MainLayout from '../../components/templates/MainLayout.vue'
import DataTable from '../../components/organisms/DataTable.vue'
import UiButton from '../../components/atoms/UiButton.vue'
import UiBadge from '../../components/atoms/UiBadge.vue'

const blocks = [
  { id: 1, category: 'Homepage', key: 'hero_title', type: 'text', value: 'Welcome to Our Store' },
  { id: 2, category: 'Homepage', key: 'hero_description', type: 'markdown', value: '## Best products...' },
  { id: 3, category: 'Product Page', key: 'features', type: 'json', value: '{"features": [...]}' },
  { id: 4, category: 'Product Page', key: 'product_video', type: 'video', value: '/media/video.mp4' }
]

const columns = [
  { key: 'category', label: 'Category' },
  { key: 'key', label: 'Key' },
  { key: 'type', label: 'Type' },
  { key: 'value', label: 'Preview' }
]

const getTypeVariant = (type) => {
  const variants = { text: 'default', markdown: 'info', json: 'warning', image: 'success', video: 'primary' }
  return variants[type] || 'default'
}
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-80">Content Blocks</h1>
        <UiButton variant="primary">
          <span class="material-icons text-lg">add</span>
          Add Block
        </UiButton>
      </div>

      <DataTable
        :columns="columns"
        :rows="blocks"
        :current-page="1"
        :total-pages="1"
        :total-items="blocks.length"
      >
        <template #cell-type="{ value }">
          <UiBadge :variant="getTypeVariant(value)" size="sm">{{ value }}</UiBadge>
        </template>
        <template #cell-value="{ value }">
          <span class="text-sm text-gray-60 truncate max-w-xs block">{{ value }}</span>
        </template>
        <template #actions="{ row }">
          <button class="text-primary hover:underline">Edit</button>
        </template>
      </DataTable>
    </div>
  </MainLayout>
</template>
