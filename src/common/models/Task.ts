/**
 * Specifies a Task stored in the database.
 */
interface Task {
  id: number,
  icon: string,
  description: string,
  dueDate: Date,
  lastModifiedDate: Date,
  creationDate: Date
}

interface ApiTask {
  icon: string,
  description: string,
  dueDate: Date,
  lastModifiedDate?: Date,
  creationDate?: Date
}

export { Task, ApiTask };
