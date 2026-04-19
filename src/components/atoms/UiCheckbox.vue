<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const onChange = (event) => {
  emit('update:modelValue', event.target.checked)
}
</script>

<template>
  <label class="inline-flex items-center gap-2 cursor-pointer" :class="{ 'opacity-50 cursor-not-allowed': disabled }">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="w-4 h-4 text-primary border-gray-30 rounded focus:ring-primary"
      @change="onChange"
    />
    <span v-if="label" class="text-sm text-gray-80">{{ label }}</span>
    <slot v-else />
  </label>
</template>
