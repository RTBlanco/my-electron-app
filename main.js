const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  // i guess this might be an apple only issue because 
  // given that only mac keeps app open but closes the window
  // my guess i have somewhere reset the ipcMain.handle
  ipcMain.handle('ping', () => 'pong')
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') app.quit()
})