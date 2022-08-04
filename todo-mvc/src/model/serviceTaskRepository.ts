export interface NewTask {
  value: string;
}

export interface Task extends NewTask{
  id: string;
  isCompleted: boolean;
  createdAt: Date;
  completedAt?: Date | null;
}
