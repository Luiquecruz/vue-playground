import { Task } from '../model/serviceTaskRepository'

export abstract class abstractTaskRepository {
  abstract getTask(id: string): Promise<Task | null>;

  abstract update(id: string, task: Task): Promise<Task>

  abstract search(phrase: string): Promise<Task[]>

  abstract create(task: Task): Promise<Task>

  abstract delete(id: string): Promise<void>
}
