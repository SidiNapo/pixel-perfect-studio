import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PricingSection = () => {
  const { t } = useTranslation();

  const plans = [
    {
      nameKey: "pricing.plans.starter.name",
      priceKey: "pricing.plans.starter.price",
      descriptionKey: "pricing.plans.starter.description",
      features: t('pricing.plans.starter.features', { returnObjects: true }),
      ctaKey: "pricing.plans.starter.cta",
      popular: false
    },
    {
      nameKey: "pricing.plans.professional.name",
      priceKey: "pricing.plans.professional.price",
      descriptionKey: "pricing.plans.professional.description",
      features: t('pricing.plans.professional.features', { returnObjects: true }),
      ctaKey: "pricing.plans.professional.cta",
      popular: true
    },
    {
      nameKey: "pricing.plans.enterprise.name",
      priceKey: "pricing.plans.enterprise.price",
      descriptionKey: "pricing.plans.enterprise.description",
      features: t('pricing.plans.enterprise.features', { returnObjects: true }),
      ctaKey: "pricing.plans.enterprise.cta",
      popular: false
    }
  ];
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            {t('pricing.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t('pricing.subtitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-primary/20 to-card border-2 border-primary glow-purple-sm'
                  : 'bg-card/50 backdrop-blur-xl border border-border hover:border-primary/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    {t('pricing.plans.professional.popular')}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-foreground mb-2">{t(plan.nameKey)}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t(plan.descriptionKey)}</p>
                <div className="flex items-baseline justify-center gap-1">
                  {t(plan.priceKey) !== "Custom" && t(plan.priceKey) !== "مخصص" && t(plan.priceKey) !== "Personnalisé" && (
                    <span className="text-muted-foreground">$</span>
                  )}
                  <span className="text-4xl font-bold text-foreground">{t(plan.priceKey)}</span>
                  {t(plan.priceKey) !== "Custom" && t(plan.priceKey) !== "مخصص" && t(plan.priceKey) !== "Personnalisé" && (
                    <span className="text-muted-foreground">{t('pricing.perMonth')}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-secondary text-foreground border border-border hover:border-primary/50'
                }`}
              >
                {t(plan.ctaKey)}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
