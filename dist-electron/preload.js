"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Only expose API if contextIsolation is enabled
if (process.contextIsolated) {
    try {
        electron_1.contextBridge.exposeInMainWorld('cloudhop', {
            window: {
                minimize: () => electron_1.ipcRenderer.invoke('window:minimize'),
                maximize: () => electron_1.ipcRenderer.invoke('window:maximize'),
                close: () => electron_1.ipcRenderer.invoke('window:close'),
            },
        });
    }
    catch (error) {
        console.error(error);
    }
}
else {
    // Fallback for when contextIsolation is disabled (though usually not recommended)
    // @ts-ignore
    window.cloudhop = {
        window: {
            minimize: () => electron_1.ipcRenderer.invoke('window:minimize'),
            maximize: () => electron_1.ipcRenderer.invoke('window:maximize'),
            close: () => electron_1.ipcRenderer.invoke('window:close'),
        },
    };
}
