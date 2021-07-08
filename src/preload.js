const { contextBridge, ipcRenderer } = require('electron')

// Set up context bridge between the renderer process and the main process
contextBridge.exposeInMainWorld(
  'api',
  {
    // Declare access of window to .api by using the Window interface
    // Then in your renderer process you may call window.sendText('ping') etc.
    sendText: (channel, text) => ipcRenderer.send(channel, text),
    
    receiveText: (channel, func) => {
      ipcRenderer.on(channel, func);
    }
  }
)