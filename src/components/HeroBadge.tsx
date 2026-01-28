import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function HeroBadge() {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/50 bg-primary/10 mb-8"
    >
      <span className="px-2 py-0.5 text-xs font-semibold bg-primary text-white rounded-full">
        NEW
      </span>
      <span className="text-sm text-primary font-medium">
        {t('hero.badge')}
      </span>
    </motion.div>
  );
}
