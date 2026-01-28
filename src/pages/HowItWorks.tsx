import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Globe, Cpu, FileSearch, BarChart3, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      icon: Globe,
      title: t('common.howItWorks.steps.0.title'),
      description: t('common.howItWorks.steps.0.description'),
      details: t('common.howItWorks.steps.0.details', { returnObjects: true }) as string[]
    },
    {
      number: "02",
      icon: Cpu,
      title: t('common.howItWorks.steps.1.title'),
      description: t('common.howItWorks.steps.1.description'),
      details: t('common.howItWorks.steps.1.details', { returnObjects: true }) as string[]
    },
    {
      number: "03",
      icon: FileSearch,
      title: t('common.howItWorks.steps.2.title'),
      description: t('common.howItWorks.steps.2.description'),
      details: t('common.howItWorks.steps.2.details', { returnObjects: true }) as string[]
    },
    {
      number: "04",
      icon: BarChart3,
      title: t('common.howItWorks.steps.3.title'),
      description: t('common.howItWorks.steps.3.description'),
      details: t('common.howItWorks.steps.3.details', { returnObjects: true }) as string[]
    },
    {
      number: "05",
      icon: Lightbulb,
      title: t('common.howItWorks.steps.4.title'),
      description: t('common.howItWorks.steps.4.description'),
      details: t('common.howItWorks.steps.4.details', { returnObjects: true }) as string[]
    }
  ];

  const features = t('common.howItWorks.features', { returnObjects: true }) as string[];
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
              {t('common.howItWorks.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('common.howItWorks.hero.subtitle')}
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
            <h2 className="text-3xl font-bold text-center mb-12">{t('common.howItWorks.featuresSection.title')}</h2>
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
            <h2 className="text-3xl font-bold text-center mb-12">{t('common.howItWorks.whyChoose.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-card/50 border border-border rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('common.howItWorks.whyChoose.cards.0.title')}</h3>
                <p className="text-muted-foreground">
                  {t('common.howItWorks.whyChoose.cards.0.description')}
                </p>
              </div>
              <div className="p-6 bg-card/50 border border-border rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('common.howItWorks.whyChoose.cards.1.title')}</h3>
                <p className="text-muted-foreground">
                  {t('common.howItWorks.whyChoose.cards.1.description')}
                </p>
              </div>
              <div className="p-6 bg-card/50 border border-border rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('common.howItWorks.whyChoose.cards.2.title')}</h3>
                <p className="text-muted-foreground">
                  {t('common.howItWorks.whyChoose.cards.2.description')}
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
            <h2 className="text-3xl font-bold mb-4">{t('common.howItWorks.cta.title')}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('common.howItWorks.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {t('common.howItWorks.cta.primaryButton')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              >
                {t('common.howItWorks.cta.secondaryButton')}
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
              <strong>{t('common.howItWorks.disclaimer.label')}</strong> {t('common.howItWorks.disclaimer.text')}{' '}
              <Link to="/disclaimer" className="text-primary hover:underline">{t('common.howItWorks.disclaimer.link')}</Link> {t('common.howItWorks.disclaimer.suffix')}
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
