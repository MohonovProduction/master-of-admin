<script setup>
import { computed } from 'vue'

const props = defineProps({
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
  }
})

const emit = defineEmits(['page-change'])

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, props.currentPage - 2)
  let end = Math.min(props.totalPages, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
</script>

<template>
  <div class="flex items-center justify-between px-4 py-3 border-t border-gray-20">
    <div class="text-sm text-gray-60">
      Showing {{ (currentPage - 1) * 10 + 1 }} to {{ Math.min(currentPage * 10, totalItems) }} of {{ totalItems }} results
    </div>
    <div class="flex items-center gap-2">
      <button
        class="px-3 py-1 text-sm border border-gray-30 rounded-md hover:bg-gray-2 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </button>
      <button
        v-for="page in visiblePages"
        :key="page"
        class="px-3 py-1 text-sm border rounded-md transition-colors"
        :class="page === currentPage ? 'bg-primary text-white border-primary' : 'border-gray-30 hover:bg-gray-2'"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button
        class="px-3 py-1 text-sm border border-gray-30 rounded-md hover:bg-gray-2 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
