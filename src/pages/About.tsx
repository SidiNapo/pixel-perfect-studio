import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Linkedin, Twitter, Target, Zap, Shield, TrendingUp, Users, Award, Globe, BarChart3, Search, Brain, Lightbulb, Rocket, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
function AnimatedCounter({
  value,
  suffix
}: {
  value: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true
  });
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}
const About = () => {
  const {
    t
  } = useTranslation();
  const stats = [{
    id: 'pagesAnalyzedMonthly',
    value: 10
  }, {
    id: 'happyClientsWorldwide',
    value: 5000
  }, {
    id: 'clientSatisfactionRate',
    value: 98
  }, {
    id: 'expertSupportAvailable',
    value: 24
  }] as const;
  const coreValues = [{
    id: 'innovationFirst',
    icon: Lightbulb
  }, {
    id: 'dataDrivenExcellence',
    icon: Target
  }, {
    id: 'clientSuccessFocus',
    icon: Users
  }, {
    id: 'ethicalSeoPractices',
    icon: Shield
  }] as const;
  const seoServices = [{
    id: 'technicalAudit',
    icon: Search
  }, {
    id: 'contentOptimization',
    icon: Brain
  }, {
    id: 'rankTracking',
    icon: BarChart3
  }, {
    id: 'internationalSeo',
    icon: Globe
  }, {
    id: 'linkBuilding',
    icon: TrendingUp
  }, {
    id: 'competitorAnalysis',
    icon: Rocket
  }] as const;
  const milestones = [{
    id: 'founded',
    year: '2020'
  }, {
    id: 'aiEngineLaunch',
    year: '2021'
  }, {
    id: 'globalExpansion',
    year: '2022'
  }, {
    id: 'millionPages',
    year: '2023'
  }, {
    id: 'nextGenPlatform',
    year: '2024'
  }] as const;
  const teamMembers = [{
    id: 'sarah',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face'
  }, {
    id: 'marcus',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  }, {
    id: 'emily',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face'
  }, {
    id: 'david',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  }] as const;
  const advantageBullets = t('common.about.advantage.section1.bullets', {
    returnObjects: true
  }) as string[];
  return <main className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="absolute inset-0 gradient-purple-radial" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.7
          }}>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                {t('common.about.hero.badge')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t('common.about.hero.title')}{' '}
                <span className="text-primary">{t('common.about.hero.titleHighlight')}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t('common.about.hero.paragraph1')}
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t('common.about.hero.paragraph2')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('common.about.hero.paragraph3')}
              </p>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: 50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.7,
            delay: 0.2
          }} className="relative">
              <div className="relative rounded-3xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop" alt={t('common.about.hero.imageAlt')} className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-primary/20 border border-primary/30 backdrop-blur-xl animate-float" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-xl bg-primary/30 border border-primary/40 backdrop-blur-xl animate-float-slow" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => <motion.div key={stat.id} initial={{
            opacity: 0,
            scale: 0.8
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="text-center p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <AnimatedCounter value={stat.value} suffix={t(`common.about.stats.${stat.id}.suffix`)} />
                </div>
                <div className="text-muted-foreground">{t(`common.about.stats.${stat.id}.label`)}</div>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* Why Choose E-SEOMAX Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              {t('common.about.advantage.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t('common.about.advantage.title')} <span className="text-primary">{t('common.about.advantage.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('common.about.advantage.description')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div initial={{
            opacity: 0,
            x: -40
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" alt={t('common.about.advantage.section1.imageAlt')} className="rounded-2xl w-full h-auto shadow-2xl" />
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            x: 40
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('common.about.advantage.section1.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('common.about.advantage.section1.paragraph')}
              </p>
              <ul className="space-y-4">
                {advantageBullets.map((item, index) => <motion.li key={index} initial={{
                opacity: 0,
                x: 20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.3,
                delay: index * 0.1
              }} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.li>)}
              </ul>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -40
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="space-y-6 order-2 lg:order-1">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('common.about.advantage.section2.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('common.about.advantage.section2.paragraph1')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('common.about.advantage.section2.paragraph2')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[{
                icon: Zap,
                label: t('common.about.advantage.section2.highlights.fastAnalysis')
              }, {
                icon: Shield,
                label: t('common.about.advantage.section2.highlights.securePlatform')
              }, {
                icon: Globe,
                label: t('common.about.advantage.section2.highlights.globalReach')
              }, {
                icon: Award,
                label: t('common.about.advantage.section2.highlights.awardWinning')
              }].map((item, index) => <motion.div key={item.label} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.3,
                delay: index * 0.1
              }} className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium">{item.label}</span>
                  </motion.div>)}
              </div>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            x: 40
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="order-1 lg:order-2">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" alt={t('common.about.advantage.section2.imageAlt')} className="rounded-2xl w-full h-auto shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              {t('common.about.values.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t('common.about.values.title')} <span className="text-primary">{t('common.about.values.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('common.about.values.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => <motion.div key={value.id} initial={{
            opacity: 0,
            y: 40
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t(`common.about.values.items.${value.id}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`common.about.values.items.${value.id}.description`)}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              {t('common.about.services.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t('common.about.services.title')} <span className="text-primary">{t('common.about.services.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('common.about.services.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seoServices.map((service, index) => <motion.div key={service.id} initial={{
            opacity: 0,
            y: 40
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t(`common.about.services.items.${service.id}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`common.about.services.items.${service.id}.description`)}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              {t('common.about.timeline.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t('common.about.timeline.title')} <span className="text-primary">{t('common.about.timeline.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('common.about.timeline.description')}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border" />
            
            {milestones.map((milestone, index) => <motion.div key={milestone.year} initial={{
            opacity: 0,
            y: 40
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className={`relative flex items-center mb-12 last:mb-0 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                  <div className="p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300">
                    <span className="text-primary font-bold text-lg">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-foreground mt-2 mb-2">{t(`common.about.timeline.milestones.${milestone.id}.title`)}</h3>
                    <p className="text-muted-foreground">{t(`common.about.timeline.milestones.${milestone.id}.description`)}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              {t('common.about.mission.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('common.about.mission.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {t('common.about.mission.quote')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t('common.about.mission.paragraph')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('common.about.cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('common.about.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                {t('common.about.cta.primaryButton')}
              </a>
              <a href="/blog" className="px-8 py-4 rounded-xl bg-secondary text-foreground border border-border font-semibold hover:border-primary/50 transition-colors">
                {t('common.about.cta.secondaryButton')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>;
};
export default About;