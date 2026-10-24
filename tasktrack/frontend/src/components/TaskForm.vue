<script setup lang="ts">
import {ref} from 'vue';

const emit = defineEmits<{ e: 'submit', payload: { title: string, description: string } }>();

const title = ref('');
const description = ref('');

function handleSubmit() {
  if (!title.value.trim()) return;
  emit('submit', {title: title.value, description: description.value});
  title.value = '';
  description.value = '';
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mb-6 space-y-3 bg-white p-4 rounded shadow">
    <input
        v-model="title"
        type="text"
        placeholder="Task title"
        class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
    />
    <textarea
        v-model="description"
        placeholder="Task description"
        class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
    />
    <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Add Task
    </button>
  </form>
</template>
