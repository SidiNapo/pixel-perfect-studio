import { motion } from 'framer-motion';
import HeroBadge from './HeroBadge';
import SEOAnalyzer from './seo/SEOAnalyzer';

export default function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 lg:px-12 xl:px-24 pt-24 pb-12">
      <div className="w-full max-w-4xl">
        <HeroBadge />
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-5xl md:text-6xl lg:text-[72px] font-extrabold text-foreground leading-[1.08] tracking-[-0.02em] mb-6"
        >
          Smarter SEO
          <br />
          Starts Here.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
        >
          Elevate your site's visibility effortlessly with AI, where smart technology meets user-friendly SEO tools.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <SEOAnalyzer />
        </motion.div>
      </div>
    </div>
  );
}
