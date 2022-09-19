/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Implementation mostly taken from https://github.com/electron/fiddle/blob/main/src/main/ipc.ts
 */
import { EventEmitter } from "events";
import { ipcMain } from "electron";
import { getOrCreateMainWindow } from "./main";
import { IpcListenerInitializer } from "./ipc-listeners";
import { LOG as _LOG } from "../common/utils/debug";
import {
  IpcEvents,
  WEBCONTENTS_READY_FOR_IPC_SIGNAL,
  ipcMainEvents
} from "../common/ipc-events";

/**
 * The main purpose of this class is to be the central
 * gathering place for IPC calls the main process sends
 * or listens to.
 *
 * @class IpcManager
 * @extends {EventEmitter}
 */
class IpcMainManager extends EventEmitter {
  public readyWebContents = new WeakSet<Electron.WebContents>();
  private messageQueue = new WeakMap<Electron.WebContents, Array<[IpcEvents, Array<any> | undefined]>>();

  constructor() {
    super();

    ipcMainEvents.forEach((name) => {
      ipcMain.removeAllListeners(name);
      ipcMain.on(name, (...args: Array<any>) => this.emit(name, ...args));
    });

    this.receiveRendererReadySignal();
  }

  public initListeners(initializers : IpcListenerInitializer[]) {
    initializers.forEach(initializer => {
      initializer();
    });
  }

  /**
   * Send an IPC message to the app's main_window renderer.
   *
   * @param {IpcEvents} channel
   * @param {Array<any>} [args]
   */
  public send(channel: IpcEvents, args?: Array<any>) {
    const _target = getOrCreateMainWindow().webContents;
    const _args = args || [];
    if (!this.readyWebContents.has(_target)) {
      const existing = this.messageQueue.get(_target) || [];
      this.messageQueue.set(_target, [...existing, [channel, args]]);
      return;
    }

    _target.isDestroyed() || _target.send(channel, ..._args);
  }

  /**
   * Creates a peristent listener that will fire whenever a message is
   * received on the specified channel. The listener itself is a function
   * that the Renderer may invoke with specified arguments, to yield
   * a promised result.
   * @param channel
   * @param listener
   */
  public handle(
    channel: IpcEvents,
    listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any
  ) {
    // remove any exising handlers, as we don't want several handlers to fire
    // from the same channel
    ipcMain.removeHandler(channel);
    ipcMain.handle(channel, listener);
  }

  /**
   * Creates a listener that waits for invocation from the Renderer,
   * once invoked and the result is returned the listener is deleted.
   * See ipcMainManager.handle().
   * @param channel
   * @param listener
   */
  public handleOnce(
    channel: IpcEvents,
    listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any
  ) {
    ipcMain.handleOnce(channel, listener);
  }

  public LOG = (msg: any, leadingNL = false) => {
    if (leadingNL) {
      _LOG("\n[ipcMainManager] " + msg);
    } else {
      _LOG("[ipcMainManager] " + msg);
    }
  };

  private receiveRendererReadySignal() {
    this.LOG("Awaiting ready signal from Renderer...", true);
    ipcMain.on(
      WEBCONTENTS_READY_FOR_IPC_SIGNAL,
      (event: Electron.IpcMainEvent) => {
        ipcMainManager.readyWebContents.add(event.sender);
        const queue = ipcMainManager.messageQueue.get(event.sender);
        ipcMainManager.messageQueue.delete(event.sender);
        this.LOG("Ready for IPC communication!");
        if (!queue) return;
        for (const item of queue) {
          ipcMainManager.send(item[0], item[1]);
        }
      }
    );
  }
}

export const ipcMainManager = new IpcMainManager();
