import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { useTranslation } from 'react-i18next';

const TermsOfService = () => {
  const { t } = useTranslation();
  const sections = t('common.terms.sections', { returnObjects: true }) as Array<{
    title: string;
    subsections: Array<{
      title?: string;
      content?: string;
      list?: string[];
    }>;
  }>;
  const contactInfo = t('common.terms.contact', { returnObjects: true }) as {
    title: string;
    intro: string;
    company: string;
    email: string;
    address: string;
  };

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
              {t('common.legal.lastUpdatedLine', { date: 'January 15, 2026' })}
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              {sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{section.title}</h2>
                  {section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      {subsection.title && (
                        <h3 className="text-xl font-medium text-foreground mt-6 mb-3">{subsection.title}</h3>
                      )}
                      {subsection.content && (
                        <p className="text-muted-foreground leading-relaxed mt-4" dangerouslySetInnerHTML={{ __html: subsection.content }} />
                      )}
                      {subsection.list && (
                        <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                          {subsection.list.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </section>
              ))}

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{contactInfo.title}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {contactInfo.intro}
                </p>
                <div className="mt-4 p-6 bg-card/50 rounded-lg border border-border">
                  <p className="text-foreground font-medium">{contactInfo.company}</p>
                  <p className="text-muted-foreground mt-2">{contactInfo.email}</p>
                  <p className="text-muted-foreground">{contactInfo.address}</p>
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
