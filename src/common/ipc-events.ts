export enum IpcEvents {
  REQ_TEST = "REQ_TEST",
  RES_TEST = "RES_TEST",
}

export const ipcMainEvents = [
  IpcEvents.REQ_TEST
];

export const ipcRendererEvents = [
  IpcEvents.RES_TEST
];

export const WEBCONTENTS_READY_FOR_IPC_SIGNAL =
  "WEBCONTENTS_READY_FOR_IPC_SIGNAL";
