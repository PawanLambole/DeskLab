import { Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <Zap className="w-7 h-7" fill="currentColor" />
          <h1 className="text-2xl font-bold tracking-tight">
            BoltDesk – Browser Remote Share
          </h1>
        </div>
      </div>
    </nav>
  );
}
