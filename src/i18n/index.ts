import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Legacy translations (existing keys) kept temporarily for a progressive migration.
import enLegacy from './locales/en.json';
import frLegacy from './locales/fr.json';
import arLegacy from './locales/ar.json';

// New scalable structure: locales/<lng>/common.json
import enCommon from './locales/en/common.json';
import frCommon from './locales/fr/common.json';
import arCommon from './locales/ar/common.json';

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const mergeDeep = <T extends Record<string, unknown>, U extends Record<string, unknown>>(
  base: T,
  overrides: U,
): T & U => {
  const result: Record<string, unknown> = { ...base };

  for (const [key, overrideValue] of Object.entries(overrides)) {
    const baseValue = result[key];
    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = mergeDeep(baseValue, overrideValue);
      continue;
    }

    result[key] = overrideValue;
  }

  return result as T & U;
};

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
] as const;

export type LanguageCode = typeof languages[number]['code'];

const STORAGE_KEY = 'lang';

// Function to get the current direction
export const getDirection = (lang: string): 'ltr' | 'rtl' => {
  return lang === 'ar' ? 'rtl' : 'ltr';
};

// Sync <html lang=".."> + <html dir=".."> for native RTL/LTR behavior.
export const applyLanguageToDocument = (lang: string) => {
  const normalized = lang?.split('-')[0] || 'en';
  const dir = getDirection(normalized);
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', normalized);
};

// Reusable helper for UI events (buttons, menus, etc.).
export const setLanguage = async (lang: LanguageCode) => {
  localStorage.setItem(STORAGE_KEY, lang);
  await i18n.changeLanguage(lang);
  applyLanguageToDocument(lang);
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      // Merge legacy keys with the new "common.*" tree.
      // This allows us to migrate component-by-component without breaking the app.
      en: { translation: mergeDeep(enLegacy, enCommon) },
      fr: { translation: mergeDeep(frLegacy, frCommon) },
      ar: { translation: mergeDeep(arLegacy, arCommon) },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'ar'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: STORAGE_KEY,
    },
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  });

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  applyLanguageToDocument(lng);
});

// Set initial direction after i18n is ready
if (typeof window !== 'undefined' && i18n.isInitialized) {
  applyLanguageToDocument(i18n.language);
} else {
  i18n.on('initialized', () => {
    applyLanguageToDocument(i18n.language);
  });
}

export default i18n;
