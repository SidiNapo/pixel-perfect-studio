import { motion } from 'framer-motion';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { SEOIssue } from './types';

interface SEOIssuesCardProps {
  issues: SEOIssue[];
  delay?: number;
}

export default function SEOIssuesCard({ issues, delay = 0 }: SEOIssuesCardProps) {
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);

  const getSeverityColor = (severity: SEOIssue['severity']) => {
    switch (severity) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Low': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedIssue(expandedIssue === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
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
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {issues.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No issues found! Great job! 🎉
          </p>
        ) : (
          issues.map((issue, index) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: delay + 0.05 * index }}
              className="border border-white/10 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(issue.id)}
                className="w-full flex items-start gap-3 p-3 hover:bg-white/5 transition-colors text-left"
              >
                <span className={`px-2 py-0.5 text-xs font-medium rounded border flex-shrink-0 ${getSeverityColor(issue.severity)}`}>
                  {issue.severity}
                </span>
                <span className="text-sm text-foreground flex-1">{issue.title}</span>
                {expandedIssue === issue.id ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              
              {expandedIssue === issue.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-3 pb-3 space-y-2"
                >
                  <p className="text-xs text-muted-foreground">{issue.description}</p>
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <p className="text-xs text-muted-foreground">
                      <span className="text-purple-400 font-medium">Evidence: </span>
                      {issue.evidence}
                    </p>
                  </div>
                  <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
                    <p className="text-xs text-green-400">
                      <span className="font-medium">How to fix: </span>
                      {issue.fix}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
