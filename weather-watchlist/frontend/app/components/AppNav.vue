<script setup lang="ts">
const links = [
  { to: '/', label: 'Weather' },
  { to: '/tasks', label: 'Backlog' },
]
</script>

<template>
  <nav class="app-nav" aria-label="Main">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="app-nav__link"
      exact-active-class="app-nav__link--active"
    >
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
.app-nav {
  display: flex;
  gap: 0.25rem;
  max-width: 64rem;
  margin: 0 auto;
  padding: 1.25rem 1rem 0;
}

.app-nav__link {
  border-radius: var(--radius-small);
  padding: 0.4rem 0.8rem;
  color: var(--color-muted);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
}

.app-nav__link:hover {
  color: var(--color-text);
}

.app-nav__link--active {
  background: var(--color-accent-soft);
  color: var(--color-accent-strong);
}
</style>
