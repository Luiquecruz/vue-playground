<template>
  <section class="flex flex-col py-8 lg:w-3/4 lg:mx-auto xl:w-1/3">
    <div v-for="task in taskList" :key="task.id">
      {{ task.value }}
      {{ task.isCompleted || '' }}
      {{ task.createdAt || '' }}
      {{ task.completedAt || '' }}
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { allTasks } from "../adapters/taskAdapter";
import { Task } from "../model/serviceTaskRepository"

export default defineComponent({
name: "TaskList",
  setup() {
    const taskList = ref<Task[]>([]);

    const getAllTasks = async () => {
      taskList.value = await allTasks()
    }

    onBeforeMount(async () => {
      await getAllTasks()
    })

    return {
      getAllTasks,
      taskList
    }
  }
})
</script>

<style>

</style>
