export default function FAQ() {
  const faqs = [
    {
      question: 'Is DeskLab really free?',
      answer: 'Yes! DeskLab is completely free and open source. No hidden costs, no subscriptions, no premium features.'
    },
    {
      question: 'How secure is DeskLab?',
      answer: 'DeskLab uses WebRTC for direct peer-to-peer connections. Your data travels directly between computers without going through our servers.'
    },
    {
      question: 'Can I use it for work?',
      answer: 'Absolutely! DeskLab is perfect for remote support, presentations, pair programming, and team collaboration.'
    },
    {
      question: 'What about Mac and Linux?',
      answer: 'Currently, DeskLab is available for Windows. Mac and Linux versions are in development and coming soon!'
    },
    {
      question: 'How do automatic updates work?',
      answer: 'DeskLab checks for updates on startup and notifies you when a new version is available. One-click update and restart!'
    },
    {
      question: 'Can I record sessions?',
      answer: 'Session recording is planned for a future update. For now, you can use external screen recording software.'
    }
  ]

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Got questions? We've got answers
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
