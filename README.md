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

## Usage
 A `.zip` and `.tar.gz` file containing builds of the app can be found on [latest releases page](https://github.com/sdiv877/today-list/releases/latest).  
 
 Builds are currently only available for Windows and Linux, however the steps in the [building](#building) section can be used to compile for Mac.

 1. Download the latest release.
 2. Extract the files to a location of your choice.
 3. Run the `today-list.exe` file.

## Building
 You will need Node.js installed.  
 Download the repository, set the `DEBUG` flag in `src/common/utils/debug.ts` to `false` and in the root directory run:

 ```shell
 > npm install
 > npm run make
 ```

 The generated build should be stored in the `out/` directory at the root of the repo.

## Debugging
 You will need Node.js installed.  
 Download the repository and in the root directory run:

 ```shell
 > npm install
 > npm start
 ```
 
 Files created during debugging are stored in the `.debug_user/` directory in the root of the repo - assuming the `DEBUG` variable is set to `true`.

## Sample Images
 ![Current Tasks Image](https://i.imgur.com/vgz2Lv7.png)  
 ![Statistics Image](https://i.imgur.com/LfGVyaP.png)
