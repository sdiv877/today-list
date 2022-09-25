import { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync } from 'fs';

import { UserSettings, DefaultUserSettings } from '../../common/models/user-settings.model';
import { USER_DATA_PATH } from './paths';
import { LOG } from '../../common/utils/debug';

const userSettingsPath = USER_DATA_PATH + 'settings.json';

/**
 * Create the directory for user data to be stored and creates the default settings.json file 
 * if either doesn't exist.
 */
export function initUserSettings(): void {
    if (!existsSync(USER_DATA_PATH)) { // .debug_user/ or user/
        mkdirSync(USER_DATA_PATH, { recursive: true });
    }
    if (!existsSync(userSettingsPath)) { // settings.json
        writeFileSync(userSettingsPath, JSON.stringify(DefaultUserSettings), 'utf8');
        LOG('Initialised user data', 'UserSettings')
    }
}

export function loadUserSettings(): UserSettings {
    const userSettingsString = readFileSync(userSettingsPath, 'utf8');
    const userSettings: UserSettings = JSON.parse(userSettingsString);
    return userSettings;
}

export function saveUserSettings(updatedSettings: UserSettings): void {
    writeFileSync(userSettingsPath, JSON.stringify(updatedSettings), 'utf8');
}

export function deleteUserSettings(): void {
    if (existsSync(userSettingsPath)) {
        unlinkSync(userSettingsPath)
    }
}
