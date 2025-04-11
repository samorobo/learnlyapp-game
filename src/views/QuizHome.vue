<template>
    <div class="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 class="text-3xl font-bold mb-6">Mini Quiz Application</h1>
      <nav class="flex flex-col gap-4">
        <!-- If you use Vue Router -->
        <router-link to="/tap-to-reveal" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Tap-to-Reveal Quiz</router-link>
        <router-link to="/swipe-quiz" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Swipe Quiz</router-link>
        <!-- If not using Vue Router, you could manage component visibility manually -->
      </nav>
    </div>
  </template>
  
  <script setup lang="ts">
  // Using setup script with TypeScript
  </script>
  