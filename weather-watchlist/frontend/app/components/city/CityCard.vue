<script setup lang="ts">
import type { City } from '~/types/weather'

defineProps<{ city: City; selected: boolean }>()

const emit = defineEmits<{
  select: [id: number]
  remove: [id: number]
}>()
</script>

<template>
  <article :class="['city-card', { 'city-card--selected': selected }]" :aria-current="selected">
    <button type="button" class="city-card__body" @click="emit('select', city.id)">
      <strong>{{ city.name }}</strong>
      <span>{{ city.country }} · {{ city.latitude.toFixed(2) }}, {{ city.longitude.toFixed(2) }}</span>
    </button>
    <BaseButton variant="danger" :aria-label="`Remove ${city.name}`" @click="emit('remove', city.id)">✕</BaseButton>
  </article>
</template>

<style scoped>
.city-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  padding: 0.35rem 0.35rem 0.35rem 0;
  transition: border-color 0.15s ease;
}

.city-card--selected {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 1px var(--color-accent);
}

.city-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.15rem;
  border: 0;
  background: transparent;
  padding: 0.4rem 0.8rem;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.city-card__body span {
  font-size: 0.8rem;
  color: var(--color-muted);
}
</style>
