import { mockNuxtImport, mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import IndexPage from '~/pages/index.vue'
import type { GeocodingResult } from '~/types/weather'
import { lisbon, porto, portoSearchResult, weatherReportFor } from '../../fixtures'

const { searchMock } = vi.hoisted(() => ({ searchMock: vi.fn<(name: string) => Promise<GeocodingResult[]>>() }))

mockNuxtImport('useGeocodingService', () => () => ({ search: searchMock }))

describe('index page', () => {
  it('loads the watchlist, adds a searched city and shows its weather', async () => {
    registerEndpoint('/api/cities', { method: 'GET', handler: () => [lisbon] })
    registerEndpoint('/api/cities', { method: 'POST', handler: () => porto })
    registerEndpoint('/api/cities/2/weather', () => weatherReportFor(porto, { cached: true }))
    searchMock.mockResolvedValue([portoSearchResult])

    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.findAll('.city-card').map((card) => card.find('strong').text())).toEqual(['Lisbon'])
    expect(wrapper.text()).toContain('Select a city to see its current weather.')

    await wrapper.find('input[type="search"]').setValue('Porto')
    await vi.waitFor(() => expect(wrapper.find('[data-testid="search-results"]').exists()).toBe(true))
    expect(searchMock).toHaveBeenCalledWith('Porto')

    await wrapper.find('.city-search__result').trigger('click')

    await vi.waitFor(() => expect(wrapper.find('.weather-panel h2').exists()).toBe(true))
    expect(wrapper.findAll('.city-card').map((card) => card.find('strong').text())).toEqual(['Lisbon', 'Porto'])
    expect(wrapper.find('.city-card--selected').text()).toContain('Porto')
    expect(wrapper.find('.weather-panel h2').text()).toBe('Porto')
    expect(wrapper.find('[data-testid="cache-badge"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="search-results"]').exists()).toBe(false)
    expect((wrapper.find('input[type="search"]').element as HTMLInputElement).value).toBe('')
  })
})
