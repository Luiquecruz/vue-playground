<script setup lang="ts">
import { BACKLOG_AREA_LABELS, BACKLOG_COMPLEXITY_LABELS, BACKLOG_LAYER_LABELS } from '~/data/backlog'
import type { BacklogTask } from '~/types/backlog'

defineProps<{ task: BacklogTask; done: boolean }>()

const emit = defineEmits<{ toggle: [taskId: string] }>()
</script>

<template>
  <article :class="['backlog-task', { 'backlog-task--done': done }]" :data-task-id="task.id">
    <header class="backlog-task__header">
      <div class="backlog-task__heading">
        <code>{{ task.id }}</code>
        <h3>{{ task.title }}</h3>
      </div>
      <label class="backlog-task__toggle">
        <input type="checkbox" :checked="done" @change="emit('toggle', task.id)" />
        Done
      </label>
    </header>
    <div class="backlog-task__badges">
      <BaseBadge tone="accent">{{ BACKLOG_AREA_LABELS[task.area] }}</BaseBadge>
      <BaseBadge :tone="complexityTone(task.complexity)" data-testid="complexity">
        {{ BACKLOG_COMPLEXITY_LABELS[task.complexity] }} complexity
      </BaseBadge>
    </div>
    <p class="backlog-task__description"><BaseInlineCode :text="task.description" /></p>
    <ul class="backlog-task__layers" aria-label="Touched layers">
      <li v-for="layer in task.layers" :key="layer">
        <BaseBadge>{{ BACKLOG_LAYER_LABELS[layer] }}</BaseBadge>
      </li>
    </ul>
    <details class="backlog-task__criteria">
      <summary>Acceptance criteria ({{ task.acceptanceCriteria.length }})</summary>
      <ul>
        <li v-for="criterion in task.acceptanceCriteria" :key="criterion"><BaseInlineCode :text="criterion" /></li>
      </ul>
    </details>
  </article>
</template>

<style scoped>
.backlog-task {
  display: grid;
  align-content: start;
  gap: 0.75rem;
  height: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  padding: 1.1rem 1.25rem;
  transition: opacity 0.15s ease;
}

.backlog-task--done {
  opacity: 0.6;
}

.backlog-task--done h3 {
  text-decoration: line-through;
}

.backlog-task__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.backlog-task__heading code {
  font-size: 0.75rem;
  color: var(--color-muted);
}

.backlog-task__heading h3 {
  margin: 0.1rem 0 0;
  font-size: 1rem;
}

.backlog-task__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: var(--color-muted);
  cursor: pointer;
  white-space: nowrap;
}

.backlog-task__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.backlog-task__description {
  margin: 0;
  font-size: 0.9rem;
}

.backlog-task__layers {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.backlog-task__criteria {
  font-size: 0.85rem;
}

.backlog-task__criteria summary {
  cursor: pointer;
  color: var(--color-accent-strong);
  font-weight: 600;
}

.backlog-task__criteria ul {
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
  color: var(--color-muted);
}
</style>
