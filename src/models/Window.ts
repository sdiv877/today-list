import Task from '../models/Task'
import TasksGraphData from './TasksGraphData';

// Used to access contextBridge functions from the browser window
declare global {
    interface Window {
        api: {
            sendListRequest: (channel: string, table: string) => void,
            receiveListResponse: (channel: string, func: (event: Event, list: Task[]) => void) => void,

            sendGraphDataRequest: (channel: string, year: number) => void,
            receiveGraphDataResponse: (channel: string, func: (event: Event, graphData: TasksGraphData[]) => void) => void,
            receiveGraphRangeResponse: (channel: string, func: (event: Event, graphRange: number[]) => void) => void,

            addToList: (table: string, task: Task) => void,
            deleteFromList: (table: string, id: string) => void,

            removeAllListeners: (channel: string) => void,
        },
    }
}