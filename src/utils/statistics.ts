// import { getListLength, getListYearRange, loadList, loadListWithYear } from './sqlite';
import { getListYearRange, loadListWithYear } from './sqlite';
import { getMonthString } from './dates'

import TasksGraphData from '../models/TasksGraphData'

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