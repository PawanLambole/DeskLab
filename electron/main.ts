import { app, BrowserWindow, desktopCapturer, ipcMain, screen } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

// ============================================
// AUTO-UPDATE CONFIGURATION
// ============================================

// Configure auto-updater logging
autoUpdater.logger = console;

// Auto-download updates when found
autoUpdater.autoDownload = false; // We'll trigger download manually for better UX

// Auto-install updates on quit
autoUpdater.autoInstallOnAppQuit = true;

let mainWindow: BrowserWindow | null = null;
let isRemoteControlEnabled = false;

// Try to load robotjs, fallback if not available
let robot: any = null;
try {
  robot = require('robotjs');
  console.log('✅ robotjs loaded successfully - Remote control ENABLED');
} catch (error) {
  console.warn('⚠️  robotjs not available - Remote control DISABLED');
  console.warn('To enable: Install Python 3 and Visual Studio Build Tools, then run: npx electron-rebuild');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
    title: 'DeskLab - Remote Desktop',
    autoHideMenuBar: !isDev,
  });

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // ============================================
  // CHECK FOR UPDATES ON APP READY (Production only)
  // ============================================
  if (!isDev) {
    // Wait 3 seconds after app starts, then check for updates
    setTimeout(() => {
      console.log('🔍 Checking for updates...');
      autoUpdater.checkForUpdates();
    }, 3000);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers

// Get available screens/sources for screen sharing
ipcMain.handle('get-sources', async () => {
  try {
    const sources = await desktopCapturer.getSources({
      types: ['window', 'screen'],
      thumbnailSize: { width: 150, height: 150 },
    });

    return sources.map((source) => ({
      id: source.id,
      name: source.name,
      thumbnail: source.thumbnail.toDataURL(),
    }));
  } catch (error) {
    console.error('Error getting sources:', error);
    return [];
  }
});

// Get app version
ipcMain.handle('get-version', () => {
  return app.getVersion();
});

// Check if running in Electron
ipcMain.handle('is-electron', () => {
  return true;
});

// Remote Control Handlers

// Enable/disable remote control
ipcMain.handle('set-remote-control', async (_event, enabled: boolean) => {
  if (!robot) {
    console.warn('Cannot enable remote control - robotjs not available');
    return false;
  }
  isRemoteControlEnabled = enabled;
  console.log(`Remote control ${enabled ? 'ENABLED' : 'DISABLED'}`);
  return isRemoteControlEnabled;
});

// Check if remote control is enabled
ipcMain.handle('is-remote-control-enabled', () => {
  return robot !== null && isRemoteControlEnabled;
});

// Execute mouse move
ipcMain.handle('remote-mouse-move', async (_event, data: { x: number; y: number }) => {
  if (!isRemoteControlEnabled || !robot) {
    return { success: false, error: 'Remote control not available' };
  }
  
  try {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.size;
    
    // Convert relative coordinates (0-1) to absolute
    const absoluteX = Math.round(data.x * width);
    const absoluteY = Math.round(data.y * height);
    
    robot.moveMouse(absoluteX, absoluteY);
    return { success: true };
  } catch (error) {
    console.error('Error moving mouse:', error);
    return { success: false, error: String(error) };
  }
});

// Execute mouse click
ipcMain.handle('remote-mouse-click', async (_event, data: { button: 'left' | 'right' | 'middle'; double?: boolean }) => {
  if (!isRemoteControlEnabled || !robot) {
    return { success: false, error: 'Remote control not available' };
  }
  
  try {
    if (data.double) {
      robot.mouseClick(data.button, true);
    } else {
      robot.mouseClick(data.button);
    }
    return { success: true };
  } catch (error) {
    console.error('Error clicking mouse:', error);
    return { success: false, error: String(error) };
  }
});

// Execute mouse scroll
ipcMain.handle('remote-mouse-scroll', async (_event, data: { deltaX: number; deltaY: number }) => {
  if (!isRemoteControlEnabled || !robot) {
    return { success: false, error: 'Remote control not available' };
  }
  
  try {
    robot.scrollMouse(data.deltaX, data.deltaY);
    return { success: true };
  } catch (error) {
    console.error('Error scrolling mouse:', error);
    return { success: false, error: String(error) };
  }
});

// Execute key press
ipcMain.handle('remote-key-press', async (_event, data: { key: string; modifiers?: string[] }) => {
  if (!isRemoteControlEnabled || !robot) {
    return { success: false, error: 'Remote control not available' };
  }
  
  try {
    if (data.modifiers && data.modifiers.length > 0) {
      robot.keyTap(data.key, data.modifiers as any);
    } else {
      robot.keyTap(data.key);
    }
    return { success: true };
  } catch (error) {
    console.error('Error pressing key:', error);
    return { success: false, error: String(error) };
  }
});

// Type text
ipcMain.handle('remote-type-string', async (_event, data: { text: string }) => {
  if (!isRemoteControlEnabled || !robot) {
    return { success: false, error: 'Remote control not available' };
  }
  
  try {
    robot.typeString(data.text);
    return { success: true };
  } catch (error) {
    console.error('Error typing string:', error);
    return { success: false, error: String(error) };
  }
});

// Get screen size
ipcMain.handle('get-screen-size', () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  return primaryDisplay.size;
});

// ============================================
// AUTO-UPDATE IPC HANDLERS
// ============================================

// Manual check for updates (triggered from UI)
ipcMain.handle('check-for-updates', async () => {
  if (isDev) {
    return { 
      success: false, 
      message: 'Updates disabled in development mode' 
    };
  }
  
  try {
    const result = await autoUpdater.checkForUpdates();
    return { success: true, updateInfo: result };
  } catch (error) {
    console.error('Error checking for updates:', error);
    return { success: false, error: String(error) };
  }
});

// Download update (when user clicks "Update Now")
ipcMain.handle('download-update', async () => {
  try {
    await autoUpdater.downloadUpdate();
    return { success: true };
  } catch (error) {
    console.error('Error downloading update:', error);
    return { success: false, error: String(error) };
  }
});

// Quit and install update
ipcMain.handle('quit-and-install', () => {
  autoUpdater.quitAndInstall(false, true);
});

// ============================================
// AUTO-UPDATER EVENT LISTENERS
// ============================================

// Checking for updates
autoUpdater.on('checking-for-update', () => {
  console.log('🔍 Checking for updates...');
  mainWindow?.webContents.send('update-status', {
    status: 'checking',
    message: 'Checking for updates...'
  });
});

// Update available
autoUpdater.on('update-available', (info) => {
  console.log('✅ Update available:', info.version);
  mainWindow?.webContents.send('update-status', {
    status: 'available',
    message: `New version ${info.version} is available!`,
    version: info.version,
    releaseNotes: info.releaseNotes,
    releaseDate: info.releaseDate
  });
});

// No update available
autoUpdater.on('update-not-available', (info) => {
  console.log('✅ App is up to date:', info.version);
  mainWindow?.webContents.send('update-status', {
    status: 'not-available',
    message: 'You have the latest version',
    version: info.version
  });
});

// Update download progress
autoUpdater.on('download-progress', (progressObj) => {
  const percent = Math.round(progressObj.percent);
  console.log(`📥 Downloading update: ${percent}%`);
  mainWindow?.webContents.send('update-status', {
    status: 'downloading',
    message: `Downloading update: ${percent}%`,
    percent: percent,
    bytesPerSecond: progressObj.bytesPerSecond,
    transferred: progressObj.transferred,
    total: progressObj.total
  });
});

// Update downloaded and ready to install
autoUpdater.on('update-downloaded', (info) => {
  console.log('✅ Update downloaded:', info.version);
  mainWindow?.webContents.send('update-status', {
    status: 'downloaded',
    message: 'Update ready to install!',
    version: info.version
  });
});

// Error during update
autoUpdater.on('error', (error) => {
  console.error('❌ Update error:', error);
  mainWindow?.webContents.send('update-status', {
    status: 'error',
    message: 'Error checking for updates',
    error: String(error)
  });
});
