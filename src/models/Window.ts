import Task from '../models/Task'

declare global {
    interface Window {
        api: {
            sendRequest: (channel: string) => void,
            receiveResponse: (channel: string, func: (event: Event, text: Task[]) => void) => void,

            currentList: Promise<Task[]>,
            saveCurrentList: (currentList: Task[]) => void,
            addToCurrentList: (task: Task) => void,
            deleteFromCurrentList: (id: string) => void,

            removeAllListeners: (channel: string) => void,
        },
    }
}