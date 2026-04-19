<script setup>
const props = defineProps({
  shadow: {
    type: String,
    default: 'sm',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
  },
  padding: {
    type: String,
    default: '4',
  }
})

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg'
}
</script>

<template>
  <div :class="['bg-white rounded-lg border border-gray-20', shadowClasses[shadow], `p-${padding}`]">
    <slot />
  </div>
</template>
