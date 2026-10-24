import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CitySearch from '~/components/city/CitySearch.vue'
import { portoSearchResult } from '../../fixtures'

describe('CitySearch', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('emits a debounced search with the latest term', async () => {
    const wrapper = await mountSuspended(CitySearch, { props: { results: [] } })
    const input = wrapper.find('input[type="search"]')

    await input.setValue('Po')
    await input.setValue('Por')
    vi.advanceTimersByTime(300)

    expect(wrapper.emitted('search')).toEqual([['Por']])
  })

  it('lists results and emits the selected one', async () => {
    const wrapper = await mountSuspended(CitySearch, { props: { results: [portoSearchResult] } })

    expect(wrapper.find('[data-testid="search-results"]').text()).toContain('Porto, Portugal')

    await wrapper.find('.city-search__result').trigger('click')

    expect(wrapper.emitted('select')).toEqual([[portoSearchResult]])
  })
})
