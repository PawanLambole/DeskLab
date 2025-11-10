import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Get available screens/windows for capture
  getSources: () => ipcRenderer.invoke('get-sources'),
  
  // Get app version
  getVersion: () => ipcRenderer.invoke('get-version'),
  
  // Check if running in Electron
  isElectron: () => ipcRenderer.invoke('is-electron'),
  
  // Platform info
  platform: process.platform,
  
  // Remote control APIs
  setRemoteControl: (enabled: boolean) => ipcRenderer.invoke('set-remote-control', enabled),
  isRemoteControlEnabled: () => ipcRenderer.invoke('is-remote-control-enabled'),
  remoteMouseMove: (x: number, y: number) => ipcRenderer.invoke('remote-mouse-move', { x, y }),
  remoteMouseClick: (button: 'left' | 'right' | 'middle', double?: boolean) => 
    ipcRenderer.invoke('remote-mouse-click', { button, double }),
  remoteMouseScroll: (deltaX: number, deltaY: number) => 
    ipcRenderer.invoke('remote-mouse-scroll', { deltaX, deltaY }),
  remoteKeyPress: (key: string, modifiers?: string[]) => 
    ipcRenderer.invoke('remote-key-press', { key, modifiers }),
  remoteTypeString: (text: string) => ipcRenderer.invoke('remote-type-string', { text }),
  getScreenSize: () => ipcRenderer.invoke('get-screen-size'),

  // ============================================
  // AUTO-UPDATE APIs
  // ============================================
  
  // Check for updates manually
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  
  // Download update
  downloadUpdate: () => ipcRenderer.invoke('download-update'),
  
  // Quit and install update
  quitAndInstall: () => ipcRenderer.invoke('quit-and-install'),
  
  // Listen for update status changes
  onUpdateStatus: (callback: (status: any) => void) => {
    const subscription = (_event: any, status: any) => callback(status);
    ipcRenderer.on('update-status', subscription);
    
    // Return unsubscribe function
    return () => {
      ipcRenderer.removeListener('update-status', subscription);
    };
  },
});

// Type definitions for TypeScript
export interface ElectronAPI {
  getSources: () => Promise<Array<{
    id: string;
    name: string;
    thumbnail: string;
  }>>;
  getVersion: () => Promise<string>;
  isElectron: () => Promise<boolean>;
  platform: string;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
