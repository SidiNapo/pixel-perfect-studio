import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronDown, ChevronUp, Copy, Check, ExternalLink, TrendingUp, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SEORecommendation } from './types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface SEORecommendationsCardProps {
  recommendations: SEORecommendation[];
  delay?: number;
}

export default function SEORecommendationsCard({ recommendations, delay = 0 }: SEORecommendationsCardProps) {
  const [expandedRec, setExpandedRec] = useState<string | null>(null);
  const [notedItems, setNotedItems] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { t } = useTranslation();

  const toggleExpand = (id: string) => {
    setExpandedRec(expandedRec === id ? null : id);
  };

  const toggleNoted = (id: string) => {
    setNotedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getImpactConfig = (impact?: 'High' | 'Medium' | 'Low') => {
    switch (impact) {
      case 'High':
        return { bgClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: t('seoEnhanced.impactHigh') };
      case 'Medium':
        return { bgClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30', label: t('seoEnhanced.impactMedium') };
      case 'Low':
        return { bgClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: t('seoEnhanced.impactLow') };
      default:
        return { bgClass: 'bg-purple-500/20 text-purple-400 border-purple-500/30', label: t('seoEnhanced.improvement') };
    }
  };

  // Sort by priority if available
  const sortedRecommendations = [...recommendations].sort((a, b) => 
    (a.priority || 999) - (b.priority || 999)
  );

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
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-500/20">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{t('reports.recommendations')}</h3>
              <p className="text-xs text-muted-foreground">{t('seoEnhanced.actionableSteps')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
              {recommendations.length}
            </Badge>
            {notedItems.length > 0 && (
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                {notedItems.length} {t('seoEnhanced.noted')}
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      {/* Recommendations List */}
      <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-sm text-muted-foreground">{t('seoResults.noRecommendations')}</p>
          </div>
        ) : (
          sortedRecommendations.map((rec, index) => {
            const impactConfig = getImpactConfig(rec.estimatedImpact);
            const isExpanded = expandedRec === rec.id;
            const isNoted = notedItems.includes(rec.id);
            
            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: delay + 0.05 * index }}
                className={`border rounded-xl overflow-hidden transition-all ${
                  isNoted 
                    ? 'border-emerald-500/30 bg-emerald-500/5' 
                    : 'border-white/10 hover:border-purple-500/30'
                }`}
              >
                <div className="flex items-start gap-3 p-4">
                  {/* Priority Number */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isNoted ? 'bg-emerald-500/20' : 'bg-purple-500/20'
                  }`}>
                    {isNoted ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="text-sm font-bold text-purple-400">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <button
                        onClick={() => toggleExpand(rec.id)}
                        className="flex-1 text-left"
                      >
                        <h4 className={`text-sm font-medium ${isNoted ? 'text-emerald-400 line-through' : 'text-foreground'}`}>
                          {rec.title}
                        </h4>
                      </button>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {rec.estimatedImpact && (
                          <Badge variant="outline" className={`text-xs ${impactConfig.bgClass}`}>
                            <TrendingUp className="w-3 h-3 me-1" />
                            {impactConfig.label}
                          </Badge>
                        )}
                        <button onClick={() => toggleExpand(rec.id)}>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{rec.description}</p>
                  </div>
                </div>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-white/10"
                    >
                      <div className="p-4 space-y-3">
                        {/* Steps */}
                        {rec.steps && rec.steps.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground">{t('seoEnhanced.steps')}:</p>
                            <ol className="space-y-2">
                              {rec.steps.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start gap-2 text-sm text-foreground">
                                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center justify-center">
                                    {stepIndex + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                        
                        {/* Example */}
                        {rec.example && (
                          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <p className="text-xs font-medium text-purple-400 mb-1">{t('seoEnhanced.example')}:</p>
                            <p className="text-sm text-foreground">{rec.example}</p>
                          </div>
                        )}
                        
                        {/* Code Snippet */}
                        {rec.codeSnippet && (
                          <div className="relative">
                            <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                              <p className="text-xs font-medium text-muted-foreground mb-2">{t('seoEnhanced.codeSnippet')}:</p>
                              <pre className="text-xs text-foreground font-mono overflow-x-auto whitespace-pre-wrap">
                                {rec.codeSnippet}
                              </pre>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 h-7 w-7 p-0"
                              onClick={() => copyToClipboard(rec.codeSnippet!, rec.id)}
                            >
                              {copiedId === rec.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </div>
                        )}
                        
                        {/* Mark as Noted */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`noted-${rec.id}`}
                              checked={isNoted}
                              onCheckedChange={() => toggleNoted(rec.id)}
                            />
                            <label 
                              htmlFor={`noted-${rec.id}`} 
                              className="text-xs text-muted-foreground cursor-pointer"
                            >
                              {t('seoEnhanced.markAsNoted')}
                            </label>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
