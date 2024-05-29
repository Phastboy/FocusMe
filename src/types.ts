export interface ITask {
  _id?: string;
  name: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
