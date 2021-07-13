interface TaskStats {
    totalCreated: number,
    totalCompleted: number,
    maxCompletedMonth?: number,
    maxCompletedYear?: number,

    maxCompletedMonthString?: string,
    maxCompletedYearString?: string,
}

export default TaskStats;