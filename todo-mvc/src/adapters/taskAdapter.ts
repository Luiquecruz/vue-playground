import { indexedDbTaskRepository } from '../service/indexedDbTaskRepository';
import { NewTask, Task } from "../model/serviceTaskRepository";

const service = new indexedDbTaskRepository();

export const createTask = async (task: NewTask) => service.create(task);

export const getTask = async (id: string) => service.getTask(id);

export const updateTask = async (id: string, task: Task) => service.update(id, task);

export const deleteTask = async (id: string) => service.delete(id);

export const searchTask = async (phrase: string) => service.search(phrase);

export const allTasks = async () => service.allTasks();
