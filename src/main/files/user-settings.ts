import { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync } from 'fs';

import { USER_DATA_PATH } from './paths';
import { LOG } from '../../common/utils/debug';

import { UserSettings, DefaultUserSettings } from '../../common/models/user-settings.model';

const userSettingsPath = USER_DATA_PATH + 'settings.json';

/**
 * Create the directory for user data to be stored and creates the default settings.json file 
 * if either doesn't exist.
 */
export function initUserSettings(): void {
    if (!existsSync(USER_DATA_PATH)) { // debug_user/ or user/
        mkdirSync(USER_DATA_PATH, { recursive: true });
    }
    if (!existsSync(userSettingsPath)) { // settings.json
        writeFileSync(userSettingsPath, JSON.stringify(DefaultUserSettings), 'utf8');
        LOG('Initialised user data')
    }
}

export function loadUserSettings(): UserSettings {
    const userDataString = readFileSync(userSettingsPath, 'utf8');
    const userData: UserSettings = JSON.parse(userDataString);
    return userData;
}

export function saveUserSettings(userData: UserSettings): void {
    writeFileSync(userSettingsPath, JSON.stringify(userData), 'utf8');
}

export function deleteUserSettings(): void {
    if (existsSync(userSettingsPath)) {
        unlinkSync(userSettingsPath)
    }
}
