<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from '../layout/AppSidebar.vue'
import Breadcrumbs from '../molecules/Breadcrumbs.vue'
import UiAvatar from '../atoms/UiAvatar.vue'

const route = useRoute()
const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-2">
    <!-- Mobile sidebar backdrop -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar -->
    <AppSidebar :is-open="sidebarOpen" @toggle="toggleSidebar" />

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Header -->
      <header class="sticky top-0 z-30 bg-white border-b border-gray-20 shadow-sm">
        <div class="flex items-center justify-between h-16 px-4 sm:px-6">
          <button class="lg:hidden p-2 rounded-md hover:bg-gray-2" @click="toggleSidebar">
            <span class="material-icons">menu</span>
          </button>

          <div class="flex items-center gap-4 ml-auto">
            <button class="p-2 rounded-md hover:bg-gray-2 relative">
              <span class="material-icons text-gray-60">notifications</span>
              <span class="absolute top-1 right-1 w-2 h-2 bg-dangerous-medium rounded-full"></span>
            </button>
            <UiAvatar name="Admin User" size="md" />
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-0">
        <div class="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 mb-6">
          <Breadcrumbs :items="route.meta.breadcrumbs || []" />
        </div>
        <div class="px-4 sm:px-6 lg:px-8">
            <slot />
        </div>
      </main>
    </div>
  </div>
</template>
