<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'error' | 'info' }>(), { tone: 'error' })
</script>

<template>
  <p :class="['base-alert', `base-alert--${tone}`]" :role="tone === 'error' ? 'alert' : 'status'">
    <slot />
  </p>
</template>

<style scoped>
.base-alert {
  margin: 0;
  border-radius: var(--radius-small);
  padding: 0.6rem 0.8rem;
  font-size: 0.875rem;
}

.base-alert--error {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}

.base-alert--info {
  background: var(--color-accent-soft);
  color: var(--color-accent-strong);
}
</style>
