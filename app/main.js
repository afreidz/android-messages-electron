const os = require('os')
const path = require('path')
const MainMenu = require('./menu')
const { app, BrowserWindow, ipcMain, autoUpdater } = require('electron')

let platform = `${os.platform()}_${os.arch()}`
let version = app.getVersion()
let updateURL = `https://android-messages-electron-nuts.herokuapp.com/update/${platform}/${version}`


let win
function createWindow () {
  let preload = path.join(__dirname, 'preload.js')
  win = new BrowserWindow({ webPreferences: { preload } })
  
  MainMenu.init(win)
  win.maximize()
  win.loadURL('https://messages.android.com')
  win.on('closed', () => (win = null))
  win.on('focus', () => { app.dock.setBadge('') })
  
  ipcMain.on('notification-initiated', (e, data) => {
    if (!app.dock.getBadge()) app.dock.setBadge('●')
  })

  autoUpdater.setFeedURL(updateURL)
  autoUpdater.checkForUpdates()
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }

    dialog.showMessageBox(dialogOpts, response => {
      if (response === 0) autoUpdater.quitAndInstall()
    })
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') return app.quit()
})
app.on('activate', () => {
  if (win === null) return createWindow()
})
