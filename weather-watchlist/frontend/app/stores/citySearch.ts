import type { GeocodingResult } from '~/types/weather'

export const MINIMUM_SEARCH_LENGTH = 2

export const useCitySearchStore = defineStore('citySearch', () => {
  const service = useGeocodingService()

  const term = ref('')
  const results = ref<GeocodingResult[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  let latestRequestId = 0

  async function search(value: string): Promise<void> {
    term.value = value
    const normalized = value.trim()
    const requestId = ++latestRequestId

    if (normalized.length < MINIMUM_SEARCH_LENGTH) {
      results.value = []
      loading.value = false
      return
    }

    loading.value = true
    error.value = null
    try {
      const found = await service.search(normalized)
      if (requestId === latestRequestId) {
        results.value = found
      }
    } catch (caught) {
      if (requestId === latestRequestId) {
        error.value = toErrorMessage(caught)
      }
    } finally {
      if (requestId === latestRequestId) {
        loading.value = false
      }
    }
  }

  function clear(): void {
    latestRequestId++
    term.value = ''
    results.value = []
    loading.value = false
    error.value = null
  }

  return { term, results, loading, error, search, clear }
})
