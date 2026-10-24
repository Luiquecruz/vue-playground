<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost' | 'danger'
    type?: 'button' | 'submit'
    disabled?: boolean
    loading?: boolean
  }>(),
  { variant: 'primary', type: 'button', disabled: false, loading: false },
)
</script>

<template>
  <button :type="type" :class="['base-button', `base-button--${variant}`]" :disabled="disabled || loading">
    <BaseSpinner v-if="loading" size="small" />
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid transparent;
  border-radius: var(--radius-small);
  padding: 0.45rem 0.85rem;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.base-button--primary {
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.base-button--primary:hover:not(:disabled) {
  background: var(--color-accent-strong);
}

.base-button--ghost {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-text);
}

.base-button--ghost:hover:not(:disabled) {
  border-color: var(--color-accent);
}

.base-button--danger {
  background: transparent;
  color: var(--color-danger);
}

.base-button--danger:hover:not(:disabled) {
  background: var(--color-danger-soft);
}
</style>
