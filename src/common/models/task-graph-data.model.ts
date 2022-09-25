import { getCurrentYear } from '../../common/utils/dates';

/**
 * Describes the creation and completion values across every recorded year of 
 * Tasks for display in `TaskGraph.tsx`. Data should be displayed one year at 
 * a time i.e. at an index of `yearlyData[]`
 */
interface TaskGraphData {
  years: number[],
  yearlyData: TaskGraphYearData[];
  yearRange: TaskYearRange;
  currentYear: number;
}

interface TaskYearRange {
  min: number,
  max: number
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
  month: string;
  Created: number; // caps needed for re-charts library
  Completed: number;
}

const DefaultTaskGraphMonthData: TaskGraphMonthData = {
  month: 'January',
  Created: 0,
  Completed: 0
}

const DefaultTaskGraphYearData: TaskGraphYearData = {
  year: getCurrentYear(),
  monthlyData: [ DefaultTaskGraphMonthData ] // array
}

const DefaultTaskGraphData: TaskGraphData = {
  years: [ DefaultTaskGraphYearData.year ],
  yearlyData: [ DefaultTaskGraphYearData ],
  yearRange: { min: DefaultTaskGraphYearData.year, max: DefaultTaskGraphYearData.year },
  currentYear: getCurrentYear()
}

export {
  TaskGraphData,
  TaskGraphYearData,
  TaskGraphMonthData,
  TaskYearRange,
  DefaultTaskGraphData,
  DefaultTaskGraphYearData,
  DefaultTaskGraphMonthData
};
