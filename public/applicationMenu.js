const {
    Menu,
    ipcMain,
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
                click(item, focusedWindow) {
                    // mainProcess.getFileFromUser(focusedWindow);
                },
            },
            {
                label: 'Save file',
                accelerator: 'CommandOrControl+S',
                click: (a) => {
                    ipcMain.on('save-file', (event) => {
                        event.sender.send('save-file', true)

                        // dialog.showSaveDialog({
                        //     title: 'Select the File Path to save',
                        //     defaultPath: path.join(__dirname, 'assets/sample.html'),
                        //     // defaultPath: path.join(__dirname, '../assets/'),
                        //     buttonLabel: 'Save',
                        //     // Restricting the user to only Text Files.
                        //     filters: [
                        //         {
                        //             name: 'HTML Files',
                        //             extensions: ['html']
                        //         }, ],
                        //     properties: []
                        // }).then(file => {
                        //     // Stating whether dialog operation was cancelled or not.
                        //     console.log(file.canceled);
                        //     if (!file.canceled) {
                        //         console.log(file.filePath.toString());
                        //         // Creating and Writing to the sample.txt file
                        //         fs.writeFile(file.filePath.toString(), 'data', function (err) {
                        //             if (err) throw err;
                        //             console.log('Saved!');
                        //         });
                        //     }
                        // }).catch(err => {
                        //     console.log(err)
                        // });
                    })
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