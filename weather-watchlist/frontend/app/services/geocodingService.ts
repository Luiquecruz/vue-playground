import type { GeocodingResult } from '~/types/weather'
import type { HttpClient } from './httpClient'

interface GeocodingApiResult {
  id: number
  name: string
  country?: string
  admin1?: string
  latitude: number
  longitude: number
}

interface GeocodingApiResponse {
  results?: GeocodingApiResult[]
}

/**
 * Open-Meteo geocoding API client used to search cities by name.
 */
export function createGeocodingService(http: HttpClient) {
  return {
    async search(name: string, count = 5): Promise<GeocodingResult[]> {
      const response = await http<GeocodingApiResponse>('/search', {
        query: { name, count, language: 'en', format: 'json' },
      })

      return (response.results ?? []).map((result) => ({
        id: result.id,
        name: result.name,
        country: result.country ?? 'Unknown',
        region: result.admin1,
        latitude: result.latitude,
        longitude: result.longitude,
      }))
    },
  }
}

export type GeocodingService = ReturnType<typeof createGeocodingService>
