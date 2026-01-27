import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOScoreCardProps {
  score: number;
  delay?: number;
}

export default function SEOScoreCard({ score, delay = 0 }: SEOScoreCardProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const { t } = useTranslation();
  
  const getScoreColor = (value: number) => {
    if (value <= 40) return '#ef4444';
    if (value <= 70) return '#f59e0b';
    return '#10b981';
  };

  const getScoreDescription = (value: number) => {
    if (value > 70) return t('seoResults.excellent');
    if (value > 40) return t('seoResults.good');
    return t('seoResults.needsWork');
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = score / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(interval);
        } else {
          setDisplayScore(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay * 1000 + 300);

    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 hover:scale-[1.02] transition-all duration-300"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="rgba(139, 92, 246, 0.2)"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <motion.circle
              cx="64"
              cy="64"
              r="45"
              stroke={getScoreColor(score)}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
            />
          </svg>
          {/* Score number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-4xl font-bold"
              style={{ color: getScoreColor(displayScore) }}
            >
              {displayScore}
            </span>
          </div>
        </div>
        
        <h3 className="mt-4 text-lg font-semibold text-foreground">{t('analyzer.overallScore')}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {getScoreDescription(score)}
        </p>
      </div>
    </motion.div>
  );
}
