<template>
  <div class="flex flex-col py-8 lg:w-3/4 lg:mx-auto xl:w-1/3">
    <TaskInput
      v-model="task"
      label="Create task"
      @keypress.enter="addTask"
    />

    <button
      class="button"
      @click="addTask"
    >
      Add task
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { createTask } from "../adapters/taskAdapter";

export default defineComponent({
  name: "TaskForm",
  components: {
    TaskInput: defineAsyncComponent(() => import('./TaskInput'))
  },
  setup() {
    const task = ref<string>('')

    const addTask = async () => {
      await createTask({
        value: task.value,
      })

      task.value = '';
    }

    return {
      task,
      addTask
    }
  }
});
</script>
