<script setup lang="ts">
defineProps<{ title: string; subtitle: string }>()
</script>

<template>
  <header class="app-header">
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
  </header>
</template>

<style scoped>
.app-header {
  margin-bottom: 2rem;
}

.app-header h1 {
  margin: 0;
  font-size: 1.75rem;
}

.app-header p {
  margin: 0.25rem 0 0;
  color: var(--color-muted);
}
</style>
