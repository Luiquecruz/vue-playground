import type { City, NewCity } from '~/types/weather'
import type { HttpClient } from './httpClient'

/**
 * Backend API client for the city watchlist.
 */
export function createCitiesService(http: HttpClient) {
  return {
    list: () => http<City[]>('/cities'),
    create: (city: NewCity) => http<City>('/cities', { method: 'POST', body: city }),
    remove: (id: number) => http<void>(`/cities/${id}`, { method: 'DELETE' }),
  }
}

export type CitiesService = ReturnType<typeof createCitiesService>
