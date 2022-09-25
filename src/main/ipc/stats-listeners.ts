import { ipcMainManager, IpcListenerInitializer } from "./ipc-manager";
import { IpcEvents } from "../../common/ipc/ipc-events";
import { getTaskGraphData, getAnnualTaskStats, getOverallTaskStats } from "../files/stats";

export const initStatsListeners: IpcListenerInitializer = () => {
  ipcMainManager.handle(IpcEvents.STATS_TASK_GRAPHDATA_GET, () => {
    return getTaskGraphData();
  });

  ipcMainManager.handle(IpcEvents.STATS_TASK_ANNUAL_GET, (event, year) => {
    return getAnnualTaskStats(year);
  });

  ipcMainManager.handle(IpcEvents.STATS_TASK_OVERALL_GET, () => {
    return getOverallTaskStats();
  });
}
