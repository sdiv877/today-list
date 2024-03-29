export enum IpcEvents {
    REQ_TEST = "REQ_TEST",
    RES_TEST = "RES_TEST",
    PING = "TEST",
    TASK_CREATE = "TASK_CREATE",
    TASK_GET_ALL = "TASK_GET_ALL",
    TASK_UPDATE = "TASK_UPDATE",
    TASK_DELETE = "TASK_DELETE",
    STATS_TASK_GRAPHDATA_GET = "STATS_TASK_GRAPHDATA_GET",
    STATS_TASK_ANNUAL_GET = "STATS_TASK_ANNUAL_GET",
    STATS_TASK_OVERALL_GET = "STATS_TASK_OVERALL_GET",
    SETTINGS_GET = "SETTINGS_GET",
    SETTINGS_UPDATE = "SETTINGS_UPDATE",
    SETTINGS_ALLDATA_DELETE = "SETTINGS_ALLDATA_DELETE"
}

export const ipcMainEvents = [
  IpcEvents.RES_TEST,
  IpcEvents.PING,
  IpcEvents.TASK_CREATE,
  IpcEvents.TASK_GET_ALL,
  IpcEvents.TASK_UPDATE,
  IpcEvents.TASK_DELETE, 
  IpcEvents.STATS_TASK_GRAPHDATA_GET,
  IpcEvents.STATS_TASK_ANNUAL_GET,
  IpcEvents.STATS_TASK_OVERALL_GET,
  IpcEvents.SETTINGS_GET,
  IpcEvents.SETTINGS_UPDATE,
  IpcEvents.SETTINGS_ALLDATA_DELETE
];

export const ipcRendererEvents = [
  IpcEvents.REQ_TEST,
  IpcEvents.PING,
  IpcEvents.TASK_CREATE,
  IpcEvents.TASK_GET_ALL,
  IpcEvents.TASK_UPDATE,
  IpcEvents.TASK_DELETE, 
  IpcEvents.STATS_TASK_GRAPHDATA_GET,
  IpcEvents.STATS_TASK_ANNUAL_GET,
  IpcEvents.STATS_TASK_OVERALL_GET,
  IpcEvents.SETTINGS_GET,
  IpcEvents.SETTINGS_UPDATE,
  IpcEvents.SETTINGS_ALLDATA_DELETE
];

export const WEBCONTENTS_READY_FOR_IPC_SIGNAL =
  "WEBCONTENTS_READY_FOR_IPC_SIGNAL";
