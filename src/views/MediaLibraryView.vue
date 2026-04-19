<script setup>
import MainLayout from '../components/templates/MainLayout.vue'
import UiCard from '../components/atoms/UiCard.vue'
import UiButton from '../components/atoms/UiButton.vue'

const mediaItems = [
  { id: 1, name: 'hero-banner.jpg', type: 'image', url: '/media/hero.jpg', size: '2.4 MB' },
  { id: 2, name: 'product-video.mp4', type: 'video', url: '/media/video.mp4', size: '15.8 MB' },
  { id: 3, name: 'logo.png', type: 'image', url: '/media/logo.png', size: '245 KB' },
  { id: 4, name: 'document.pdf', type: 'file', url: '/media/doc.pdf', size: '1.2 MB' }
]
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-80">Media Library</h1>
        <UiButton variant="primary">
          <span class="material-icons text-lg">upload</span>
          Upload Files
        </UiButton>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UiCard v-for="item in mediaItems" :key="item.id" class="hover:shadow-md transition-shadow">
          <div class="aspect-square bg-gray-2 rounded-lg mb-3 flex items-center justify-center">
            <span class="material-icons text-5xl text-gray-40">
              {{ item.type === 'image' ? 'image' : item.type === 'video' ? 'videocam' : 'insert_drive_file' }}
            </span>
          </div>
          <p class="text-sm font-medium text-gray-80 truncate">{{ item.name }}</p>
          <p class="text-xs text-gray-50 mt-1">{{ item.size }}</p>
        </UiCard>
      </div>
    </div>
  </MainLayout>
</template>
