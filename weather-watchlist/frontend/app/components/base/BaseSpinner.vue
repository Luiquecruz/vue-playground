<script setup lang="ts">
withDefaults(defineProps<{ size?: 'small' | 'medium'; label?: string }>(), { size: 'medium', label: 'Loading' })
</script>

<template>
  <span :class="['base-spinner', `base-spinner--${size}`]" role="status" :aria-label="label" />
</template>

<style scoped>
.base-spinner {
  display: inline-block;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.base-spinner--small {
  width: 0.85rem;
  height: 0.85rem;
}

.base-spinner--medium {
  width: 1.5rem;
  height: 1.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
