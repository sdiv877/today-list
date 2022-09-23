import { TaskIcon } from './icons.model';

/**
 * Describes a Task stored in the database.
 */
interface Task {
  id: number;
  icon: TaskIcon;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  lastModifiedDate: Date;
  creationDate: Date;
}

/**
 * Describes a request to add a new Task to the database.
 */
interface NewTask {
  icon: TaskIcon;
  description: string;
  status: TaskStatus;
  dueDate: Date;
}

enum TaskStatus {
  InProgress = 0,
  Completed = 1,
  Deleted = 2
}

export { Task, NewTask, TaskStatus };
