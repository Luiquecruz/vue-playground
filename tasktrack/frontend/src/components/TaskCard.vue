<script setup lang="ts">
'use strict';

import type {Task} from '../stores/taskStore';

const props = defineProps<{ task: Task }>();
const emit = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'toggle', id: string): void
}>();

function handleDelete() {
  emit('delete', props.task.id);
}

function handleToggle() {
  emit('toggle', props.task.id);
}
</script>

<template>
  <div class="border p-4 rounded shadow hover:shadow-lg transition flex justify-between items-center bg-white">
    <div>
      <h2 :class="{ 'line-through text-gray-400': task.completed }" class="font-semibold text-lg">
        {{ task.title }}
      </h2>
      <p class="text-gray-500 text-sm">{{ task.description }}</p>
    </div>
    <div class="flex space-x-2">
      <button @click="handleToggle" class="text-green-600 hover:underline text-sm">Toggle</button>
      <button @click="handleDelete" class="text-red-600 hover:underline text-sm">Delete</button>
    </div>
  </div>
</template>
