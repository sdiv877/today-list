import { shell } from 'electron'

export const mainMenuTemplate: Electron.MenuItemConstructorOptions[] = [
    {
        label: 'File',
        submenu: [
            { role: 'quit' }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'delete' },
            { role: 'selectAll' }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { type: 'separator' },
            {
                role: 'zoomIn',
                accelerator: 'CmdOrCtrl+='
            },
            { role: 'zoomOut' },
            {
                role: 'resetZoom',
                label: 'Reset Zoom'
            },
            { type: 'separator' },
            { role: 'togglefullscreen' },
            { type: 'separator' },
            { role: 'toggleDevTools' },
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Repository Link',
                click: async (): Promise<void> => {
                    await shell.openExternal('https://github.com/sdiv877/today-list')
                }
            }
        ]
    }]