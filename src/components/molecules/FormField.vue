<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="space-y-1">
    <label class="block text-sm font-medium text-gray-80">
      {{ label }}
      <span v-if="required" class="text-dangerous-medium">*</span>
    </label>
    <slot />
    <p v-if="hint && !error" class="text-xs text-gray-50">
      {{ hint }}
    </p>
    <p v-if="error" class="text-xs text-dangerous-medium">
      {{ error }}
    </p>
  </div>
</template>
