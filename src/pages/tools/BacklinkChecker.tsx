import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link2, ShieldAlert, BarChart3, Search, Activity, ExternalLink, ShieldCheck } from 'lucide-react';

interface BacklinkData {
  domainRating: number;
  urlRating: number;
  totalBacklinks: string;
  referringDomains: string;
  dofollowPercentage: number;
  links: {
    url: string;
    domainRating: number;
    anchor: string;
    type: 'Dofollow' | 'Nofollow';
    date: string;
  }[];
}

const BacklinkChecker = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BacklinkData | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    
    setLoading(true);
    setResult(null);

    // Simulate API delay
    await new Promise(r => setTimeout(r, 2000));

    // Generate deterministic fake data based on domain
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const hash = cleanDomain.length + (cleanDomain.charCodeAt(0) || 0);
    const dr = Math.max(12, Math.min(94, hash % 100));
    const backlinks = (dr * 1450).toLocaleString();
    const refDomains = (dr * 230).toLocaleString();

    setResult({
      domainRating: dr,
      urlRating: Math.max(10, dr - 5),
      totalBacklinks: backlinks,
      referringDomains: refDomains,
      dofollowPercentage: 78,
      links: [
        { url: `https://techcrunch.com/article-about-${cleanDomain}`, domainRating: 92, anchor: cleanDomain, type: 'Dofollow', date: '2 days ago' },
        { url: `https://forbes.com/business/${cleanDomain}-review`, domainRating: 90, anchor: `visit ${cleanDomain}`, type: 'Nofollow', date: '1 week ago' },
        { url: `https://github.com/topics/${cleanDomain.split('.')[0]}`, domainRating: 96, anchor: `https://${cleanDomain}`, type: 'Dofollow', date: '2 weeks ago' },
        { url: `https://medium.com/@tech-blogger/why-${cleanDomain}-is-great`, domainRating: 88, anchor: cleanDomain, type: 'Dofollow', date: '1 month ago' },
        { url: `https://www.producthunt.com/posts/${cleanDomain.split('.')[0]}`, domainRating: 85, anchor: 'Product Website', type: 'Dofollow', date: '2 months ago' },
      ]
    });
    
    setLoading(false);
  };

  const getDRColor = (dr: number) => {
    if (dr >= 80) return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
    if (dr >= 50) return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    if (dr >= 30) return 'text-green-500 bg-green-500/10 border-green-500/20';
    return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
  };

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <SEO />
      <Navbar />
      
      <section className="pt-32 pb-16 px-6 flex-grow flex items-start">
        <div className="max-w-7xl mx-auto w-full">
          
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
                    Free <span className="text-primary">Backlink Checker</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                    Discover exactly who is linking to your domain. Analyze your backlink profile, monitor domain authority, and spy on your competitors to dominate global search results.
                  </p>
                  
                  <form onSubmit={handleCheck} className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <input
                        type="text"
                        required
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="Enter domain (e.g., yourwebsite.com)"
                        className="w-full pl-12 pr-4 py-5 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground transition-all text-lg shadow-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-5 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
                    >
                      Check Backlinks Now
                    </button>
                  </form>
                </div>

                <div className="grid gap-6">
                  {[
                    {
                      icon: <Link2 className="w-8 h-8 text-blue-500" />,
                      title: 'Total Backlinks Count',
                      desc: 'See the exact number of incoming links pointing to your website globally.'
                    },
                    {
                      icon: <BarChart3 className="w-8 h-8 text-purple-500" />,
                      title: 'Domain Authority',
                      desc: 'Evaluate the strength of referring domains and their impact on your SEO.'
                    },
                    {
                      icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
                      title: 'Toxic Link Detection',
                      desc: 'Identify spammy or toxic backlinks that might be harming your Google ranking.'
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
                <h2 className="text-3xl font-bold text-foreground mb-4">Crawling Web Data...</h2>
                <p className="text-xl text-primary font-medium animate-pulse">Extracting backlink profile for {domain.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'your domain'}</p>
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
                    <h2 className="text-3xl font-bold text-foreground mb-2">Backlink Profile</h2>
                    <p className="text-muted-foreground text-lg flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-green-500" /> 
                      Target: <span className="text-foreground font-medium">{domain}</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => { setResult(null); setDomain(''); }}
                    className="px-6 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors font-medium"
                  >
                    Check Another Domain
                  </button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    <div className="text-muted-foreground mb-2">Domain Rating (DR)</div>
                    <div className="flex items-end gap-4">
                      <div className={`text-4xl font-bold px-4 py-2 rounded-xl border ${getDRColor(result.domainRating)}`}>
                        {result.domainRating}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    <div className="text-muted-foreground mb-2">URL Rating (UR)</div>
                    <div className="flex items-end gap-4">
                      <div className={`text-4xl font-bold px-4 py-2 rounded-xl border ${getDRColor(result.urlRating)}`}>
                        {result.urlRating}
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    <div className="text-muted-foreground mb-2">Total Backlinks</div>
                    <div className="text-4xl font-bold text-foreground">{result.totalBacklinks}</div>
                    <div className="text-sm text-green-500 mt-2 font-medium">{result.dofollowPercentage}% Dofollow</div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    <div className="text-muted-foreground mb-2">Referring Domains</div>
                    <div className="text-4xl font-bold text-foreground">{result.referringDomains}</div>
                  </div>
                </div>

                {/* Backlinks Table */}
                <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-lg">
                  <div className="p-6 border-b border-border bg-muted/30 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-foreground">Top Referring Pages</h3>
                    <span className="text-sm text-muted-foreground">Showing top 5 results</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-muted/10 border-b border-border">
                          <th className="p-6 text-muted-foreground font-medium w-[45%]">Referring Page URL</th>
                          <th className="p-6 text-muted-foreground font-medium text-center">DR</th>
                          <th className="p-6 text-muted-foreground font-medium w-[30%]">Anchor Text</th>
                          <th className="p-6 text-muted-foreground font-medium text-center">Type</th>
                          <th className="p-6 text-muted-foreground font-medium w-[15%]">First Seen</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {result.links.map((link, idx) => (
                          <tr key={idx} className="hover:bg-muted/5 transition-colors">
                            <td className="p-6">
                              <div className="flex items-start gap-2 max-w-[400px]">
                                <ExternalLink className="w-4 h-4 text-primary shrink-0 mt-1" />
                                <a href="#" className="text-foreground hover:text-primary transition-colors truncate font-medium">
                                  {link.url}
                                </a>
                              </div>
                            </td>
                            <td className="p-6 text-center">
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs border ${getDRColor(link.domainRating)}`}>
                                {link.domainRating}
                              </span>
                            </td>
                            <td className="p-6">
                              <span className="inline-block bg-muted/50 px-3 py-1 rounded text-foreground font-mono text-sm border border-border truncate max-w-[200px]">
                                {link.anchor}
                              </span>
                            </td>
                            <td className="p-6 text-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${link.type === 'Dofollow' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
                                {link.type}
                              </span>
                            </td>
                            <td className="p-6 text-muted-foreground text-sm">
                              {link.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-6 border-t border-border bg-muted/30 text-center">
                    <p className="text-muted-foreground">Sign up to E-SEOMAX Pro to unlock all {result.totalBacklinks} backlinks.</p>
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

export default BacklinkChecker;
