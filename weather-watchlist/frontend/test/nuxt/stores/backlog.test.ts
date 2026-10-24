import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { BACKLOG_TASKS } from '~/data/backlog'
import { useBacklogStore } from '~/stores/backlog'

describe('backlog store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useBacklogStore().doneTaskIds = []
  })

  it('lists every task without filters', () => {
    const store = useBacklogStore()

    expect(store.filteredTasks).toHaveLength(BACKLOG_TASKS.length)
    expect(store.hasActiveFilters).toBe(false)
  })

  it('combines area and complexity filters', () => {
    const store = useBacklogStore()
    store.area = 'cache'
    store.complexity = 'high'

    expect(store.filteredTasks.length).toBeGreaterThan(0)
    expect(store.filteredTasks.every((task) => task.area === 'cache' && task.complexity === 'high')).toBe(true)
    expect(store.complexityCounts).toEqual({ low: 0, medium: 0, high: store.filteredTasks.length })
  })

  it('searches by id, title and description ignoring case', () => {
    const store = useBacklogStore()

    store.query = 'fe-01'
    expect(store.filteredTasks.map((task) => task.id)).toEqual(['FE-01'])

    store.query = 'STAMPEDE'
    expect(store.filteredTasks.map((task) => task.id)).toEqual(['CA-03'])
  })

  it('tracks done tasks and filters by status', () => {
    const store = useBacklogStore()

    store.toggleDone('BE-02')
    store.status = 'done'

    expect(store.isDone('BE-02')).toBe(true)
    expect(store.filteredTasks.map((task) => task.id)).toEqual(['BE-02'])
    expect(store.progress).toEqual({
      done: 1,
      total: BACKLOG_TASKS.length,
      percentage: Math.round((1 / BACKLOG_TASKS.length) * 100),
    })

    store.status = 'open'
    expect(store.filteredTasks.some((task) => task.id === 'BE-02')).toBe(false)

    store.toggleDone('BE-02')
    expect(store.isDone('BE-02')).toBe(false)
  })

  it('resets every filter', () => {
    const store = useBacklogStore()
    store.area = 'database'
    store.complexity = 'low'
    store.status = 'done'
    store.query = 'cache'

    store.resetFilters()

    expect(store.hasActiveFilters).toBe(false)
    expect(store.filteredTasks).toHaveLength(BACKLOG_TASKS.length)
  })
})
