import { Download as DownloadIcon, Github } from 'lucide-react'

export default function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Download DeskLab now and experience seamless remote desktop sharing</p>
          
          <div className="cta-buttons">
            <a 
              href="https://github.com/PawanLambole/DeskLab/releases/latest/download/DeskLab-Setup-1.0.0.exe"
              className="btn btn-primary btn-large"
            >
              <DownloadIcon size={20} />
              Download for Windows
            </a>
            <a 
              href="https://github.com/PawanLambole/DeskLab"
              className="btn btn-secondary btn-large"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
              Star on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
