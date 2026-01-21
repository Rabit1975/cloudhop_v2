import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;

// --- GPU FALLBACK (fixes invisible window) ---
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');

// --- RETRY LOADER (fixes ERR_CONNECTION_REFUSED) ---
async function loadWithRetry(win: BrowserWindow, url: string, retries = 20, delay = 300) {
  for (let i = 0; i < retries; i++) {
    try {
      await win.loadURL(url);
      return;
    } catch (err) {
      console.log(`Retry ${i + 1}/${retries} failed...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  console.error("Failed to load URL after retries");
}

const isDev = !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 640,
    backgroundColor: '#1e1e1e',
    transparent: false,
    frame: true,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: false, // Disabled for debugging/compatibility
      nodeIntegration: false,
      devTools: isDev,
    },
  });

  mainWindow.webContents.on('render-process-gone', (event, details) => {
    console.log('Renderer crashed:', details);
    // Prevent the window from closing (if supported by event, otherwise just logs)
    // event.preventDefault(); // Note: 'render-process-gone' isn't cancellable in all versions, but logging helps.
  });

  mainWindow.on('unresponsive', () => {
    console.log('Window became unresponsive');
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });

  if (isDev) {
    loadWithRetry(mainWindow, 'http://127.0.0.1:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC
ipcMain.handle('window:minimize', () => mainWindow?.minimize());
ipcMain.handle('window:maximize', () => {
  if (!mainWindow) return;
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
ipcMain.handle('window:close', () => mainWindow?.close());