import { Github, Mail } from 'lucide-react';
import { config } from '../config';

export default function Footer() {
  return (
    <footer id="contact" className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold">Desklab</span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href={config.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-sky-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href={`mailto:${config.email}`}
              className="flex items-center space-x-2 hover:text-sky-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
              <span className="text-sm">Email</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; 2025 Desklab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
