import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import BacklogTaskCard from '~/components/backlog/BacklogTaskCard.vue'
import type { BacklogTask } from '~/types/backlog'

const task: BacklogTask = {
  id: 'BE-99',
  title: 'Sample task',
  area: 'backend',
  complexity: 'high',
  layers: ['api', 'cache'],
  description: 'A sample description using `remember` long enough to describe the task.',
  acceptanceCriteria: ['First criterion', 'Second criterion'],
}

describe('BacklogTaskCard', () => {
  it('renders the task details', async () => {
    const wrapper = await mountSuspended(BacklogTaskCard, { props: { task, done: false } })

    expect(wrapper.find('h3').text()).toBe('Sample task')
    expect(wrapper.text()).toContain('Backend')
    expect(wrapper.find('[data-testid="complexity"]').text()).toBe('High complexity')
    expect(wrapper.find('[aria-label="Touched layers"]').text()).toContain('Fastify API')
    expect(wrapper.find('[aria-label="Touched layers"]').text()).toContain('Redis')
    expect(wrapper.find('.backlog-task__description code').text()).toBe('remember')
    expect(wrapper.findAll('details li').map((item) => item.text())).toEqual(['First criterion', 'Second criterion'])
  })

  it('emits toggle and reflects the done state', async () => {
    const wrapper = await mountSuspended(BacklogTaskCard, { props: { task, done: true } })

    await wrapper.find('input[type="checkbox"]').trigger('change')

    expect(wrapper.emitted('toggle')).toEqual([['BE-99']])
    expect(wrapper.classes()).toContain('backlog-task--done')
  })
})
