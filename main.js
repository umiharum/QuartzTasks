const {app,BrowserWindow,ipcMain} = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'assets/icon.png'),
        title: 'Quartz Tasks',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
        autoHideMenuBar: true
    });
    
    win.loadFile('start.html');
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
}
);

ipcMain.on('load-page', (event, page) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.loadFile(page);
});