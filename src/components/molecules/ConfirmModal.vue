<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  variant: {
    type: String,
    default: 'danger',
    validator: (value) => ['danger', 'warning', 'info'].includes(value)
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const show = ref(true)

const confirm = () => {
  show.value = false
  emit('confirm')
}

const cancel = () => {
  show.value = false
  emit('cancel')
}

const variantClasses = {
  danger: 'bg-dangerous-medium hover:bg-dangerous-dark',
  warning: 'bg-warn-medium hover:bg-warn-dark',
  info: 'bg-primary hover:bg-primary/90'
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50"
        @click="cancel"
      />
      
      <!-- Modal -->
      <div class="relative bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-4">
        <div class="flex items-start gap-4 mb-4">
          <span class="material-icons text-3xl" :class="variant === 'danger' ? 'text-dangerous-medium' : 'text-warn-medium'">
            {{ variant === 'danger' ? 'warning' : 'info' }}
          </span>
          <div>
            <h3 class="text-lg font-semibold text-gray-80">{{ title }}</h3>
            <p class="text-sm text-gray-60 mt-1">{{ message }}</p>
          </div>
        </div>
        
        <div class="flex justify-end gap-3">
          <button
            class="px-4 py-2 text-sm font-medium text-gray-70 bg-gray-20 hover:bg-gray-30 rounded-md transition-colors"
            @click="cancel"
          >
            {{ cancelText }}
          </button>
          <button
            :class="['px-4 py-2 text-sm font-medium text-white rounded-md transition-colors', variantClasses[variant]]"
            @click="confirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
