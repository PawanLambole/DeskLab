import { ExternalLink } from 'lucide-react';
import { config } from '../config';

export default function Changelog() {
  const updates = [
    {
      version: '1.0.2',
      date: 'March 2025',
      changes: ['Bug fixes and performance improvements', 'Enhanced stability and reliability', 'UI polish and refinements'],
    },
    {
      version: '1.0.1',
      date: 'February 2025',
      changes: ['Added auto-update feature', 'Improved cross-device sync', 'Security enhancements'],
    },
    {
      version: '1.0.0',
      date: 'January 2025',
      changes: ['Initial release', 'Core productivity features', 'Windows 10 & 11 support'],
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
            What's New
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Track the latest improvements and features in Desklab
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {updates.map((update, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-sky-600 to-violet-600 text-white text-sm font-semibold rounded-full mb-2">
                    v{update.version}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{update.date}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {update.changes.map((change, changeIndex) => (
                  <li key={changeIndex} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-sky-600 dark:text-sky-400 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={`${config.githubUrl}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300"
          >
            View Full Release Notes
            <ExternalLink className="ml-2" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
