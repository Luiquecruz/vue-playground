import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { setResponseStatus } from 'h3'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useCitiesStore } from '~/stores/cities'
import { lisbon, porto } from '../../fixtures'

describe('cities store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('loads the watchlist from the backend', async () => {
    registerEndpoint('/api/cities', { method: 'GET', handler: () => [lisbon] })
    const store = useCitiesStore()

    await store.fetchCities()

    expect(store.cities).toEqual([lisbon])
    expect(store.hasCities).toBe(true)
    expect(store.loading).toBe(false)
  })

  it('adds a city in alphabetical order and selects it', async () => {
    registerEndpoint('/api/cities', { method: 'POST', handler: () => porto })
    const store = useCitiesStore()
    store.cities = [{ ...lisbon, name: 'Zagreb' }]

    await store.addCity({ name: porto.name, country: porto.country, latitude: porto.latitude, longitude: porto.longitude })

    expect(store.cities.map((city) => city.name)).toEqual(['Porto', 'Zagreb'])
    expect(store.selectedCity).toEqual(porto)
  })

  it('exposes the backend message when adding fails', async () => {
    registerEndpoint('/api/cities', {
      method: 'POST',
      handler: (event) => {
        setResponseStatus(event, 409)
        return { message: 'Porto is already on the watchlist' }
      },
    })
    const store = useCitiesStore()

    const created = await store.addCity({ name: 'Porto', country: 'Portugal', latitude: 41.1, longitude: -8.6 })

    expect(created).toBeNull()
    expect(store.error).toBe('Porto is already on the watchlist')
  })

  it('removes a city and clears the selection', async () => {
    registerEndpoint('/api/cities/1', { method: 'DELETE', handler: () => null })
    const store = useCitiesStore()
    store.cities = [lisbon, porto]
    store.selectCity(lisbon.id)

    await store.removeCity(lisbon.id)

    expect(store.cities).toEqual([porto])
    expect(store.selectedCityId).toBeNull()
  })
})
