const { contextBridge, ipcRenderer } = require('electron')

import { consoleLog } from './utils/debug'

// Set up context bridge between the renderer process and the main process
contextBridge.exposeInMainWorld(
  'database',
  {
    // Declare access of window to .database etc by using the ./models/Window interface
    // Then in your renderer process you may call window.sendListRequest('request-list', 'current_tasks') etc.
    sendListRequest: (channel, table) => ipcRenderer.send(channel, table),

    receiveListResponse: (channel, func) => {
      ipcRenderer.on(channel, func);
    },

    addToList: (table, task) => ipcRenderer.send('addToList', table, task),
    deleteFromList: (table, task) => ipcRenderer.send('deleteFromList', table, task),
  }
);

contextBridge.exposeInMainWorld(
  'user_data',
  {
    saveUserData: (userData) => ipcRenderer.send('saveUserData', userData),

    sendUserDataRequest: () => ipcRenderer.send('loadUserData'),

    receiveUserDataResponse: (channel, func) => {
      ipcRenderer.on(channel, func)
    },

    deleteAllData: () => ipcRenderer.send('deleteAllData'),
  }
);

contextBridge.exposeInMainWorld(
  'statistics',
  {
    sendGraphDataRequest: (channel, year) => ipcRenderer.send(channel, year),

    receiveGraphDataResponse: (channel, func) => {
      ipcRenderer.on(channel, func)
    },

    receiveGraphRangeResponse: (channel, func) => {
      ipcRenderer.on(channel, func)
    },

    sendTaskStatsRequest: (channel, year) => ipcRenderer.send(channel, year),

    receiveTaskStatsResponse: (channel, func) => {
      ipcRenderer.on(channel, func)
    },
  }
)

contextBridge.exposeInMainWorld(
  'app',
  {
    removeAllListeners: (channel) => {
      ipcRenderer.removeAllListeners(channel);
      consoleLog('Attempted to remove listeners from: ' + channel);
    },
  }
);