export enum IpcEvents {
  REQ_TEST = "REQ_TEST",
  PING = "PING"
}

export const ipcMainEvents = [
  IpcEvents.REQ_TEST,
  IpcEvents.PING
];

export const ipcRendererEvents = [
  IpcEvents.PING
];

export const WEBCONTENTS_READY_FOR_IPC_SIGNAL =
  "WEBCONTENTS_READY_FOR_IPC_SIGNAL";
