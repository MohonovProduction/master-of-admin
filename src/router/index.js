import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Dashboard' }] }
  },
  // Catalog
  {
    path: '/catalog/products',
    name: 'AllProducts',
    component: () => import('../views/catalog/AllProductsView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Catalog', to: '/catalog/products' }, { label: 'All Products' }] }
  },
  {
    path: '/catalog/products/create',
    name: 'ProductCreate',
    component: () => import('../views/catalog/ProductCreateView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Catalog', to: '/catalog/products' }, { label: 'Create Product' }] }
  },
  {
    path: '/catalog/products/:id/edit',
    name: 'ProductEdit',
    component: () => import('../views/catalog/ProductEditView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Catalog', to: '/catalog/products' }, { label: 'Edit Product' }] }
  },
  {
    path: '/catalog/boxes',
    name: 'Boxes',
    component: () => import('../views/catalog/BoxesView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Catalog', to: '/catalog/products' }, { label: 'Boxes' }] }
  },
  {
    path: '/catalog/sliders',
    name: 'Sliders',
    component: () => import('../views/catalog/SlidersView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Catalog', to: '/catalog/products' }, { label: 'Sliders' }] }
  },
  {
    path: '/catalog/accessories',
    name: 'Accessories',
    component: () => import('../views/catalog/AccessoriesView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Catalog', to: '/catalog/products' }, { label: 'Accessories' }] }
  },
  {
    path: '/catalog/preconfigured-boxes',
    name: 'PreconfiguredBoxes',
    component: () => import('../views/catalog/PreconfiguredBoxesView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Catalog', to: '/catalog/products' }, { label: 'Preconfigured Boxes' }] }
  },
  // Content
  {
    path: '/content/categories',
    name: 'ContentCategories',
    component: () => import('../views/content/CategoriesView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Content', to: '/content/categories' }, { label: 'Categories' }] }
  },
  {
    path: '/content/blocks',
    name: 'ContentBlocks',
    component: () => import('../views/content/BlocksView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Content', to: '/content/categories' }, { label: 'Blocks' }] }
  },
  // Media
  {
    path: '/media',
    name: 'MediaLibrary',
    component: () => import('../views/MediaLibraryView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Media Library' }] }
  },
  // Orders
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/OrdersView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Orders' }] }
  },
  {
    path: '/orders/:id',
    name: 'OrderDetail',
    component: () => import('../views/OrderDetailView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Orders', to: '/orders' }, { label: 'Order Details' }] }
  },
  // Reports
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('../views/ReportsView.vue'),
    meta: { requiresAuth: true, breadcrumbs: [{ label: 'Reports' }] }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Route guards
router.beforeEach((to, from, next) => {
  // Mock auth check - always return true for now
  const isAuthenticated = true
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
