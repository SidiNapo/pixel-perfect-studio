import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronDown, ChevronUp, AlertCircle, AlertOctagon, Info, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SEOIssue } from './types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SEOIssuesCardProps {
  issues: SEOIssue[];
  delay?: number;
}

export default function SEOIssuesCard({ issues, delay = 0 }: SEOIssuesCardProps) {
  const [expandedIssues, setExpandedIssues] = useState<string[]>(
    // Auto-expand high severity issues
    issues.filter(i => i.severity === 'High').map(i => i.id)
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { t } = useTranslation();

  const toggleExpand = (id: string) => {
    setExpandedIssues(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Group issues by severity
  const groupedIssues = {
    High: issues.filter(i => i.severity === 'High'),
    Medium: issues.filter(i => i.severity === 'Medium'),
    Low: issues.filter(i => i.severity === 'Low'),
  };

  const getSeverityConfig = (severity: SEOIssue['severity']) => {
    switch (severity) {
      case 'High':
        return {
          icon: AlertOctagon,
          bgClass: 'bg-red-500/10 border-red-500/30',
          textClass: 'text-red-400',
          badgeClass: 'bg-red-500/20 text-red-400 border-red-500/30',
          label: t('seoEnhanced.severityHigh'),
        };
      case 'Medium':
        return {
          icon: AlertCircle,
          bgClass: 'bg-orange-500/10 border-orange-500/30',
          textClass: 'text-orange-400',
          badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          label: t('seoEnhanced.severityMedium'),
        };
      case 'Low':
        return {
          icon: Info,
          bgClass: 'bg-yellow-500/10 border-yellow-500/30',
          textClass: 'text-yellow-400',
          badgeClass: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
          label: t('seoEnhanced.severityLow'),
        };
    }
  };

  const IssueItem = ({ issue, index }: { issue: SEOIssue; index: number }) => {
    const config = getSeverityConfig(issue.severity);
    const Icon = config.icon;
    const isExpanded = expandedIssues.includes(issue.id);

    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: delay + 0.05 * index }}
        className={`border rounded-xl overflow-hidden ${config.bgClass}`}
      >
        <button
          onClick={() => toggleExpand(issue.id)}
          className="w-full flex items-start gap-3 p-4 hover:bg-white/5 transition-colors text-left"
        >
          <div className={`p-1.5 rounded-lg ${config.bgClass} flex-shrink-0 mt-0.5`}>
            <Icon className={`w-4 h-4 ${config.textClass}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-medium text-foreground">{issue.title}</h4>
              <div className="flex items-center gap-2 flex-shrink-0">
                {issue.impact && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="text-xs">
                          {t('seoEnhanced.impact')}: {issue.impact}/10
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>{t('seoEnhanced.impactTooltip')}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{issue.description}</p>
          </div>
        </button>
        
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
                {/* Evidence */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs font-medium text-muted-foreground mb-1">{t('seoEnhanced.evidence')}:</p>
                  <p className="text-sm text-foreground font-mono break-all">{issue.evidence}</p>
                </div>
                
                {/* Fix */}
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-xs font-medium text-emerald-400 mb-1">{t('seoEnhanced.howToFix')}:</p>
                  <p className="text-sm text-foreground">{issue.fix}</p>
                </div>
                
                {/* Code Example */}
                {issue.codeExample && (
                  <div className="relative">
                    <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                      <p className="text-xs font-medium text-muted-foreground mb-2">{t('seoEnhanced.codeExample')}:</p>
                      <pre className="text-xs text-foreground font-mono overflow-x-auto whitespace-pre-wrap">
                        {issue.codeExample}
                      </pre>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-7 w-7 p-0"
                      onClick={() => copyToClipboard(issue.codeExample!, issue.id)}
                    >
                      {copiedId === issue.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </div>
                )}
                
                {/* Learn More Link */}
                {issue.learnMoreUrl && (
                  <a
                    href={issue.learnMoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
                  >
                    {t('common.learnMore')} <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

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
            <div className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{t('reports.issuesFound')}</h3>
              <p className="text-xs text-muted-foreground">{t('seoEnhanced.prioritizedList')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {groupedIssues.High.length > 0 && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{groupedIssues.High.length} {t('seoEnhanced.critical')}</Badge>
            )}
            <Badge variant="outline">{issues.length} {t('seoEnhanced.total')}</Badge>
          </div>
        </div>
      </div>
      
      {/* Issues List */}
      <div className="p-4 space-y-6 max-h-[600px] overflow-y-auto">
        {issues.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-sm text-muted-foreground">{t('seoResults.noIssues')}</p>
          </div>
        ) : (
          <>
            {/* High Priority */}
            {groupedIssues.High.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertOctagon className="w-4 h-4 text-red-400" />
                  <h4 className="text-sm font-medium text-red-400">{t('reports.highPriority')}</h4>
                  <span className="text-xs text-muted-foreground">({groupedIssues.High.length})</span>
                </div>
                <div className="space-y-3">
                  {groupedIssues.High.map((issue, index) => (
                    <IssueItem key={issue.id} issue={issue} index={index} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Medium Priority */}
            {groupedIssues.Medium.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-orange-400" />
                  <h4 className="text-sm font-medium text-orange-400">{t('reports.mediumPriority')}</h4>
                  <span className="text-xs text-muted-foreground">({groupedIssues.Medium.length})</span>
                </div>
                <div className="space-y-3">
                  {groupedIssues.Medium.map((issue, index) => (
                    <IssueItem key={issue.id} issue={issue} index={index + groupedIssues.High.length} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Low Priority */}
            {groupedIssues.Low.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-yellow-400" />
                  <h4 className="text-sm font-medium text-yellow-400">{t('reports.lowPriority')}</h4>
                  <span className="text-xs text-muted-foreground">({groupedIssues.Low.length})</span>
                </div>
                <div className="space-y-3">
                  {groupedIssues.Low.map((issue, index) => (
                    <IssueItem key={issue.id} issue={issue} index={index + groupedIssues.High.length + groupedIssues.Medium.length} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
