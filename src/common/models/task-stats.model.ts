/**
 * Describes the stats related to user's task creation/completion.
 */

import { getCurrentYear } from "../utils/dates";

export type TaskStatsType = 'Annual Stats' | 'Overall Stats';

interface TaskStats {
  type: TaskStatsType
  totalCreated: number;
  totalCompleted: number;
  mostProductivePeriod: string;
}

const DefaultAnnualTaskStats: TaskStats = {
  type: "Annual Stats",
  totalCreated: 0,
  totalCompleted: 0,
  mostProductivePeriod: 'January'
};

const DefaultOverallTaskStats: TaskStats = {
  type: "Annual Stats",
  totalCreated: 0,
  totalCompleted: 0,
  mostProductivePeriod: getCurrentYear().toString()
};

function getDefaultTaskStats(type: TaskStatsType) {
  return type == 'Annual Stats' ? {... DefaultAnnualTaskStats } : {... DefaultOverallTaskStats };
}

export { TaskStats, getDefaultTaskStats };
