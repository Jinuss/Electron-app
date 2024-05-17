/**
 *  主进程
 */
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const si = require('systeminformation');

si.system().then(data => console.log(data));
let win
const createWindow = () => {
    win = new BrowserWindow({
        title: "MonitorApp",
        width: 800,
        height: 600,
        // frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js') //预加载脚本
        }
    })

    win.setMenu(Menu.buildFromTemplate([]));
    
    win.loadFile('./dist/index.html')
}

const handleFileOpen = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (!canceled) {
        win.loadFile(filePaths[0])
    }
}

app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen)

    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
