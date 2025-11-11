import { Download as DownloadIcon, HardDrive } from 'lucide-react';
import { config } from '../config';

export default function Download() {

  return (
    <section id="download" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-50 via-violet-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
            Download Desklab
          </h2>
          <p className="text-xl text-gray-600">
            Get started in minutes with a simple installation
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-violet-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>

          <div className="relative bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-sky-100 to-violet-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-5xl">⚡</span>
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Desklab for Windows
                </h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-600 mb-6">
                  <span className="inline-flex items-center px-3 py-1 bg-sky-50 text-sky-700 rounded-full font-medium">
                    Version {config.version}
                  </span>
                  <span className="flex items-center">
                    <HardDrive size={16} className="mr-1" />
                    {config.fileSize}
                  </span>
                </div>
                <a
                  href={config.downloadUrl}
                  download="DeskLab-Setup-1.0.0.exe"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sky-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <DownloadIcon className="mr-2" size={20} />
                  Download for Windows (.exe)
                </a>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-sky-600 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-gray-600">
                  <strong className="font-semibold text-gray-900">System Requirements:</strong> Compatible with Windows 10 and Windows 11.
                  Requires 100 MB of free disk space and an active internet connection for updates.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-sky-600 mb-2">1M+</div>
            <div className="text-gray-600">Downloads</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-violet-600 mb-2">4.8/5</div>
            <div className="text-gray-600">User Rating</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-sky-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
