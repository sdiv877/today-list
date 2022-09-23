import { ipcMainManager, IpcListenerInitializer } from "./ipc-manager";
import { IpcEvents } from "../../common/ipc-events";

export const initTaskListeners: IpcListenerInitializer = () => {
  ipcMainManager.on(IpcEvents.REQ_TEST, () => {
    ipcMainManager.LOG("REQ_TEST received");
  });
};
