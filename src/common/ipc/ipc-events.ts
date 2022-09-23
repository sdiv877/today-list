export enum IpcEvents {
    REQ_TEST = "REQ_TEST",
    RES_TEST = "RES_TEST",
    PING = "TEST",
    TASK_CREATE = "TASK_CREATE",
    TASK_GET_ALL = "TASK_GET_ALL",
    TASK_UPDATE = "TASK_UPDATE",
    TASK_DELETE = "TASK_DELETE"
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
