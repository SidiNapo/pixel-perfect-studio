import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/e-seomax-logo.png';
import LanguageSwitcher from './LanguageSwitcher';
import { getDirection } from '@/i18n';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = getDirection(i18n.language) === 'rtl';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: t('common.nav.home'), href: '/' },
    { label: 'Tools', href: '/tools' },
    { label: t('common.nav.blog'), href: '/blog' },
    { label: t('common.nav.about'), href: '/about' },
    { label: t('common.nav.contact'), href: '/contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-nav bg-background/80' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`flex items-center justify-between h-20 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to="/" className="flex items-center relative z-[60]">
              <img src={logo} alt={t('common.brand.logoAlt')} className="h-12 md:h-16 lg:h-20 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-[15px] transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-primary font-medium'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Desktop Language Switcher */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
              
              {/* Mobile menu button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden relative z-[60] p-2 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-foreground hover:bg-muted transition-all duration-200"
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[55] md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
            
            {/* Gradient decorations */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center px-8">
              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-6 mb-12">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`relative text-2xl font-medium transition-all duration-300 ${
                        location.pathname === item.href
                          ? 'text-primary'
                          : 'text-foreground/70 hover:text-foreground'
                      }`}
                    >
                      <span className="relative">
                        {item.label}
                        {location.pathname === item.href && (
                          <motion.span
                            layoutId="mobile-nav-indicator"
                            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-full"
                          />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Language Switcher */}
              <motion.div
                custom={navItems.length}
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <LanguageSwitcher />
              </motion.div>

              {/* Decorative bottom element */}
              <motion.div
                custom={navItems.length + 1}
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
              >
                <div className="flex items-center gap-2 text-muted-foreground/50 text-sm">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-border" />
                  <span>E-SEOMAX</span>
                  <div className="w-8 h-px bg-gradient-to-l from-transparent to-border" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
