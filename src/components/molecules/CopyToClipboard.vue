<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const copied = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <code class="px-2 py-1 text-xs bg-gray-2 rounded text-gray-80 truncate max-w-xs">
      {{ text }}
    </code>
    <button
      class="p-1 hover:bg-gray-10 rounded transition-colors"
      :title="copied ? 'Copied!' : 'Copy to clipboard'"
      @click="copyToClipboard"
    >
      <span class="material-icons text-lg" :class="copied ? 'text-success-medium' : 'text-gray-60'">
        {{ copied ? 'check' : 'content_copy' }}
      </span>
    </button>
  </div>
</template>
