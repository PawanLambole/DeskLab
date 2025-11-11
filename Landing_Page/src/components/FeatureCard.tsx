import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
      <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-sky-100 to-violet-100 dark:from-sky-900 dark:to-violet-900 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-sky-600 dark:text-sky-400" size={28} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}
