<script setup>
import { ref, computed } from 'vue'
import MainLayout from '../../templates/MainLayout.vue'
import UiButton from '../../atoms/UiButton.vue'
import UiInput from '../../atoms/UiInput.vue'
import UiTextarea from '../../atoms/UiTextarea.vue'
import UiToggle from '../../atoms/UiToggle.vue'
import UiBadge from '../../atoms/UiBadge.vue'
import UiToast from '../../atoms/UiToast.vue'
import FormField from '../../molecules/FormField.vue'
import BoxSlidersManager from '../../organisms/BoxSlidersManager.vue'
import ConfirmModal from '../../molecules/ConfirmModal.vue'

const activeTab = ref('sliders')
const toast = ref({ show: false, message: '', type: 'success' })

const boxData = ref({
  name: 'Gaming Box Pro',
  description: 'Complete gaming setup with RGB lighting',
  isActive: true,
  basePrice: 199.99
})

const sliders = ref([
  { id: 1, name: 'RGB LED Slider', priceInBox: 49.99 },
  { id: 2, name: 'Sound Control Slider', priceInBox: 29.99 }
])

const accessories = ref([
  { id: 1, name: 'USB Cable', priceInBox: 9.99 },
  { id: 2, name: 'Mounting Bracket', priceInBox: 14.99 },
  { id: 3, name: 'Remote Control', priceInBox: 19.99 }
])

const availableSliders = ref([
  { id: 101, name: 'Volume Slider' },
  { id: 102, name: 'Brightness Slider' },
  { id: 103, name: 'Temperature Slider' }
])

const availableAccessories = ref([
  { id: 201, name: 'Power Adapter' },
  { id: 202, name: 'Carrying Case' },
  { id: 203, name: 'Wall Mount' }
])

const showDeleteModal = ref(false)

const tabs = [
  { id: 'sliders', label: 'Sliders', icon: 'view_carousel' },
  { id: 'accessories', label: 'Accessories', icon: 'extension' }
]

const totalSliderPrice = computed(() => {
  return sliders.value.reduce((sum, s) => sum + s.priceInBox, 0)
})

const totalAccessoryPrice = computed(() => {
  return accessories.value.reduce((sum, a) => sum + a.priceInBox, 0)
})

const totalPrice = computed(() => {
  return boxData.value.basePrice + totalSliderPrice.value + totalAccessoryPrice.value
})

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
}

const saveBox = () => {
  showToast('Box configuration saved successfully')
}

const handleAddSlider = (sliderData) => {
  const slider = availableSliders.value.find(s => s.id === sliderData.id)
  if (slider) {
    sliders.value.push({
      id: slider.id,
      name: slider.name,
      priceInBox: sliderData.priceInBox
    })
    showToast('Slider added to box')
  }
}

const handleRemoveSlider = (slider) => {
  sliders.value = sliders.value.filter(s => s.id !== slider.id)
  showToast('Slider removed from box', 'warning')
}

const handleAddAccessory = (accessoryData) => {
  const accessory = availableAccessories.value.find(a => a.id === accessoryData.id)
  if (accessory) {
    accessories.value.push({
      id: accessory.id,
      name: accessory.name,
      priceInBox: accessoryData.priceInBox
    })
    showToast('Accessory added to box')
  }
}

const handleRemoveAccessory = (accessory) => {
  accessories.value = accessories.value.filter(a => a.id !== accessory.id)
  showToast('Accessory removed from box', 'warning')
}
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-80">Box Configurator</h1>
          <p class="text-sm text-gray-60 mt-1">Configure box contents, sliders, and accessories</p>
        </div>
        <div class="flex gap-3">
          <UiButton variant="ghost" @click="showToast('Changes discarded', 'warning')">
            Cancel
          </UiButton>
          <UiButton variant="primary" @click="saveBox">
            <span class="material-icons text-lg">save</span>
            Save Configuration
          </UiButton>
        </div>
      </div>

      <!-- Basic Information -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-20 p-6">
        <h2 class="text-lg font-semibold text-gray-80 mb-4">Basic Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Box Name" required>
            <UiInput v-model="boxData.name" placeholder="Enter box name" />
          </FormField>
          
          <FormField label="Base Price ($)" required>
            <UiInput v-model="boxData.basePrice" type="number" placeholder="0.00" />
          </FormField>
          
          <div class="md:col-span-2">
            <FormField label="Description">
              <UiTextarea v-model="boxData.description" placeholder="Enter box description" />
            </FormField>
          </div>
          
          <div class="flex items-center gap-3">
            <UiToggle v-model="boxData.isActive" />
            <span class="text-sm text-gray-80">
              {{ boxData.isActive ? 'Active' : 'Inactive' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-20">
        <!-- Tab Headers -->
        <div class="border-b border-gray-20">
          <nav class="flex">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors"
              :class="activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-60 hover:text-gray-80'"
              @click="activeTab = tab.id"
            >
              <span class="material-icons text-lg">{{ tab.icon }}</span>
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Sliders Tab -->
          <BoxSlidersManager
            v-if="activeTab === 'sliders'"
            :sliders="sliders"
            :available-sliders="availableSliders"
            @add="handleAddSlider"
            @remove="handleRemoveSlider"
          />

          <!-- Accessories Tab -->
          <div v-if="activeTab === 'accessories'" class="space-y-4">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold text-gray-80">Accessories in Box</h3>
              <UiButton variant="primary" size="sm" @click="showToast('Open add accessory modal')">
                <span class="material-icons text-lg">add</span>
                Add Accessory
              </UiButton>
            </div>

            <div v-if="accessories.length === 0" class="text-center py-8 text-gray-50">
              No accessories added to this box yet
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
                  <tr v-for="accessory in accessories" :key="accessory.id" class="hover:bg-gray-2">
                    <td class="px-4 py-3 text-sm text-gray-80">{{ accessory.name }}</td>
                    <td class="px-4 py-3 text-sm text-gray-80">${{ accessory.priceInBox.toFixed(2) }}</td>
                    <td class="px-4 py-3 text-right">
                      <button
                        class="text-dangerous-medium hover:underline text-sm"
                        @click="handleRemoveAccessory(accessory)"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Price Summary -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-20 p-6">
        <h2 class="text-lg font-semibold text-gray-80 mb-4">Price Summary</h2>
        <div class="space-y-3">
          <div class="flex justify-between text-sm">
            <span class="text-gray-60">Base Price:</span>
            <span class="font-medium">${{ boxData.basePrice.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-60">Sliders ({{ sliders.length }}):</span>
            <span class="font-medium">${{ totalSliderPrice.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-60">Accessories ({{ accessories.length }}):</span>
            <span class="font-medium">${{ totalAccessoryPrice.toFixed(2) }}</span>
          </div>
          <div class="border-t border-gray-20 pt-3 flex justify-between">
            <span class="text-lg font-semibold text-gray-80">Total Price:</span>
            <span class="text-2xl font-bold text-primary">${{ totalPrice.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Teleport to="body">
      <div class="fixed bottom-4 right-4 z-50 space-y-2">
        <UiToast
          v-if="toast.show"
          :message="toast.message"
          :type="toast.type"
          @close="toast.show = false"
        />
      </div>
    </Teleport>
  </MainLayout>
</template>
