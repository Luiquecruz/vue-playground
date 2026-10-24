<script setup lang="ts">
useSeoMeta({
  title: 'Backlog · Weather Watchlist',
  description: 'Tasks to evolve the Weather Watchlist across every layer of the stack.',
})

const backlogStore = useBacklogStore()
const { area, complexity, status, query, filteredTasks, progress, complexityCounts, hasActiveFilters } =
  storeToRefs(backlogStore)
</script>

<template>
  <main class="page">
    <AppHeader
      title="Backlog"
      subtitle="Tasks to evolve this application across every layer. Pick one, implement it and mark it as done."
    />
    <div class="tasks">
      <BacklogSummary :progress="progress" :complexity-counts="complexityCounts" />
      <BacklogFilters
        v-model:area="area"
        v-model:complexity="complexity"
        v-model:status="status"
        v-model:query="query"
        :can-reset="hasActiveFilters"
        @reset="backlogStore.resetFilters"
      />
      <p class="tasks__count" aria-live="polite">
        {{ filteredTasks.length }} {{ filteredTasks.length === 1 ? 'task' : 'tasks' }}
      </p>
      <ul v-if="filteredTasks.length" class="tasks__list">
        <li v-for="task in filteredTasks" :key="task.id">
          <BacklogTaskCard :task="task" :done="backlogStore.isDone(task.id)" @toggle="backlogStore.toggleDone" />
        </li>
      </ul>
      <BaseAlert v-else tone="info">No task matches the current filters.</BaseAlert>
    </div>
  </main>
</template>

<style scoped>
.tasks {
  display: grid;
  gap: 1.25rem;
}

.tasks__count {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-muted);
}

.tasks__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
