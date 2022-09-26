import { ipcMainManager, IpcListenerInitializer } from "../ipc-manager";
import { IpcEvents } from "../../../common/ipc/ipc-events";
import { createTask, deleteTask, getAllTasks, updateTask } from "../../files/database";

export const initTaskListeners: IpcListenerInitializer = () => {
  ipcMainManager.handle(IpcEvents.TASK_CREATE, (event, newTask) => {
    return createTask(newTask);
  });

  ipcMainManager.handle(IpcEvents.TASK_GET_ALL, (event, status) => {
    return getAllTasks(status);
  });

  ipcMainManager.handle(IpcEvents.TASK_UPDATE, (event, updatedTask) => {
    updateTask(updatedTask);
  });

  ipcMainManager.handle(IpcEvents.TASK_DELETE, (event, idToDelete) => {
    deleteTask(idToDelete);
  })
};
