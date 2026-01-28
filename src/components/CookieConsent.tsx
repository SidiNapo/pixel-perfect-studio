import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CookiePreferences from './CookiePreferences';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface CookieConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  consented: boolean;
  timestamp?: string;
}

const defaultConsent: CookieConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  consented: false,
};

const CookieConsent = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState<CookieConsentState>(defaultConsent);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (stored) {
      const parsed = JSON.parse(stored) as CookieConsentState;
      setConsent(parsed);
      if (!parsed.consented) {
        setShowBanner(true);
      }
    } else {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (newConsent: CookieConsentState) => {
    const consentWithTimestamp = {
      ...newConsent,
      consented: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentWithTimestamp));
    setConsent(consentWithTimestamp);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      consented: true,
    });
  };

  const rejectNonEssential = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      consented: true,
    });
  };

  const handlePreferencesSave = (preferences: Omit<CookieConsentState, 'consented'>) => {
    saveConsent({
      ...preferences,
      consented: true,
    });
  };

  if (!showBanner && !showPreferences) return null;

  return (
    <>
      <AnimatePresence>
        {showBanner && !showPreferences && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <div className="max-w-6xl mx-auto">
              <div className="bg-card border border-border rounded-xl shadow-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Cookie className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{t('cookies.banner.title')}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t('cookies.banner.description')}{' '}
                      <Link to="/cookie-policy" className="text-primary hover:underline">{t('cookies.banner.cookiePolicy')}</Link>{' '}
                      {t('cookies.banner.and')}{' '}
                      <Link to="/privacy-policy" className="text-primary hover:underline">{t('cookies.banner.privacyPolicy')}</Link>{' '}
                      {t('cookies.banner.learnMore')}.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:min-w-[200px]">
                    <Button
                      onClick={acceptAll}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {t('cookies.actions.acceptAll')}
                    </Button>
                    <Button
                      onClick={rejectNonEssential}
                      variant="outline"
                      className="border-border"
                    >
                      {t('cookies.actions.rejectNonEssential')}
                    </Button>
                    <Button
                      onClick={() => setShowPreferences(true)}
                      variant="ghost"
                      className="flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      {t('cookies.actions.managePreferences')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookiePreferences
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={handlePreferencesSave}
        currentPreferences={consent}
      />
    </>
  );
};

export default CookieConsent;
