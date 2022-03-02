const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path');
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
  console.log('==== ', arg);

  // Synchronous event emmision
  event.returnValue = 'sync pong'
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