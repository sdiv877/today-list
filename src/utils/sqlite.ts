import Database = require('better-sqlite3')

import Task from '../models/Task'

export function connectToDatabase():Database.Database {

    const db = new Database('tasks.db', { verbose: console.log });
    return db;
}

export function initDatabaseTables(): void {
    
    const db = connectToDatabase();

    // Add all tables to the db
    const addCurrentTasksTable = db.prepare('CREATE TABLE IF NOT EXISTS current_tasks(id text, icon text, task text, date text)');
    addCurrentTasksTable.run();
    const addCompletedTasksTable = db.prepare('CREATE TABLE IF NOT EXISTS completed_tasks(id text, icon text, task text, date text)');
    addCompletedTasksTable.run();
}

export function getInitialList(): Task[] {

    //TODO

    return new Array<Task>();
}