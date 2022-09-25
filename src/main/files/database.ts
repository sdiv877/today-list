import DatabaseConstructor, { Database } from "better-sqlite3";
import { Task, NewTask, TaskStatus } from "../../common/models/task.model";
import { TaskYearRange } from "../../common/models/task-graph-data.model";
import { LOG } from "../../common/utils/debug";
import { USER_DATA_PATH } from "./paths";
import { unlinkSync } from "fs";

const userDbPath = USER_DATA_PATH + "tasks.db";
const taskTable = "task";

/**
 * The columns that the task table in the database should have.
 */
 const taskColumns = 
  'id INTEGER PRIMARY KEY AUTOINCREMENT, ' + 
  'icon TEXT, ' + 
  'description TEXT, ' +
  'status INTEGER, ' +
  'due_date TEXT, ' +
  'last_modified_date TEXT, ' +
  'creation_date TEXT';

/**
 * Binds fields from a JS NewTask object to its relevant database columns.
 * Mirrors the names in TaskColumns, for use with database INSERT calls.
 * Note: last_modified_date and creation_date are handled internally.
 */
 const NEW_TASK_VALUE_BINDINGS = '@icon, @description, @status, @due_date, @last_modified_date, @creation_date';
 const NEW_TASK_COLUMNS = 'icon, description, status, due_date, last_modified_date, creation_date';


/**
 * Creates and returns a database connection from the intended path depending on whether the app is 
 * running in production or debug mode. Intended for use AFTER user-settings.initUserSettings() has been run.
 */
export function connectToDatabase(): Database {
  return DatabaseConstructor(userDbPath, { verbose: (message) => LOG(message, 'Database') });
}

/**
 * Connects to the database file (creating it if it doesn't exist) and adds the necessary tables.
 */
export function initDatabase(): void {
  const db = connectToDatabase();
  const addTaskTable = db.prepare("CREATE TABLE IF NOT EXISTS task(" + taskColumns + ")");
  addTaskTable.run();
  db.close();
}

/**
 * Retrieves all Tasks from the database that match the provided status.
 * @param status the TaskStatus that each task should have
 * @returns an array of all requested Tasks
 */
export function getAllTasks(status: TaskStatus): Task[] {
  const db = connectToDatabase();
  // retrieve all tasks from db
  const selectStmt = db.prepare(`SELECT * FROM ${taskTable} WHERE status = ${status}`);
  const dbTasks = selectStmt.all();
  const allTasks = new Array<Task>();
  // convert db tasks back to Task format
  for (const dbTask of dbTasks) {
    const task: Task = {
      id: dbTask.id,
      icon: dbTask.icon,
      description: dbTask.description,
      status: dbTask.status,
      dueDate: new Date(dbTask.due_date),
      lastModifiedDate: new Date(dbTask.last_modified_date),
      creationDate: new Date(dbTask.creation_date)
    }
    allTasks.push(task);
  }
  // sort list of tasks by dueDate
  allTasks.sort((a: Task, b: Task) => {
    return a.dueDate.valueOf() - b.dueDate.valueOf();
  });
  db.close();
  return allTasks;
}

/**
 * Inserts a new Task into the database.
 */
export function createTask(newTask: NewTask): void {
  const db = connectToDatabase();
  const insert = db.prepare(`INSERT INTO ${taskTable} (${NEW_TASK_COLUMNS}) VALUES (${NEW_TASK_VALUE_BINDINGS})`);

  const now = new Date();
  insert.run({
    icon: newTask.icon,
    description: newTask.description,
    status: newTask.status,
    due_date: newTask.dueDate.toISOString(),
    last_modified_date: now.toISOString(),
    creation_date: now.toISOString()
  });

  db.close();
}

/**
 * Updates an existing Task in the database
 */
export function updateTask(updatedTask: Task): void {
  const db = connectToDatabase();
  const updateStmt = db.prepare(makeUpdateTaskQueryString(updatedTask));
  updateStmt.run();
  db.close();
}

function makeUpdateTaskQueryString(updatedTask: Task): string {
  return `UPDATE ${taskTable} ` +
         `SET icon = '${updatedTask.icon}', description = '${updatedTask.description}', ` +
             `status = ${updatedTask.status}, due_date = '${updatedTask.dueDate.toISOString()}', ` +
             `last_modified_date = '${new Date().toISOString()}' ` +
         `WHERE id = ${updatedTask.id}`;
}

/**
 * Deletes a task that matches the given id from the database if it exists.
 */
export function deleteTask(idToDelete: number): void {
  const db = connectToDatabase();
  const deletestmt = db.prepare(`DELETE FROM ${taskTable} WHERE id = ${idToDelete}`);
  deletestmt.run();
  db.close();
}

/**
 * Deletes all Tasks in the database that match the provided status.
 */
export function deleteAllTasksByStatus(statusToDelete: TaskStatus) {
  const db = connectToDatabase();
  const deletestmt = db.prepare(`DELETE FROM ${taskTable} WHERE status = ${statusToDelete}`);
  deletestmt.run();
  db.close();
}

/**
 * @returns the number of Tasks in the database.
 */
export function getAllTasksCount(): number {
  const db = connectToDatabase();
  const count = db.prepare(`SELECT COUNT(*) FROM ${taskTable}`);
  const listLength = count.pluck().get();
  db.close();
  return listLength;
}

/**
 * @returns the number of Tasks in the database that are to be completed in a certain year.
 */
export function getTasksDueInYearCount(year: number): number {
  const db = connectToDatabase();
  const dueDateColumn = db.prepare("SELECT COUNT(*) FROM " + taskTable + " WHERE due_date LIKE (? || '%')");
  const numDatesThatMatchYear = dueDateColumn.pluck().get(year.toString()); // use year for ? in LIKE ()
  db.close();
  return numDatesThatMatchYear;
}

/**
 * Finds and returns very Task from the database based on if 'year' matches the start
 * of the record's due_date field (string).
 * @returns the Tasks due
 */
export function getTasksDueInYear(year: number): Task[] {
  const db = connectToDatabase();
  const selectWithYear = db.prepare("SELECT * FROM " + taskTable + " WHERE due_date LIKE (? || '%')");
  const listOfYear: Task[] = selectWithYear.all(year.toString());
  db.close();
  return listOfYear;
}

/**
 * Returns the lowest and highest year values found from the date_due fields in the database.
 */
export function getTasksDueYearRange(): TaskYearRange {
  const db = connectToDatabase();
  const selectMinDate = db.prepare("SELECT min(date(due_date)) FROM " + taskTable);
  const minYear: number = new Date(selectMinDate.pluck().get()).getFullYear();
  const selectMaxDate = db.prepare("SELECT max(date(due_date)) FROM " + taskTable);
  const maxYear: number = new Date(selectMaxDate.pluck().get()).getFullYear();
  db.close();
  return { min: minYear, max: maxYear };
}

export function deleteAllTasks(): void {
  const db = connectToDatabase();
  const deleteStmt = db.prepare(`DELETE FROM ${taskTable}`);
  deleteStmt.run();
  db.close();
}

/**
 * Deletes the database file from disk.
 */
export function deleteLocalDatabase() {
  unlinkSync(userDbPath);
}

export function initDebugTasks(): void {
  createTask({icon: 'assignment', description: 'Do homework', status: TaskStatus.InProgress, dueDate: new Date()});
  createTask({icon: 'fitnesscenter', description: 'Workout', status: TaskStatus.Completed, dueDate: new Date('2019-01-01T17:47:08+00:00')});
  createTask({icon: 'create', description: 'Write an email', status: TaskStatus.Deleted, dueDate: new Date()});
  createTask({icon: 'videogameasset', description: 'Play a game', status: TaskStatus.InProgress, dueDate: new Date()});
}
