<script setup>
const props = defineProps({
  columns: {
    type: Array,
    required: true
    // Array of { key, label, sortable }
  },
  sortBy: {
    type: String,
    default: ''
  },
  sortOrder: {
    type: String,
    default: 'asc',
    validator: (value) => ['asc', 'desc'].includes(value)
  }
})

const emit = defineEmits(['sort'])

const handleSort = (column) => {
  if (!column.sortable) return
  
  if (props.sortBy === column.key) {
    emit('sort', column.key, props.sortOrder === 'asc' ? 'desc' : 'asc')
  } else {
    emit('sort', column.key, 'asc')
  }
}
</script>

<template>
  <thead class="bg-gray-2">
    <tr>
      <th
        v-for="column in columns"
        :key="column.key"
        class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase tracking-wider"
        :class="{ 'cursor-pointer hover:bg-gray-10': column.sortable }"
        @click="handleSort(column)"
      >
        <div class="flex items-center gap-1">
          {{ column.label }}
          <span v-if="column.sortable" class="material-icons text-sm">
            {{ sortBy === column.key ? (sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'swap_vert' }}
          </span>
        </div>
      </th>
      <th class="px-4 py-3 text-right text-xs font-medium text-gray-70 uppercase tracking-wider">
        Actions
      </th>
    </tr>
  </thead>
</template>
