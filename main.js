const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');


const DOCKER_COMMAND = 'docker run --rm --name electron-sandbox alpine echo " Sandbox Container Ran Successfully at " $(date)';

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    
    ipcMain.handle('docker-start', async () => {
        return new Promise((resolve, reject) => {
          
            exec(DOCKER_COMMAND, (error, stdout, stderr) => {
                if (error) {
                    resolve(` Error: ${stderr || error.message}`);
                } else {
                    resolve(stdout);
                }
            });
        });
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});