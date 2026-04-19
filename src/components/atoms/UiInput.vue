<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'number', 'email', 'password'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
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

const input = ref(null)
const isFocused = ref(false)

const baseClasses = 'w-full px-4 py-2 text-sm border rounded-md transition-colors focus:outline-none focus:ring-2 disabled:bg-gray-2 disabled:cursor-not-allowed'

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
    <input
      ref="input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="classes"
      @input="onInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <p v-if="error" class="mt-1 text-xs text-dangerous-medium">
      {{ error }}
    </p>
  </div>
</template>
