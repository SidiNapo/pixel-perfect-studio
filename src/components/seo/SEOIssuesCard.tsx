import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface Issue {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
}

interface SEOIssuesCardProps {
  issues: Issue[];
  delay?: number;
}

export default function SEOIssuesCard({ issues, delay = 0 }: SEOIssuesCardProps) {
  const getSeverityColor = (severity: Issue['severity']) => {
    switch (severity) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Low': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 hover:scale-[1.02] transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Issues Found</h3>
        <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-red-500/20 text-red-400">
          {issues.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {issues.map((issue, index) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.1 * index }}
            className="flex items-start gap-3 py-2"
          >
            <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getSeverityColor(issue.severity)}`}>
              {issue.severity}
            </span>
            <span className="text-sm text-muted-foreground flex-1">{issue.title}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
