import { Monitor, Eye } from 'lucide-react';

interface HomeProps {
  onSelectMode: (mode: 'host' | 'viewer') => void;
}

export default function Home({ onSelectMode }: HomeProps) {
  return (
    <div className="min-h-[calc(100vh-76px)] bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Welcome to BoltDesk
          </h2>
          <p className="text-lg text-gray-600">
            Share your screen instantly with anyone, anywhere
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => onSelectMode('host')}
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-blue-500 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="bg-blue-100 group-hover:bg-blue-500 rounded-full p-6 transition-colors duration-300">
                <Monitor className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Host</h3>
              <p className="text-gray-600 text-center">
                Share your screen with others
              </p>
              <div className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                Start Hosting
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelectMode('viewer')}
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-green-500 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="bg-green-100 group-hover:bg-green-500 rounded-full p-6 transition-colors duration-300">
                <Eye className="w-12 h-12 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Viewer</h3>
              <p className="text-gray-600 text-center">
                Watch someone's shared screen
              </p>
              <div className="mt-2 px-6 py-2 bg-green-500 text-white rounded-lg group-hover:bg-green-600 transition-colors duration-300">
                Join as Viewer
              </div>
            </div>
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Secure peer-to-peer connection using WebRTC technology
          </p>
        </div>
      </div>
    </div>
  );
}
