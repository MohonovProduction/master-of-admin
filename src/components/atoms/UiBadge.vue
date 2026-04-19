<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'warning', 'danger', 'active', 'inactive', 'paid', 'pending', 'shipped', 'draft', 'published'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const variantClasses = {
  default: 'bg-gray-20 text-gray-80',
  success: 'bg-success-light text-success-dark',
  warning: 'bg-warn-light text-warn-dark',
  danger: 'bg-dangerous-light text-dangerous-dark',
  active: 'bg-success-light text-success-dark',
  inactive: 'bg-gray-20 text-gray-60',
  paid: 'bg-success-light text-success-dark',
  pending: 'bg-warn-light text-warn-dark',
  shipped: 'bg-primary/20 text-primary',
  draft: 'bg-gray-20 text-gray-60',
  published: 'bg-success-light text-success-dark'
}

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5'
}

const classes = computed(() => {
  return [
    'inline-flex items-center font-medium rounded-full',
    variantClasses[props.variant],
    sizeClasses[props.size]
  ].join(' ')
})
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
