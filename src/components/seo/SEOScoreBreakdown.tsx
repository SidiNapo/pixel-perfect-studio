import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Shield, Zap, FileText, Link2, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ScoreBreakdownItem {
  category: string;
  points: number;
  maxPoints: number;
  details: string;
}

interface SEOScoreBreakdownProps {
  breakdown: ScoreBreakdownItem[];
  delay?: number;
}

const categoryIcons: Record<string, typeof Shield> = {
  'Technical': Shield,
  'On-Page': FileText,
  'Content': Zap,
  'Links': Link2,
  'Social': Share2,
};

export default function SEOScoreBreakdown({ breakdown, delay = 0 }: SEOScoreBreakdownProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const { t } = useTranslation();

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-emerald-500';
    if (percentage >= 70) return 'bg-lime-500';
    if (percentage >= 50) return 'bg-amber-500';
    if (percentage >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProgressBgColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-emerald-500/20';
    if (percentage >= 70) return 'bg-lime-500/20';
    if (percentage >= 50) return 'bg-amber-500/20';
    if (percentage >= 30) return 'bg-orange-500/20';
    return 'bg-red-500/20';
  };

  const totalPoints = breakdown.reduce((acc, item) => acc + item.points, 0);
  const totalMaxPoints = breakdown.reduce((acc, item) => acc + item.maxPoints, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl bg-white/5 backdrop-blur-xl border border-purple-500/20 overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{t('seoEnhanced.scoreBreakdown')}</h3>
              <p className="text-xs text-muted-foreground">{t('seoEnhanced.categoryDetails')}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-400">{totalPoints}<span className="text-sm text-muted-foreground">/{totalMaxPoints}</span></p>
            <p className="text-xs text-muted-foreground">{t('seoResults.points')}</p>
          </div>
        </div>
      </div>
      
      {/* Category List */}
      <div className="divide-y divide-white/5">
        {breakdown.map((item, index) => {
          const percentage = (item.points / item.maxPoints) * 100;
          const Icon = categoryIcons[item.category] || Shield;
          const isExpanded = expandedCategories.includes(item.category);
          
          return (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 * index }}
            >
              <Collapsible open={isExpanded} onOpenChange={() => toggleCategory(item.category)}>
                <CollapsibleTrigger className="w-full p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${getProgressBgColor(percentage)}`}>
                      <Icon className="w-4 h-4 text-foreground" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{item.category}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${percentage === 100 ? 'text-emerald-400' : percentage >= 70 ? 'text-lime-400' : percentage >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                            {item.points}/{item.maxPoints}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className={`h-2 rounded-full ${getProgressBgColor(percentage)} overflow-hidden`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: delay + 0.2 + 0.1 * index, ease: "easeOut" }}
                          className={`h-full rounded-full ${getProgressColor(percentage)}`}
                        />
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-4 pb-4 ms-12"
                  >
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                    </div>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
