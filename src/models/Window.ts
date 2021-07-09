import Task from '../models/Task'

declare global {
    interface Window {
        api: {
            sendText: (channel: string, text: string) => void,
            receiveText: (channel: string, func: (event: Event, text: string) => void) => void,

            currentList: Promise<Task[]>,
            saveCurrentList: (currentList: Task[]) => void,
            addToCurrentList: (task: Task) => void,
            deleteFromCurrentList: (id: string) => void,
        },
    }
}