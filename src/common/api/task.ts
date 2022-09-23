import { ipcRendererManager } from "../../renderer/src/ipc-manager";
import { IpcEvents } from "../ipc-events";

export interface ITaskApi {
    headPing: () => Promise<string>;
}

export const taskApi: ITaskApi = {
    headPing: () => {
        return ipcRendererManager.invoke(IpcEvents.PING);
    }
}
