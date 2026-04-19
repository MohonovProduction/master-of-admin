<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumbs from '../molecules/Breadcrumbs.vue'
import UiAvatar from '../atoms/UiAvatar.vue'

const route = useRoute()
const sidebarOpen = ref(false)

const navigation = [
  { name: 'Dashboard', icon: 'dashboard', to: '/dashboard' },
  { name: 'Catalog', icon: 'inventory_2', to: '/catalog' },
  { name: 'Boxes', icon: 'category', to: '/boxes' },
  { name: 'Preconfigured Boxes', icon: 'shopping_cart', to: '/preconfigured-boxes' },
  { name: 'Content', icon: 'article', to: '/content' },
  { name: 'Media Library', icon: 'photo_library', to: '/media' },
  { name: 'Orders', icon: 'receipt_long', to: '/orders' },
  { name: 'Reports', icon: 'analytics', to: '/reports' }
]

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
    <aside
      class="fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-20 transform transition-transform lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex items-center justify-between h-16 px-4 border-b border-gray-20">
        <h1 class="text-xl font-bold text-primary">Quoder Admin</h1>
        <button class="lg:hidden p-2 rounded-md hover:bg-gray-2" @click="sidebarOpen = false">
          <span class="material-icons">close</span>
        </button>
      </div>
      
      <nav class="p-4 space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
          :class="route.path === item.to ? 'bg-primary/10 text-primary' : 'text-gray-70 hover:bg-gray-2'"
        >
          <span class="material-icons">{{ item.icon }}</span>
          <span class="font-medium">{{ item.name }}</span>
        </router-link>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="lg:ml-64">
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
      <main class="p-4 sm:p-6 lg:p-8">
        <div class="mb-6">
          <Breadcrumbs :items="route.meta.breadcrumbs || []" />
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>
