import type { City, GeocodingResult, WeatherReport } from '../app/types/weather'

export const lisbon: City = {
  id: 1,
  name: 'Lisbon',
  country: 'Portugal',
  latitude: 38.71667,
  longitude: -9.13333,
  createdAt: '2026-10-20T10:00:00.000Z',
}

export const porto: City = {
  id: 2,
  name: 'Porto',
  country: 'Portugal',
  latitude: 41.14961,
  longitude: -8.61099,
  createdAt: '2026-10-20T11:00:00.000Z',
}

export const portoSearchResult: GeocodingResult = {
  id: 2735943,
  name: 'Porto',
  country: 'Portugal',
  region: 'Porto',
  latitude: porto.latitude,
  longitude: porto.longitude,
}

export function weatherReportFor(city: City, overrides: Partial<WeatherReport> = {}): WeatherReport {
  return {
    city,
    weather: {
      temperature: 21.4,
      apparentTemperature: 20.2,
      humidity: 65,
      windSpeed: 12.4,
      weatherCode: 2,
      isDay: true,
      observedAt: '2026-10-20T12:00',
      timezone: 'Europe/Lisbon',
    },
    cached: false,
    ...overrides,
  }
}
