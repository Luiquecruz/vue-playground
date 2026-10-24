<script setup lang="ts">
import { BACKLOG_COMPLEXITY_LABELS } from '~/data/backlog'
import type { BacklogComplexity, BacklogProgress } from '~/types/backlog'

defineProps<{
  progress: BacklogProgress
  complexityCounts: Record<BacklogComplexity, number>
}>()

const complexities = Object.keys(BACKLOG_COMPLEXITY_LABELS) as BacklogComplexity[]
</script>

<template>
  <section class="backlog-summary" aria-label="Backlog progress">
    <div class="backlog-summary__progress">
      <div class="backlog-summary__label">
        <strong>{{ progress.done }} / {{ progress.total }} done</strong>
        <span>{{ progress.percentage }}%</span>
      </div>
      <progress :value="progress.done" :max="progress.total" aria-label="Completed tasks" />
    </div>
    <ul class="backlog-summary__counts">
      <li v-for="complexity in complexities" :key="complexity">
        <BaseBadge :tone="complexityTone(complexity)">
          {{ BACKLOG_COMPLEXITY_LABELS[complexity] }} · {{ complexityCounts[complexity] }}
        </BaseBadge>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.backlog-summary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  padding: 1rem 1.25rem;
}

.backlog-summary__progress {
  display: grid;
  flex: 1;
  gap: 0.4rem;
  min-width: 14rem;
}

.backlog-summary__label {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.backlog-summary__label span {
  color: var(--color-muted);
}

.backlog-summary progress {
  width: 100%;
  height: 0.5rem;
  appearance: none;
  border: 0;
  border-radius: 999px;
  background: var(--color-background);
  overflow: hidden;
}

.backlog-summary progress::-webkit-progress-bar {
  background: var(--color-background);
}

.backlog-summary progress::-webkit-progress-value {
  background: var(--color-accent);
}

.backlog-summary progress::-moz-progress-bar {
  background: var(--color-accent);
}

.backlog-summary__counts {
  display: flex;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
