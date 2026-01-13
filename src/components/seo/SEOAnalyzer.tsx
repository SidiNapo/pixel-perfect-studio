import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Settings, FileText, Type, RefreshCw } from 'lucide-react';
import { SEOResults } from './types';
import SEOScoreCard from './SEOScoreCard';
import SEOMetricCard from './SEOMetricCard';
import SEOIssuesCard from './SEOIssuesCard';
import SEORecommendationsCard from './SEORecommendationsCard';
import { supabase } from '@/integrations/supabase/client';

export default function SEOAnalyzer() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SEOResults | null>(null);
  const [error, setError] = useState('');

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
      setError('Please enter a URL');
      return;
    }
    
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
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
        setError('Failed to analyze the website. Please try again.');
        return;
      }

      if (!data.success) {
        setError(data.error || 'Failed to analyze the website.');
        return;
      }

      setResults(data.data);
    } catch (err) {
      console.error('Error analyzing SEO:', err);
      setError('An unexpected error occurred. Please try again.');
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
            placeholder="Enter your website URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="w-full px-6 py-4 bg-white/5 border border-purple-500/30 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.08] transition-all duration-200 text-base disabled:opacity-50"
          />
        </div>
        
        <motion.button
          onClick={handleAnalyze}
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-2xl hover:from-purple-500 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 min-w-[160px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Analyze SEO
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
            className="mt-3 text-sm text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            {/* Analyze Again Button */}
            <div className="flex justify-end mb-6">
              <motion.button
                onClick={handleAnalyzeAgain}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-purple-400 hover:text-purple-300 border border-purple-500/30 rounded-lg hover:border-purple-500/50 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Analyze Another URL
              </motion.button>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Main Score Card */}
              <SEOScoreCard score={results.score} delay={0} />

              {/* Technical SEO */}
              <SEOMetricCard
                title="Technical SEO"
                icon={Settings}
                delay={0.1}
                metrics={[
                  { label: 'Page Load Speed', value: results.technical.pageSpeed.value, passed: results.technical.pageSpeed.passed },
                  { label: 'Mobile-Friendly', value: results.technical.mobileFriendly.value, passed: results.technical.mobileFriendly.passed },
                  { label: 'HTTPS Status', value: results.technical.https.value, passed: results.technical.https.passed },
                  { label: 'Robots.txt', value: results.technical.robotsTxt.value, passed: results.technical.robotsTxt.passed },
                ]}
              />

              {/* On-Page SEO */}
              <SEOMetricCard
                title="On-Page SEO"
                icon={FileText}
                delay={0.2}
                metrics={[
                  { label: 'Title Tag', value: `${results.onPage.titleTag.length} chars`, passed: results.onPage.titleTag.passed },
                  { label: 'Meta Description', value: `${results.onPage.metaDescription.length} chars`, passed: results.onPage.metaDescription.passed },
                  { label: 'H1 Tags', value: results.onPage.h1Count },
                  { label: 'Images Missing Alt', value: `${results.onPage.imageAltTexts.missing}/${results.onPage.imageAltTexts.total}` },
                  { label: 'Internal Links', value: results.onPage.internalLinks },
                ]}
              />

              {/* Content Analysis */}
              <SEOMetricCard
                title="Content Analysis"
                icon={Type}
                delay={0.3}
                metrics={[
                  { label: 'Word Count', value: results.content.wordCount.toLocaleString() },
                  { label: 'Keyword Density', value: results.content.keywordDensity },
                  { label: 'Readability Score', value: `${results.content.readabilityScore}/100` },
                  { label: 'Content Quality', value: results.content.contentQuality },
                ]}
              />

              {/* Issues Found */}
              <SEOIssuesCard issues={results.issues} delay={0.4} />

              {/* Recommendations */}
              <SEORecommendationsCard recommendations={results.recommendations} delay={0.5} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
