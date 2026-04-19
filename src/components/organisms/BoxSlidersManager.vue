<script setup>
import { ref } from 'vue'
import UiButton from '../atoms/UiButton.vue'
import UiInput from '../atoms/UiInput.vue'
import UiSelect from '../atoms/UiSelect.vue'
import FormField from '../molecules/FormField.vue'
import ConfirmModal from '../molecules/ConfirmModal.vue'

const props = defineProps({
  sliders: {
    type: Array,
    default: () => []
  },
  availableSliders: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add', 'remove', 'update'])

const showAddModal = ref(false)
const showDeleteModal = ref(false)
const selectedSlider = ref(null)
const searchQuery = ref('')
const selectedSliderId = ref('')
const priceInBox = ref('')

const filteredSliders = ref(() => {
  if (!searchQuery.value) return props.availableSliders
  return props.availableSliders.filter(s => 
    s.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const openAddModal = () => {
  showAddModal.value = true
  searchQuery.value = ''
  selectedSliderId.value = ''
  priceInBox.value = ''
}

const closeAddModal = () => {
  showAddModal.value = false
}

const handleAdd = () => {
  if (selectedSliderId.value && priceInBox.value) {
    emit('add', {
      id: selectedSliderId.value,
      priceInBox: parseFloat(priceInBox.value)
    })
    closeAddModal()
  }
}

const confirmDelete = (slider) => {
  selectedSlider.value = slider
  showDeleteModal.value = true
}

const handleDelete = () => {
  emit('remove', selectedSlider.value)
  showDeleteModal.value = false
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-semibold text-gray-80">Sliders in Box</h3>
      <UiButton variant="primary" size="sm" @click="openAddModal">
        <span class="material-icons text-lg">add</span>
        Add Slider
      </UiButton>
    </div>

    <div v-if="sliders.length === 0" class="text-center py-8 text-gray-50">
      No sliders added to this box yet
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-20">
        <thead class="bg-gray-2">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Name</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-70 uppercase">Price in Box</th>
            <th class="px-4 py-3 text-right text-xs font-medium text-gray-70 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-20">
          <tr v-for="slider in sliders" :key="slider.id" class="hover:bg-gray-2">
            <td class="px-4 py-3 text-sm text-gray-80">{{ slider.name }}</td>
            <td class="px-4 py-3 text-sm text-gray-80">${{ slider.priceInBox.toFixed(2) }}</td>
            <td class="px-4 py-3 text-right">
              <button
                class="text-dangerous-medium hover:underline text-sm"
                @click="confirmDelete(slider)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Slider Modal -->
    <Teleport to="body">
      <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/50" @click="closeAddModal" />
        <div class="relative bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-4">
          <h3 class="text-lg font-semibold text-gray-80 mb-4">Add Slider to Box</h3>
          
          <div class="space-y-4">
            <FormField label="Search Sliders" required>
              <UiInput v-model="searchQuery" placeholder="Search by name..." />
            </FormField>

            <FormField label="Select Slider" required>
              <UiSelect
                v-model="selectedSliderId"
                :options="filteredSliders.map(s => ({ value: s.id, label: s.name }))"
                placeholder="Choose a slider..."
              />
            </FormField>

            <FormField label="Price in Box ($)" required>
              <UiInput v-model="priceInBox" type="number" placeholder="0.00" />
            </FormField>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <UiButton variant="ghost" @click="closeAddModal">Cancel</UiButton>
            <UiButton
              variant="primary"
              :disabled="!selectedSliderId || !priceInBox"
              @click="handleAdd"
            >
              Add Slider
            </UiButton>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirmation -->
    <ConfirmModal
      v-if="showDeleteModal"
      title="Remove Slider"
      message="Are you sure you want to remove this slider from the box?"
      @confirm="handleDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>
