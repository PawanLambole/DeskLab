import { useEffect, useState } from 'react';
import { Download, X, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface UpdateStatus {
  status: 'checking' | 'available' | 'not-available' | 'downloading' | 'downloaded' | 'error';
  message: string;
  version?: string;
  releaseNotes?: string;
  percent?: number;
  error?: string;
}

export default function UpdateNotification() {
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    // Check if running in Electron
    const checkElectron = async () => {
      if (window.electronAPI) {
        try {
          const result = await window.electronAPI.isElectron();
          setIsElectron(result);
        } catch (error) {
          console.error('Error checking Electron:', error);
        }
      }
    };

    checkElectron();

    // Listen for update status changes
    if (window.electronAPI?.onUpdateStatus) {
      const unsubscribe = window.electronAPI.onUpdateStatus((status) => {
        console.log('📦 Update status:', status);
        setUpdateStatus(status);
        setIsVisible(true);

        // Auto-hide "not-available" and "checking" after 5 seconds
        if (status.status === 'not-available' || status.status === 'checking') {
          setTimeout(() => {
            setIsVisible(false);
          }, 5000);
        }
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, []);

  // Don't render if not Electron or no status
  if (!isElectron || !updateStatus || !isVisible) {
    return null;
  }

  const handleDownload = async () => {
    try {
      await window.electronAPI?.downloadUpdate();
    } catch (error) {
      console.error('Error downloading update:', error);
    }
  };

  const handleInstall = () => {
    window.electronAPI?.quitAndInstall();
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCheckUpdate = async () => {
    try {
      await window.electronAPI?.checkForUpdates();
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  };

  // Render different UI based on status
  const renderContent = () => {
    switch (updateStatus.status) {
      case 'checking':
        return (
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{updateStatus.message}</p>
            </div>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        );

      case 'available':
        return (
          <div className="flex items-center space-x-3">
            <Download className="w-5 h-5 text-green-500" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                Update Available: v{updateStatus.version}
              </p>
              <p className="text-sm text-gray-600">{updateStatus.message}</p>
            </div>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Update Now
            </button>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        );

      case 'not-available':
        return (
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{updateStatus.message}</p>
              <p className="text-sm text-gray-600">Version: {updateStatus.version}</p>
            </div>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        );

      case 'downloading':
        return (
          <div className="flex items-center space-x-3">
            <Download className="w-5 h-5 text-blue-500 animate-bounce" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{updateStatus.message}</p>
              {updateStatus.percent !== undefined && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${updateStatus.percent}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        );

      case 'downloaded':
        return (
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{updateStatus.message}</p>
              <p className="text-sm text-gray-600">
                Restart to install version {updateStatus.version}
              </p>
            </div>
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Restart Now
            </button>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        );

      case 'error':
        return (
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{updateStatus.message}</p>
              <p className="text-sm text-gray-600">{updateStatus.error}</p>
            </div>
            <button
              onClick={handleCheckUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Retry
            </button>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-slide-in">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4">
        {renderContent()}
      </div>
    </div>
  );
}
