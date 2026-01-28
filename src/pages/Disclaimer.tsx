import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Disclaimer = () => {
  const { t } = useTranslation();
  const importantNotice = t('common.disclaimer.importantNotice', { returnObjects: true }) as {
    title: string;
    content: string;
  };
  const sections = t('common.disclaimer.sections', { returnObjects: true }) as Array<{
    title: string;
    paragraphs?: string[];
    list?: string[];
  }>;
  const contact = t('common.disclaimer.contact', { returnObjects: true }) as {
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
              {t('common.disclaimer.title')}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t('common.legal.lastUpdatedLine', { date: 'January 15, 2026' })}
            </p>

            {/* Important Notice Box */}
            <div className="mb-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-500 mb-2">{importantNotice.title}</h3>
                  <p className="text-muted-foreground">
                    {importantNotice.content}
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              {sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{section.title}</h2>
                  {section.paragraphs?.map((paragraph, pIndex) => (
                    <p 
                      key={pIndex} 
                      className="text-muted-foreground leading-relaxed mt-4" 
                      dangerouslySetInnerHTML={{ __html: paragraph }} 
                    />
                  ))}
                  {section.list && (
                    <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                      {section.list.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{contact.title}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {contact.intro}
                </p>
                <div className="mt-4 p-6 bg-card/50 rounded-lg border border-border">
                  <p className="text-foreground font-medium">{contact.company}</p>
                  <p className="text-muted-foreground mt-2">{contact.email}</p>
                  <p className="text-muted-foreground">{contact.address}</p>
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

export default Disclaimer;
