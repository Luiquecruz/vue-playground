<script setup lang="ts">
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';
import {useTaskStore} from '../stores/taskStore';
import {onMounted} from 'vue';
import axios from 'axios';

const store = useTaskStore();

async function fetchTasks() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
  store.setTasks(response.data);
}

async function addTask(data: { title: string; description: string }) {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, {...data, completed: false});
  store.addTask(response.data);
}

async function deleteTask(id: string) {
  await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
  store.removeTask(id);
}

async function toggleTask(id: string) {
  const task = store.tasks.find(t => t.id === id);
  if (!task) return;
  const updated = {...task, completed: !task.completed};
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, updated);
  store.updateTask(response.data);
}

onMounted(fetchTasks);
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-gray-700">Tasks</h1>
    <TaskForm @submit="addTask"/>
    <TaskList :tasks="store.tasks" @delete="deleteTask" @toggle="toggleTask"/>
  </div>
</template>
