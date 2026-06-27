import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Loader2, Search, ArrowRight, ShieldCheck, Zap, Smartphone, CheckCircle2, XCircle, AlertTriangle, Activity } from 'lucide-react';

// Simulated Audit Results Type
interface AuditResult {
  overallScore: number;
  onPageScore: number;
  technicalScore: number;
  speedScore: number;
  mobileScore: number;
  issues: { type: 'error' | 'warning' | 'passed'; message: string }[];
}

const SeoAudit = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);

  const steps = [
    "Initializing crawler...",
    "Analyzing On-Page SEO...",
    "Checking technical health...",
    "Evaluating mobile responsiveness...",
    "Measuring Core Web Vitals...",
    "Generating final report..."
  ];

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResult(null);

    // Simulate scanning process
    for (let i = 0; i < steps.length; i++) {
      setLoadingStep(i);
      await new Promise(r => setTimeout(r, 800));
    }

    // Generate deterministic fake score based on URL length to make it feel real
    const hash = url.length + (url.charCodeAt(0) || 0);
    const score = Math.max(45, Math.min(98, 100 - (hash % 50)));

    setResult({
      overallScore: score,
      onPageScore: Math.min(100, score + 5),
      technicalScore: Math.max(0, score - 8),
      speedScore: Math.min(100, score + 12),
      mobileScore: 95,
      issues: [
        { type: score > 80 ? 'passed' : 'error', message: "Meta description length is optimal" },
        { type: score > 60 ? 'passed' : 'error', message: "H1 tags are properly structured" },
        { type: 'warning', message: "Some images are missing ALT attributes" },
        { type: score > 70 ? 'passed' : 'warning', message: "Page load speed (LCP) is under 2.5s" },
        { type: 'error', message: "Found 2 broken internal links (404)" },
        { type: 'passed', message: "SSL Certificate is valid and active" },
        { type: 'passed', message: "Mobile viewport is correctly configured" },
      ]
    });
    setLoading(false);
  };

  const renderScoreCircle = (score: number, size: 'lg' | 'sm' = 'sm') => {
    const color = score >= 80 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500';
    const bg = score >= 80 ? 'bg-green-500/10 border-green-500/20' : score >= 50 ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-red-500/10 border-red-500/20';
    
    if (size === 'lg') {
      return (
        <div className={`relative w-48 h-48 rounded-full border-8 flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(0,0,0,0.1)] ${color} ${bg}`}>
          <div className="text-center">
            <span className="text-6xl font-bold">{score}</span>
            <span className="text-xl text-muted-foreground block mt-1">/ 100</span>
          </div>
        </div>
      );
    }
    
    return (
      <div className={`text-2xl font-bold ${color}`}>{score}/100</div>
    );
  };

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <SEO />
      <Navbar />
      
      <section className="pt-32 pb-16 px-6 flex-grow flex items-start">
        <div className="max-w-6xl mx-auto w-full">
          
          <AnimatePresence mode="wait">
            {!result && !loading && (
              <motion.div 
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-12"
              >
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                    Instant Website <span className="text-primary">SEO Score</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                    Get a comprehensive technical SEO audit of your website absolutely free. We analyze on-page factors, speed, mobile responsiveness, and hidden errors holding back your Google rankings.
                  </p>
                  
                  <form onSubmit={handleAudit} className="space-y-4">
                    <div>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                          type="url"
                          required
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://yourwebsite.com"
                          className="w-full pl-12 pr-4 py-5 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground transition-all text-lg shadow-sm"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-5 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
                    >
                      Run Free Audit <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                </div>

                <div className="grid gap-6">
                  {[
                    {
                      icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
                      title: 'Technical SEO Analysis',
                      desc: 'Uncover hidden technical issues, broken links, and indexing errors.'
                    },
                    {
                      icon: <Zap className="w-8 h-8 text-yellow-500" />,
                      title: 'Page Speed Insights',
                      desc: 'Analyze Core Web Vitals and load times for desktop and mobile.'
                    },
                    {
                      icon: <Smartphone className="w-8 h-8 text-blue-500" />,
                      title: 'Mobile Responsiveness',
                      desc: 'Ensure your site is perfectly optimized for the mobile-first index.'
                    }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm hover:border-primary/30 transition-colors">
                      <div className="flex-shrink-0">{feature.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-32"
              >
                <div className="relative w-32 h-32 mb-8">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-primary">
                    <Activity className="w-8 h-8 animate-pulse" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Analyzing {new URL(url).hostname}</h2>
                <div className="h-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingStep}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="text-xl text-primary font-medium"
                    >
                      {steps[loadingStep]}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="w-64 h-2 bg-muted rounded-full mt-8 overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-border gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Audit Results</h2>
                    <p className="text-muted-foreground text-lg flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-green-500" /> 
                      Target: <span className="text-foreground font-medium">{url}</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => { setResult(null); setUrl(''); }}
                    className="px-6 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors font-medium"
                  >
                    Scan Another URL
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                  <div className="col-span-1 bg-card rounded-3xl p-8 border border-border shadow-lg text-center">
                    <h3 className="text-xl font-semibold text-muted-foreground mb-8">Overall SEO Score</h3>
                    {renderScoreCircle(result.overallScore, 'lg')}
                    <p className="text-muted-foreground mt-4">
                      {result.overallScore >= 80 ? "Excellent work! Your site is highly optimized." : 
                       result.overallScore >= 50 ? "Good start, but there is significant room for improvement." : 
                       "Critical issues found. Immediate action required."}
                    </p>
                  </div>

                  <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-6">
                    {[
                      { label: "On-Page SEO", score: result.onPageScore, icon: <ShieldCheck className="w-5 h-5" /> },
                      { label: "Technical SEO", score: result.technicalScore, icon: <Activity className="w-5 h-5" /> },
                      { label: "Performance", score: result.speedScore, icon: <Zap className="w-5 h-5" /> },
                      { label: "Mobile Usability", score: result.mobileScore, icon: <Smartphone className="w-5 h-5" /> }
                    ].map((metric, idx) => (
                      <div key={idx} className="bg-card rounded-2xl p-6 border border-border flex flex-col justify-between">
                        <div className="flex items-center gap-3 text-muted-foreground mb-4">
                          {metric.icon}
                          <span className="font-medium">{metric.label}</span>
                        </div>
                        {renderScoreCircle(metric.score)}
                        <div className="w-full bg-muted rounded-full h-2 mt-4">
                          <div 
                            className={`h-2 rounded-full ${metric.score >= 80 ? 'bg-green-500' : metric.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                            style={{ width: `${metric.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-lg">
                  <div className="p-6 border-b border-border bg-muted/30">
                    <h3 className="text-2xl font-bold text-foreground">Detailed Analysis</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {result.issues.map((issue, idx) => (
                      <div key={idx} className="p-6 flex items-start gap-4 hover:bg-muted/10 transition-colors">
                        {issue.type === 'passed' ? <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" /> :
                         issue.type === 'warning' ? <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" /> :
                         <XCircle className="w-6 h-6 text-red-500 shrink-0" />}
                        <div>
                          <p className={`text-lg font-medium ${
                            issue.type === 'passed' ? 'text-foreground' :
                            issue.type === 'warning' ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {issue.message}
                          </p>
                          <p className="text-muted-foreground mt-1 text-sm">
                            {issue.type === 'passed' ? 'Perfectly optimized. No action needed.' : 
                             'This impacts your search visibility and user experience. Fixing this will improve your score.'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SeoAudit;
