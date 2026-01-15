import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Shield, BarChart3, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import type { CookieConsentState } from './CookieConsent';

interface CookiePreferencesProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: Omit<CookieConsentState, 'consented'>) => void;
  currentPreferences: CookieConsentState;
}

const cookieCategories = [
  {
    id: 'necessary',
    icon: Shield,
    title: 'Essential Cookies',
    description: 'These cookies are strictly necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies.',
    required: true,
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Analytics Cookies',
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.',
    required: false,
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Marketing & Advertising Cookies',
    description: 'These cookies are used to deliver advertisements that are more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns. This includes Google AdSense and DoubleClick cookies.',
    required: false,
  },
];

const CookiePreferences = ({ isOpen, onClose, onSave, currentPreferences }: CookiePreferencesProps) => {
  const [preferences, setPreferences] = useState<Omit<CookieConsentState, 'consented'>>({
    necessary: true,
    analytics: currentPreferences.analytics,
    marketing: currentPreferences.marketing,
  });

  useEffect(() => {
    setPreferences({
      necessary: true,
      analytics: currentPreferences.analytics,
      marketing: currentPreferences.marketing,
    });
  }, [currentPreferences]);

  const handleToggle = (id: string, value: boolean) => {
    if (id === 'necessary') return; // Can't toggle necessary cookies
    setPreferences(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = () => {
    onSave(preferences);
  };

  const handleAcceptAll = () => {
    onSave({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:max-w-xl z-50 max-h-[80vh] overflow-auto"
          >
            <div className="bg-card border border-border rounded-xl shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between rounded-t-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Cookie className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Cookie Preferences</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Close preferences"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <p className="text-muted-foreground text-sm">
                  We use cookies to enhance your experience. You can customize your cookie preferences below. 
                  Essential cookies cannot be disabled as they are required for the website to function.
                </p>

                {cookieCategories.map((category) => (
                  <div
                    key={category.id}
                    className="p-4 bg-secondary/30 border border-border rounded-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg mt-1">
                          <category.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground mb-1">
                            {category.title}
                            {category.required && (
                              <span className="ml-2 text-xs text-muted-foreground">(Required)</span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={preferences[category.id as keyof typeof preferences] as boolean}
                        onCheckedChange={(value) => handleToggle(category.id, value)}
                        disabled={category.required}
                        className="flex-shrink-0"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border p-6 flex flex-col sm:flex-row gap-3 rounded-b-xl">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Save Preferences
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  variant="outline"
                  className="flex-1"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookiePreferences;
