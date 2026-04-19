<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  search: {
    type: String,
    default: ''
  },
  filter: {
    type: String,
    default: ''
  },
  filterOptions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:search', 'update:filter', 'search', 'filter'])

const localSearch = ref(props.search)
const localFilter = ref(props.filter)

const onSearch = () => {
  emit('update:search', localSearch.value)
  emit('search', localSearch.value)
}

const onFilter = () => {
  emit('update:filter', localFilter.value)
  emit('filter', localFilter.value)
}

const clearFilters = () => {
  localSearch.value = ''
  localFilter.value = ''
  emit('update:search', '')
  emit('update:filter', '')
  emit('search', '')
  emit('filter', '')
}

const hasActiveFilters = computed(() => {
  return localSearch.value || localFilter.value
})
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-3">
    <div class="flex-1">
      <div class="relative">
        <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-40">search</span>
        <input
          v-model="localSearch"
          type="text"
          placeholder="Search..."
          class="w-full pl-10 pr-4 py-2 text-sm border border-gray-30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          @keyup.enter="onSearch"
        />
      </div>
    </div>
    <div v-if="filterOptions.length" class="flex gap-2">
      <select
        v-model="localFilter"
        class="px-4 py-2 text-sm border border-gray-30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        @change="onFilter"
      >
        <option value="">All Types</option>
        <option
          v-for="option in filterOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <button
        v-if="hasActiveFilters"
        class="px-3 py-2 text-sm text-gray-70 hover:bg-gray-2 rounded-md transition-colors"
        @click="clearFilters"
      >
        <span class="material-icons text-lg">close</span>
      </button>
    </div>
  </div>
</template>
