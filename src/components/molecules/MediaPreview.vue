<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'image'
  }
})

const emit = defineEmits(['delete', 'copy-url'])
</script>

<template>
  <div class="flex items-start gap-3 p-3 border border-gray-20 rounded-lg hover:shadow-sm transition-shadow">
    <div class="flex-shrink-0 w-16 h-16 bg-gray-2 rounded-md flex items-center justify-center overflow-hidden">
      <img
        v-if="type === 'image' && url"
        :src="url"
        :alt="name"
        class="w-full h-full object-cover"
      />
      <span v-else class="material-icons text-3xl text-gray-40">
        {{ type === 'video' ? 'videocam' : type === 'audio' ? 'audiotrack' : 'insert_drive_file' }}
      </span>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-gray-80 truncate">{{ name }}</p>
      <p v-if="size" class="text-xs text-gray-50 mt-1">{{ size }}</p>
      <div class="mt-2">
        <button
          class="text-xs text-primary hover:underline"
          @click="$emit('copy-url', url)"
        >
          Copy URL
        </button>
      </div>
    </div>
    <button
      class="p-1 text-dangerous-medium hover:bg-dangerous-light rounded transition-colors"
      title="Delete"
      @click="$emit('delete')"
    >
      <span class="material-icons text-lg">delete</span>
    </button>
  </div>
</template>
