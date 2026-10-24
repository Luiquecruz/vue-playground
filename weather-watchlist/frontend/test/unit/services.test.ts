import { describe, expect, it, vi } from 'vitest'
import { createCitiesService } from '../../app/services/citiesService'
import { createGeocodingService } from '../../app/services/geocodingService'
import type { HttpClient } from '../../app/services/httpClient'
import { createWeatherService } from '../../app/services/weatherService'
import { lisbon } from '../fixtures'

function createHttpMock(response: unknown) {
  const http = vi.fn().mockResolvedValue(response)
  return { http, client: http as unknown as HttpClient }
}

describe('citiesService', () => {
  it('lists cities from the backend', async () => {
    const { http, client } = createHttpMock([lisbon])

    await expect(createCitiesService(client).list()).resolves.toEqual([lisbon])
    expect(http).toHaveBeenCalledWith('/cities')
  })

  it('posts a new city', async () => {
    const { http, client } = createHttpMock(lisbon)
    const { id: _id, createdAt: _createdAt, ...payload } = lisbon

    await createCitiesService(client).create(payload)

    expect(http).toHaveBeenCalledWith('/cities', { method: 'POST', body: payload })
  })

  it('deletes a city by id', async () => {
    const { http, client } = createHttpMock(undefined)

    await createCitiesService(client).remove(7)

    expect(http).toHaveBeenCalledWith('/cities/7', { method: 'DELETE' })
  })
})

describe('weatherService', () => {
  it('requests the weather report of a city', async () => {
    const { http, client } = createHttpMock({})

    await createWeatherService(client).forCity(3)

    expect(http).toHaveBeenCalledWith('/cities/3/weather')
  })
})

describe('geocodingService', () => {
  it('maps Open-Meteo results into geocoding results', async () => {
    const { http, client } = createHttpMock({
      results: [
        { id: 1, name: 'Porto', country: 'Portugal', admin1: 'Porto', latitude: 41.1, longitude: -8.6 },
        { id: 2, name: 'Porto Island', latitude: 33.1, longitude: -16.3 },
      ],
    })

    const results = await createGeocodingService(client).search('Porto', 2)

    expect(http).toHaveBeenCalledWith('/search', {
      query: { name: 'Porto', count: 2, language: 'en', format: 'json' },
    })
    expect(results).toEqual([
      { id: 1, name: 'Porto', country: 'Portugal', region: 'Porto', latitude: 41.1, longitude: -8.6 },
      { id: 2, name: 'Porto Island', country: 'Unknown', region: undefined, latitude: 33.1, longitude: -16.3 },
    ])
  })

  it('returns an empty list when Open-Meteo finds nothing', async () => {
    const { client } = createHttpMock({ generationtime_ms: 0.4 })

    await expect(createGeocodingService(client).search('Nowhere')).resolves.toEqual([])
  })
})
