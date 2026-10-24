<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router';
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <header class="bg-blue-600 text-white p-4">
      <nav class="flex space-x-4">
        <RouterLink to="/" class="hover:underline">Home</RouterLink>
        <RouterLink to="/about" class="hover:underline">About</RouterLink>
      </nav>
    </header>

    <main class="flex-grow container mx-auto p-6">
      <RouterView/>
    </main>

    <footer class="bg-gray-200 text-center p-4">
      TaskTrack © 2025
    </footer>
  </div>
</template>
