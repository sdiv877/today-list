import { loadList } from './sqlite';
import { getMonthString } from './dates'

import TasksGraphData from '../models/TasksGraphData'

export function getTasksGraphData(): TasksGraphData[] {

    const currentTaskCountsByMonth = getTaskCountsByMonth('current_tasks');
    const completedTaskCountsByMonth = getTaskCountsByMonth('completed_tasks');

    const tasksGraphData = new Array<TasksGraphData>();

    for (let i = 0; i < 12; i++) {
        tasksGraphData.push({
            month: getMonthString(i),
            Created: currentTaskCountsByMonth[i] + completedTaskCountsByMonth[i],
            Completed: completedTaskCountsByMonth[i]
        })
    }

    return tasksGraphData;
}

function getTaskCountsByMonth(table: string): number[] {

    const taskCountsByMonth = new Array<number>();
    const taskList = loadList(table);

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
