import { existsSync, writeFileSync, readFileSync, unlinkSync } from 'fs';

import UserData from '../models/UserData'

const filePath = './user_data.json';

export function initUserData(): void {

    const initialUserData: UserData = { username: '', bg_colour: '' };

    if (!existsSync(filePath)) {
        writeFileSync(filePath, JSON.stringify(initialUserData), 'utf8');
        console.log('Initialised user data')
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
