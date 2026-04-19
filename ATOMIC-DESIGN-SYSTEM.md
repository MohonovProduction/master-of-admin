# Atomic Design System - Quoder Admin Panel

Complete Vue 3 + Tailwind CSS v4 component library built with Atomic Design methodology.

## 📁 Project Structure

```
src/components/
├── atoms/          # Basic building blocks (12 components)
├── molecules/      # Groups of atoms (10 components)
├── organisms/      # Complex UI blocks (3 core components)
├── templates/      # Page layouts (1 layout)
└── pages/          # Full page views (2 examples)
```

## 🎨 Design Tokens

All tokens are configured in `src/assets/main.css` using Tailwind v4's `@theme` directive.

### Colors
- **Primary**: `#3A8FD8` - Main brand color
- **Secondary**: Dark `#274A73`, Light `#AFC6DA`
- **Accent**: One `#A27AD6`, Two `#FF6A21`
- **Success**: Light `#B9DFAE`, Medium `#3CB21F`, Dark `#1E8A0C`
- **Warning**: Light `#E6DDBB`, Medium `#F0C23C`, Dark `#D07A10`
- **Danger**: Light `#E7CACA`, Medium `#FF5757`, Dark `#E3322A`
- **Gray Scale**: 2 (lightest) to 80 (darkest)

### Typography
- **Font Family**: NTSomic (custom), with system fallbacks
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

## 🧩 Components

### ATOMS (12 components)

Basic HTML elements styled with Tailwind CSS.

| Component | Props | Description |
|-----------|-------|-------------|
| **UiButton** | `variant`, `size`, `disabled`, `loading` | Button with 5 variants (primary, secondary, outline, ghost, danger) and 3 sizes |
| **UiInput** | `modelValue`, `type`, `placeholder`, `error`, `disabled` | Input field with validation states |
| **UiTextarea** | `modelValue`, `placeholder`, `rows`, `error` | Multi-line text input |
| **UiSelect** | `modelValue`, `options`, `placeholder`, `error` | Dropdown select with options array |
| **UiCheckbox** | `modelValue`, `label`, `disabled` | Checkbox with optional label |
| **UiRadio** | `modelValue`, `label`, `name`, `disabled` | Radio button with group name |
| **UiToggle** | `modelValue`, `disabled` | On/off switch toggle |
| **UiBadge** | `variant`, `size` | Status badge with 12 variants |
| **UiAvatar** | `src`, `alt`, `size`, `name` | User avatar with initials fallback |
| **UiIcon** | `name`, `size` | Material Icons wrapper |
| **UiSpinner** | `size`, `color` | Loading spinner animation |
| **UiToast** | `message`, `type`, `duration` | Toast notification with auto-dismiss |

#### Example Usage - UiButton
```vue
<UiButton variant="primary" size="md" :loading="false" @click="handleClick">
  Click Me
</UiButton>
```

#### Example Usage - UiInput
```vue
<UiInput 
  v-model="email" 
  type="email" 
  placeholder="Enter email" 
  :error="emailError" 
/>
```

### MOLECULES (10 components)

Combinations of atoms working together.

| Component | Props | Emits | Description |
|-----------|-------|-------|-------------|
| **FormField** | `label`, `error`, `hint`, `required` | - | Label + input slot + error/hint messages |
| **SearchFilterBar** | `search`, `filter`, `filterOptions` | `search`, `filter` | Search input + type filter dropdown |
| **ActionButtons** | `isActive`, `disableDelete` | `edit`, `delete`, `toggle` | Edit/Delete/Toggle inline actions |
| **ConfirmModal** | `title`, `message`, `confirmText`, `variant` | `confirm`, `cancel` | Confirmation dialog with backdrop |
| **EmptyState** | `icon`, `title`, `description`, `actionLabel` | `action` | Empty data placeholder |
| **DataTableHeader** | `columns`, `sortBy`, `sortOrder` | `sort` | Sortable table header row |
| **Pagination** | `currentPage`, `totalPages`, `totalItems` | `page-change` | Page navigation with numbers |
| **Breadcrumbs** | `items` | - | Navigation breadcrumb trail |
| **CopyToClipboard** | `text` | - | Copy text with visual feedback |
| **MediaPreview** | `name`, `url`, `size`, `type` | `delete`, `copy-url` | Media file card with actions |

#### Example Usage - FormField
```vue
<FormField label="Email" :error="emailError" hint="We'll never share your email" required>
  <UiInput v-model="email" type="email" />
</FormField>
```

#### Example Usage - SearchFilterBar
```vue
<SearchFilterBar
  v-model:search="searchQuery"
  v-model:filter="filterType"
  :filter-options="filterOptions"
  @search="handleSearch"
/>
```

### ORGANISMS (3 core components implemented)

Complex UI sections combining molecules and atoms.

| Component | Props | Emits | Slots | Description |
|-----------|-------|-------|-------|-------------|
| **DataTable** | `columns`, `rows`, `loading`, pagination props | `sort`, `page-change` | `cell-{key}`, `actions` | Full-featured data table with sorting, pagination, and custom cells |
| **DashboardStats** | `stats` | - | - | Grid of KPI cards with icons and trends |
| **BoxSlidersManager** | `sliders`, `availableSliders` | `add`, `remove`, `update` | - | Manage sliders in a box with search + add modal |

#### Example Usage - DataTable
```vue
<DataTable
  :columns="columns"
  :rows="products"
  :loading="loading"
  :current-page="1"
  :total-pages="5"
  :total-items="50"
>
  <template #cell-status="{ value }">
    <UiBadge :variant="getStatusVariant(value)">{{ value }}</UiBadge>
  </template>
  
  <template #actions="{ row }">
    <ActionButtons 
      @edit="editProduct(row)" 
      @delete="deleteProduct(row)" 
    />
  </template>
</DataTable>
```

#### Example Usage - BoxSlidersManager
```vue
<BoxSlidersManager
  :sliders="box.sliders"
  :available-sliders="allSliders"
  @add="handleAddSlider"
  @remove="handleRemoveSlider"
/>
```

### TEMPLATES (1 layout implemented)

Page-level layouts defining structure.

| Component | Description |
|-----------|-------------|
| **MainLayout** | Admin dashboard layout with sidebar navigation, header, breadcrumbs, and main content area. Responsive with mobile sidebar toggle. |

#### MainLayout Features:
- Collapsible sidebar (mobile-friendly)
- Navigation with active state highlighting
- Header with notifications and user avatar
- Breadcrumbs integration
- Router-view slot for page content

### PAGES (2 complete examples)

Full page views using templates and organisms.

| Page | Description |
|------|-------------|
| **CatalogListPage** | Product catalog with search, filter, sortable table, delete confirmation, and toast notifications |
| **BoxConfiguratorPage** | Box configuration with tabs (Sliders/Accessories), price calculation, and inline management |

## 🚀 Key Features Implemented

### 1. **Box → Sliders Management**
- Search and filter available sliders
- Add slider with custom `priceInBox`
- Remove slider with confirmation modal
- Real-time price calculation

### 2. **Box → Accessories Management**
- Same pattern as sliders
- Inline add/remove functionality
- Price tracking

### 3. **Data Table System**
- Sortable columns with visual indicators
- Custom cell rendering via scoped slots
- Loading states with spinner
- Empty states with messaging
- Pagination with page numbers

### 4. **Form Validation**
- Error state styling on inputs
- Required field indicators
- Hint text support
- Disabled states

### 5. **Toast Notifications**
- Success, error, warning, info types
- Auto-dismiss with configurable duration
- Manual dismiss capability
- Teleported to body for z-index management

### 6. **Confirmation Modals**
- Danger, warning, info variants
- Backdrop click to cancel
- Customizable button text
- Smooth transitions

## 📝 Component Patterns

### Props Definition
All components use Vue 3's `<script setup>` with explicit prop types:

```javascript
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value)
  }
})
```

### Emits Definition
```javascript
const emit = defineEmits(['click', 'update:modelValue'])
```

### Slots Usage
```vue
<slot name="actions" :row="row" />
<slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]" />
```

## 🎯 Usage Examples

### Complete Form Example
```vue
<form @submit.prevent="handleSubmit" class="space-y-4">
  <FormField label="Name" :error="errors.name" required>
    <UiInput v-model="form.name" placeholder="Enter name" />
  </FormField>
  
  <FormField label="Email" :error="errors.email" required>
    <UiInput v-model="form.email" type="email" />
  </FormField>
  
  <FormField label="Status">
    <UiSelect 
      v-model="form.status" 
      :options="statusOptions" 
    />
  </FormField>
  
  <div class="flex items-center gap-2">
    <UiToggle v-model="form.isActive" />
    <span>Active</span>
  </div>
  
  <UiButton type="submit" variant="primary" :loading="submitting">
    Save
  </UiButton>
</form>
```

### Data Table with All Features
```vue
<DataTable
  :columns="columns"
  :rows="filteredData"
  :loading="loading"
  :sort-by="sortBy"
  :sort-order="sortOrder"
  :current-page="currentPage"
  :total-pages="totalPages"
  :total-items="totalItems"
  empty-message="No records found"
  @sort="handleSort"
  @page-change="handlePageChange"
>
  <!-- Custom cell rendering -->
  <template #cell-name="{ value, row }">
    <div class="flex items-center gap-2">
      <UiAvatar :name="value" size="sm" />
      <span>{{ value }}</span>
    </div>
  </template>
  
  <template #cell-status="{ value }">
    <UiBadge :variant="value === 'active' ? 'success' : 'danger'">
      {{ value }}
    </UiBadge>
  </template>
  
  <!-- Actions column -->
  <template #actions="{ row }">
    <ActionButtons
      :is-active="row.status === 'active'"
      @edit="editItem(row)"
      @delete="confirmDelete(row)"
      @toggle="toggleStatus(row)"
    />
  </template>
</DataTable>
```

## 🔧 Next Steps to Complete Full System

The following components from the original spec can be added using the same patterns:

### Additional Atoms (already complete)
✅ All 12 atoms implemented

### Additional Molecules (already complete)
✅ All 10 molecules implemented

### Additional Organisms (to implement)
- ProductForm (dynamic fields based on product type)
- BoxAccessoriesManager (similar to BoxSlidersManager)
- PreconfiguredBoxComposition (product list with quantity)
- ContentBlockEditor (dynamic editor per type)
- MediaGrid (grid of MediaPreview cards)
- DragDropUploader (drag & drop with progress)
- OrderCard (customer order display)
- QuickActionsBar (global search + recent items)

### Additional Templates
- LoginLayout (centered card form)
- ContentEditorLayout (split form + preview)

### Additional Pages
- LoginPage
- DashboardPage
- ProductEditPage
- PreconfiguredBoxCompositionPage
- ContentCategoriesPage
- ContentBlocksPage
- MediaLibraryPage
- OrdersListPage
- ReportsPage

## 🎨 Styling Guidelines

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Stack layouts on mobile, side-by-side on desktop

### Spacing
- Use Tailwind spacing scale: `1` (4px), `2` (8px), `4` (16px), `6` (24px), `8` (32px)
- Consistent padding: `p-4` for cards, `p-6` for sections

### Borders & Shadows
- Cards: `border border-gray-20 rounded-lg shadow-sm`
- Modals: `rounded-lg shadow-md`
- Inputs: `border border-gray-30 rounded-md`

### Transitions
- Hover states: `transition-colors hover:bg-gray-2`
- Focus rings: `focus:outline-none focus:ring-2 focus:ring-primary`

## 📦 Installation & Setup

Already configured in this project:
```bash
# Dependencies installed
npm install tailwindcss @tailwindcss/vite

# Run development server
npm run dev
```

## 🧪 Testing

Components are built to be testable with:
- **Vitest**: Unit test individual components
- **Playwright**: E2E test user flows
- Props validation ensures type safety
- Clear emit contracts for interaction testing

## 📚 Resources

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Material Icons](https://fonts.google.com/icons)

---

**Built with**: Vue 3.5+, Tailwind CSS 4.2+, Vite 8.0+  
**Design System**: Atomic Design by Brad Frost  
**Icons**: Material Design Icons (CDN)  
**Fonts**: NTSomic (custom)
