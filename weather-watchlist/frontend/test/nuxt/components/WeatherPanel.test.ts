import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import WeatherPanel from '~/components/weather/WeatherPanel.vue'
import { lisbon, weatherReportFor } from '../../fixtures'

describe('WeatherPanel', () => {
  it('renders the current weather of the report', async () => {
    const wrapper = await mountSuspended(WeatherPanel, {
      props: { report: weatherReportFor(lisbon), loading: false, error: null },
    })

    expect(wrapper.find('h2').text()).toBe('Lisbon')
    expect(wrapper.find('.weather-panel__temperature').text()).toContain('21°C')
    expect(wrapper.text()).toContain('Partly cloudy')
    expect(wrapper.text()).toContain('65%')
    expect(wrapper.find('[data-testid="cache-badge"]').exists()).toBe(false)
  })

  it('flags reports served from the API cache', async () => {
    const wrapper = await mountSuspended(WeatherPanel, {
      props: { report: weatherReportFor(lisbon, { cached: true }), loading: false, error: null },
    })

    expect(wrapper.find('[data-testid="cache-badge"]').exists()).toBe(true)
  })

  it('emits refresh with the city id', async () => {
    const wrapper = await mountSuspended(WeatherPanel, {
      props: { report: weatherReportFor(lisbon), loading: false, error: null },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('refresh')).toEqual([[lisbon.id]])
  })

  it('renders the error and the empty state', async () => {
    const failed = await mountSuspended(WeatherPanel, { props: { report: null, loading: false, error: 'Upstream down' } })
    const empty = await mountSuspended(WeatherPanel, { props: { report: null, loading: false, error: null } })

    expect(failed.find('[role="alert"]').text()).toBe('Upstream down')
    expect(empty.text()).toContain('Select a city to see its current weather.')
  })
})
