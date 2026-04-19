<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}

const classes = computed(() => {
  const base = 'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
  const state = props.modelValue ? 'bg-primary' : 'bg-gray-30'
  const disabled = props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  return [base, state, disabled].join(' ')
})

const dotClasses = computed(() => {
  const base = 'inline-block h-4 w-4 transform rounded-full bg-white transition-transform'
  const position = props.modelValue ? 'translate-x-6' : 'translate-x-1'
  return [base, position].join(' ')
})
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled"
    role="switch"
    :aria-checked="modelValue"
    @click="toggle"
  >
    <span :class="dotClasses" />
  </button>
</template>
