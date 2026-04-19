<script setup>
defineEmits(['edit', 'delete', 'toggle'])

const props = defineProps({
  isActive: {
    type: Boolean,
    default: true
  },
  disableDelete: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      class="p-1.5 text-gray-60 hover:bg-gray-2 rounded-md transition-colors"
      title="Edit"
      @click="$emit('edit')"
    >
      <span class="material-icons text-lg">edit</span>
    </button>
    <button
      v-if="!disableDelete"
      class="p-1.5 text-dangerous-medium hover:bg-dangerous-light rounded-md transition-colors"
      title="Delete"
      @click="$emit('delete')"
    >
      <span class="material-icons text-lg">delete</span>
    </button>
    <button
      class="p-1.5 hover:bg-gray-2 rounded-md transition-colors"
      :class="isActive ? 'text-success-medium' : 'text-gray-40'"
      :title="isActive ? 'Disable' : 'Enable'"
      @click="$emit('toggle')"
    >
      <span class="material-icons text-lg">
        {{ isActive ? 'toggle_on' : 'toggle_off' }}
      </span>
    </button>
  </div>
</template>
