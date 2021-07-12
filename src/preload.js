const { contextBridge, ipcRenderer } = require('electron')

// Set up context bridge between the renderer process and the main process
contextBridge.exposeInMainWorld(
  'api',
  {
    // Declare access of window to .api by using the Window interface
    // Then in your renderer process you may call window.sendListRequest('request-list', 'current_tasks') etc.
    sendListRequest: (channel, table) => ipcRenderer.send(channel, table),

    receiveListResponse: (channel, func) => {
      ipcRenderer.on(channel, func);
    },

    sendGraphDataRequest: (channel, year) => ipcRenderer.send(channel, year),

    receiveGraphDataResponse: (channel, func) => {
      ipcRenderer.on(channel, func)
    },

    removeAllListeners: (channel) => {
      ipcRenderer.removeAllListeners(channel);
      console.log('Attempted to remove listeners from: ' + channel);
    },

    addToList: (table, task) => ipcRenderer.send('addToList', table, task),
    deleteFromList: (table, task) => ipcRenderer.send('deleteFromList', table, task),
  }
)