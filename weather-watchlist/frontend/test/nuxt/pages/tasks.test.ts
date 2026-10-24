import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import TasksPage from '~/pages/tasks.vue'
import { BACKLOG_TASKS } from '~/data/backlog'

describe('tasks page', () => {
  it('renders the backlog and filters it', async () => {
    const wrapper = await mountSuspended(TasksPage)

    expect(wrapper.findAll('.backlog-task')).toHaveLength(BACKLOG_TASKS.length)
    expect(wrapper.find('.tasks__count').text()).toBe(`${BACKLOG_TASKS.length} tasks`)

    await wrapper.find('select[name="area"]').setValue('infrastructure')
    const infrastructureIds = BACKLOG_TASKS.filter((task) => task.area === 'infrastructure').map((task) => task.id)
    expect(wrapper.findAll('.backlog-task').map((card) => card.attributes('data-task-id'))).toEqual(infrastructureIds)

    await wrapper.find('input[type="search"]').setValue('no task has this text')
    expect(wrapper.find('[role="status"]').text()).toBe('No task matches the current filters.')

    await wrapper.find('form button').trigger('click')
    expect(wrapper.findAll('.backlog-task')).toHaveLength(BACKLOG_TASKS.length)
  })

  it('marks a task as done and updates the progress', async () => {
    const wrapper = await mountSuspended(TasksPage)

    await wrapper.find('[data-task-id="FE-01"] input[type="checkbox"]').trigger('change')

    expect(wrapper.find('[data-task-id="FE-01"]').classes()).toContain('backlog-task--done')
    expect(wrapper.find('.backlog-summary').text()).toContain(`1 / ${BACKLOG_TASKS.length} done`)
  })
})
