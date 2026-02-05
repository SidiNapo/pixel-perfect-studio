import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Settings, Link2, Share2, ChevronDown, ChevronRight, ExternalLink, Check, X } from 'lucide-react';
import { SEOResults } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SEOFullReportProps {
  results: SEOResults;
  delay?: number;
}

export default function SEOFullReport({ results, delay = 0 }: SEOFullReportProps) {
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['technical']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const PassFailBadge = ({ passed }: { passed: boolean }) => (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
      passed 
        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
        : 'bg-red-500/20 text-red-400 border border-red-500/30'
    }`}>
      {passed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      {passed ? t('seoEnhanced.passed') : t('seoEnhanced.failed')}
    </span>
  );

  const CharacterBar = ({ current, optimal }: { current: number; optimal: { min: number; max: number } }) => {
    const isOptimal = current >= optimal.min && current <= optimal.max;
    const percentage = Math.min((current / optimal.max) * 100, 150);
    
    return (
      <div className="mt-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>{current} {t('seoResults.metrics.chars')}</span>
          <span>{t('seoEnhanced.optimal')}: {optimal.min}-{optimal.max}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden relative">
          {/* Optimal zone indicator */}
          <div 
            className="absolute h-full bg-emerald-500/30"
            style={{ 
              left: `${(optimal.min / optimal.max) * 100}%`,
              width: `${((optimal.max - optimal.min) / optimal.max) * 100}%`
            }}
          />
          {/* Current position */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 0.8, delay }}
            className={`h-full rounded-full ${isOptimal ? 'bg-emerald-500' : current < optimal.min ? 'bg-amber-500' : 'bg-red-500'}`}
          />
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl bg-white/5 backdrop-blur-xl border border-purple-500/20 overflow-hidden"
    >
      <Tabs defaultValue="technical" className="w-full">
        <div className="border-b border-white/10">
          <TabsList className="w-full justify-start bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="technical" 
              className="px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent bg-transparent"
            >
              <Settings className="w-4 h-4 me-2" />
              {t('seoEnhanced.technical')}
            </TabsTrigger>
            <TabsTrigger 
              value="content" 
              className="px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent bg-transparent"
            >
              <FileText className="w-4 h-4 me-2" />
              {t('seoEnhanced.content')}
            </TabsTrigger>
            <TabsTrigger 
              value="links" 
              className="px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent bg-transparent"
            >
              <Link2 className="w-4 h-4 me-2" />
              {t('seoEnhanced.links')}
            </TabsTrigger>
            <TabsTrigger 
              value="social" 
              className="px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent bg-transparent"
            >
              <Share2 className="w-4 h-4 me-2" />
              {t('seoEnhanced.social')}
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Technical Tab */}
        <TabsContent value="technical" className="p-6 space-y-4 mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t('metrics.httpsStatus')}</span>
                <PassFailBadge passed={results.technical.https.passed} />
              </div>
              <p className="text-sm text-muted-foreground">{results.technical.https.value}</p>
              <p className="text-xs text-muted-foreground mt-2 italic">{t('seoEnhanced.whyMatters.https')}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t('metrics.mobileFriendly')}</span>
                <PassFailBadge passed={results.technical.mobileFriendly.passed} />
              </div>
              <p className="text-sm text-muted-foreground">{results.technical.mobileFriendly.value}</p>
              <p className="text-xs text-muted-foreground mt-2 italic">{t('seoEnhanced.whyMatters.mobile')}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t('metrics.robotsTxt')}</span>
                <PassFailBadge passed={results.technical.robotsTxt.passed} />
              </div>
              <p className="text-sm text-muted-foreground">{results.technical.robotsTxt.value}</p>
              {results.technical.robotsTxt.url && (
                <a 
                  href={results.technical.robotsTxt.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 mt-2"
                >
                  {t('seoEnhanced.viewFile')} <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t('metrics.sitemapXml')}</span>
                <PassFailBadge passed={results.technical.sitemapXml.passed} />
              </div>
              <p className="text-sm text-muted-foreground">{results.technical.sitemapXml.value}</p>
              {results.technical.sitemapXml.url && (
                <a 
                  href={results.technical.sitemapXml.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 mt-2"
                >
                  {t('seoEnhanced.viewFile')} <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Content Tab */}
        <TabsContent value="content" className="p-6 space-y-4 mt-0">
          {/* Title Tag */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t('metrics.titleTag')}</span>
              <PassFailBadge passed={results.onPage.titleTag.passed} />
            </div>
            <p className="text-sm text-foreground font-mono bg-white/5 p-2 rounded mt-2 break-all">
              {results.onPage.titleTag.value || t('seoEnhanced.notSet')}
            </p>
            <CharacterBar current={results.onPage.titleTag.length} optimal={{ min: 30, max: 60 }} />
          </div>
          
          {/* Meta Description */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t('metrics.metaDescription')}</span>
              <PassFailBadge passed={results.onPage.metaDescription.passed} />
            </div>
            <p className="text-sm text-foreground font-mono bg-white/5 p-2 rounded mt-2 break-all">
              {results.onPage.metaDescription.value || t('seoEnhanced.notSet')}
            </p>
            <CharacterBar current={results.onPage.metaDescription.length} optimal={{ min: 120, max: 160 }} />
          </div>
          
          {/* Headings Summary */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm font-medium">{t('seoEnhanced.headingsStructure')}</span>
            <div className="grid grid-cols-3 gap-4 mt-3">
              <div className="text-center p-3 rounded-lg bg-white/5">
                <p className={`text-2xl font-bold ${results.onPage.h1Count === 1 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {results.onPage.h1Count}
                </p>
                <p className="text-xs text-muted-foreground">H1 Tags</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5">
                <p className="text-2xl font-bold text-foreground">{results.onPage.h2Count}</p>
                <p className="text-xs text-muted-foreground">H2 Tags</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5">
                <p className="text-2xl font-bold text-foreground">{results.onPage.h3Count}</p>
                <p className="text-xs text-muted-foreground">H3 Tags</p>
              </div>
            </div>
            {results.onPage.h1First && (
              <div className="mt-3 p-2 rounded bg-white/5">
                <p className="text-xs text-muted-foreground mb-1">{t('seoEnhanced.firstH1')}:</p>
                <p className="text-sm text-foreground">{results.onPage.h1First}</p>
              </div>
            )}
          </div>
          
          {/* Content Quality */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-sm font-medium">{t('metrics.wordCount')}</span>
              <p className={`text-2xl font-bold mt-2 ${results.content.wordCount >= 300 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {results.content.wordCount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{t('seoEnhanced.minRecommended')}: 300</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-sm font-medium">{t('metrics.readabilityScore')}</span>
              <p className={`text-2xl font-bold mt-2 ${results.content.readabilityScore >= 60 ? 'text-emerald-400' : results.content.readabilityScore >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
                {results.content.readabilityScore}/100
              </p>
              <p className="text-xs text-muted-foreground mt-1">{results.content.contentQuality}</p>
            </div>
          </div>
        </TabsContent>
        
        {/* Links Tab */}
        <TabsContent value="links" className="p-6 space-y-4 mt-0">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t('metrics.internalLinks')}</span>
                <PassFailBadge passed={results.onPage.internalLinks >= 3} />
              </div>
              <p className="text-3xl font-bold text-foreground mt-2">{results.onPage.internalLinks}</p>
              <p className="text-xs text-muted-foreground mt-1">{t('seoEnhanced.minRecommended')}: 3</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-sm font-medium">{t('seoResults.metrics.externalLinks')}</span>
              <p className="text-3xl font-bold text-foreground mt-2">{results.onPage.externalLinks}</p>
              <p className="text-xs text-muted-foreground mt-1">{t('seoEnhanced.outboundLinks')}</p>
            </div>
          </div>
          
          {/* Images */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t('seoEnhanced.imageAltText')}</span>
              <PassFailBadge passed={results.onPage.imageAltTexts.missing === 0} />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className={`text-3xl font-bold ${results.onPage.imageAltTexts.missing === 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {results.onPage.imageAltTexts.missing}
              </span>
              <span className="text-sm text-muted-foreground">
                / {results.onPage.imageAltTexts.total} {t('seoEnhanced.imagesMissing')}
              </span>
            </div>
          </div>
          
          {/* Canonical URL */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t('seoResults.metrics.canonicalUrl')}</span>
              <PassFailBadge passed={results.onPage.canonicalUrl.present} />
            </div>
            {results.onPage.canonicalUrl.value ? (
              <p className="text-sm text-foreground font-mono bg-white/5 p-2 rounded mt-2 break-all">
                {results.onPage.canonicalUrl.value}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground mt-2 italic">{t('seoEnhanced.notSet')}</p>
            )}
          </div>
        </TabsContent>
        
        {/* Social Tab */}
        <TabsContent value="social" className="p-6 space-y-4 mt-0">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('seoResults.metrics.ogTitle')}</span>
                <PassFailBadge passed={results.openGraph.hasOgTitle} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t('seoEnhanced.ogTitleDesc')}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('seoResults.metrics.ogDescription')}</span>
                <PassFailBadge passed={results.openGraph.hasOgDescription} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t('seoEnhanced.ogDescriptionDesc')}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('seoResults.metrics.ogImage')}</span>
                <PassFailBadge passed={results.openGraph.hasOgImage} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t('seoEnhanced.ogImageDesc')}</p>
            </div>
          </div>
          
          {/* Social Preview Summary */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
            <h4 className="text-sm font-medium mb-3">{t('seoEnhanced.socialReadiness')}</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${([results.openGraph.hasOgTitle, results.openGraph.hasOgDescription, results.openGraph.hasOgImage].filter(Boolean).length / 3) * 100}%` 
                    }}
                    transition={{ duration: 0.8, delay }}
                    className="h-full bg-purple-500 rounded-full"
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-purple-400">
                {[results.openGraph.hasOgTitle, results.openGraph.hasOgDescription, results.openGraph.hasOgImage].filter(Boolean).length}/3
              </span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
