import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Changelog from './components/Changelog';
import Download from './components/Download';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Changelog />
      <Download />
      <Footer />
    </div>
  );
}

export default App;
