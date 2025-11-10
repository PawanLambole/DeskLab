import { useState } from 'react'
import { Monitor, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <a href="#" className="logo">
          <Monitor size={32} />
          <span>DeskLab</span>
        </a>

        <div className="nav-links desktop-only">
          <a onClick={() => scrollTo('features')}>Features</a>
          <a onClick={() => scrollTo('how-it-works')}>How It Works</a>
          <a onClick={() => scrollTo('download')}>Download</a>
          <a onClick={() => scrollTo('faq')}>FAQ</a>
          <a href="https://github.com/PawanLambole/DeskLab" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a onClick={() => scrollTo('features')}>Features</a>
          <a onClick={() => scrollTo('how-it-works')}>How It Works</a>
          <a onClick={() => scrollTo('download')}>Download</a>
          <a onClick={() => scrollTo('faq')}>FAQ</a>
          <a href="https://github.com/PawanLambole/DeskLab" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      )}
    </nav>
  )
}
