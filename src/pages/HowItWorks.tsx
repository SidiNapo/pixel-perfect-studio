import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Globe, Cpu, FileSearch, BarChart3, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: "01",
    icon: Globe,
    title: "Enter Your Website URL",
    description: "Simply paste your website URL into our analyzer. Our system accepts any public website—whether it's your homepage, a specific page, or a competitor's site you want to analyze.",
    details: [
      "No registration required for basic analysis",
      "Supports all website types: e-commerce, blogs, corporate sites",
      "Analyze any publicly accessible URL",
      "Check individual pages or entire domains"
    ]
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI-Powered Analysis",
    description: "Our advanced AI engine crawls your website and performs a comprehensive analysis across 50+ SEO factors. The process is fast, thorough, and based on the latest search engine guidelines.",
    details: [
      "Technical SEO audit (speed, mobile, security)",
      "On-page optimization review",
      "Content quality assessment",
      "Meta tags and structured data analysis"
    ]
  },
  {
    number: "03",
    icon: FileSearch,
    title: "Issue Identification",
    description: "We identify all SEO issues affecting your website's search visibility, from critical errors that need immediate attention to minor improvements that can boost your rankings.",
    details: [
      "Critical errors highlighted in red",
      "Warnings shown in yellow",
      "Opportunities marked in blue",
      "Prioritized by impact on rankings"
    ]
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Score & Metrics",
    description: "Receive a comprehensive SEO score from 0-100 along with detailed metrics for each category. Compare your performance against industry benchmarks and track improvements over time.",
    details: [
      "Overall SEO health score",
      "Category-specific scores (Technical, Content, etc.)",
      "Performance metrics (Core Web Vitals)",
      "Industry benchmark comparisons"
    ]
  },
  {
    number: "05",
    icon: Lightbulb,
    title: "Actionable Recommendations",
    description: "Get step-by-step, actionable recommendations tailored to your website. Each suggestion includes clear instructions and explains the potential impact on your rankings.",
    details: [
      "Priority-ranked action items",
      "Step-by-step implementation guides",
      "Estimated difficulty and impact",
      "Best practices and examples"
    ]
  }
];

const features = [
  "Real-time website analysis",
  "50+ SEO factors evaluated",
  "AI-powered recommendations",
  "Mobile-first analysis",
  "Core Web Vitals testing",
  "Competitor comparison",
  "Progress tracking over time",
  "Exportable reports"
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-32 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              How E-SEOMAX Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered SEO analysis platform makes it easy to understand and improve your website's search engine visibility. Follow these simple steps to unlock your site's full potential.
            </p>
          </motion.div>

          {/* Steps Section */}
          <div className="space-y-16 mb-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Visual */}
                <div className="w-full md:w-1/2">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl" />
                    <div className="relative bg-card/80 border border-border rounded-xl p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-5xl font-bold text-primary/30">{step.number}</span>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <step.icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2">
                  <ul className="space-y-4">
                    {step.details.map((detail, detailIndex) => (
                      <motion.li
                        key={detailIndex}
                        initial={{ opacity: 0, x: index % 2 === 1 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + detailIndex * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-24"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-4 bg-card/50 border border-border rounded-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-24"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose E-SEOMAX?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-card/50 border border-border rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Accuracy</h3>
                <p className="text-muted-foreground">
                  Our machine learning algorithms are trained on millions of data points to provide insights that match what search engines actually care about. No guesswork—just data-driven recommendations.
                </p>
              </div>
              <div className="p-6 bg-card/50 border border-border rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Actionable Insights</h3>
                <p className="text-muted-foreground">
                  We don't just identify problems—we tell you exactly how to fix them. Each recommendation comes with step-by-step instructions that anyone can follow, regardless of technical expertise.
                </p>
              </div>
              <div className="p-6 bg-card/50 border border-border rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Always Up-to-Date</h3>
                <p className="text-muted-foreground">
                  Search engine algorithms change constantly. Our platform is continuously updated to reflect the latest best practices, ensuring your SEO strategy stays current and effective.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center p-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-border rounded-2xl"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Improve Your SEO?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of website owners who trust E-SEOMAX to optimize their search visibility. Get started with a free analysis today—no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Analyze Your Website
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              >
                View FAQ
              </Link>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> SEO results vary based on many factors including competition, content quality, and implementation. 
              E-SEOMAX provides analysis and recommendations but does not guarantee specific rankings or outcomes. 
              Read our <Link to="/disclaimer" className="text-primary hover:underline">full disclaimer</Link> for more information.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
