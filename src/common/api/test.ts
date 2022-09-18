import { ipcRendererManager } from "../../renderer/src/ipc-manager";
import { IpcEvents } from "../ipc-events";

export interface ITestApi {
    headPing: () => Promise<string>;
}

export const testApi: ITestApi = {
    headPing: () => {
        return ipcRendererManager.invoke(IpcEvents.PING);
    }
}
