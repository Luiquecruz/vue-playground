<script setup lang="ts">
import { BACKLOG_AREA_LABELS, BACKLOG_COMPLEXITY_LABELS } from '~/data/backlog'
import type { BacklogArea, BacklogComplexity, BacklogStatusFilter } from '~/types/backlog'

defineProps<{ canReset: boolean }>()

const emit = defineEmits<{ reset: [] }>()

const area = defineModel<BacklogArea | 'all'>('area', { required: true })
const complexity = defineModel<BacklogComplexity | 'all'>('complexity', { required: true })
const status = defineModel<BacklogStatusFilter>('status', { required: true })
const query = defineModel<string>('query', { required: true })

const statusLabels: Record<BacklogStatusFilter, string> = { all: 'All', open: 'Open', done: 'Done' }
</script>

<template>
  <form class="backlog-filters" role="search" @submit.prevent>
    <label class="backlog-filters__field backlog-filters__field--wide">
      <span>Search</span>
      <input v-model="query" type="search" placeholder="Title, id or description" />
    </label>
    <label class="backlog-filters__field">
      <span>Area</span>
      <select v-model="area" name="area">
        <option value="all">All areas</option>
        <option v-for="(label, value) in BACKLOG_AREA_LABELS" :key="value" :value="value">{{ label }}</option>
      </select>
    </label>
    <label class="backlog-filters__field">
      <span>Complexity</span>
      <select v-model="complexity" name="complexity">
        <option value="all">Any complexity</option>
        <option v-for="(label, value) in BACKLOG_COMPLEXITY_LABELS" :key="value" :value="value">{{ label }}</option>
      </select>
    </label>
    <label class="backlog-filters__field">
      <span>Status</span>
      <select v-model="status" name="status">
        <option v-for="(label, value) in statusLabels" :key="value" :value="value">{{ label }}</option>
      </select>
    </label>
    <BaseButton variant="ghost" :disabled="!canReset" @click="emit('reset')">Reset</BaseButton>
  </form>
</template>

<style scoped>
.backlog-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.75rem;
}

.backlog-filters__field {
  display: grid;
  gap: 0.3rem;
  min-width: 9rem;
}

.backlog-filters__field--wide {
  flex: 1;
  min-width: 14rem;
}

.backlog-filters__field span {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-muted);
}

.backlog-filters input,
.backlog-filters select {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-small);
  background: var(--color-surface);
  padding: 0.5rem 0.65rem;
  font: inherit;
  font-size: 0.875rem;
  color: inherit;
}

.backlog-filters input:focus,
.backlog-filters select:focus {
  border-color: var(--color-accent);
  outline: none;
}
</style>
