import { useState, useEffect } from 'react';
import { Monitor, X } from 'lucide-react';

interface ScreenSource {
  id: string;
  name: string;
  thumbnail: string;
}

interface ScreenSourcePickerProps {
  onSelect: (sourceId: string) => void;
  onCancel: () => void;
}

export default function ScreenSourcePicker({ onSelect, onCancel }: ScreenSourcePickerProps) {
  const [sources, setSources] = useState<ScreenSource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSources();
  }, []);

  const loadSources = async () => {
    try {
      if (window.electronAPI) {
        const availableSources = await window.electronAPI.getSources();
        setSources(availableSources);
      }
    } catch (error) {
      console.error('Error loading sources:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 rounded-full p-2">
              <Monitor className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Select Screen to Share</h2>
              <p className="text-sm text-gray-600">Choose a screen or window to share</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => onSelect(source.id)}
                  className="group relative bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-500 rounded-lg p-4 transition-all duration-200 text-left"
                >
                  <div className="aspect-video bg-gray-200 rounded-md overflow-hidden mb-3">
                    <img
                      src={source.thumbnail}
                      alt={source.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <Monitor className="w-4 h-4 text-gray-500 group-hover:text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600">
                      {source.name}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity"></div>
                </button>
              ))}
            </div>
          )}

          {!loading && sources.length === 0 && (
            <div className="text-center py-12">
              <Monitor className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No screens or windows available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
