import { abstractTaskRepository } from "./abstractTaskRepository";
import { NewTask, Task } from "../model/serviceTaskRepository";
import localForage from "localforage"

const UIDGenerator = () => {
  // @ts-ignore
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export class indexedDbTaskRepository implements abstractTaskRepository {
  private db: typeof IDBFactory;
  private dbName = 'TodoTasks';

  constructor() {
    this.db = localForage;

    localForage.config({
      driver      : localForage.INDEXEDDB,
      name        : this.dbName,
      version     : 1.0,
      storeName   : this.dbName,
    });

    this.db.ready().then(() => {
      console.log('Started');
    })
  }

  async create(task: NewTask): Promise<Task> {
    return await this.db.setItem(UIDGenerator(), {
      ...task,
      isCompleted: false,
      createdAt: new Date(),
      completedAt: null,
    }) as Task;
  }

  async getTask(id: string): Promise<Task | null> {
    return await this.db.getItem<Task>(id)
  }

  async update(id: string, task: Task): Promise<Task> {
    return await this.db.setItem<Task>(id, task);
  }

  async delete(id: string): Promise<void> {
    await this.db.removeItem(id)
  }

  search(phrase: string): Promise<Task[]> {
    return Promise.resolve([]);
  }

  async allTasks(): Promise<Task[]> {
    const tasks: Task[] = [];

    await this.db.iterate((value: Task) => {
      tasks.push(value);
    })

    return tasks;
  }
}
