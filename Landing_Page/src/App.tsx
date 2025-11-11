import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Changelog from './components/Changelog';
import Download from './components/Download';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />
      <Hero />
      <Features />
      <Changelog />
      <Download />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
