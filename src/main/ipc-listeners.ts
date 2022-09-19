import { ipcMainManager } from "./ipc-manager";
import { IpcEvents } from "../common/ipc-events";

/**
 * Basically just stating that the initializer should be a function
 * that does something. For readability more than a practical purpose.
 */
export type IpcListenerInitializer = () => void;

export const initTestListeners: IpcListenerInitializer = () => {
  ipcMainManager.on(IpcEvents.REQ_TEST, () => {
    ipcMainManager.LOG("REQ_TEST received");
  });

  ipcMainManager.handleOnce(IpcEvents.PING, () => {
    ipcMainManager.LOG("PING received");
  });
};

// TODO: initTaskListeners();
// TODO: initTaskGraphDataListeners();
// TODO: initStatsListeners();
// TODO: initSettingsListeners();
