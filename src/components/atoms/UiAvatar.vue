<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'Avatar'
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  name: {
    type: String,
    default: ''
  }
})

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg'
}

const classes = computed(() => {
  return [
    'rounded-full object-cover border-2 border-white',
    sizeClasses[props.size]
  ].join(' ')
})

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const bgColors = [
  'bg-primary',
  'bg-accent-one',
  'bg-accent-two',
  'bg-success-medium',
  'bg-secondary-dark'
]

const bgColorIndex = computed(() => {
  let hash = 0
  for (let i = 0; i < props.name.length; i++) {
    hash = props.name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return bgColors[Math.abs(hash) % bgColors.length]
})
</script>

<template>
  <div v-if="src" :class="classes">
    <img :src="src" :alt="alt" class="w-full h-full rounded-full object-cover" />
  </div>
  <div
    v-else
    :class="[classes, 'flex items-center justify-center text-white font-medium', bgColorIndex]"
  >
    {{ initials }}
  </div>
</template>
