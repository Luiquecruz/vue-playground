<script setup lang="ts">
import type { GeocodingResult } from '~/types/weather'

const props = withDefaults(
  defineProps<{
    results: GeocodingResult[]
    loading?: boolean
    debounceMs?: number
  }>(),
  { loading: false, debounceMs: 300 },
)

const emit = defineEmits<{
  search: [term: string]
  select: [result: GeocodingResult]
}>()

const term = defineModel<string>({ default: '' })
const inputId = useId()

watch(term, (value) => {
  const timer = setTimeout(() => emit('search', value), props.debounceMs)
  onWatcherCleanup(() => clearTimeout(timer))
})

function describeLocation(result: GeocodingResult): string {
  return [result.region, result.country].filter(Boolean).join(', ')
}
</script>

<template>
  <section class="city-search">
    <label :for="inputId" class="city-search__label">Add a city</label>
    <div class="city-search__field">
      <input
        :id="inputId"
        v-model="term"
        type="search"
        placeholder="Search by name, e.g. Lisbon"
        autocomplete="off"
        class="city-search__input"
      />
      <BaseSpinner v-if="loading" size="small" label="Searching" />
    </div>
    <ul v-if="results.length" class="city-search__results" data-testid="search-results">
      <li v-for="result in results" :key="result.id">
        <button type="button" class="city-search__result" @click="emit('select', result)">
          <strong>{{ result.name }}</strong>
          <span>{{ describeLocation(result) }}</span>
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.city-search {
  position: relative;
  display: grid;
  gap: 0.4rem;
}

.city-search__label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-muted);
}

.city-search__field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-small);
  background: var(--color-surface);
  padding: 0 0.75rem;
}

.city-search__field:focus-within {
  border-color: var(--color-accent);
}

.city-search__input {
  flex: 1;
  border: 0;
  background: transparent;
  padding: 0.6rem 0;
  font: inherit;
  color: inherit;
  outline: none;
}

.city-search__results {
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-small);
  background: var(--color-surface);
  box-shadow: var(--shadow);
}

.city-search__result {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  border: 0;
  border-radius: var(--radius-small);
  background: transparent;
  padding: 0.5rem 0.6rem;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.city-search__result:hover {
  background: var(--color-accent-soft);
}

.city-search__result span {
  font-size: 0.8rem;
  color: var(--color-muted);
}
</style>
