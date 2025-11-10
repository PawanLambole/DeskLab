export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Download & Install',
      description: 'Download DeskLab for Windows and run the installer. Launch the app in seconds.'
    },
    {
      number: '2',
      title: 'Choose Your Role',
      description: 'Click "Host" to share your screen, or "Viewer" to connect to someone else\'s screen.'
    },
    {
      number: '3',
      title: 'Connect & Share',
      description: 'Share the 6-digit code with your partner. Connect instantly and start collaborating!'
    }
  ]

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-description">
            Get started in 3 simple steps
          </p>
        </div>

        <div className="steps">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
