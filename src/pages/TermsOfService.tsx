import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('common.terms.title')}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t('common.legal.lastUpdatedLine', { date: t('common.terms.lastUpdatedDate') })}
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section1.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section1.p1')}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  {t('common.terms.section1.p2')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section2.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section2.intro')}
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  {(t('common.terms.section2.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section3.title')}</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section3.sub1.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section3.sub1.content')}
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section3.sub2.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section3.sub2.content')}
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section3.sub3.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section3.sub3.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section4.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section4.intro')}
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  {(t('common.terms.section4.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section5.title')}</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section5.sub1.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section5.sub1.content')}
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section5.sub2.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section5.sub2.content')}
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section5.sub3.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section5.sub3.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section6.title')}</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section6.sub1.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section6.sub1.content')}
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section6.sub2.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section6.sub2.content')}
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section6.sub3.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section6.sub3.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section7.title')}</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section7.sub1.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section7.sub1.content')}
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section7.sub2.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section7.sub2.content')}
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section7.sub3.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section7.sub3.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section8.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section8.p1')}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  {t('common.terms.section8.p2')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section9.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section9.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section10.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section10.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section11.title')}</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section11.sub1.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section11.sub1.content')}
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{t('common.terms.section11.sub2.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section11.sub2.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section12.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section12.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section13.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section13.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section14.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section14.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.terms.section15.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.terms.section15.intro')}
                </p>
                <div className="mt-4 p-6 bg-card/50 rounded-lg border border-border">
                  <p className="text-foreground font-medium">{t('common.terms.section15.companyName')}</p>
                  <p className="text-muted-foreground mt-2">{t('common.terms.section15.email')}</p>
                  <p className="text-muted-foreground">{t('common.terms.section15.address')}</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
