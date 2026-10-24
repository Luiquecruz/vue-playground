<script setup lang="ts">
defineProps<{ label: string; value: string }>()
</script>

<template>
  <div class="weather-metric">
    <dt>{{ label }}</dt>
    <dd>{{ value }}</dd>
  </div>
</template>

<style scoped>
.weather-metric {
  border-radius: var(--radius-small);
  background: var(--color-background);
  padding: 0.6rem 0.75rem;
}

.weather-metric dt {
  font-size: 0.75rem;
  color: var(--color-muted);
}

.weather-metric dd {
  margin: 0.15rem 0 0;
  font-weight: 600;
}
</style>
