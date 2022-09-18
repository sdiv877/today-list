export enum IpcEvents {
  REQ_TEST = "REQ_TEST",
  RES_TEST = "RES_TEST",
  PING = "TEST"
}

export const ipcMainEvents = [
  IpcEvents.REQ_TEST,
  IpcEvents.PING
];

export const ipcRendererEvents = [
  IpcEvents.RES_TEST,
  IpcEvents.PING
];

export const WEBCONTENTS_READY_FOR_IPC_SIGNAL =
  "WEBCONTENTS_READY_FOR_IPC_SIGNAL";
