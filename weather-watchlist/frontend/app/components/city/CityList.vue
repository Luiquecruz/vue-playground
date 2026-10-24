<script setup lang="ts">
import type { City } from '~/types/weather'

defineProps<{ cities: City[]; selectedCityId: number | null }>()

const emit = defineEmits<{
  select: [id: number]
  remove: [id: number]
}>()
</script>

<template>
  <ul v-if="cities.length" class="city-list">
    <li v-for="city in cities" :key="city.id">
      <CityCard
        :city="city"
        :selected="city.id === selectedCityId"
        @select="emit('select', $event)"
        @remove="emit('remove', $event)"
      />
    </li>
  </ul>
  <BaseAlert v-else tone="info">
    <slot name="empty">No cities yet.</slot>
  </BaseAlert>
</template>

<style scoped>
.city-list {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
