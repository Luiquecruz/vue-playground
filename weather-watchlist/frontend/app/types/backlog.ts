export type BacklogArea = 'frontend' | 'backend' | 'database' | 'cache' | 'infrastructure' | 'testing' | 'fullstack'

export type BacklogComplexity = 'low' | 'medium' | 'high'

export type BacklogLayer = 'ui' | 'state' | 'bff' | 'api' | 'database' | 'cache' | 'docker' | 'ci' | 'tests'

export type BacklogStatusFilter = 'all' | 'open' | 'done'

export interface BacklogTask {
  id: string
  title: string
  area: BacklogArea
  complexity: BacklogComplexity
  layers: BacklogLayer[]
  description: string
  acceptanceCriteria: string[]
}

export interface BacklogProgress {
  done: number
  total: number
  percentage: number
}
