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
    const addDeletedTasksTable = db.prepare('CREATE TABLE IF NOT EXISTS deleted_tasks(id text, icon text, task text, date text)');
    addDeletedTasksTable.run();

    db.close();
}

function insertTask(table: string, task: Task) {

    const db = connectToDatabase();

    const insert = db.prepare('INSERT INTO ' + table + ' (id, icon, task, date) VALUES (@id, @icon, @task, @date)');
    insert.run({ id: task.id, icon: task.icon, task: task.task, date: task.date.toISOString() },)

    db.close();
}

function deleteTask(table: string, id: string) {

    const db = connectToDatabase();

    const deletestmt = db.prepare('DELETE FROM ' + table + ' WHERE id = ?');
    deletestmt.run(id);

    db.close();
}

export function loadList(table: string): Task[] {
    const db = connectToDatabase();

    const select = db.prepare('SELECT * FROM ' + table);
    const list: Task[] = select.all();

    // Converting Date ISOs back to Date objects
    for (let i = 0; i < list.length; i++) {
        list[i].date = new Date(list[i].date)
    }

    db.close();

    return list;
}

export function addToList(table: string, newTask: Task): void {
    const list = loadList(table)
    let addTask = true;

    for (const currTask of list) {
        // If the id of the 'newTask' is the same as any of 'currTask's in the db, don't add it
        if (newTask.id === currTask.id) {
            addTask = false;
            break;
        }
    }

    if (addTask) {
        insertTask(table, newTask);
    }
}

export function deleteFromList(table: string, id: string): void {
    const list = loadList(table)
    let removeTask = false;

    for (const currTask of list) {
        // If the id of the 'task' is the same as any of 'currTask's in the db, remove it
        if (id === currTask.id) {
            removeTask = true;
            break;
        }
    }

    if (removeTask) {
        deleteTask(table, id);
    }
}

export function clearList(table: string): void {

    const db = connectToDatabase();
    const deletestmt = db.prepare('DELETE FROM ' + table);

    deletestmt.run();
}

export function getListLength(table: string): number {

    const db = connectToDatabase();
    const count = db.prepare('SELECT COUNT(*) FROM ' + table);

    const listLength = count.pluck().get();
    return listLength;
}

export function loadListWithYear(table: string, year: number): Task[] {

    const db = connectToDatabase();
    const selectWithYear = db.prepare("SELECT * FROM " + table + " WHERE date LIKE (? || '%')");

    const listWithYear: Task[] = selectWithYear.all(year.toString());

    return listWithYear;
}