import { Download as DownloadIcon, Star, Monitor, Laptop } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <Star size={16} fill="currentColor" />
            <span>Open Source • Free Forever</span>
          </div>

          <h1 className="hero-title">
            Remote Desktop Sharing
            <br />
            <span className="gradient-text">Made Simple</span>
          </h1>

          <p className="hero-description">
            Share your screen and control remote computers with ease. 
            Professional-grade remote desktop application with automatic updates, 
            built on WebRTC for secure peer-to-peer connections.
          </p>

          <div className="hero-buttons">
            <a 
              href="https://github.com/PawanLambole/DeskLab/releases/latest/download/DeskLab-Setup-1.0.0.exe"
              className="btn btn-primary btn-large download-btn"
            >
              <DownloadIcon size={20} />
              Download for Windows
              <span className="btn-badge">v1.0.0</span>
            </a>
            <a 
              href="https://github.com/PawanLambole/DeskLab"
              className="btn btn-secondary btn-large"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <Monitor size={20} />
              <span>Multi-Monitor Support</span>
            </div>
            <div className="stat">
              <Laptop size={20} />
              <span>Windows • Mac • Linux</span>
            </div>
            <div className="stat">
              <Star size={20} />
              <span>Auto Updates</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="app-preview">
            <div className="preview-window">
              <div className="window-header">
                <div className="window-controls">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="window-title">DeskLab - Remote Desktop</div>
              </div>
              <div className="window-content">
                <div className="connection-demo">
                  <div className="demo-item">
                    <Monitor size={48} />
                    <span>Host PC</span>
                  </div>
                  <div className="demo-arrow">→</div>
                  <div className="demo-item">
                    <Laptop size={48} />
                    <span>Viewer PC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
