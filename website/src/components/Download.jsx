import { Download as DownloadIcon, Monitor, CheckCircle } from 'lucide-react'

export default function Download() {
  return (
    <section id="download" className="download">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Download DeskLab</h2>
          <p className="section-description">
            Free and open source. Available for Windows
          </p>
        </div>

        <div className="download-card">
          <div>
            <div className="download-header">
              <Monitor size={64} className="download-logo" />
              <div>
                <h3>DeskLab for Windows</h3>
                <p>Version 1.0.0 • Windows 10/11</p>
              </div>
            </div>

            <ul className="download-features">
              <li>
                <CheckCircle size={20} />
                <span>Screen sharing & remote control</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Automatic updates</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Multi-monitor support</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Secure P2P connections</span>
              </li>
            </ul>
          </div>

          <div className="download-actions">
            <a 
              href="https://github.com/PawanLambole/DeskLab/releases/latest/download/DeskLab-Setup-1.0.0.exe"
              className="btn btn-primary btn-large download-btn"
            >
              <DownloadIcon size={20} />
              Download Now
              <span className="file-size">~70 MB</span>
            </a>
            <a 
              href="https://github.com/PawanLambole/DeskLab/releases"
              className="btn btn-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Releases
            </a>
          </div>
        </div>

        <div className="system-requirements">
          <h4>System Requirements</h4>
          <div className="requirements-grid">
            <div className="requirement">
              <strong>OS:</strong> Windows 10/11 (64-bit)
            </div>
            <div className="requirement">
              <strong>RAM:</strong> 4 GB minimum
            </div>
            <div className="requirement">
              <strong>Storage:</strong> 200 MB free space
            </div>
            <div className="requirement">
              <strong>Network:</strong> Broadband internet
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
