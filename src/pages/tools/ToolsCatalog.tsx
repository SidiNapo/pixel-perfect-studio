import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Link as LinkIcon, Type, BarChart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';

const tools = [
  {
    id: 'seo-audit',
    name: 'Instant SEO Audit',
    description: 'Get a comprehensive website SEO score and technical analysis instantly.',
    icon: <BarChart className="w-8 h-8 text-primary" />,
    path: '/tools/seo-audit',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Lightning-fast character, word, and keyword density checker.',
    icon: <Type className="w-8 h-8 text-primary" />,
    path: '/tools/word-counter',
    color: 'bg-green-500/10 text-green-500',
  },
  {
    id: 'backlink-checker',
    name: 'Backlink Checker',
    description: 'Discover who is linking to your domain and analyze competitor profiles.',
    icon: <LinkIcon className="w-8 h-8 text-primary" />,
    path: '/tools/backlink-checker',
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    id: 'plagiarism-checker',
    name: 'Plagiarism Checker (Coming Soon)',
    description: 'Advanced AI-powered plagiarism detection for content creators.',
    icon: <Search className="w-8 h-8 text-muted-foreground" />,
    path: '#',
    color: 'bg-gray-500/10 text-gray-500',
    disabled: true,
  },
];

const ToolsCatalog = () => {
  const { t } = useTranslation();

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <SEO />
      <Navbar />
      
      <section className="pt-32 pb-16 px-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Free AI-Powered SEO Tools
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Supercharge your global digital marketing strategy with our suite of lightning-fast, highly accurate, and completely free micro-tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {tool.disabled ? (
                  <div className="h-full p-8 rounded-2xl bg-card border border-border/50 opacity-60">
                    <div className={`w-16 h-16 rounded-xl ${tool.color} flex items-center justify-center mb-6`}>
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{tool.name}</h3>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </div>
                ) : (
                  <Link to={tool.path} className="block h-full group">
                    <div className="h-full p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className={`w-16 h-16 rounded-xl ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        {tool.icon}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{tool.name}</h3>
                      <p className="text-muted-foreground">{tool.description}</p>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ToolsCatalog;
