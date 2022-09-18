/* eslint-disable @typescript-eslint/no-explicit-any */
import { IpcEvents } from './ipc-events';

declare global {
  interface Window {
    ipcRendererManager: {
        sendReadySignal: () => void;
        send: (channel: IpcEvents, ...args: Array<any>) => void;
        invoke: (channel: IpcEvents, ...args: Array<any>) => Promise<any>;
    }
  }
}

// needed to mark file as an external module for use of 'global' keyword
export {};