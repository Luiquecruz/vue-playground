import type { WeatherReport } from '~/types/weather'
import type { HttpClient } from './httpClient'

/**
 * Backend API client for cached weather reports.
 */
export function createWeatherService(http: HttpClient) {
  return {
    forCity: (cityId: number) => http<WeatherReport>(`/cities/${cityId}/weather`),
  }
}

export type WeatherService = ReturnType<typeof createWeatherService>
