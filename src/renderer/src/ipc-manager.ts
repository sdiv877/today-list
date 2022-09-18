/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Implementation mostly taken from https://github.com/electron/fiddle/blob/main/src/renderer/ipc.ts
 */
import { EventEmitter } from "events";
import { ipcRenderer } from "electron";
import {
  IpcEvents,
  ipcRendererEvents,
  WEBCONTENTS_READY_FOR_IPC_SIGNAL
} from "../../common/ipc-events";

import { LOG as _LOG } from "../../common/utils/debug";

/**
 * The main purpose of this class is to be the central
 * gathering place for IPC calls the renderer process sends
 * or listens to.
 *
 * @class IpcRendererManager
 * @extends {EventEmitter}
 */
class IpcRendererManager extends EventEmitter {
  private readySignalSent = false;

  constructor() {
    super();

    ipcRendererEvents.forEach((name) => {
      ipcRenderer.removeAllListeners(name);
      ipcRenderer.on(name, (...args: Array<any>) => this.emit(name, ...args));
    });
  }

  public sendReadySignal(): void {
    if (this.readySignalSent) return;
    ipcRenderer.send(WEBCONTENTS_READY_FOR_IPC_SIGNAL);
    this.readySignalSent = true;
    this.LOG('Ready for IPC communication!');
  }

  /**
   * Sends an IPC message to the main process.
   *
   * @param {IpcEvents} channel
   * @param {...Array<any>} args
   * @memberof IpcRendererManager
   */
  public send(channel: IpcEvents, ...args: Array<any>) {
    ipcRenderer.send(channel, ...args);
  }

  /**
   * Sends an IPC message to the main process and returns a Promise that should contain main's response
   * (if main is prepared to handle the request).
   * @param channel
   * @param args
   * @returns Promise<any>
   */
  public invoke(channel: IpcEvents, ...args: Array<any>) {
    return ipcRenderer.invoke(channel, ...args);
  }

  public LOG = (msg: any, leadingNL=false) => {
    if (leadingNL) {
      _LOG('\n[ipcRendererManager] ' + msg);
    } else {
      _LOG('[ipcRendererManager] ' + msg);
    }
  }
}

export const ipcRendererManager = new IpcRendererManager();
