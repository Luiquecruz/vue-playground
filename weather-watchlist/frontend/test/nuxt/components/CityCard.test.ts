import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import CityCard from '~/components/city/CityCard.vue'
import { lisbon } from '../../fixtures'

describe('CityCard', () => {
  it('renders the city name, country and coordinates', async () => {
    const wrapper = await mountSuspended(CityCard, { props: { city: lisbon, selected: false } })

    expect(wrapper.text()).toContain('Lisbon')
    expect(wrapper.text()).toContain('Portugal · 38.72, -9.13')
  })

  it('emits select and remove with the city id', async () => {
    const wrapper = await mountSuspended(CityCard, { props: { city: lisbon, selected: true } })

    await wrapper.find('.city-card__body').trigger('click')
    await wrapper.find('[aria-label="Remove Lisbon"]').trigger('click')

    expect(wrapper.emitted('select')).toEqual([[lisbon.id]])
    expect(wrapper.emitted('remove')).toEqual([[lisbon.id]])
    expect(wrapper.classes()).toContain('city-card--selected')
  })
})
