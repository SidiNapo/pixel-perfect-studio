import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { useTranslation } from 'react-i18next';

const CookiePolicy = () => {
  const { t } = useTranslation();
  const sections = t('common.cookiePolicy.sections', { returnObjects: true }) as Array<{
    title: string;
    subsections: Array<{
      title?: string;
      content?: string;
      list?: string[];
      table?: {
        headers: string[];
        rows: Array<string[]>;
      };
    }>;
  }>;
  const contact = t('common.cookiePolicy.contact', { returnObjects: true }) as {
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
              {t('common.cookiePolicy.title')}
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
                            <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      )}
                      {subsection.table && (
                        <div className="mt-4 overflow-x-auto">
                          <table className="w-full text-sm text-muted-foreground border border-border rounded-lg">
                            <thead className="bg-card/50">
                              <tr>
                                {subsection.table.headers.map((header, hIndex) => (
                                  <th key={hIndex} className="text-left p-3 border-b border-border">{header}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {subsection.table.rows.map((row, rIndex) => (
                                <tr key={rIndex}>
                                  {row.map((cell, cIndex) => (
                                    <td key={cIndex} className={rIndex === subsection.table!.rows.length - 1 ? "p-3" : "p-3 border-b border-border"}>{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
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

export default CookiePolicy;