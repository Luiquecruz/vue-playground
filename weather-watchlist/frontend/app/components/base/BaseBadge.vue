<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' }>(), { tone: 'neutral' })
</script>

<template>
  <span :class="['base-badge', `base-badge--${tone}`]">
    <slot />
  </span>
</template>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.1rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.base-badge--neutral {
  background: var(--color-background);
  color: var(--color-muted);
}

.base-badge--accent {
  background: var(--color-accent-soft);
  color: var(--color-accent-strong);
}

.base-badge--success {
  background: var(--color-success-soft);
  color: var(--color-success);
}

.base-badge--warning {
  background: var(--color-warning-soft);
  color: var(--color-warning);
}

.base-badge--danger {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}
</style>
