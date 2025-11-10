import { Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <h4>DeskLab</h4>
            <p>
              Open source remote desktop application built with Electron, React, and WebRTC.
              Making remote collaboration accessible to everyone.
            </p>
            <div className="social-links">
              <a href="https://github.com/PawanLambole/DeskLab" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="mailto:contact@desklab.com">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#download">Download</a>
            <a href="https://github.com/PawanLambole/DeskLab/releases" target="_blank" rel="noopener noreferrer">
              Releases
            </a>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <a href="https://github.com/PawanLambole/DeskLab#readme" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
            <a href="https://github.com/PawanLambole/DeskLab/blob/main/AUTO-UPDATE-GUIDE.md" target="_blank" rel="noopener noreferrer">
              Auto-Update Guide
            </a>
            <a href="https://github.com/PawanLambole/DeskLab/issues" target="_blank" rel="noopener noreferrer">
              Support
            </a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="footer-col">
            <h4>Community</h4>
            <a href="https://github.com/PawanLambole/DeskLab" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://github.com/PawanLambole/DeskLab/issues" target="_blank" rel="noopener noreferrer">
              Issues
            </a>
            <a href="https://github.com/PawanLambole/DeskLab/discussions" target="_blank" rel="noopener noreferrer">
              Discussions
            </a>
            <a href="https://github.com/PawanLambole/DeskLab/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">
              Contributing
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} DeskLab. Open source under MIT License.</p>
          <p>Built with ❤️ using Electron, React, and TypeScript</p>
        </div>
      </div>
    </footer>
  )
}
