<script setup lang="ts">
import type { GeocodingResult } from '~/types/weather'

const citiesStore = useCitiesStore()
const weatherStore = useWeatherStore()
const searchStore = useCitySearchStore()

const { cities, selectedCityId, error: citiesError, loading: citiesLoading } = storeToRefs(citiesStore)
const { loadingCityId, error: weatherError } = storeToRefs(weatherStore)
const { results, loading: searching, error: searchError } = storeToRefs(searchStore)

const searchTerm = ref('')
const selectedReport = computed(() => (selectedCityId.value ? weatherStore.reportFor(selectedCityId.value) : null))

await callOnce('cities', () => citiesStore.fetchCities())

watch(selectedCityId, (cityId) => {
  if (cityId) {
    weatherStore.fetchWeather(cityId)
  }
})

async function addCity(result: GeocodingResult): Promise<void> {
  const created = await citiesStore.addCity({
    name: result.name,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude,
  })

  if (created) {
    searchTerm.value = ''
    searchStore.clear()
  }
}

async function removeCity(cityId: number): Promise<void> {
  await citiesStore.removeCity(cityId)
  weatherStore.forget(cityId)
}
</script>

<template>
  <main class="page">
    <AppHeader title="Weather Watchlist" subtitle="Save cities and check their current weather, cached by the API." />
    <div class="page__layout">
      <aside class="page__sidebar">
        <CitySearch
          v-model="searchTerm"
          :results="results"
          :loading="searching"
          @search="searchStore.search"
          @select="addCity"
        />
        <BaseAlert v-if="searchError">{{ searchError }}</BaseAlert>
        <BaseAlert v-if="citiesError">{{ citiesError }}</BaseAlert>
        <BaseSpinner v-if="citiesLoading" label="Loading cities" />
        <CityList
          v-else
          :cities="cities"
          :selected-city-id="selectedCityId"
          @select="citiesStore.selectCity"
          @remove="removeCity"
        >
          <template #empty>Your watchlist is empty. Search a city above to add it.</template>
        </CityList>
      </aside>
      <WeatherPanel
        :report="selectedReport"
        :loading="loadingCityId !== null && loadingCityId === selectedCityId"
        :error="weatherError"
        @refresh="weatherStore.fetchWeather"
      />
    </div>
  </main>
</template>

<style scoped>
.page__layout {
  display: grid;
  grid-template-columns: minmax(0, 20rem) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
}

.page__sidebar {
  display: grid;
  gap: 1rem;
}

@media (max-width: 720px) {
  .page__layout {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
