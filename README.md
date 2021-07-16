# today-list
An Electron app for organizing your daily tasks.

## Features
* A clear UI with a modern feel  
* Organization of tasks with due dates and times  
* A statistics tracker to get an idea of your productivity  
* App colour customization  

## Technology
* Electron
* React
* TypeScript
* SQLite (via better-sqlite3)
* electron-forge (packaging)

## Installation
### Installer
Installers are currently only available for Windows.  
An installer (labelled 'Setup') as well as a zip containing the packaged app can be found on the [latest releases page](https://github.com/sdiv877/today-list/releases/latest).

### Manual
You will need Node.js installed.  
Download the repository and in the root directory run:

`> npm install`  
`> npm start`  

From here if you would like to create an installer/packaged zip run:  

`> npm run make`  

It is recommended to changed the `DEBUG` variable in [`today-list/src/utils/debug.ts`](https://github.com/sdiv877/today-list/blob/main/src/utils/debug.ts) to `false` before creating an installer, to avoid unnecessary console logging during runtime.  

The files will be created in the root of the repo in a folder called 'out' (`today-list/out`).  

## Sample Images
![Current Tasks Image](https://i.imgur.com/vgz2Lv7.png)  
![Statistics Image](https://i.imgur.com/LfGVyaP.png)
