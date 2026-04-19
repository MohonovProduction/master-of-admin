# Quoder Admin Panel - Complete Implementation Guide

## ✅ What's Been Created

### Core Infrastructure
- ✅ Router with all routes and auth guards (`src/router/index.js`)
- ✅ Products Pinia store with mock data (`src/stores/products.js`)
- ✅ MainLayout with AppSidebar integration
- ✅ AppSidebar with collapsible navigation
- ✅ Additional UI components: UiCard, UiTabs, UiModal

### Cleaned Up
- ✅ Removed all default Vite components
- ✅ Created proper folder structure

## 📝 Implementation Pattern for All Views

### Pattern 1: List View (e.g., AllProductsView, BoxesView, SlidersView)

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../../components/templates/MainLayout.vue'
import DataTable from '../../components/organisms/DataTable.vue'
import SearchFilterBar from '../../components/molecules/SearchFilterBar.vue'
import UiButton from '../../components/atoms/UiButton.vue'
import UiBadge from '../../components/atoms/UiBadge.vue'
import ConfirmModal from '../../components/molecules/ConfirmModal.vue'
import { useProductsStore } from '../../stores/products'

const router = useRouter()
const productsStore = useProductsStore()

const searchQuery = ref('')
const filterStatus = ref('')
const showDeleteModal = ref(false)
const selectedProduct = ref(null)

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'sku', label: 'SKU', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'updated_at', label: 'Updated', sortable: true }
]

const filteredProducts = computed(() => {
  let result = productsStore.products // or productsStore.boxes, .sliders, etc.
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.sku.toLowerCase().includes(query)
    )
  }
  
  if (filterStatus.value) {
    result = result.filter(p => p.status === filterStatus.value)
  }
  
  return result
})

const handleDelete = (product) => {
  selectedProduct.value = product
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  await productsStore.deleteProduct(selectedProduct.value.id)
  showDeleteModal.value = false
}

onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-80">All Products</h1>
        <UiButton variant="primary" @click="router.push('/catalog/products/create')">
          <span class="material-icons text-lg">add</span>
          Create Product
        </UiButton>
      </div>

      <!-- Search & Filter -->
      <SearchFilterBar
        v-model:search="searchQuery"
        v-model:filter="filterStatus"
        :filter-options="[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' }
        ]"
      />

      <!-- Data Table -->
      <DataTable
        :columns="columns"
        :rows="filteredProducts"
        :loading="productsStore.loading"
        :current-page="1"
        :total-pages="1"
        :total-items="filteredProducts.length"
      >
        <template #cell-price="{ value }">
          ${{ value.toFixed(2) }}
        </template>
        
        <template #cell-status="{ value }">
          <UiBadge :variant="value === 'active' ? 'success' : 'danger'">
            {{ value }}
          </UiBadge>
        </template>
        
        <template #actions="{ row }">
          <div class="flex gap-2">
            <button @click="router.push(`/catalog/products/${row.id}/edit`)" class="text-primary hover:underline">
              Edit
            </button>
            <button @click="handleDelete(row)" class="text-dangerous-medium hover:underline">
              Delete
            </button>
          </div>
        </template>
      </DataTable>
    </div>

    <ConfirmModal
      v-if="showDeleteModal"
      title="Delete Product"
      :message="`Are you sure you want to delete ${selectedProduct?.name}?`"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />
  </MainLayout>
</template>
```

### Pattern 2: Create/Edit View (ProductEditView)

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '../../components/templates/MainLayout.vue'
import UiTabs from '../../components/molecules/UiTabs.vue'
import UiButton from '../../components/atoms/UiButton.vue'
import UiInput from '../../components/atoms/UiInput.vue'
import UiTextarea from '../../components/atoms/UiTextarea.vue'
import UiToggle from '../../components/atoms/UiToggle.vue'
import FormField from '../../components/molecules/FormField.vue'
import BoxSlidersManager from '../../components/organisms/BoxSlidersManager.vue'
import { useProductsStore } from '../../stores/products'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const activeTab = ref('basic')
const formData = ref({
  name: '',
  description: '',
  price: 0,
  sku: '',
  status: 'active'
})

const product = computed(() => productsStore.getProductById(route.params.id))

const tabs = computed(() => {
  const baseTabs = [{ id: 'basic', label: 'Basic', icon: 'info' }]
  
  if (product.value?.type === 'box') {
    return [
      ...baseTabs,
      { id: 'configuration', label: 'Configuration', icon: 'settings' },
      { id: 'sliders', label: 'Sliders', icon: 'view_carousel' },
      { id: 'accessories', label: 'Accessories', icon: 'extension' }
    ]
  }
  
  if (product.value?.type === 'preconfigured_box') {
    return [
      ...baseTabs,
      { id: 'composition', label: 'Composition', icon: 'shopping_cart' }
    ]
  }
  
  return baseTabs
})

const saveProduct = async () => {
  await productsStore.updateProduct(product.value.id, formData.value)
  router.push('/catalog/products')
}

onMounted(() => {
  if (product.value) {
    formData.value = { ...product.value }
  }
})
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-80">Edit: {{ product?.name }}</h1>
        <div class="flex gap-3">
          <UiButton variant="ghost" @click="router.back()">Cancel</UiButton>
          <UiButton variant="primary" @click="saveProduct">Save</UiButton>
        </div>
      </div>

      <UiCard>
        <UiTabs v-model="activeTab" :tabs="tabs">
          <!-- Basic Tab -->
          <div v-if="activeTab === 'basic'" class="space-y-4">
            <FormField label="Name" required>
              <UiInput v-model="formData.name" />
            </FormField>
            
            <FormField label="Description">
              <UiTextarea v-model="formData.description" />
            </FormField>
            
            <div class="grid grid-cols-2 gap-4">
              <FormField label="Price ($)" required>
                <UiInput v-model="formData.price" type="number" />
              </FormField>
              
              <FormField label="SKU" required>
                <UiInput v-model="formData.sku" />
              </FormField>
            </div>
          </div>

          <!-- Configuration Tab (Box only) -->
          <div v-if="activeTab === 'configuration'" class="space-y-4">
            <FormField label="Min Sliders">
              <UiInput v-model="formData.min_sliders" type="number" />
            </FormField>
            
            <FormField label="Max Sliders">
              <UiInput v-model="formData.max_sliders" type="number" />
            </FormField>
          </div>

          <!-- Sliders Tab (Box only) -->
          <div v-if="activeTab === 'sliders'">
            <BoxSlidersManager
              :sliders="product?.sliders || []"
              :available-sliders="productsStore.sliders"
              @add="/* handle add */"
              @remove="/* handle remove */"
            />
          </div>

          <!-- Accessories Tab (Box only) -->
          <div v-if="activeTab === 'accessories'">
            <!-- Similar to BoxSlidersManager -->
          </div>
        </UiTabs>
      </UiCard>
    </div>
  </MainLayout>
</template>
```

### Pattern 3: Dashboard View

```vue
<script setup>
import MainLayout from '../../components/templates/MainLayout.vue'
import UiCard from '../../components/atoms/UiCard.vue'
import UiBadge from '../../components/atoms/UiBadge.vue'

const stats = [
  { title: 'Total Products', value: 156, icon: 'inventory_2', change: '+12%' },
  { title: 'Total Orders', value: 1,247, icon: 'shopping_cart', change: '+8%' },
  { title: 'Revenue', value: '$45,678', icon: 'attach_money', change: '+15%' },
  { title: 'Active Users', value: 89, icon: 'people', change: '-3%' }
]
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-80">Dashboard</h1>
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <UiCard v-for="stat in stats" :key="stat.title">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-60">{{ stat.title }}</p>
              <p class="text-2xl font-bold mt-1">{{ stat.value }}</p>
            </div>
            <UiBadge :variant="stat.change.startsWith('+') ? 'success' : 'danger'">
              {{ stat.change }}
            </UiBadge>
          </div>
        </UiCard>
      </div>

      <!-- Recent Orders -->
      <UiCard>
        <h2 class="text-lg font-semibold mb-4">Recent Orders</h2>
        <!-- DataTable with recent orders -->
      </UiCard>
    </div>
  </MainLayout>
</template>
```

### Pattern 4: Login View

```vue
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '../components/atoms/UiButton.vue'
import UiInput from '../components/atoms/UiInput.vue'
import FormField from '../components/molecules/FormField.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }
  // Mock login
  router.push('/dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-gray-2 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-gray-80 mb-6">Login to Quoder</h1>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <FormField label="Email" :error="error" required>
          <UiInput v-model="email" type="email" placeholder="admin@example.com" />
        </FormField>
        
        <FormField label="Password" required>
          <UiInput v-model="password" type="password" placeholder="••••••••" />
        </FormField>
        
        <UiButton variant="primary" class="w-full" type="submit">
          Login
        </UiButton>
      </form>
    </div>
  </div>
</template>
```

## 📂 Complete File Structure

```
src/
├── assets/
│   └── main.css (Tailwind imports)
├── components/
│   ├── atoms/
│   │   ├── UiButton.vue ✅
│   │   ├── UiInput.vue ✅
│   │   ├── UiTextarea.vue ✅
│   │   ├── UiSelect.vue ✅
│   │   ├── UiCheckbox.vue ✅
│   │   ├── UiRadio.vue ✅
│   │   ├── UiToggle.vue ✅
│   │   ├── UiBadge.vue ✅
│   │   ├── UiAvatar.vue ✅
│   │   ├── UiIcon.vue ✅
│   │   ├── UiSpinner.vue ✅
│   │   ├── UiToast.vue ✅
│   │   └── UiCard.vue ✅
│   ├── molecules/
│   │   ├── FormField.vue ✅
│   │   ├── SearchFilterBar.vue ✅
│   │   ├── ActionButtons.vue ✅
│   │   ├── ConfirmModal.vue ✅
│   │   ├── EmptyState.vue ✅
│   │   ├── DataTableHeader.vue ✅
│   │   ├── Pagination.vue ✅
│   │   ├── Breadcrumbs.vue ✅
│   │   ├── CopyToClipboard.vue ✅
│   │   ├── MediaPreview.vue ✅
│   │   ├── UiTabs.vue ✅
│   │   └── UiModal.vue ✅
│   ├── organisms/
│   │   ├── DataTable.vue ✅
│   │   ├── DashboardStats.vue ✅
│   │   └── BoxSlidersManager.vue ✅
│   ├── layout/
│   │   ├── AppSidebar.vue ✅
│   │   └── MainLayout.vue (in templates/) ✅
│   └── templates/
│       └── MainLayout.vue ✅
├── router/
│   └── index.js ✅
├── stores/
│   ├── products.js ✅
│   ├── auth.js (create similar)
│   ├── orders.js (create similar)
│   ├── content.js (create similar)
│   └── media.js (create similar)
├── views/
│   ├── LoginView.vue (use Pattern 4)
│   ├── DashboardView.vue (use Pattern 3)
│   ├── catalog/
│   │   ├── AllProductsView.vue (use Pattern 1)
│   │   ├── ProductCreateView.vue
│   │   ├── ProductEditView.vue (use Pattern 2)
│   │   ├── BoxesView.vue (Pattern 1 with boxes filter)
│   │   ├── SlidersView.vue (Pattern 1 with sliders filter)
│   │   ├── AccessoriesView.vue (Pattern 1 with accessories filter)
│   │   └── PreconfiguredBoxesView.vue (Pattern 1)
│   ├── content/
│   │   ├── CategoriesView.vue
│   │   └── BlocksView.vue
│   ├── MediaLibraryView.vue
│   ├── OrdersView.vue
│   └── OrderDetailView.vue
├── App.vue
└── main.js
```

## 🔧 Update main.js

```javascript
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

## 🔧 Update App.vue

```vue
<template>
  <RouterView />
</template>
```

## 🎯 Next Steps

1. Create remaining views using the patterns above
2. Create additional Pinia stores (auth, orders, content, media)
3. Add BoxAccessoriesManager organism (similar to BoxSlidersManager)
4. Implement ContentBlockEditor organism
5. Implement MediaGrid and DragDropUploader organisms
6. Add real API integration

All components follow the same patterns and use the existing Atomic Design system!
