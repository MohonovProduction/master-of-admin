<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    required: true
    // Array of { id, label, icon? }
  },
  modelValue: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <!-- Tab Headers -->
    <div class="border-b border-gray-20">
      <nav class="flex gap-6" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          role="tab"
          :aria-selected="modelValue === tab.id"
          class="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors"
          :class="modelValue === tab.id 
            ? 'border-primary text-primary' 
            : 'border-transparent text-gray-60 hover:text-gray-80 hover:border-gray-30'"
          @click="emit('update:modelValue', tab.id)"
        >
          <span v-if="tab.icon" class="material-icons text-lg">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>
