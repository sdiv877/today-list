import { ipcRendererManager } from '../ipc-manager';
import { IpcEvents } from '../../../../common/ipc/ipc-events';
import { TaskGraphData } from '../../../../common/models/task-graph-data.model';
import { TaskStats } from '../../../../common/models/task-stats.model';

export interface IStatsApi {
  getTaskGraphData: () => Promise<TaskGraphData>;
  getAnnualTaskStats: (year: number) => Promise<TaskStats>;
  getOverallTaskStats: () => Promise<TaskStats>;
}

export const statsApi: IStatsApi = {
  getTaskGraphData: () => {
    return ipcRendererManager.invoke(IpcEvents.STATS_TASK_GRAPHDATA_GET);
  },
  getAnnualTaskStats: (year) => {
    return ipcRendererManager.invoke(IpcEvents.STATS_TASK_ANNUAL_GET, year);
  },
  getOverallTaskStats: () => {
    return ipcRendererManager.invoke(IpcEvents.STATS_TASK_OVERALL_GET);
  }
};
