import { contextBridge, ipcRenderer } from 'electron';
import { LOG } from '../common/utils/debug'

contextBridge.exposeInMainWorld(
  'database',
  {
    sendTableRequest: (channel, table) => ipcRenderer.send(channel, table),
    receiveTableResponse: (channel, func) => {
      ipcRenderer.on(channel, func);
    },
    addToTable: (table, task) => ipcRenderer.send('addToList', table, task),
    deleteFromTable: (table, task) => ipcRenderer.send('deleteFromList', table, task),
  }
);

contextBridge.exposeInMainWorld(
  'user_data',
  {
    sendUserSettingsRequest: () => ipcRenderer.send('loadUserData'),
    receiveUserSettingsResponse: (channel, func) => {
      ipcRenderer.on(channel, func)
    },
    saveUserSettings: (userSettings) => ipcRenderer.send('saveUserData', userSettings),
    deleteAllData: () => ipcRenderer.send('deleteAllData'),
  }
);

contextBridge.exposeInMainWorld(
  'statistics',
  {
    getGraphData: (func) => {
      ipcRenderer.on('getGraphData', func);
    },
    getGraphRange: (func) => {
      ipcRenderer.on('getGraphRange', func);
    },
    getAnnualTaskStats: (func) => {
      ipcRenderer.on('getAnnualTaskStats', func);
    },
    getOverallTaskStats: (func) => {
      ipcRenderer.on('getOverallTaskStats', func);
    }
  }
)

contextBridge.exposeInMainWorld(
  'app',
  {
    removeAllListeners: (channel) => {
      ipcRenderer.removeAllListeners(channel);
      LOG('Attempted to remove listeners from: ' + channel);
    }
  }
);
