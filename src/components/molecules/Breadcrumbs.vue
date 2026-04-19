<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  items: {
    type: Array,
    default: () => []
    // Array of { label, to }
  }
})

const allItems = computed(() => {
  return [
    { label: 'Home', to: '/' },
    ...props.items
  ]
})
</script>

<template>
  <nav class="flex items-center gap-2 text-sm">
    <template v-for="(item, index) in allItems" :key="index">
      <router-link
        v-if="item.to"
        :to="item.to"
        class="text-gray-60 hover:text-primary transition-colors"
      >
        {{ item.label }}
      </router-link>
      <span v-else class="text-gray-80 font-medium">{{ item.label }}</span>
      <span
        v-if="index < allItems.length - 1"
        class="material-icons text-sm text-gray-40"
      >
        chevron_right
      </span>
    </template>
  </nav>
</template>
