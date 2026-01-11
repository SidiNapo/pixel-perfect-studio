import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', hasDropdown: true },
    { label: 'Developers', hasDropdown: false },
    { label: 'Company', hasDropdown: true },
    { label: 'Blog', hasDropdown: false },
    { label: 'Changelog', hasDropdown: false },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-nav bg-black/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center glow-purple-sm">
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse-glow" />
            </div>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-1 text-[15px] text-white/70 hover:text-white transition-colors duration-200"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg glow-purple-sm hover:bg-primary/90 transition-all duration-200"
          >
            Join waitlist
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
