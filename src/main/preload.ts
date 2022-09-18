/* eslint-disable @typescript-eslint/no-explicit-any */
// Remember to update ambient.d.ts for extending window object
import { contextBridge } from "electron";
import { IpcEvents } from "../common/ipc-events";
import { ipcRendererManager } from "../renderer/src/ipc-manager";

contextBridge.exposeInMainWorld("ipcRendererManager", {
    sendReadySignal: () => {
        ipcRendererManager.sendReadySignal();
    },
    send: (channel: IpcEvents, ...args: Array<any>) => {
        ipcRendererManager.send(channel, ...args);
    },
    invoke: (channel: IpcEvents, ...args: Array<any>) => {
        ipcRendererManager.invoke(channel, ...args);
    }
});
