import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, CheckCircle2, AlertTriangle, Lightbulb, Calendar, ExternalLink, Download, Share2 } from 'lucide-react';
import { SEOResults, getScoreGrade, getScoreColorClass, getScoreBgClass } from './types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SEOResultsHeaderProps {
  results: SEOResults;
  onAnalyzeAgain: () => void;
}

export default function SEOResultsHeader({ results, onAnalyzeAgain }: SEOResultsHeaderProps) {
  const { t } = useTranslation();
  const [displayScore, setDisplayScore] = useState(0);
  const grade = getScoreGrade(results.score);
  
  // Calculate stats
  const passedChecks = results.scoreBreakdown?.reduce((acc, item) => acc + (item.points === item.maxPoints ? 1 : 0), 0) || 0;
  const totalChecks = results.scoreBreakdown?.length || 0;
  const issuesCount = results.issues?.length || 0;
  const recommendationsCount = results.recommendations?.length || 0;
  
  // Animate score counter
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = results.score / steps;
    let current = 0;
    
    const interval = setInterval(() => {
      current += increment;
      if (current >= results.score) {
        setDisplayScore(results.score);
        clearInterval(interval);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [results.score]);

  // Circle progress
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const getGradeColor = () => {
    if (results.score >= 90) return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40';
    if (results.score >= 70) return 'text-lime-400 bg-lime-500/20 border-lime-500/40';
    if (results.score >= 50) return 'text-amber-400 bg-amber-500/20 border-amber-500/40';
    if (results.score >= 30) return 'text-orange-400 bg-orange-500/20 border-orange-500/40';
    return 'text-red-400 bg-red-500/20 border-red-500/40';
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `SEO Analysis: ${results.url}`,
          text: `SEO Score: ${results.score}/100 (Grade: ${grade})`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(`SEO Analysis for ${results.url}\nScore: ${results.score}/100\nGrade: ${grade}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-purple-500/20 p-6 md:p-8"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        {/* Top Row - URL and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 flex-shrink-0">
              <Globe className="w-5 h-5 text-purple-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">{t('seoAnalyzer.analyzed')}</p>
              <a 
                href={results.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm md:text-base font-medium text-purple-400 hover:text-purple-300 flex items-center gap-1.5 truncate"
                dir="ltr"
              >
                {results.url.replace(/^https?:\/\//, '')}
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/10"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t('seoEnhanced.shareResults')}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button
              onClick={onAnalyzeAgain}
              variant="outline"
              size="sm"
              className="border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/10"
            >
              {t('seoAnalyzer.analyzeAnother')}
            </Button>
          </div>
        </div>
        
        {/* Main Content - Score and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-center">
          {/* Score Circle with Grade */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <svg className="w-40 h-40 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  stroke="rgba(139, 92, 246, 0.15)"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="54"
                  stroke={results.score >= 90 ? '#10b981' : results.score >= 70 ? '#84cc16' : results.score >= 50 ? '#f59e0b' : results.score >= 30 ? '#f97316' : '#ef4444'}
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              {/* Score in center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className={`text-4xl font-bold ${getScoreColorClass(displayScore)}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  {displayScore}
                </motion.span>
                <span className="text-xs text-muted-foreground mt-1">{t('seoResults.points')}</span>
              </div>
            </div>
            
            {/* Grade Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className={`px-6 py-2 rounded-xl border-2 font-bold text-2xl ${getGradeColor()}`}
            >
              {t('seoEnhanced.grade')} {grade}
            </motion.div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-muted-foreground">{t('seoEnhanced.passedChecks')}</span>
              </div>
              <p className="text-2xl font-bold text-emerald-400">{passedChecks}<span className="text-sm text-muted-foreground">/{totalChecks}</span></p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-600/5 border border-red-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-xs text-muted-foreground">{t('seoEnhanced.issuesFound')}</span>
              </div>
              <p className="text-2xl font-bold text-red-400">{issuesCount}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-600/5 border border-yellow-500/20 col-span-2 sm:col-span-1"
            >
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{t('seoEnhanced.recommendations')}</span>
              </div>
              <p className="text-2xl font-bold text-yellow-400">{recommendationsCount}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
