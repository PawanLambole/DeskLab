import { Monitor, Mouse, RefreshCw, Lock, Hash, Zap } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: <Monitor size={28} />,
      title: 'Screen Sharing',
      description: 'Share your entire screen or specific windows with crystal-clear quality. Multi-monitor support included.'
    },
    {
      icon: <Mouse size={28} />,
      title: 'Remote Control',
      description: 'Take full control with mouse, keyboard, and scroll support. Works seamlessly across networks.'
    },
    {
      icon: <RefreshCw size={28} />,
      title: 'Auto Updates',
      description: 'Never miss a feature. Automatic updates via GitHub Releases keep you always up-to-date.'
    },
    {
      icon: <Lock size={28} />,
      title: 'Secure P2P',
      description: 'Direct peer-to-peer connections using WebRTC. Your data stays between you and your peer.'
    },
    {
      icon: <Hash size={28} />,
      title: 'Simple Codes',
      description: 'Connect using easy 6-digit room codes. No complex setup or configuration required.'
    },
    {
      icon: <Zap size={28} />,
      title: 'Lightning Fast',
      description: 'Built with Electron and React for native performance. Minimal latency, maximum productivity.'
    }
  ]

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-description">
            Everything you need for professional remote desktop sharing
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
