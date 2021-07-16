import Task from './Task'
import TasksGraphData from './TasksGraphData';
import TaskStats from './TaskStats';
import UserData from './UserData'

// Used to access contextBridge functions from the browser window
declare global {
    interface Window {
        database: {
            sendListRequest: (channel: string, table: string) => void,
            receiveListResponse: (channel: string, func: (event: Event, list: Task[]) => void) => void,

            addToList: (table: string, task: Task) => void,
            deleteFromList: (table: string, id: string) => void,
        },

        user_data: {
            sendUserDataRequest: () => void,
            receiveUserDataResponse: (channel: string, func: (event: Event, userData: UserData) => void) => void,

            saveUserData: (userData: UserData) => void,

            deleteAllData: () => void,
        },

        statistics: {
            sendGraphDataRequest: (channel: string, year: number) => void,
            receiveGraphDataResponse: (channel: string, func: (event: Event, graphData: TasksGraphData[]) => void) => void,
            receiveGraphRangeResponse: (channel: string, func: (event: Event, graphRange: number[]) => void) => void,

            sendTaskStatsRequest: (channel: string, year: number) => void,
            receiveTaskStatsResponse: (channel: string, func: (event: Event, taskStats: TaskStats) => void) => void,
        },

        app: {
            removeAllListeners: (channel: string) => void,
        },
    }
}