import { ipcMainManager, IpcListenerInitializer } from "./ipc-manager";
import { IpcEvents } from "../../common/ipc-events";
import { createTask, deleteTask, getAllTasks, updateTask } from "../files/database";

export const initTaskListeners: IpcListenerInitializer = () => {
  ipcMainManager.handle(IpcEvents.TASK_CREATE, (event, newTask) => {
    ipcMainManager.LOG('Renderer requested creation of '+ newTask.toString());
    return createTask(newTask);
  });

  ipcMainManager.handle(IpcEvents.TASK_GET_ALL, (event, status) => {
    ipcMainManager.LOG('Renderer requested all Tasks of status: '+ status);
    return getAllTasks(status);
  });

  ipcMainManager.handle(IpcEvents.TASK_UPDATE, (event, updatedTask) => {
    ipcMainManager.LOG('Renderer requested update of Task ID: ' + updatedTask.id);
    return updateTask(updatedTask);
  });

  ipcMainManager.handle(IpcEvents.TASK_DELETE, (event, idToDelete) => {
    ipcMainManager.LOG('Renderer requested deletion of Task ID: ' + idToDelete);
    return deleteTask(idToDelete);
  })
};
