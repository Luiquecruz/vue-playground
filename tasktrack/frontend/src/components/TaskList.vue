<script setup lang="ts">
import TaskCard from './TaskCard.vue';
import type {Task} from '../stores/taskStore';

const props = defineProps<{ tasks: Task[] }>();
const emit = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'toggle', id: string): void
}>();
</script>

<template>
  <div class="space-y-2">
    <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete="emit('delete', $event)"
        @toggle="emit('toggle', $event)"
    />
  </div>
</template>
