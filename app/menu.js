const { Menu } = require('electron')

const template = [{
  label: 'Android Messages',
  submenu: [
    { role: 'about' },
    { type: 'separator' },
    { role: 'quit' }
  ]
},{
  label: 'Edit',
  submenu: [
    {role: 'undo'},
    {role: 'redo'},
    {type: 'separator'},
    {role: 'cut'},
    {role: 'copy'},
    {role: 'paste'},
    {role: 'delete'},
    {role: 'selectall'}
  ]
}]

exports.init = function(win){
  let menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}