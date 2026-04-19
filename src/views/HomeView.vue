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
      
      <!-- Material Icons Test Section -->
      <div class="bg-white rounded-lg shadow p-6 mt-6">
        <h2 class="text-xl font-semibold text-black mb-4">Material Icons</h2>
        
        <!-- Basic Icons -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-70 mb-3">Basic Icons</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <span class="material-icons text-3xl text-primary">home</span>
            <span class="material-icons text-3xl text-accent-one">favorite</span>
            <span class="material-icons text-3xl text-accent-two">star</span>
            <span class="material-icons text-3xl text-success-medium">check_circle</span>
            <span class="material-icons text-3xl text-warn-medium">warning</span>
            <span class="material-icons text-3xl text-dangerous-medium">error</span>
            <span class="material-icons text-3xl text-black">settings</span>
            <span class="material-icons text-3xl">search</span>
          </div>
        </div>
        
        <!-- Icon Buttons -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-70 mb-3">Icon Buttons</h3>
          <div class="flex flex-wrap gap-3">
            <button class="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90">
              <span class="material-icons">add</span>
              Add New
            </button>
            <button class="flex items-center gap-2 bg-success-medium text-white px-4 py-2 rounded-lg hover:opacity-90">
              <span class="material-icons">check</span>
              Approve
            </button>
            <button class="flex items-center gap-2 bg-dangerous-medium text-white px-4 py-2 rounded-lg hover:opacity-90">
              <span class="material-icons">delete</span>
              Delete
            </button>
            <button class="flex items-center gap-2 bg-gray-60 text-white px-4 py-2 rounded-lg hover:opacity-90">
              <span class="material-icons">edit</span>
              Edit
            </button>
          </div>
        </div>
        
        <!-- Icon Sizes -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-70 mb-3">Icon Sizes</h3>
          <div class="flex flex-wrap gap-4 items-end">
            <span class="material-icons text-sm">home</span>
            <span class="material-icons text-base">home</span>
            <span class="material-icons text-lg">home</span>
            <span class="material-icons text-xl">home</span>
            <span class="material-icons text-2xl">home</span>
            <span class="material-icons text-3xl">home</span>
            <span class="material-icons text-4xl">home</span>
            <span class="material-icons text-5xl">home</span>
          </div>
        </div>
        
        <!-- Navigation Icons -->
        <div>
          <h3 class="text-lg font-medium text-gray-70 mb-3">Navigation Icons</h3>
          <div class="flex flex-wrap gap-4 items-center text-gray-60">
            <span class="material-icons text-2xl hover:text-primary cursor-pointer">chevron_left</span>
            <span class="material-icons text-2xl hover:text-primary cursor-pointer">chevron_right</span>
            <span class="material-icons text-2xl hover:text-primary cursor-pointer">expand_more</span>
            <span class="material-icons text-2xl hover:text-primary cursor-pointer">expand_less</span>
            <span class="material-icons text-2xl hover:text-primary cursor-pointer">menu</span>
            <span class="material-icons text-2xl hover:text-primary cursor-pointer">close</span>
            <span class="material-icons text-2xl hover:text-primary cursor-pointer">more_vert</span>
            <span class="material-icons text-2xl hover:text-primary cursor-pointer">refresh</span>
          </div>
        </div>
      </div>
    </div>
    <TheWelcome />
  </main>
</template>
