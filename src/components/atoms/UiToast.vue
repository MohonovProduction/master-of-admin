<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['close'])

const visible = ref(true)

const typeClasses = {
  success: 'bg-success-light border-success-medium text-success-dark',
  error: 'bg-dangerous-light border-dangerous-medium text-dangerous-dark',
  warning: 'bg-warn-light border-warn-medium text-warn-dark',
  info: 'bg-primary/20 border-primary text-primary'
}

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      visible.value = false
      setTimeout(() => {
        emit('close')
      }, 300)
    }, props.duration)
  }
})
</script>

<template>
  <Transition name="toast">
    <div
      v-if="visible"
      :class="[
        'flex items-center gap-3 px-4 py-3 border-l-4 rounded-md shadow-sm',
        typeClasses[type]
      ]"
    >
      <span class="material-icons text-lg">
        {{ type === 'success' ? 'check_circle' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info' }}
      </span>
      <p class="flex-1 text-sm font-medium">{{ message }}</p>
      <button
        class="material-icons text-lg hover:opacity-70 transition-opacity"
        @click="visible = false; $emit('close')"
      >
        close
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
