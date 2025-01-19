const { exec } = require('child_process');
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('system', {
    lockScreen: () => {
        exec('rundll32.exe user32.dll,LockWorkStation', (error) => {
            if (error) {
                console.error(`Error locking screen: ${error}`);
            }
        });
    },
});