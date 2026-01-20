import { contextBridge, ipcRenderer } from 'electron';

// Only expose API if contextIsolation is enabled
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('cloudhop', {
      window: {
        minimize: () => ipcRenderer.invoke('window:minimize'),
        maximize: () => ipcRenderer.invoke('window:maximize'),
        close: () => ipcRenderer.invoke('window:close'),
      },
    });
  } catch (error) {
    console.error(error);
  }
} else {
  // Fallback for when contextIsolation is disabled (though usually not recommended)
  // @ts-ignore
  window.cloudhop = {
    window: {
      minimize: () => ipcRenderer.invoke('window:minimize'),
      maximize: () => ipcRenderer.invoke('window:maximize'),
      close: () => ipcRenderer.invoke('window:close'),
    },
  };
}
