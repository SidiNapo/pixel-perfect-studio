import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { getDirection, setLanguage, type LanguageCode } from '@/i18n';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const isRTL = getDirection(i18n.language) === 'rtl';

  const current = (i18n.language?.split('-')[0] || 'en') as LanguageCode;

  const handleLanguageChange = async (code: LanguageCode) => {
    await setLanguage(code);
  };

  const options: Array<{ code: LanguageCode; labelKey: string }> = [
    { code: 'en', labelKey: 'common.language.en' },
    { code: 'fr', labelKey: 'common.language.fr' },
    { code: 'ar', labelKey: 'common.language.ar' },
  ];

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 p-1 ${
        isRTL ? 'flex-row-reverse' : ''
      }`}
      aria-label={t('common.language.switcherLabel')}
    >
      <div className="px-2 text-white/60">
        <Globe className="w-4 h-4" />
      </div>

      {options.map((opt) => {
        const isActive = current === opt.code;
        return (
          <motion.button
            key={opt.code}
            type="button"
            onClick={() => handleLanguageChange(opt.code)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={t(opt.labelKey)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
              isActive
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {t(opt.labelKey)}
          </motion.button>
        );
      })}
    </div>
  );
}
