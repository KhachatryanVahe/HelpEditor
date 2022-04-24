const {
    app,
    BrowserWindow,
    Menu,
    dialog
} = require('electron')
const fs = require('fs');

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open File',
                accelerator: 'CommandOrControl+O',
                click() {
                    dialog.showOpenDialog({
                        title: 'Open file',
                        defaultPath: app.getPath('documents'),
                        buttonLabel: 'Open',
                        properties: ['openFile'],
                        filters: [
                            {name: 'HTML files', extensions: ['html']},
                            {name: 'All Files', extensions: ['*']}
                        ]
                    })
                    .then((file) => {
                        if (!file.canceled) {
                            fs.readFile(file.filePaths[0], 'utf-8', (err, data) => {
                                if(err){
                                  console.log("An error ocurred reading the file :" + err.message);
                                  return
                                }
                                const focusedWindow = BrowserWindow.getFocusedWindow();
                                focusedWindow.webContents.send('open-file', data)
                            })
                        }
                    })
                    .catch(function(err) {
                        console.error(err)
                    })
                },
            },
            {
                label: 'Save file',
                accelerator: 'CommandOrControl+S',
                click: () => {
                    const focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('save-file')
                }
            },
            {
                label: 'Add template',
                accelerator: 'CommandOrControl+Shift+A',
                click: () => {
                    const focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('add-template')
                }
            },
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
            { type: 'separator' },
            { role: 'selectAll' }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            { role: 'close' }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: async () => {
                    const { shell } = require('electron')
                    await shell.openExternal('https://electronjs.org')
                }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
module.exports = menu