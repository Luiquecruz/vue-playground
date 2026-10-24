import {defineStore} from 'pinia';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[]
  }),
  actions: {
    setTasks(newTasks: Task[]) {
      this.tasks = newTasks;
    },
    addTask(task: Task) {
      this.tasks.push(task);
    },
    updateTask(updatedTask: Task) {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);

      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    },
    removeTask(taskId: string) {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
    }
  }
});