import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "49",
    description: "Perfect for freelancers and small websites",
    features: [
      "500 pages analyzed/month",
      "10 competitor tracking",
      "Basic rank tracking",
      "Email reports",
      "Community support"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Professional",
    price: "149",
    description: "For growing businesses and agencies",
    features: [
      "5,000 pages analyzed/month",
      "50 competitor tracking",
      "Advanced AI recommendations",
      "White-label reports",
      "API access",
      "Priority support",
      "Custom dashboards"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams with complex needs",
    features: [
      "Unlimited page analysis",
      "Unlimited competitors",
      "Custom AI training",
      "Dedicated account manager",
      "SLA guarantee",
      "SSO & advanced security",
      "Custom integrations",
      "On-premise deployment"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Simple, <span className="text-primary">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free for 14 days. No credit card required. Cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`h-full p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? 'bg-card border-primary/50 shadow-[0_0_50px_rgba(139,92,246,0.2)]'
                  : 'bg-card/50 border-border hover:border-primary/30'
              }`}>
                {/* Plan Header */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    {plan.price !== "Custom" && (
                      <span className="text-2xl text-muted-foreground">$</span>
                    )}
                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="p-0.5 rounded-full bg-primary/20 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]'
                      : 'bg-secondary text-foreground hover:bg-primary/20 border border-border hover:border-primary/50'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {['Google', 'Meta', 'Amazon', 'Microsoft', 'Netflix'].map((company) => (
              <span key={company} className="text-xl font-bold text-muted-foreground">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
