const {
    BrowserWindow,
    Menu,
    dialog
} = require('electron')
const path = require('path');
const fs = require('fs');

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New File',
                accelerator: 'CommandOrControl+N',
                click() {
                  mainWindow.createWindow();
                }
            },
            {
                label: 'Open File',
                accelerator: 'CommandOrControl+O',
                click() {
                    dialog.showOpenDialog({
                        title : 'Open file',
                        defaultPath: path.join(__dirname, '../assets'),
                        buttonLabel : 'Open',
                        properties: ['openFile'],
                        filters :[
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