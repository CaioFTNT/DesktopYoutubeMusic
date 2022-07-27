const { app, BrowserView, BrowserWindow, ipcMain } = require('electron')

app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 300,
        minWidth: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false
        }
    })
    win.loadFile('src/index.html')

    const view = new BrowserView()
    win.setBrowserView(view)
    view.setBounds({ x: 0, y: 30, width: 800, height: 570 })
    view.setAutoResize({height: true, width: true})
    view.webContents.loadURL('https://music.youtube.com')
    ipcMain.on('close', ()=>{

        win.close()
    })
    ipcMain.on('min', ()=>{
        win.minimize()
    })
    ipcMain.on('max', ()=>{
        if (win.isMaximized() == false){win.maximize()}
        else{win.unmaximize()}
        
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})