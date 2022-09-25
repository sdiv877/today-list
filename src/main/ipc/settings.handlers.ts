import { app } from "electron";
import { ipcMainManager, IpcListenerInitializer } from "./ipc-manager";
import { IpcEvents } from "../../common/ipc/ipc-events";
import { deleteUserSettings, initUserSettings, loadUserSettings, saveUserSettings } from '../files/user-settings';
import { deleteLocalDatabase, initDatabase } from "../files/database";
import { DEBUG } from "../../common/utils/debug";

export const initSettingsListeners: IpcListenerInitializer = () => {
  ipcMainManager.handle(IpcEvents.SETTINGS_GET, () => {
    return loadUserSettings();
  });

  ipcMainManager.handle(IpcEvents.SETTINGS_UPDATE, (event, updatedSettings) => {
    saveUserSettings(updatedSettings);
  });

  ipcMainManager.handle(IpcEvents.SETTINGS_ALLDATA_DELETE, () => {
    deleteUserSettings();
    deleteLocalDatabase();
    if (DEBUG) {
      initUserSettings();
      initDatabase();
    } else {
      app.relaunch();
      app.quit();
    }
  });
}
