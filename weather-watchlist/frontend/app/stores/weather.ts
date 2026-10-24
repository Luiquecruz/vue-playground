import type { WeatherReport } from '~/types/weather'

export const useWeatherStore = defineStore('weather', () => {
  const service = useWeatherService()

  const reports = ref<Record<number, WeatherReport>>({})
  const loadingCityId = ref<number | null>(null)
  const error = ref<string | null>(null)

  const reportFor = computed(() => (cityId: number) => reports.value[cityId] ?? null)

  async function fetchWeather(cityId: number): Promise<void> {
    loadingCityId.value = cityId
    error.value = null
    try {
      reports.value = { ...reports.value, [cityId]: await service.forCity(cityId) }
    } catch (caught) {
      error.value = toErrorMessage(caught)
    } finally {
      loadingCityId.value = null
    }
  }

  function forget(cityId: number): void {
    const { [cityId]: _removed, ...remaining } = reports.value
    reports.value = remaining
  }

  return { reports, loadingCityId, error, reportFor, fetchWeather, forget }
})
