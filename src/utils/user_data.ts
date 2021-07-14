import { existsSync, writeFileSync, readFileSync } from 'fs';

import UserData from '../models/UserData'

export function initUserData(): void {

    const initialUserData: UserData = { username: '', bg_colour: '' };

    if (!existsSync('./user_data.json')) {
        writeFileSync('./user_data.json', JSON.stringify(initialUserData), 'utf8');
        console.log('Initialised user data')
    }
}

export function loadUserData(): UserData {

    const userDataString = readFileSync('./user_data.json', 'utf8');
    const userData: UserData = JSON.parse(userDataString);

    return userData;
}

export function saveUserData(userData: UserData): void {

    writeFileSync('./user_data.json', JSON.stringify(userData), 'utf8');
}
