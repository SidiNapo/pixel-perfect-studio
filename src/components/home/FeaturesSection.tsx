import { motion } from 'framer-motion';
import { Brain, TrendingUp, Eye, Zap, Shield, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      titleKey: "features.items.aiAnalysis.title",
      descriptionKey: "features.items.aiAnalysis.description",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      titleKey: "features.items.rankTracking.title",
      descriptionKey: "features.items.rankTracking.description",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Eye,
      titleKey: "features.items.competitorSpying.title",
      descriptionKey: "features.items.competitorSpying.description",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      titleKey: "features.items.lightningFast.title",
      descriptionKey: "features.items.lightningFast.description",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      titleKey: "features.items.securityFirst.title",
      descriptionKey: "features.items.securityFirst.description",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: BarChart3,
      titleKey: "features.items.smartReports.title",
      descriptionKey: "features.items.smartReports.description",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            {t('features.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('features.mainTitle')}{' '}
            <span className="text-primary">{t('features.mainTitleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('features.description')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"
                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
              />
              
              <div className="h-full p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:-translate-y-2">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6`}>
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-foreground" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
