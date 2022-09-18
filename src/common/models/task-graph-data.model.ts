/**
 * Describes the values across every recorded year of Tasks for display in TaskGraph.tsx.
 */
interface TaskGraphData {
  years: number[];
  data: TaskGraphYearData[];
}

/**
 * Describes the values needed for a year of data in TaskGraph.tsx.
 */
interface TaskGraphYearData {
  year: number;
  monthlyData: TaskGraphMonthData[];
}

/**
 * Describes the values needed for one month of data in TaskGraph.tsx.
 */
interface TaskGraphMonthData {
  month: number;
  Created: number; // caps needed for re-charts library
  Completed: number; // ""
}

export { TaskGraphData, TaskGraphYearData, TaskGraphMonthData };
