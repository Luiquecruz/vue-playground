import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCitySearchStore } from '~/stores/citySearch'
import type { GeocodingResult } from '~/types/weather'
import { portoSearchResult } from '../../fixtures'

const { searchMock } = vi.hoisted(() => ({ searchMock: vi.fn<(name: string) => Promise<GeocodingResult[]>>() }))

mockNuxtImport('useGeocodingService', () => () => ({ search: searchMock }))

describe('citySearch store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    searchMock.mockReset()
  })

  it('searches the geocoding API with the trimmed term', async () => {
    searchMock.mockResolvedValue([portoSearchResult])
    const store = useCitySearchStore()

    await store.search('  Porto ')

    expect(searchMock).toHaveBeenCalledWith('Porto')
    expect(store.results).toEqual([portoSearchResult])
  })

  it('skips the request for short terms', async () => {
    const store = useCitySearchStore()

    await store.search('P')

    expect(searchMock).not.toHaveBeenCalled()
    expect(store.results).toEqual([])
  })

  it('ignores responses from outdated searches', async () => {
    let resolveFirst: (results: GeocodingResult[]) => void = () => {}
    searchMock
      .mockImplementationOnce(() => new Promise((resolve) => (resolveFirst = resolve)))
      .mockResolvedValueOnce([portoSearchResult])
    const store = useCitySearchStore()

    const first = store.search('Lis')
    await store.search('Porto')
    resolveFirst([{ ...portoSearchResult, id: 1, name: 'Lisbon' }])
    await first

    expect(store.results).toEqual([portoSearchResult])
    expect(store.loading).toBe(false)
  })

  it('stores the error message when the API fails', async () => {
    searchMock.mockRejectedValue(new Error('Geocoding unavailable'))
    const store = useCitySearchStore()

    await store.search('Porto')

    expect(store.error).toBe('Geocoding unavailable')
  })
})
