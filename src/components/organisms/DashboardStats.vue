<script setup>
import UiButton from '../atoms/UiButton.vue'
import UiBadge from '../atoms/UiBadge.vue'

const props = defineProps({
  stats: {
    type: Array,
    required: true
    // Array of { title, value, icon, change, changeType }
  }
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="bg-white rounded-lg shadow-sm border border-gray-20 p-6"
    >
      <div class="flex items-center justify-between mb-4">
        <div class="p-3 bg-primary/10 rounded-lg">
          <span class="material-icons text-2xl text-primary">{{ stat.icon }}</span>
        </div>
        <UiBadge v-if="stat.change" :variant="stat.changeType === 'positive' ? 'success' : 'danger'">
          {{ stat.change }}
        </UiBadge>
      </div>
      <h3 class="text-2xl font-bold text-gray-80 mb-1">{{ stat.value }}</h3>
      <p class="text-sm text-gray-60">{{ stat.title }}</p>
    </div>
  </div>
</template>
