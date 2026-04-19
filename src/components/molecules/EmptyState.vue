<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: 'inbox'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  actionLabel: {
    type: String,
    default: ''
  }
})

defineEmits(['action'])
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <span class="material-icons text-6xl text-gray-30 mb-4">{{ icon }}</span>
    <h3 class="text-lg font-semibold text-gray-80 mb-2">{{ title }}</h3>
    <p v-if="description" class="text-sm text-gray-60 max-w-sm mb-6">
      {{ description }}
    </p>
    <button
      v-if="actionLabel"
      class="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>
