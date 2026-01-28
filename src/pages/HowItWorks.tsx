import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Globe, Cpu, FileSearch, BarChart3, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const stepIcons = [Globe, Cpu, FileSearch, BarChart3, Lightbulb];

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    { key: 'step1', icon: stepIcons[0] },
    { key: 'step2', icon: stepIcons[1] },
    { key: 'step3', icon: stepIcons[2] },
    { key: 'step4', icon: stepIcons[3] },
    { key: 'step5', icon: stepIcons[4] }
  ];

  const features = t('howItWorks.featuresList', { returnObjects: true }) as string[];

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
              {t('howItWorks.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </motion.div>

          {/* Steps Section */}
          <div className="space-y-16 mb-24">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const details = t(`howItWorks.steps.${step.key}.details`, { returnObjects: true }) as string[];
              
              return (
                <motion.div
                  key={step.key}
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
                          <span className="text-5xl font-bold text-primary/30">
                            {t(`howItWorks.steps.${step.key}.number`)}
                          </span>
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <StepIcon className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-foreground mb-3">
                          {t(`howItWorks.steps.${step.key}.title`)}
                        </h3>
                        <p className="text-muted-foreground">
                          {t(`howItWorks.steps.${step.key}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="w-full md:w-1/2">
                    <ul className="space-y-4">
                      {details.map((detail, detailIndex) => (
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
              );
            })}
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-24"
          >
            <h2 className="text-3xl font-bold text-center mb-12">{t('howItWorks.platformFeatures')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
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
            <h2 className="text-3xl font-bold text-center mb-12">{t('howItWorks.whyChoose')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-card/50 border border-border rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('howItWorks.whyCards.accuracy.title')}</h3>
                <p className="text-muted-foreground">
                  {t('howItWorks.whyCards.accuracy.description')}
                </p>
              </div>
              <div className="p-6 bg-card/50 border border-border rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('howItWorks.whyCards.insights.title')}</h3>
                <p className="text-muted-foreground">
                  {t('howItWorks.whyCards.insights.description')}
                </p>
              </div>
              <div className="p-6 bg-card/50 border border-border rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('howItWorks.whyCards.upToDate.title')}</h3>
                <p className="text-muted-foreground">
                  {t('howItWorks.whyCards.upToDate.description')}
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
            <h2 className="text-3xl font-bold mb-4">{t('howItWorks.cta.title')}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('howItWorks.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {t('howItWorks.cta.analyzeButton')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              >
                {t('howItWorks.cta.faqButton')}
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
              <strong>Disclaimer:</strong> {t('howItWorks.disclaimer')}{' '}
              <Link to="/disclaimer" className="text-primary hover:underline">
                {t('howItWorks.fullDisclaimer')}
              </Link>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
