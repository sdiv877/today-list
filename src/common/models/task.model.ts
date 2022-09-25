import { TaskIcon } from './icons.model';

/**
 * Describes a Task that was taken from the database. Appropriate for
 * use outside the business logic layer.
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
 * Describes an immutable Task taken directly from the database. Not
 * suitable for use outside of the business logic layer.
 */
interface DbTask {
  id: number;
  icon: TaskIcon;
  description: string;
  status: TaskStatus;
  due_date: Date;
  last_modified_date: Date;
  creation_date: Date;
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

export { Task, DbTask, NewTask, TaskStatus };
