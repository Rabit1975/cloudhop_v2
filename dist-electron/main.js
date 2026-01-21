"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
let mainWindow = null;
// --- GPU FALLBACK (fixes invisible window) ---
electron_1.app.commandLine.appendSwitch('disable-gpu');
electron_1.app.commandLine.appendSwitch('disable-gpu-compositing');
// --- RETRY LOADER (fixes ERR_CONNECTION_REFUSED) ---
async function loadWithRetry(win, url, retries = 20, delay = 300) {
    for (let i = 0; i < retries; i++) {
        try {
            await win.loadURL(url);
            return;
        }
        catch (err) {
            console.log(`Retry ${i + 1}/${retries} failed...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
    console.error("Failed to load URL after retries");
}
const isDev = !electron_1.app.isPackaged;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
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
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
// IPC
electron_1.ipcMain.handle('window:minimize', () => mainWindow?.minimize());
electron_1.ipcMain.handle('window:maximize', () => {
    if (!mainWindow)
        return;
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
electron_1.ipcMain.handle('window:close', () => mainWindow?.close());
