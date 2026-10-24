import { BACKLOG_TASKS } from '~/data/backlog'
import type {
  BacklogArea,
  BacklogComplexity,
  BacklogProgress,
  BacklogStatusFilter,
  BacklogTask,
} from '~/types/backlog'

export const DONE_TASKS_COOKIE = 'backlog-done'

export const useBacklogStore = defineStore('backlog', () => {
  const tasks = shallowRef<readonly BacklogTask[]>(BACKLOG_TASKS)
  const area = ref<BacklogArea | 'all'>('all')
  const complexity = ref<BacklogComplexity | 'all'>('all')
  const status = ref<BacklogStatusFilter>('all')
  const query = ref('')
  const doneTaskIds = useCookie<string[]>(DONE_TASKS_COOKIE, {
    default: () => [],
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  const doneTaskIdSet = computed(() => new Set(doneTaskIds.value))

  const filteredTasks = computed(() => {
    const term = query.value.trim().toLowerCase()

    return tasks.value.filter((task) => {
      const done = doneTaskIdSet.value.has(task.id)
      return (
        (area.value === 'all' || task.area === area.value) &&
        (complexity.value === 'all' || task.complexity === complexity.value) &&
        (status.value === 'all' || (status.value === 'done') === done) &&
        (term === '' || `${task.id} ${task.title} ${task.description}`.toLowerCase().includes(term))
      )
    })
  })

  const progress = computed<BacklogProgress>(() => {
    const total = tasks.value.length
    const done = tasks.value.filter((task) => doneTaskIdSet.value.has(task.id)).length
    return { done, total, percentage: Math.round((done / total) * 100) }
  })

  const complexityCounts = computed<Record<BacklogComplexity, number>>(() =>
    filteredTasks.value.reduce(
      (counts, task) => ({ ...counts, [task.complexity]: counts[task.complexity] + 1 }),
      { low: 0, medium: 0, high: 0 },
    ),
  )

  const hasActiveFilters = computed(
    () => area.value !== 'all' || complexity.value !== 'all' || status.value !== 'all' || query.value !== '',
  )

  function isDone(taskId: string): boolean {
    return doneTaskIdSet.value.has(taskId)
  }

  function toggleDone(taskId: string): void {
    doneTaskIds.value = isDone(taskId)
      ? doneTaskIds.value.filter((doneTaskId) => doneTaskId !== taskId)
      : [...doneTaskIds.value, taskId]
  }

  function resetFilters(): void {
    area.value = 'all'
    complexity.value = 'all'
    status.value = 'all'
    query.value = ''
  }

  return {
    tasks,
    area,
    complexity,
    status,
    query,
    doneTaskIds,
    filteredTasks,
    progress,
    complexityCounts,
    hasActiveFilters,
    isDone,
    toggleDone,
    resetFilters,
  }
})
