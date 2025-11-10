/// <reference types="vite/client" />

interface UpdateStatus {
  status: 'checking' | 'available' | 'not-available' | 'downloading' | 'downloaded' | 'error';
  message: string;
  version?: string;
  releaseNotes?: string;
  releaseDate?: string;
  percent?: number;
  bytesPerSecond?: number;
  transferred?: number;
  total?: number;
  error?: string;
}

interface ElectronAPI {
  getSources: () => Promise<Array<{
    id: string;
    name: string;
    thumbnail: string;
  }>>;
  getVersion: () => Promise<string>;
  isElectron: () => Promise<boolean>;
  platform: string;
  
  // Remote control
  setRemoteControl: (enabled: boolean) => Promise<boolean>;
  isRemoteControlEnabled: () => Promise<boolean>;
  remoteMouseMove: (x: number, y: number) => Promise<{ success: boolean; error?: string }>;
  remoteMouseClick: (button: 'left' | 'right' | 'middle', double?: boolean) => Promise<{ success: boolean; error?: string }>;
  remoteMouseScroll: (deltaX: number, deltaY: number) => Promise<{ success: boolean; error?: string }>;
  remoteKeyPress: (key: string, modifiers?: string[]) => Promise<{ success: boolean; error?: string }>;
  remoteTypeString: (text: string) => Promise<{ success: boolean; error?: string }>;
  getScreenSize: () => Promise<{ width: number; height: number }>;

  // Auto-update
  checkForUpdates: () => Promise<{ success: boolean; message?: string; error?: string }>;
  downloadUpdate: () => Promise<{ success: boolean; error?: string }>;
  quitAndInstall: () => void;
  onUpdateStatus: (callback: (status: UpdateStatus) => void) => () => void;
}

interface Window {
  electronAPI?: ElectronAPI;
}
