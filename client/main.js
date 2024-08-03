const { app, BrowserWindow } = require('electron')
const path = require('path')

require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
  });

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    opacity: 0.9,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
  Menu.setApplicationMenu(null);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})