import { describe, expect, it } from 'vitest'
import { BACKLOG_AREA_LABELS, BACKLOG_TASKS } from '../../app/data/backlog'

describe('backlog data', () => {
  it('uses unique task ids', () => {
    const ids = BACKLOG_TASKS.map((task) => task.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it('describes every task with layers and acceptance criteria', () => {
    for (const task of BACKLOG_TASKS) {
      expect(task.description.length, task.id).toBeGreaterThan(40)
      expect(task.layers.length, task.id).toBeGreaterThan(0)
      expect(task.acceptanceCriteria.length, task.id).toBeGreaterThan(0)
    }
  })

  it('covers every area and complexity', () => {
    const areas = new Set(BACKLOG_TASKS.map((task) => task.area))
    const complexities = new Set(BACKLOG_TASKS.map((task) => task.complexity))

    expect([...areas].sort()).toEqual(Object.keys(BACKLOG_AREA_LABELS).sort())
    expect([...complexities].sort()).toEqual(['high', 'low', 'medium'])
  })
})
