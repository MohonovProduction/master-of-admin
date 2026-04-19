<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true
  }
})

defineEmits(['toggle'])

const menuItems = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    to: '/dashboard'
  },
  {
    name: 'Catalog',
    icon: 'inventory_2',
    children: [
      { name: 'All Products', to: '/catalog/products' },
      { name: 'Boxes', to: '/catalog/boxes' },
      { name: 'Sliders', to: '/catalog/sliders' },
      { name: 'Accessories', to: '/catalog/accessories' },
      { name: 'Preconfigured Boxes', to: '/catalog/preconfigured-boxes' }
    ]
  },
  {
    name: 'Content',
    icon: 'article',
    children: [
      { name: 'Categories', to: '/content/categories' },
      { name: 'Blocks', to: '/content/blocks' }
    ]
  },
  {
    name: 'Media',
    icon: 'photo_library',
    to: '/media'
  },
  {
    name: 'Orders',
    icon: 'receipt_long',
    to: '/orders'
  },
  {
    name: 'Reports',
    icon: 'analytics',
    to: '/reports'
  }
]

const expandedSections = ref(['Catalog'])

const toggleSection = (name) => {
  const index = expandedSections.value.indexOf(name)
  if (index > -1) {
    expandedSections.value.splice(index, 1)
  } else {
    expandedSections.value.push(name)
  }
}

const isActive = (item) => {
  if (item.to) {
    return route.path === item.to
  }
  if (item.children) {
    return item.children.some(child => route.path === child.to)
  }
  return false
}

const isChildActive = (to) => {
  return route.path === to
}
</script>

<template>
  <aside
    class="fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-20 transition-transform"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <!-- Logo -->
    <div class="flex items-center justify-between h-16 px-4 border-b border-gray-20">
      <router-link to="/dashboard" class="flex items-center gap-2">
        <span class="material-icons text-2xl text-primary">admin_panel_settings</span>
        <span class="text-xl font-bold text-gray-80">Quoder</span>
      </router-link>
      <button class="lg:hidden p-1" @click="$emit('toggle')">
        <span class="material-icons text-gray-60">close</span>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
      <template v-for="item in menuItems" :key="item.name">
        <!-- Single item -->
        <router-link
          v-if="!item.children"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm"
          :class="isActive(item) 
            ? 'bg-primary/10 text-primary font-medium' 
            : 'text-gray-70 hover:bg-gray-2'"
        >
          <span class="material-icons text-lg">{{ item.icon }}</span>
          <span>{{ item.name }}</span>
        </router-link>

        <!-- Section with children -->
        <div v-else>
          <button
            class="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm text-gray-70 hover:bg-gray-2"
            @click="toggleSection(item.name)"
          >
            <div class="flex items-center gap-3">
              <span class="material-icons text-lg">{{ item.icon }}</span>
              <span>{{ item.name }}</span>
            </div>
            <span
              class="material-icons text-sm transition-transform"
              :class="{ 'rotate-90': expandedSections.includes(item.name) }"
            >
              chevron_right
            </span>
          </button>

          <div
            v-show="expandedSections.includes(item.name)"
            class="ml-9 mt-1 space-y-1"
          >
            <router-link
              v-for="child in item.children"
              :key="child.name"
              :to="child.to"
              class="block px-3 py-2 rounded-lg transition-colors text-sm"
              :class="isChildActive(child.to)
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-gray-60 hover:bg-gray-2'"
            >
              {{ child.name }}
            </router-link>
          </div>
        </div>
      </template>
    </nav>
  </aside>
</template>
