import Task from '../models/Task'

declare global {
    interface Window {
        api: {
            sendRequest: (channel: string, table: string) => void,
            receiveResponse: (channel: string, func: (event: Event, text: Task[]) => void) => void,

            addToList: (table: string, task: Task) => void,
            deleteFromList: (table: string, id: string) => void,

            removeAllListeners: (channel: string) => void,
        },
    }
}