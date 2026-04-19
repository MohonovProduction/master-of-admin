<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.modelValue) {
    closeModal()
  }
}

const closeModal = () => {
  emit('update:modelValue', false)
  emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50"
          @click="closeModal"
        />
        
        <!-- Modal Panel -->
        <div
          :class="['relative bg-white rounded-lg shadow-lg w-full', sizeClasses[size]]"
          role="dialog"
          aria-modal="true"
        >
          <!-- Header -->
          <div v-if="title" class="flex items-center justify-between p-6 border-b border-gray-20">
            <h3 class="text-lg font-semibold text-gray-80">{{ title }}</h3>
            <button
              class="p-1 text-gray-40 hover:text-gray-60 rounded-md hover:bg-gray-2 transition-colors"
              @click="closeModal"
            >
              <span class="material-icons text-xl">close</span>
            </button>
          </div>
          
          <!-- Body -->
          <div class="p-6">
            <slot />
          </div>
          
          <!-- Footer -->
          <div v-if="$slots.footer" class="p-6 border-t border-gray-20 bg-gray-2">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
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
