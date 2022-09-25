import { ipcRendererManager } from "../ipc-manager";
import { IpcEvents } from "../../../../common/ipc/ipc-events";
import { UserSettings } from "../../../../common/models/user-settings.model";

export interface ISettingsApi {
    get: () => Promise<UserSettings>,
    update: (updatedSettings: UserSettings) => Promise<void>,
    deleteAllData: () => Promise<void>
}

export const settingsApi: ISettingsApi = {
    get: () => {
        return ipcRendererManager.invoke(IpcEvents.SETTINGS_GET);
    },
    update: (updatedSettings) => {
        return ipcRendererManager.invoke(IpcEvents.SETTINGS_UPDATE, updatedSettings);
    },
    deleteAllData: () => {
        return ipcRendererManager.invoke(IpcEvents.SETTINGS_ALLDATA_DELETE);
    }
}
