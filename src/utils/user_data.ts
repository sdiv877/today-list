import { app } from 'electron';
import { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync } from 'fs';

import { consoleLog, DEBUG } from './debug'

import UserData from '../models/UserData'

// If in debug mode, files will be saved to the root directory of the repository.
// Otherwise they will be found in 'appData/today-list/user' folder.
const filePath = DEBUG ? './user_data.json' : app.getPath('userData') + '\\user\\user_data.json';

export function initUserData(): void {

    const initialUserData: UserData = { username: '', bg_colour: '', button_colour: '' };

    if (!existsSync(filePath)) {

        // If in production, need to create the /user directory before running
        if (!DEBUG) {
            mkdirSync(app.getPath('userData') + '\\user', { recursive: true });
        }

        writeFileSync(filePath, JSON.stringify(initialUserData), 'utf8');
        consoleLog('Initialised user data')
    }
}

export function loadUserData(): UserData {

    const userDataString = readFileSync(filePath, 'utf8');
    const userData: UserData = JSON.parse(userDataString);

    return userData;
}

export function saveUserData(userData: UserData): void {

    writeFileSync(filePath, JSON.stringify(userData), 'utf8');
}

export function deleteUserData(): void {

    if (existsSync(filePath)) {
        unlinkSync(filePath)
    }
}
