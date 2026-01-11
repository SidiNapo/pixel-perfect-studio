import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '@/assets/e-seomax-logo.png';

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
    { label: 'Home' },
    { label: 'Blog' },
    { label: 'About Us' },
    { label: 'Contact Us' },
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
            <img src={logo} alt="E-SEOMAX" className="h-10 w-auto" />
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-1 text-[15px] text-white/70 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Empty div for layout balance */}
          <div className="w-10" />
        </div>
      </div>
    </motion.nav>
  );
}
