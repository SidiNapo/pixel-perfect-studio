import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/e-seomax-logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
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
          <Link to="/" className="flex items-center">
            <img src={logo} alt="E-SEOMAX" className="h-16 md:h-20 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-[15px] transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-primary font-medium'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="w-10" />
        </div>
      </div>
    </motion.nav>
  );
}
