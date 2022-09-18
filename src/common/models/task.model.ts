import { TaskIcon } from './icons.model';

/**
 * Describes a Task stored in the database.
 */
interface Task {
  id: number;
  icon: TaskIcon;
  description: string;
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
  dueDate: Date;
  lastModifiedDate?: Date;
  creationDate?: Date;
}

export { Task, NewTask };
