import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Host from './components/Host';
import Viewer from './components/Viewer';
import UpdateNotification from './components/UpdateNotification';

type Mode = 'home' | 'host' | 'viewer';

function App() {
  const [mode, setMode] = useState<Mode>('home');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {mode === 'home' && <Home onSelectMode={setMode} />}
      {mode === 'host' && <Host onBack={() => setMode('home')} />}
      {mode === 'viewer' && <Viewer onBack={() => setMode('home')} />}
      
      {/* Auto-update notification (only shows in Electron) */}
      <UpdateNotification />
    </div>
  );
}

export default App;
