import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Settings, FileText, Type, Globe, Link2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SEOResults } from './types';
import SEOResultsHeader from './SEOResultsHeader';
import SEOMetricCard from './SEOMetricCard';
import SEOIssuesCard from './SEOIssuesCard';
import SEORecommendationsCard from './SEORecommendationsCard';
import SEOScoreBreakdown from './SEOScoreBreakdown';
import SEOFullReport from './SEOFullReport';
import SEOLoadingState from './SEOLoadingState';
import { supabase } from '@/integrations/supabase/client';

export default function SEOAnalyzer() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SEOResults | null>(null);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const formatUrl = (input: string): string => {
    let formatted = input.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = `https://${formatted}`;
    }
    return formatted;
  };

  const validateUrl = (input: string): boolean => {
    try {
      const urlObj = new URL(formatUrl(input));
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleAnalyze = async () => {
    setError('');
    
    if (!url.trim()) {
      setError(t('seoAnalyzer.errors.enterUrl'));
      return;
    }
    
    if (!validateUrl(url)) {
      setError(t('seoAnalyzer.errors.invalidUrl'));
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('analyze-seo', {
        body: { url: formatUrl(url) },
      });

      if (fnError) {
        console.error('Edge function error:', fnError);
        setError(t('seoAnalyzer.errors.failed'));
        return;
      }

      if (!data.success) {
        setError(data.error || t('seoAnalyzer.errors.failed'));
        return;
      }

      // Add scan timestamp
      const resultsWithTimestamp = {
        ...data.data,
        scanTimestamp: new Date().toISOString(),
      };

      setResults(resultsWithTimestamp);
    } catch (err) {
      console.error('Error analyzing SEO:', err);
      setError(t('seoAnalyzer.errors.unexpected'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleAnalyze();
    }
  };

  const handleAnalyzeAgain = () => {
    setResults(null);
    setUrl('');
  };

  return (
    <div className="w-full">
      {/* Input Section */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="url"
            placeholder={t('hero.placeholder')}
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="w-full px-6 py-4 bg-white/5 border border-purple-500/30 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.08] transition-all duration-200 text-base disabled:opacity-50"
            dir="ltr"
          />
        </div>
        
        <motion.button
          onClick={handleAnalyze}
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-2xl hover:from-purple-500 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 min-w-[160px] shadow-lg shadow-purple-500/25"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t('seoAnalyzer.analyzing')}
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              {t('seoAnalyzer.analyze')}
            </>
          )}
        </motion.button>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && <SEOLoadingState />}
      </AnimatePresence>

      {/* Results Section */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="mt-12 space-y-8"
          >
            {/* Results Header with Score */}
            <SEOResultsHeader results={results} onAnalyzeAgain={handleAnalyzeAgain} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Issues - Full width on mobile, left column on desktop */}
              <SEOIssuesCard issues={results.issues} delay={0.2} />

              {/* Recommendations */}
              <SEORecommendationsCard recommendations={results.recommendations} delay={0.3} />
            </div>

            {/* Score Breakdown */}
            {results.scoreBreakdown && results.scoreBreakdown.length > 0 && (
              <SEOScoreBreakdown breakdown={results.scoreBreakdown} delay={0.4} />
            )}

            {/* Full Report with Tabs */}
            <SEOFullReport results={results} delay={0.5} />

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SEOMetricCard
                title={t('analyzer.technicalSeo')}
                icon={Settings}
                delay={0.6}
                metrics={[
                  { label: t('metrics.httpsStatus'), value: results.technical.https.value, passed: results.technical.https.passed },
                  { label: t('metrics.mobileFriendly'), value: results.technical.mobileFriendly.value, passed: results.technical.mobileFriendly.passed },
                  { label: t('metrics.robotsTxt'), value: results.technical.robotsTxt.value, passed: results.technical.robotsTxt.passed },
                  { label: t('metrics.sitemapXml'), value: results.technical.sitemapXml.value, passed: results.technical.sitemapXml.passed },
                ]}
              />

              <SEOMetricCard
                title={t('analyzer.onPageSeo')}
                icon={FileText}
                delay={0.7}
                metrics={[
                  { label: t('metrics.titleTag'), value: `${results.onPage.titleTag.length} ${t('seoResults.metrics.chars')}`, passed: results.onPage.titleTag.passed, subtitle: results.onPage.titleTag.value },
                  { label: t('metrics.metaDescription'), value: `${results.onPage.metaDescription.length} ${t('seoResults.metrics.chars')}`, passed: results.onPage.metaDescription.passed },
                  { label: t('metrics.h1Tags'), value: results.onPage.h1Count, passed: results.onPage.h1Count === 1 },
                  { label: t('metrics.imagesMissingAlt'), value: `${results.onPage.imageAltTexts.missing}/${results.onPage.imageAltTexts.total}`, passed: results.onPage.imageAltTexts.missing === 0 },
                ]}
              />

              <SEOMetricCard
                title={t('analyzer.contentAnalysis')}
                icon={Type}
                delay={0.8}
                metrics={[
                  { label: t('metrics.wordCount'), value: results.content.wordCount.toLocaleString(), passed: results.content.wordCount >= 300 },
                  { label: t('metrics.readabilityScore'), value: `${results.content.readabilityScore}/100`, passed: results.content.readabilityScore >= 50 },
                  { label: t('seoResults.metrics.contentQuality'), value: results.content.contentQuality, passed: results.content.contentQuality !== 'Poor' },
                ]}
              />

              <SEOMetricCard
                title={t('seoResults.linksSocial')}
                icon={Link2}
                delay={0.9}
                metrics={[
                  { label: t('metrics.internalLinks'), value: results.onPage.internalLinks, passed: results.onPage.internalLinks >= 3 },
                  { label: t('seoResults.metrics.externalLinks'), value: results.onPage.externalLinks },
                  { label: t('seoResults.metrics.ogTitle'), value: results.openGraph.hasOgTitle ? t('seoResults.metrics.present') : t('seoResults.metrics.missing'), passed: results.openGraph.hasOgTitle },
                ]}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
