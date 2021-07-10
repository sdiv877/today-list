import Database = require('better-sqlite3')

import Task from '../models/Task'

export function connectToDatabase(): Database.Database {

    const db = new Database('tasks.db', { verbose: console.log });
    return db;
}

export function initDatabase(): void {

    const db = connectToDatabase();

    // Add all tables to the db
    const addCurrentTasksTable = db.prepare('CREATE TABLE IF NOT EXISTS current_tasks(id text, icon text, task text, date text)');
    addCurrentTasksTable.run();
    const addCompletedTasksTable = db.prepare('CREATE TABLE IF NOT EXISTS completed_tasks(id text, icon text, task text, date text)');
    addCompletedTasksTable.run();

    db.close();
}

function insertTask(task: Task) {

    const db = connectToDatabase();

    const insert = db.prepare('INSERT INTO current_tasks (id, icon, task, date) VALUES (@id, @icon, @task, @date)');
    insert.run({ id: task.id, icon: task.icon, task: task.task, date: task.date.toISOString() },)

    db.close();
}

function deleteTask(id: string) {

    const db = connectToDatabase();

    const deletestmt = db.prepare('DELETE FROM current_tasks WHERE id = ?');
    deletestmt.run(id);

    db.close();
}

export function loadCurrentList(): Task[] {
    const db = connectToDatabase();

    const select = db.prepare('SELECT * FROM current_tasks');
    const currentList: Task[] = select.all();

    // Converting Date ISOs back to Date objects
    for (let i = 0; i < currentList.length; i++) {
        currentList[i].date = new Date(currentList[i].date)
    }

    db.close();

    return currentList;
}

export function addToCurrentList(newTask: Task): void {
    const currentList = loadCurrentList()
    let addTask = true;

    for (const currTask of currentList) {
        // If the id of the 'newTask' is the same as any of 'currTask's in the db, don't add it
        if (newTask.id === currTask.id) {
            addTask = false;
            break;
        }
    }

    if (addTask) {
        insertTask(newTask);
    }
}

export function deleteFromCurrentList(id: string): void {
    const currentList = loadCurrentList()
    let removeTask = false;

    for (const currTask of currentList) {
        // If the id of the 'task' is the same as any of 'currTask's in the db, remove it
        if (id === currTask.id) {
            removeTask = true;
            break;
        }
    }

    if (removeTask) {
        deleteTask(id);
    }
}
