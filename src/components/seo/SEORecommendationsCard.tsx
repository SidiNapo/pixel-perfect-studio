import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
}

interface SEORecommendationsCardProps {
  recommendations: Recommendation[];
  delay?: number;
}

export default function SEORecommendationsCard({ recommendations, delay = 0 }: SEORecommendationsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 hover:scale-[1.02] transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-500/20">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Recommendations</h3>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.1 * index }}
            className="group"
          >
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-purple-400">{index + 1}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1">{rec.title}</h4>
                <p className="text-xs text-muted-foreground">{rec.description}</p>
                <button className="mt-2 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
