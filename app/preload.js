const { ipcRenderer } = require('electron')

class CustomNotify extends window.Notification {
  constructor(message){
    ipcRenderer.send('notification-initiated', { message })
    return super(message)
  }
}

window.Notification = CustomNotify