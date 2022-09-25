import { getAllTasks, getTasksDueYearRange } from './database';
import { getCurrentYear, getMonthString } from '../../common/utils/dates';

import { TaskStats } from '../../common/models/task-stats.model';
import { Task, TaskStatus } from '../../common/models/task.model';
import {
  TaskGraphData,
  TaskGraphYearData,
  TaskGraphMonthData,
  DefaultTaskGraphYearData,
  DefaultTaskGraphMonthData
} from "../../common/models/task-graph-data.model";

export function getTaskGraphData(): TaskGraphData {
  const allTasks = Array.prototype.concat(
    getAllTasks(TaskStatus.InProgress),
    getAllTasks(TaskStatus.Completed)
  );
  const allYears = getAllYears(allTasks);

  const tgData: TaskGraphData = {
    years: allYears,
    yearlyData: getAllYearData(allTasks, allYears),
    yearRange: getTasksDueYearRange(),
    currentYear: getCurrentYear()
  };
  // LOG('tgData: ' + JSON.stringify(tgData, null, 2));
  return tgData;
}

/**
 * @returns an array of all the unique years that the supplied tasks are due by
 * (in ascending order).
 */
function getAllYears(tasks: Task[]): number[] {
  const years: number[] = [];
  for (const task of tasks) {
    const year = task.dueDate.getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
  }
  years.sort((a, b) => {return a - b}); // ascending sort
  return years;
}

function getAllYearData(tasks: Task[], allYears: number[]): TaskGraphYearData[] {
  const allYearData: TaskGraphYearData[] = [];
  // populate allYearData with an object for each i in allYears  
  for (let i = 0; i < allYears.length; i++) {
    const yd: TaskGraphYearData = { ...DefaultTaskGraphYearData }; // clone default data
    const year = allYears[i];
    yd.year = year;
    allYearData.push(yd);
    allYearData[i].monthlyData = getAllMonthData(tasks, year);
  }
  // LOG('allYearData: ' + JSON.stringify(allYearData));
  return allYearData;
}

function getAllMonthData(tasks: Task[], year: number): TaskGraphMonthData[] {
  const allMonthData: TaskGraphMonthData[] = [];
  // populate allMonthData with an object for each i in 12  
  for(let month = 0; month < 12; month++) {
    const md: TaskGraphMonthData = { ...DefaultTaskGraphMonthData }; // clone default data
    md.month = getMonthString(month);
    allMonthData.push(md);
  }
  for (const task of tasks) {
    const month = task.dueDate.getMonth();
    if (task.dueDate.getFullYear() == year) {
      // month value lines up with pos in allMonthData
      if (task.status == TaskStatus.Completed) {
        allMonthData[month].Completed++
      }
      allMonthData[month].Created++;
    }
  }
  // LOG('allMonthData: ' + JSON.stringify(allMonthData));
  return allMonthData;
}

export function getAnnualTaskStats(year: number): TaskStats {
  const graphData = getTaskGraphData();
  let relevantYearData = DefaultTaskGraphYearData;
  for (const yearData of graphData.yearlyData) {
    if (yearData.year === year) {
      relevantYearData = yearData;
    }
  }
  // get max Completed field in relevantYearData
  const highestCompletion = Math.max(
    ...relevantYearData.monthlyData.map((md) => md.Completed)
  );
  const mostProductiveMonth = relevantYearData.monthlyData.find((md) => md.Completed == highestCompletion);
  return {
    type: 'Annual Stats',
    totalCreated: mostProductiveMonth.Created,
    totalCompleted: mostProductiveMonth.Completed,
    mostProductivePeriod: mostProductiveMonth.month
  }
}

export function getOverallTaskStats(): TaskStats {
  const createdTasksByYear: number[] = [];
  const completedTasksByYear: number[] = [];
  const graphData = getTaskGraphData();
  // sum completed and created tasks from each year
  for (const yd of graphData.yearlyData) {
    let created = 0;
    let completed = 0;
    for (const md of yd.monthlyData) {
      created += md.Created;
      completed += md.Completed;
    }
    createdTasksByYear.push(created);
    completedTasksByYear.push(completed);
  }
  // find most productive year
  const mostProductiveYearIndex = completedTasksByYear.indexOf(Math.max(...completedTasksByYear));
  const mostProductiveYear = graphData.yearlyData[mostProductiveYearIndex].year;
  return {
    type: 'Overall Stats',
    totalCreated: createdTasksByYear[mostProductiveYearIndex],
    totalCompleted: completedTasksByYear[mostProductiveYearIndex],
    mostProductivePeriod: mostProductiveYear.toString()
  };
}
