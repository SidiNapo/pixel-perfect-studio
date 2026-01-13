import { motion } from 'framer-motion';
import { LucideIcon, Check, X } from 'lucide-react';
import { ReactNode } from 'react';

interface MetricItem {
  label: string;
  value: string | number;
  passed?: boolean;
  subtitle?: string;
}

interface SEOMetricCardProps {
  title: string;
  icon: LucideIcon;
  metrics: MetricItem[];
  delay?: number;
}

export default function SEOMetricCard({ title, icon: Icon, metrics, delay = 0 }: SEOMetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 hover:scale-[1.02] transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20">
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.1 * index }}
            className="flex flex-col py-2 border-b border-white/5 last:border-0"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{metric.value}</span>
                {metric.passed !== undefined && (
                  metric.passed ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )
                )}
              </div>
            </div>
            {metric.subtitle && (
              <p className="mt-1 text-xs text-muted-foreground/70 italic truncate" title={metric.subtitle}>
                "{metric.subtitle}"
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
