<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 4
  },
  error: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const baseClasses = 'w-full px-4 py-2 text-sm border rounded-md transition-colors focus:outline-none focus:ring-2 disabled:bg-gray-2 disabled:cursor-not-allowed resize-y'

const stateClasses = computed(() => {
  if (props.error) {
    return 'border-dangerous-medium focus:ring-dangerous-medium'
  }
  return 'border-gray-30 focus:ring-primary'
})

const classes = computed(() => {
  return [baseClasses, stateClasses.value].join(' ')
})

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div>
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :class="classes"
      @input="onInput"
    />
    <p v-if="error" class="mt-1 text-xs text-dangerous-medium">
      {{ error }}
    </p>
  </div>
</template>
