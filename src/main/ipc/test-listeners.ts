import { ipcMainManager, IpcListenerInitializer } from "./ipc-manager";
import { IpcEvents } from "../../common/ipc-events";

export const initTestListeners: IpcListenerInitializer = () => {
  ipcMainManager.on(IpcEvents.REQ_TEST, () => {
    ipcMainManager.LOG("REQ_TEST received");
  });

  ipcMainManager.handleOnce(IpcEvents.PING, () => {
    ipcMainManager.LOG("PING received");
    return 'PONG';
  });
};
