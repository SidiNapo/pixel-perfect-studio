import { motion } from 'framer-motion';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { SEORecommendation } from './types';

interface SEORecommendationsCardProps {
  recommendations: SEORecommendation[];
  delay?: number;
}

export default function SEORecommendationsCard({ recommendations, delay = 0 }: SEORecommendationsCardProps) {
  const [expandedRec, setExpandedRec] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedRec(expandedRec === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-500/20">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Recommendations</h3>
        <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
          {recommendations.length}
        </span>
      </div>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {recommendations.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No additional recommendations. Your page is well-optimized! ✨
          </p>
        ) : (
          recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: delay + 0.05 * index }}
              className="border border-white/10 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(rec.id)}
                className="w-full flex items-start gap-3 p-3 hover:bg-white/5 transition-colors text-left"
              >
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-purple-400">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">{rec.title}</h4>
                </div>
                {expandedRec === rec.id ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              
              {expandedRec === rec.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-3 pb-3 space-y-2"
                >
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                  {rec.example && (
                    <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20">
                      <p className="text-xs text-purple-300">
                        <span className="font-medium">Example: </span>
                        {rec.example}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
