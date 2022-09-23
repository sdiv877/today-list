import { ipcRendererManager } from "../../renderer/src/ipc-manager";
import { IpcEvents } from "../ipc-events";
import { Task, NewTask, TaskStatus } from "../models/task.model";

export interface ITaskApi {
    create: (newTask: NewTask) => Promise<void>,
    getAll: (status: TaskStatus) => Promise<Task[]>,
    update: (updatedTask: Task) => Promise<void>,
    delete: (idToDelete: number) => Promise<void>
}

export const taskApi: ITaskApi = {
    create: (newTask) => {
        return ipcRendererManager.invoke(IpcEvents.TASK_CREATE, newTask);
    },
    getAll: (status) => {
        return ipcRendererManager.invoke(IpcEvents.TASK_GET_ALL, status);
    },
    update: (updatedTask) => {
        return ipcRendererManager.invoke(IpcEvents.TASK_UPDATE, updatedTask);
    },
    delete: (idToDelete) => {
        return ipcRendererManager.invoke(IpcEvents.TASK_DELETE, idToDelete);
    }
}
