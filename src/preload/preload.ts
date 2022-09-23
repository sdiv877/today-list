/* eslint-disable @typescript-eslint/no-explicit-any */
// Remember to update ambient.d.ts for extending window object
import { contextBridge } from "electron";
import { IpcEvents } from "../common/ipc/ipc-events";
import { ipcRendererManager } from "../renderer/src/ipc/ipc-manager";
import { api } from '../renderer/src/ipc/api';

/**
 * Expose general ipcRenderer functions to frontend in case they're needed.
 * Only allows channels following IpcEvents.
 */
contextBridge.exposeInMainWorld("ipcRendererManager", {
    sendReadySignal: () => {
        ipcRendererManager.sendReadySignal();
    },
    send: (channel: IpcEvents, ...args: Array<any>) => {
        ipcRendererManager.send(channel, ...args);
    },
    invoke: (channel: IpcEvents, ...args: Array<any>) => {
        ipcRendererManager.invoke(channel, ...args);
    },
    LOG: (msg: any) => {
        ipcRendererManager.LOG(msg);
    }
});

/**
 * The actual API that the frontend should be using.
 */
contextBridge.exposeInMainWorld("api", { ...api });
