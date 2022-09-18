import { Task, ApiTask } from './Task'
import { TaskGraphData } from './TaskGraphData';
import TaskStats from './TaskStats';
import { UserSettings } from './UserSettings'

// Used to access contextBridge functions from the browser window
declare global {
    interface Window {
        database: {
            sendTableRequest: (channel: string, table: string) => void,
            receiveTableResponse: (channel: string, func: (event: Event, list: Task[]) => void) => void,
            addToTable: (table: string, task: ApiTask) => void,
            deleteFromTable: (table: string, id: number) => void,
        },
        user_data: {
            sendUserSettingsRequest: () => void,
            receiveUserSettingsResponse: (channel: string, func: (event: Event, userData: UserSettings) => void) => void,
            saveUserSettings: (userData: UserSettings) => void,
            deleteAllData: () => void,
        },
        statistics: {
            getGraphData: (func: (event: Event, graphData: TaskGraphData[]) => void) => void,
            getGraphRange: (func: (event: Event, graphRange: number[]) => void) => void,
            getAnnualTaskStats: (func: (event: Event, taskStats: TaskStats) => void) => void,
            getOverallTaskStats: (func: (event: Event, taskStats: TaskStats) => void) => void
        },
        app: {
            removeAllListeners: (channel: string) => void,
        },
    }
}