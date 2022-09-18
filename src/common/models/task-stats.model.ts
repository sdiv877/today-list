/**
 * Describes the stats related to user's task creation/completion.
 */
interface TaskStats {
  totalCreated: number;
  totalCompleted: number;
  mostProductiveCount?: number;
  mostProductiveYear?: number;
}

export default TaskStats;
