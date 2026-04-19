<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const onChange = () => {
  emit('update:modelValue', props.modelValue)
}
</script>

<template>
  <label class="inline-flex items-center gap-2 cursor-pointer" :class="{ 'opacity-50 cursor-not-allowed': disabled }">
    <input
      type="radio"
      :name="name"
      :value="modelValue"
      :checked="modelValue === $attrs.value"
      :disabled="disabled"
      class="w-4 h-4 text-primary border-gray-30 focus:ring-primary"
      @change="onChange"
    />
    <span v-if="label" class="text-sm text-gray-80">{{ label }}</span>
    <slot v-else />
  </label>
</template>
