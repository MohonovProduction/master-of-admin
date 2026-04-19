<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    required: true,
    // Array of { value, label } objects
  },
  placeholder: {
    type: String,
    default: 'Select...'
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

const baseClasses = 'w-full px-4 py-2 text-sm border rounded-md transition-colors focus:outline-none focus:ring-2 disabled:bg-gray-2 disabled:cursor-not-allowed bg-white'

const stateClasses = computed(() => {
  if (props.error) {
    return 'border-dangerous-medium focus:ring-dangerous-medium'
  }
  return 'border-gray-30 focus:ring-primary'
})

const classes = computed(() => {
  return [baseClasses, stateClasses.value].join(' ')
})

const onChange = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div>
    <select
      :value="modelValue"
      :disabled="disabled"
      :class="classes"
      @change="onChange"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="mt-1 text-xs text-dangerous-medium">
      {{ error }}
    </p>
  </div>
</template>
