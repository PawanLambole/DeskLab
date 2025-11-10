import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
              Desklab
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-sky-600 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-sky-600 transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('download')}
              className="text-gray-700 hover:text-sky-600 transition-colors font-medium"
            >
              Download
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-sky-600 transition-colors font-medium"
            >
              Contact
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('download')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Download
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
