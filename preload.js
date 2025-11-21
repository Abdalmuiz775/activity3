const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('sandboxAPI', {
    startSandbox: () => ipcRenderer.invoke('docker-start')
});