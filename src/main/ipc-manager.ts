/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Implementation taken from https://github.com/electron/fiddle/blob/main/src/main/ipc.ts
 */
import { EventEmitter } from "events";
import { BrowserWindow, ipcMain } from "electron";
import { getOrCreateMainWindow } from "./main";
import { LOG } from "../common/utils/debug";
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
  private targetWindow: BrowserWindow;
  private messageQueue = new WeakMap<
    Electron.WebContents,
    Array<[IpcEvents, Array<any> | undefined]>
  >();

  constructor() {
    super();

    this.targetWindow = getOrCreateMainWindow();

    ipcMainEvents.forEach((name) => {
      ipcMain.removeAllListeners(name);
      ipcMain.on(name, (...args: Array<any>) => this.emit(name, ...args));
    });

    LOG('Awaiting ready signal from Renderer...');

    ipcMain.on(
      WEBCONTENTS_READY_FOR_IPC_SIGNAL,
      (event: Electron.IpcMainEvent) => {
        this.readyWebContents.add(event.sender);

        const queue = this.messageQueue.get(event.sender);
        this.messageQueue.delete(event.sender);
        if (!queue) return;
        for (const item of queue) {
          this.send(item[0], item[1]);
        }
        LOG('✌️ Main ready for IPC communication');
      }
    );
  }

  /**
   * Send an IPC message to this.targetWindow.
   *
   * @param {IpcEvents} channel
   * @param {Array<any>} [args]
   */
  public send(channel: IpcEvents, args?: Array<any>) {
    const _target = this.targetWindow.webContents;
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
}

export const ipcMainManager = new IpcMainManager();
