const { contextBridge, ipcRenderer } = require('electron')

// Set up context bridge between the renderer process and the main process
contextBridge.exposeInMainWorld(
  'api',
  {
    // Declare access of window to .api by using the Window interface
    // Then in your renderer process you may call window.sendRequest('request-loadCurrentList') etc.
    sendRequest: (channel) => ipcRenderer.send(channel),

    receiveResponse: (channel, func) => {
      ipcRenderer.on(channel, func);
    },

    removeAllListeners: (channel) => {
      ipcRenderer.removeAllListeners(channel);
      console.log('Attempted to removeListener from: ' + channel);
    },

    saveCurrentList: (currentList) => ipcRenderer.send('saveCurrentList', currentList),
    addToCurrentList: (task) => ipcRenderer.send('addToCurrentList', task),
    deleteFromCurrentList: (task) => ipcRenderer.send('deleteFromCurrentList', task),
  }
)