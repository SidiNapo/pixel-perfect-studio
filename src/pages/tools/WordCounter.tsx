import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Type, Hash, Clock, AlignLeft } from 'lucide-react';

const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim() !== '').length : 0;
    const readingTime = Math.ceil(words / 200); // avg 200 words per minute

    setStats({
      words,
      characters,
      charactersNoSpaces,
      paragraphs,
      readingTime,
    });
  }, [text]);

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <SEO />
      <Navbar />
      
      <section className="pt-32 pb-16 px-6 flex-grow">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Free Word Counter Tool
            </h1>
            <p className="text-xl text-muted-foreground">
              Instantly count words, characters, and reading time for your content.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Words', value: stats.words, icon: <Type className="w-5 h-5" /> },
              { label: 'Characters', value: stats.characters, icon: <Hash className="w-5 h-5" /> },
              { label: 'Paragraphs', value: stats.paragraphs, icon: <AlignLeft className="w-5 h-5" /> },
              { label: 'Reading Time (min)', value: stats.readingTime, icon: <Clock className="w-5 h-5" /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <div className="flex justify-center text-primary mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <textarea
              className="w-full h-96 p-6 rounded-2xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none text-foreground text-lg transition-all"
              placeholder="Type or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
              <span>Characters without spaces: {stats.charactersNoSpaces}</span>
              <button 
                onClick={() => setText('')}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                Clear text
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default WordCounter;
