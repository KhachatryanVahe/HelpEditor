const {app, BrowserWindow} = require('electron')
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 600,
    title:'Help editor',
    webPreferences: {
      nodeIntegration: true
    },
    icon: __dirname + './favicon.png'
  })
  let HOST = process.env.HOST || "localhost"
  let PORT = process.env.PORT || 3001
  mainWindow.loadURL(isDev ?
    `http://${HOST}:${PORT}` :
    `file://${path.join(__dirname, '../build/index.html')}`
  )
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

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