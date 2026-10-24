import type { City, NewCity } from '~/types/weather'

export const useCitiesStore = defineStore('cities', () => {
  const service = useCitiesService()

  const cities = ref<City[]>([])
  const selectedCityId = ref<number | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const selectedCity = computed(() => cities.value.find((city) => city.id === selectedCityId.value) ?? null)
  const hasCities = computed(() => cities.value.length > 0)

  async function fetchCities(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      cities.value = await service.list()
    } catch (caught) {
      error.value = toErrorMessage(caught)
    } finally {
      loading.value = false
    }
  }

  async function addCity(city: NewCity): Promise<City | null> {
    error.value = null
    try {
      const created = await service.create(city)
      cities.value = [...cities.value, created].sort((first, second) => first.name.localeCompare(second.name))
      selectedCityId.value = created.id
      return created
    } catch (caught) {
      error.value = toErrorMessage(caught)
      return null
    }
  }

  async function removeCity(id: number): Promise<void> {
    error.value = null
    try {
      await service.remove(id)
      cities.value = cities.value.filter((city) => city.id !== id)
      if (selectedCityId.value === id) {
        selectedCityId.value = null
      }
    } catch (caught) {
      error.value = toErrorMessage(caught)
    }
  }

  function selectCity(id: number | null): void {
    selectedCityId.value = id
  }

  return {
    cities,
    selectedCityId,
    loading,
    error,
    selectedCity,
    hasCities,
    fetchCities,
    addCity,
    removeCity,
    selectCity,
  }
})
