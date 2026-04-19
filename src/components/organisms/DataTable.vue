<script setup>
import DataTableHeader from '../molecules/DataTableHeader.vue'
import Pagination from '../molecules/Pagination.vue'
import EmptyState from '../molecules/EmptyState.vue'
import UiSpinner from '../atoms/UiSpinner.vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  sortBy: {
    type: String,
    default: ''
  },
  sortOrder: {
    type: String,
    default: 'asc'
  },
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 1
  },
  totalItems: {
    type: Number,
    default: 0
  },
  emptyMessage: {
    type: String,
    default: 'No data available'
  }
})

const emit = defineEmits(['sort', 'page-change'])
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-20 overflow-hidden">
    <div v-if="loading" class="flex items-center justify-center py-12">
      <UiSpinner size="lg" />
    </div>
    
    <EmptyState
      v-else-if="rows.length === 0"
      icon="inbox"
      :title="emptyMessage"
    />
    
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-20">
        <DataTableHeader
          :columns="columns"
          :sort-by="sortBy"
          :sort-order="sortOrder"
          @sort="emit('sort', $event)"
        />
        <tbody class="bg-white divide-y divide-gray-20">
          <tr v-for="(row, index) in rows" :key="index" class="hover:bg-gray-2 transition-colors">
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 whitespace-nowrap text-sm text-gray-80"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
              <slot name="actions" :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <Pagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-items="totalItems"
      @page-change="emit('page-change', $event)"
    />
  </div>
</template>
