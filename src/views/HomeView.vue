<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main class="min-h-screen bg-gray-2 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-6">Tailwind CSS Setup Complete!</h1>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-primary text-white p-4 rounded-lg text-center">Primary</div>
        <div class="bg-accent-one text-white p-4 rounded-lg text-center">Accent One</div>
        <div class="bg-accent-two text-white p-4 rounded-lg text-center">Accent Two</div>
        <div class="bg-success-medium text-white p-4 rounded-lg text-center">Success</div>
        <div class="bg-warn-medium p-4 rounded-lg text-center">Warn</div>
        <div class="bg-dangerous-medium text-white p-4 rounded-lg text-center">Dangerous</div>
        <div class="bg-secondary-dark text-white p-4 rounded-lg text-center">Secondary Dark</div>
        <div class="bg-secondary-light p-4 rounded-lg text-center">Secondary Light</div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-black mb-4">Gray Scale</h2>
        <div class="grid grid-cols-5 gap-2">
          <div class="bg-gray-80 text-white p-3 rounded text-center text-sm">80</div>
          <div class="bg-gray-70 text-white p-3 rounded text-center text-sm">70</div>
          <div class="bg-gray-60 text-white p-3 rounded text-center text-sm">60</div>
          <div class="bg-gray-50 text-white p-3 rounded text-center text-sm">50</div>
          <div class="bg-gray-40 p-3 rounded text-center text-sm">40</div>
          <div class="bg-gray-30 p-3 rounded text-center text-sm">30</div>
          <div class="bg-gray-20 p-3 rounded text-center text-sm">20</div>
          <div class="bg-gray-10 p-3 rounded text-center text-sm">10</div>
          <div class="bg-gray-2 p-3 rounded text-center text-sm">2</div>
        </div>
      </div>
    </div>
    <TheWelcome />
  </main>
</template>
