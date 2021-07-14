// import { getListLength, getListYearRange, loadList, loadListWithYear } from './sqlite';
import { loadList, getListLength, getListLengthWithYear, getListYearRange, loadListWithYear } from './sqlite';
import { getMonthString } from './dates'

import TasksGraphData from '../models/TasksGraphData'
import TaskStats from '../models/TaskStats'

export function getTasksGraphData(year: number): TasksGraphData[] {

    const currentTaskCountsByMonth = getTaskCountsByMonth('current_tasks', year);
    const completedTaskCountsByMonth = getTaskCountsByMonth('completed_tasks', year);

    const tasksGraphData = new Array<TasksGraphData>();

    for (let i = 0; i < 12; i++) {
        tasksGraphData.push({
            // Truncating month to 3 letters e.g. April -> Apr etc.
            month: getMonthString(i).slice(0, 3),
            Created: currentTaskCountsByMonth[i] + completedTaskCountsByMonth[i],
            Completed: completedTaskCountsByMonth[i]
        })
    }

    return tasksGraphData;
}

function getTaskCountsByMonth(table: string, year: number): number[] {

    const taskCountsByMonth = new Array<number>();
    const taskList = loadListWithYear(table, year);

    // Loop 12 times, once for each month
    for (let i = 0; i < 12; i++) {
        // Initialise the current months index
        taskCountsByMonth.push(0)

        for (const task of taskList) {
            const date = new Date(task.date)
            const month = date.getMonth();

            // If the month of the current task in taskList == current month
            if (month === i) {
                // add 1 to count for the month
                taskCountsByMonth[i] += 1;
            }
        }
    }

    //ex. [0, 5, 7, 3, 4, 6, 8, 2, 7, 0, 10, 9]
    return taskCountsByMonth;
}

export function getGraphYearRange(): number[] {

    const currentYearRange = getListYearRange('current_tasks');
    const completedYearRange = getListYearRange('completed_tasks');

    const yearRange = [new Date().getFullYear(), new Date().getFullYear()]
    // Set final yearRange based on if the current and completed values are lower
    // or higher than each other respectively
    yearRange[0] = currentYearRange[0] < completedYearRange[0] ? currentYearRange[0] : completedYearRange[0]
    yearRange[1] = currentYearRange[1] > completedYearRange[1] ? currentYearRange[1] : completedYearRange[1]

    return yearRange;
}

export function getTaskStats(year: number): TaskStats {

    const taskStats: TaskStats = { totalCreated: 0, totalCompleted: 0 }

    if (year != 0) {
        // annual
        taskStats.totalCreated = getListLengthWithYear('current_tasks', year) + getListLengthWithYear('completed_tasks', year);
        taskStats.totalCompleted = getListLengthWithYear('completed_tasks', year);

        const mostProductive = getMostProductiveMonth(year);
        taskStats.mostProductiveValue = mostProductive[0] as number;
        taskStats.mostProductiveText = mostProductive[1] as string;
    } else {
        // overall
        taskStats.totalCreated = getListLength('current_tasks') + getListLength('completed_tasks');
        taskStats.totalCompleted = getListLength('completed_tasks');

        const mostProductive = getMostProductiveYear();
        taskStats.mostProductiveValue = mostProductive[0];
        taskStats.mostProductiveText = mostProductive[1].toString();
    }

    return taskStats;
}

function getMostProductiveMonth(year: number): (number | string)[] {
    const taskCountsByMonth = getTaskCountsByMonth('completed_tasks', year);

    // Get the index of the max value of taskCountsByMonth
    const maxValue = Math.max(...taskCountsByMonth);
    const maxIndex = taskCountsByMonth.lastIndexOf(maxValue);

    // [maxTaskCount, monthOfMaxTaskCount]
    return [taskCountsByMonth[maxIndex], getMonthString(maxIndex)]
}

function getMostProductiveYear(): number[] {

    const list = loadList('completed_tasks');
    const yearsInList = new Array<number>();

    for (const task of list) {
        // If our array doesn't contain the year of the current task's date
        if (!yearsInList.includes(task.date.getFullYear())) {
            // Add it to our array
            yearsInList.push(task.date.getFullYear())
        }
    }

    // Calculate the number of tasks completed for every year separately
    const taskCountsByYear = new Array<number>();

    for (const year of yearsInList) {
        taskCountsByYear.push(getListLengthWithYear('completed_tasks', year));
    }

    // Get the index of the max value of taskCountsByYear
    const maxValue = Math.max(...taskCountsByYear);
    const maxIndex = taskCountsByYear.lastIndexOf(maxValue);

    // [maxTaskCount, yearOfMaxTaskCount]
    return [taskCountsByYear[maxIndex], yearsInList[maxIndex]]
}