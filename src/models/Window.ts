import Task from './Task'
import TasksGraphData from './TasksGraphData';
import TaskStats from './TaskStats';
import UserData from './UserData'

// Used to access contextBridge functions from the browser window
declare global {
    interface Window {
        api: {
            sendListRequest: (channel: string, table: string) => void,
            receiveListResponse: (channel: string, func: (event: Event, list: Task[]) => void) => void,

            sendGraphDataRequest: (channel: string, year: number) => void,
            receiveGraphDataResponse: (channel: string, func: (event: Event, graphData: TasksGraphData[]) => void) => void,
            receiveGraphRangeResponse: (channel: string, func: (event: Event, graphRange: number[]) => void) => void,

            sendTaskStatsRequest: (channel: string, year: number) => void,
            receiveTaskStatsResponse: (channel: string, func: (event: Event, taskStats: TaskStats) => void) => void,

            addToList: (table: string, task: Task) => void,
            deleteFromList: (table: string, id: string) => void,

            sendUserDataRequest: () => void,
            receiveUserDataResponse: (channel: string, func: (event: Event, userData: UserData) => void) => void,

            saveUserData: (userData: UserData) => void,

            deleteAllData: () => void,

            removeAllListeners: (channel: string) => void,
        },
    }
}