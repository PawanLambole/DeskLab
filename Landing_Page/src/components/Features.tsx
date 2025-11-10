import { RefreshCw, Monitor, Zap, Shield } from 'lucide-react';
import FeatureCard from './FeatureCard';

export default function Features() {
  const features = [
    {
      icon: RefreshCw,
      title: 'Auto Updates',
      description: 'Instantly get new versions with one click. Stay up-to-date with the latest features and improvements automatically.',
    },
    {
      icon: Monitor,
      title: 'Cross-Device Sync',
      description: 'Test and run Desklab on multiple PCs seamlessly. Your workspace follows you wherever you go.',
    },
    {
      icon: Zap,
      title: 'Lightweight & Fast',
      description: 'Built with Electron for efficiency. Minimal resource usage while delivering maximum performance.',
    },
    {
      icon: Shield,
      title: 'Secure Updates',
      description: 'Updates verified automatically with industry-standard security protocols. Your data stays protected.',
    },
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to supercharge your productivity in one elegant desktop application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
