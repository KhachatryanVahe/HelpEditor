const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog
} = require('electron')
const path = require('path');
const fs = require('fs');
const url = require('url');
const isDev = require('electron-is-dev');
const menu = require('./applicationMenu')

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 600,
    title:'Help editor',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: __dirname + '\\favicon.ico'
  })
  let HOST = process.env.HOST || "localhost"
  let PORT = process.env.PORT || 3001
  mainWindow.loadURL(isDev ?
    `http://${HOST}:${PORT}` :
    `file://${path.join(__dirname, '../build/index.html')}`
  )
  mainWindow.on('closed', function () {
    app.quit();
  })
}

ipcMain.on('save-file', (event, arg) => {
  console.log('arg = ', arg);
  saveToHTML(arg)
})

app.on('ready', () => {
  Menu.setApplicationMenu(menu);
  createWindow();
})

app.on('resize', function(e,x,y){
  mainWindow.setSize(x, y);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const saveToHTML = (data) => {
  let htmlText = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    ${data}
  </body>
</html>
`
  dialog.showSaveDialog({
    title: 'Select the File Path to save',
    defaultPath: path.join(__dirname, '../assets/sample.html'),
    buttonLabel: 'Save file',
    filters: [
      {name: 'HTML Files', extensions: ['html']},
      {name: 'All Files', extensions: ['*']}
    ],
  }).then(file => {
    if (!file.canceled) {
      fs.writeFile(file.filePath, htmlText, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }
  }).catch(err => {
    console.log(err)
  });
}