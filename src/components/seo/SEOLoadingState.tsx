import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Settings, FileText, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const stages = [
  { key: 'connecting', icon: Globe, duration: 2000 },
  { key: 'technical', icon: Settings, duration: 2500 },
  { key: 'content', icon: FileText, duration: 2000 },
  { key: 'recommendations', icon: Lightbulb, duration: 1500 },
];

export default function SEOLoadingState() {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    let totalTime = 0;
    const timeouts: NodeJS.Timeout[] = [];

    stages.forEach((stage, index) => {
      if (index > 0) {
        totalTime += stages[index - 1].duration;
        
        const completeTimeout = setTimeout(() => {
          setCompletedStages(prev => [...prev, index - 1]);
        }, totalTime - 500);
        
        const stageTimeout = setTimeout(() => {
          setCurrentStage(index);
        }, totalTime);
        
        timeouts.push(completeTimeout, stageTimeout);
      }
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-12"
    >
      {/* Progress stages */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-purple-500/20">
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
            {t('seoEnhanced.analyzingWebsite')}
          </h3>
          
          <div className="space-y-4">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = currentStage === index;
              const isCompleted = completedStages.includes(index);
              
              return (
                <motion.div
                  key={stage.key}
                  initial={{ opacity: 0.5 }}
                  animate={{ 
                    opacity: isActive || isCompleted ? 1 : 0.5,
                  }}
                  className="flex items-center gap-4"
                >
                  <div className={`
                    relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                    ${isCompleted 
                      ? 'bg-emerald-500/20 border border-emerald-500/40' 
                      : isActive 
                        ? 'bg-purple-500/20 border border-purple-500/40' 
                        : 'bg-white/5 border border-white/10'
                    }
                  `}>
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </motion.div>
                    ) : (
                      <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-muted-foreground'}`} />
                    )}
                    
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-purple-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isActive ? 'text-foreground' : isCompleted ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                      {t(`seoEnhanced.stages.${stage.key}`)}
                    </p>
                    
                    {isActive && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: stage.duration / 1000, ease: "linear" }}
                        className="h-1 mt-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Skeleton preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-5">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
