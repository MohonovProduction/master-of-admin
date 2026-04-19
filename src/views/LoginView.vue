<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '../components/atoms/UiButton.vue'
import UiInput from '../components/atoms/UiInput.vue'
import FormField from '../components/molecules/FormField.vue'

const router = useRouter()
const email = ref('admin@example.com')
const password = ref('password')
const error = ref('')

const handleLogin = () => {
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }
  // Mock login - always succeeds
  router.push('/dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-gray-2 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      <div class="text-center mb-6">
        <span class="material-icons text-5xl text-primary">admin_panel_settings</span>
        <h1 class="text-2xl font-bold text-gray-80 mt-4">Login to Quoder</h1>
        <p class="text-sm text-gray-60 mt-2">Admin Panel Access</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <FormField label="Email" :error="error" required>
          <UiInput v-model="email" type="email" placeholder="admin@example.com" />
        </FormField>
        
        <FormField label="Password" required>
          <UiInput v-model="password" type="password" placeholder="••••••••" />
        </FormField>
        
        <UiButton variant="primary" class="w-full" type="submit" :loading="false">
          Login
        </UiButton>
      </form>
      
      <p class="text-xs text-center text-gray-50 mt-6">
        Demo: Use any email and password
      </p>
    </div>
  </div>
</template>
