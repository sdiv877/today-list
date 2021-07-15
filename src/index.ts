import { app, BrowserWindow, ipcMain } from 'electron';

import { initDatabase, loadList, addToList, deleteFromList, clearList, deleteAllLists } from './utils/sqlite';
import { initUserData, loadUserData, saveUserData, deleteUserData } from './utils/user_data';
import { getGraphYearRange, getTasksGraphData, getTaskStats } from './utils/statistics';

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Initialise the db and user_data.json
  initDatabase();
  initUserData();

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    minHeight: 720,
    minWidth: 1280,

    backgroundColor: loadUserData().bg_colour === '' ? '#ffffff' : loadUserData().bg_colour,
    autoHideMenuBar: true,

    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// db requests and responses
ipcMain.on('request-list', (event, table) => {
  console.log('Renderer requested list from: ' + table)
  event.reply('response-list', loadList(table))
})

ipcMain.on('request-graph-data', (event, year) => {
  console.log('Renderer requested graph data from')
  event.reply('response-graph-data', getTasksGraphData(year))
});

ipcMain.on('request-graph-range', (event) => {
  console.log('Renderer requested graph range')
  event.reply('response-graph-range', getGraphYearRange())
});

ipcMain.on('request-annual-task-stats', (event, year) => {
  console.log('Renderer requested annual task-stats')
  event.reply('response-annual-task-stats', getTaskStats(year))
});

ipcMain.on('request-overall-task-stats', (event, year) => {
  console.log('Renderer requested overall task-stats')
  event.reply('response-overall-task-stats', getTaskStats(year))
});

ipcMain.on('addToList', (event, table, task) => {
  addToList(table, task);
});

ipcMain.on('deleteFromList', (event, table, task) => {
  deleteFromList(table, task);
});

ipcMain.on('deleteAllData', () => {
  deleteAllLists();
  deleteUserData();

  initDatabase();
  initUserData();

  BrowserWindow.getAllWindows()[0].reload();
});

// user_data requests and responses
ipcMain.on('saveUserData', (event, userData) => {
  console.log('Renderer requested saving of user data ' + JSON.stringify(userData))
  saveUserData(userData);
});

ipcMain.on('loadUserData', (event) => {
  console.log('Renderer requested loading of user data');
  event.reply('response-user-data', loadUserData());
});

// clearing deleted_tasks (RecycleBin) before closing app
app.on('before-quit', () => { clearList('deleted_tasks') })
