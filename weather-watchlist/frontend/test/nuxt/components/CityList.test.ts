import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import CityList from '~/components/city/CityList.vue'
import { lisbon, porto } from '../../fixtures'

describe('CityList', () => {
  it('renders one card per city and marks the selected one', async () => {
    const wrapper = await mountSuspended(CityList, { props: { cities: [lisbon, porto], selectedCityId: porto.id } })

    expect(wrapper.findAll('.city-card')).toHaveLength(2)
    expect(wrapper.find('.city-card--selected').text()).toContain('Porto')
  })

  it('renders the empty slot when there are no cities', async () => {
    const wrapper = await mountSuspended(CityList, {
      props: { cities: [], selectedCityId: null },
      slots: { empty: () => 'Nothing here' },
    })

    expect(wrapper.text()).toContain('Nothing here')
  })
})
