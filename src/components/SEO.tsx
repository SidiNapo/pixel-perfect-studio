import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
  category?: string;
}

const BASE_URL = 'https://e-seomax.com';

// Morocco cities for comprehensive local SEO targeting
const moroccanCities = [
  'Casablanca', 'Rabat', 'Marrakech', 'Tangier', 'Fes', 'Agadir',
  'Meknes', 'Oujda', 'Kenitra', 'Tetouan', 'Safi', 'El Jadida',
  'Nador', 'Mohammedia', 'Beni Mellal', 'Khouribga', 'Taza', 'Settat'
];

// Comprehensive Morocco-optimized SEO keywords (120+ keywords per language)
const defaultSEO = {
  en: {
    title: 'E-SEOMAX | #1 SEO Tool in Morocco – Free Audit',
    description: 'E-SEOMAX is Morocco\'s leading AI-powered SEO platform. Get your free website audit, boost rankings, and dominate search results with smart optimization tools.',
    keywords: [
      // Core SEO keywords
      'SEO Morocco', 'SEO tool Morocco', 'website analysis Morocco', 'free SEO audit Morocco',
      'best SEO tool Morocco', 'SEO agency Morocco', 'SEO platform Morocco', 'SEO software Morocco',
      'website optimization Morocco', 'search engine optimization Morocco', 'SEO services Morocco',
      'digital marketing Morocco', 'online marketing Morocco', 'web marketing Morocco',
      'SEO audit tool', 'keyword research Morocco', 'backlink analysis Morocco',
      'technical SEO Morocco', 'on-page SEO Morocco', 'off-page SEO Morocco',
      'local SEO Morocco', 'mobile SEO Morocco', 'SEO ranking Morocco',
      'Google ranking Morocco', 'SERP analysis Morocco', 'competitor analysis Morocco',
      'content optimization Morocco', 'SEO consulting Morocco', 'SEO expert Morocco',
      
      // City-specific SEO keywords
      ...moroccanCities.map(city => `SEO ${city}`),
      ...moroccanCities.map(city => `website optimization ${city}`),
      'SEO agency Casablanca', 'SEO expert Rabat', 'SEO consultant Marrakech',
      'digital marketing Casablanca', 'web agency Rabat', 'marketing agency Tangier',
      
      // Industry variations
      'e-commerce SEO Morocco', 'hotel SEO Morocco', 'restaurant SEO Morocco',
      'real estate SEO Morocco', 'healthcare SEO Morocco', 'law firm SEO Morocco',
      'startup SEO Morocco', 'small business SEO Morocco', 'enterprise SEO Morocco',
      
      // Multilingual markers
      'تحسين محركات البحث المغرب', 'référencement Maroc', 'SEO Maroc',
      'audit SEO gratuit', 'analyse site web', 'optimisation site web'
    ].join(', '),
  },
  fr: {
    title: 'E-SEOMAX | Outil SEO #1 au Maroc – Audit Gratuit',
    description: 'E-SEOMAX est la plateforme SEO IA leader au Maroc. Obtenez votre audit gratuit, améliorez vos classements et dominez les résultats de recherche.',
    keywords: [
      // Core French SEO keywords
      'SEO Maroc', 'outil SEO Maroc', 'analyse site web Maroc', 'audit SEO gratuit Maroc',
      'meilleur outil SEO Maroc', 'agence SEO Maroc', 'plateforme SEO Maroc',
      'référencement naturel Maroc', 'référencement web Maroc', 'optimisation SEO Maroc',
      'optimisation site web Maroc', 'positionnement Google Maroc', 'services SEO Maroc',
      'marketing digital Maroc', 'marketing en ligne Maroc', 'stratégie SEO Maroc',
      'audit référencement Maroc', 'recherche mots-clés Maroc', 'analyse backlinks Maroc',
      'SEO technique Maroc', 'SEO on-page Maroc', 'SEO off-page Maroc',
      'SEO local Maroc', 'SEO mobile Maroc', 'classement SEO Maroc',
      'positionnement web Maroc', 'analyse SERP Maroc', 'analyse concurrentielle Maroc',
      'optimisation contenu Maroc', 'consultant SEO Maroc', 'expert SEO Maroc',
      
      // City-specific French keywords
      'SEO Casablanca', 'SEO Rabat', 'SEO Marrakech', 'SEO Tanger', 'SEO Fès',
      'SEO Agadir', 'SEO Meknès', 'SEO Oujda', 'SEO Kénitra', 'SEO Tétouan',
      'référencement Casablanca', 'référencement Rabat', 'référencement Marrakech',
      'agence web Casablanca', 'agence digitale Rabat', 'marketing digital Casablanca',
      'expert SEO Casablanca', 'consultant SEO Rabat', 'audit SEO Marrakech',
      'optimisation site Casablanca', 'positionnement Google Rabat',
      
      // Industry variations French
      'SEO e-commerce Maroc', 'SEO hôtel Maroc', 'SEO restaurant Maroc',
      'SEO immobilier Maroc', 'SEO santé Maroc', 'SEO avocat Maroc',
      'SEO startup Maroc', 'SEO PME Maroc', 'SEO entreprise Maroc',
      
      // Additional French terms
      'webmarketing Maroc', 'netlinking Maroc', 'rédaction web SEO Maroc',
      'formation SEO Maroc', 'cours SEO Maroc', 'apprendre SEO Maroc'
    ].join(', '),
  },
  ar: {
    title: 'E-SEOMAX | أداة SEO رقم 1 في المغرب – تدقيق مجاني',
    description: 'E-SEOMAX هي منصة تحسين محركات البحث الرائدة في المغرب. احصل على تدقيق موقعك المجاني وتصدر نتائج البحث.',
    keywords: [
      // Core Arabic SEO keywords
      'تحسين محركات البحث المغرب', 'SEO المغرب', 'تحليل المواقع المغرب', 'تدقيق SEO مجاني المغرب',
      'أفضل أداة SEO المغرب', 'وكالة SEO المغرب', 'منصة SEO المغرب', 'برنامج SEO المغرب',
      'تحسين المواقع المغرب', 'تحسين محركات البحث', 'خدمات SEO المغرب',
      'التسويق الرقمي المغرب', 'التسويق الإلكتروني المغرب', 'التسويق عبر الإنترنت المغرب',
      'أداة تدقيق SEO', 'بحث الكلمات المفتاحية المغرب', 'تحليل الروابط الخلفية المغرب',
      'SEO التقني المغرب', 'تحسين الصفحات المغرب', 'بناء الروابط المغرب',
      'SEO المحلي المغرب', 'SEO الجوال المغرب', 'ترتيب SEO المغرب',
      'ترتيب جوجل المغرب', 'تحليل نتائج البحث المغرب', 'تحليل المنافسين المغرب',
      'تحسين المحتوى المغرب', 'استشارات SEO المغرب', 'خبير SEO المغرب',
      
      // City-specific Arabic keywords
      'SEO الدار البيضاء', 'SEO الرباط', 'SEO مراكش', 'SEO طنجة', 'SEO فاس',
      'SEO أكادير', 'SEO مكناس', 'SEO وجدة', 'SEO القنيطرة', 'SEO تطوان',
      'تحسين محركات البحث الدار البيضاء', 'تحسين محركات البحث الرباط', 'تحسين محركات البحث مراكش',
      'وكالة رقمية الدار البيضاء', 'وكالة تسويق الرباط', 'خبير SEO الدار البيضاء',
      'تدقيق SEO مراكش', 'تحليل الموقع طنجة', 'تحسين الموقع فاس',
      
      // Industry variations Arabic
      'SEO التجارة الإلكترونية المغرب', 'SEO الفنادق المغرب', 'SEO المطاعم المغرب',
      'SEO العقارات المغرب', 'SEO الرعاية الصحية المغرب', 'SEO المحاماة المغرب',
      'SEO الشركات الناشئة المغرب', 'SEO الشركات الصغيرة المغرب',
      
      // Additional Arabic terms
      'تصدر نتائج البحث', 'رفع ترتيب الموقع', 'زيادة زيارات الموقع',
      'تحسين ظهور الموقع', 'الظهور في جوجل', 'أرشفة المواقع المغرب'
    ].join(', '),
  },
};

// Page-specific SEO configurations with enhanced descriptions
const pageSEO: Record<string, { en: Partial<SEOProps>; fr: Partial<SEOProps>; ar: Partial<SEOProps> }> = {
  '/': {
    en: { 
      title: 'E-SEOMAX | #1 SEO Tool in Morocco – Free Audit',
      description: 'E-SEOMAX is Morocco\'s #1 AI-powered SEO platform. Free website audit for Casablanca, Rabat, Marrakech & all Morocco. Boost your Google rankings today!',
    },
    fr: { 
      title: 'E-SEOMAX | Outil SEO #1 au Maroc – Audit Gratuit',
      description: 'E-SEOMAX est la plateforme SEO #1 au Maroc. Audit gratuit pour Casablanca, Rabat, Marrakech. Améliorez votre référencement Google maintenant!',
    },
    ar: { 
      title: 'E-SEOMAX | أداة SEO رقم 1 في المغرب – تدقيق مجاني',
      description: 'E-SEOMAX هي منصة SEO الأولى في المغرب. تدقيق مجاني للدار البيضاء والرباط ومراكش. حسّن ترتيبك في جوجل اليوم!',
    },
  },
  '/about': {
    en: { 
      title: 'About E-SEOMAX | AI-Powered SEO Platform Morocco',
      description: 'Learn about E-SEOMAX, Morocco\'s premier AI-powered SEO platform serving Casablanca, Rabat, Marrakech, and all Moroccan cities.',
    },
    fr: { 
      title: 'À Propos E-SEOMAX | Plateforme SEO IA Maroc',
      description: 'Découvrez E-SEOMAX, la plateforme SEO IA leader au Maroc servant Casablanca, Rabat, Marrakech et toutes les villes marocaines.',
    },
    ar: { 
      title: 'حول E-SEOMAX | منصة SEO بالذكاء الاصطناعي المغرب',
      description: 'تعرف على E-SEOMAX، منصة تحسين محركات البحث الرائدة في المغرب للدار البيضاء والرباط ومراكش.',
    },
  },
  '/blog': {
    en: { 
      title: 'SEO Blog Morocco | Tips & Guides | E-SEOMAX',
      description: 'Expert SEO tips, guides, and insights for Morocco. Learn SEO strategies for Casablanca, Rabat, Marrakech businesses. Updated weekly.',
    },
    fr: { 
      title: 'Blog SEO Maroc | Conseils & Guides | E-SEOMAX',
      description: 'Conseils SEO d\'experts pour le Maroc. Stratégies de référencement pour Casablanca, Rabat, Marrakech. Mis à jour chaque semaine.',
    },
    ar: { 
      title: 'مدونة SEO المغرب | نصائح وإرشادات | E-SEOMAX',
      description: 'نصائح SEO من الخبراء للمغرب. استراتيجيات لتحسين محركات البحث للدار البيضاء والرباط ومراكش.',
    },
  },
  '/contact': {
    en: { 
      title: 'Contact E-SEOMAX | SEO Support Morocco',
      description: 'Contact E-SEOMAX for SEO support in Morocco. Serving Casablanca, Rabat, Marrakech, Tangier, Fes, Agadir and all Moroccan cities.',
    },
    fr: { 
      title: 'Contactez E-SEOMAX | Support SEO Maroc',
      description: 'Contactez E-SEOMAX pour le support SEO au Maroc. Service à Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir.',
    },
    ar: { 
      title: 'اتصل بـ E-SEOMAX | دعم SEO المغرب',
      description: 'تواصل مع E-SEOMAX للحصول على دعم SEO في المغرب. خدمة الدار البيضاء والرباط ومراكش وطنجة وفاس.',
    },
  },
  '/faq': {
    en: { 
      title: 'SEO FAQ Morocco | Questions Answered | E-SEOMAX',
      description: 'Frequently asked questions about SEO in Morocco. Get answers about website optimization for Casablanca, Rabat, Marrakech businesses.',
    },
    fr: { 
      title: 'FAQ SEO Maroc | Questions Fréquentes | E-SEOMAX',
      description: 'Questions fréquentes sur le SEO au Maroc. Réponses pour l\'optimisation des sites à Casablanca, Rabat, Marrakech.',
    },
    ar: { 
      title: 'الأسئلة الشائعة SEO المغرب | E-SEOMAX',
      description: 'أسئلة شائعة حول SEO في المغرب. إجابات عن تحسين المواقع للدار البيضاء والرباط ومراكش.',
    },
  },
  '/how-it-works': {
    en: { 
      title: 'How E-SEOMAX Works | SEO Analysis Morocco',
      description: 'Discover how E-SEOMAX\'s AI-powered SEO analysis works for Morocco. Free audit for Casablanca, Rabat, Marrakech websites.',
    },
    fr: { 
      title: 'Comment Fonctionne E-SEOMAX | Analyse SEO Maroc',
      description: 'Découvrez comment l\'analyse SEO E-SEOMAX fonctionne au Maroc. Audit gratuit pour sites de Casablanca, Rabat, Marrakech.',
    },
    ar: { 
      title: 'كيف يعمل E-SEOMAX | تحليل SEO المغرب',
      description: 'اكتشف كيف يعمل تحليل SEO من E-SEOMAX للمغرب. تدقيق مجاني للدار البيضاء والرباط ومراكش.',
    },
  },
  '/privacy-policy': {
    en: { title: 'Privacy Policy | E-SEOMAX Morocco', noIndex: false },
    fr: { title: 'Politique de Confidentialité | E-SEOMAX Maroc', noIndex: false },
    ar: { title: 'سياسة الخصوصية | E-SEOMAX المغرب', noIndex: false },
  },
  '/terms-of-service': {
    en: { title: 'Terms of Service | E-SEOMAX Morocco', noIndex: false },
    fr: { title: 'Conditions d\'Utilisation | E-SEOMAX Maroc', noIndex: false },
    ar: { title: 'شروط الخدمة | E-SEOMAX المغرب', noIndex: false },
  },
  '/cookie-policy': {
    en: { title: 'Cookie Policy | E-SEOMAX Morocco', noIndex: false },
    fr: { title: 'Politique des Cookies | E-SEOMAX Maroc', noIndex: false },
    ar: { title: 'سياسة ملفات تعريف الارتباط | E-SEOMAX المغرب', noIndex: false },
  },
  '/disclaimer': {
    en: { title: 'Disclaimer | E-SEOMAX Morocco', noIndex: false },
    fr: { title: 'Avertissement | E-SEOMAX Maroc', noIndex: false },
    ar: { title: 'إخلاء المسؤولية | E-SEOMAX المغرب', noIndex: false },
  },
};

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = 'https://e-seomax.com/og-image.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'E-SEOMAX',
  noIndex = false,
  category,
}: SEOProps) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';
  const langKey = (lang === 'fr' ? 'fr' : lang === 'ar' ? 'ar' : 'en') as keyof typeof defaultSEO;
  
  const currentPath = location.pathname;
  const pageConfig = pageSEO[currentPath]?.[langKey] || {};
  
  const finalTitle = title || pageConfig.title || defaultSEO[langKey].title;
  const finalDescription = description || pageConfig.description || defaultSEO[langKey].description;
  const finalKeywords = keywords || defaultSEO[langKey].keywords;
  const shouldNoIndex = noIndex || pageConfig.noIndex;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Helper to update or create meta tag
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create link tag
    const updateLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang 
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        if (hreflang) element.setAttribute('hreflang', hreflang);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Basic meta tags
    updateMeta('description', finalDescription);
    updateMeta('keywords', finalKeywords);
    updateMeta('author', author);

    // Robots
    if (shouldNoIndex) {
      updateMeta('robots', 'noindex, nofollow');
    } else {
      updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Open Graph
    updateMeta('og:title', finalTitle, true);
    updateMeta('og:description', finalDescription, true);
    updateMeta('og:type', type, true);
    updateMeta('og:url', `${BASE_URL}${currentPath}`, true);
    updateMeta('og:image', image, true);
    updateMeta('og:site_name', 'E-SEOMAX', true);
    updateMeta('og:locale', lang === 'ar' ? 'ar_MA' : lang === 'fr' ? 'fr_MA' : 'en_US', true);
    updateMeta('og:locale:alternate', 'en_US', true);
    updateMeta('og:locale:alternate', 'fr_MA', true);
    updateMeta('og:locale:alternate', 'ar_MA', true);

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:site', '@eseomax');
    updateMeta('twitter:creator', '@eseomax');
    updateMeta('twitter:title', finalTitle);
    updateMeta('twitter:description', finalDescription);
    updateMeta('twitter:image', image);

    // Article specific
    if (type === 'article') {
      if (publishedTime) updateMeta('article:published_time', publishedTime, true);
      if (modifiedTime) updateMeta('article:modified_time', modifiedTime, true);
      updateMeta('article:author', author, true);
      if (category) updateMeta('article:section', category, true);
    }

    // Canonical URL
    updateLink('canonical', `${BASE_URL}${currentPath}`);

    // Hreflang tags for multilingual SEO
    const cleanPath = currentPath === '/' ? '' : currentPath;
    updateLink('alternate', `${BASE_URL}${cleanPath}`, 'en');
    updateLink('alternate', `${BASE_URL}${cleanPath}`, 'fr');
    updateLink('alternate', `${BASE_URL}${cleanPath}`, 'ar');
    updateLink('alternate', `${BASE_URL}${cleanPath}`, 'x-default');

    // Geo targeting for Morocco
    updateMeta('geo.region', 'MA');
    updateMeta('geo.placename', 'Morocco');

    return () => {
      // Cleanup is optional as tags will be updated on next render
    };
  }, [finalTitle, finalDescription, finalKeywords, image, type, currentPath, lang, shouldNoIndex, author, publishedTime, modifiedTime, category]);

  return null;
};

export default SEO;

// Export Morocco cities for other components
export { moroccanCities };

// Export for use in blog posts
export const getBlogPostSEO = (post: {
  title: string;
  excerpt: string;
  slug: string;
  category?: string;
  featured_image?: string;
  published_at?: string;
  updated_at?: string;
}) => ({
  title: `${post.title} | E-SEOMAX Blog Morocco`,
  description: post.excerpt?.slice(0, 160) || `Read ${post.title} on E-SEOMAX Blog. Expert SEO tips for Morocco.`,
  image: post.featured_image || 'https://e-seomax.com/og-image.png',
  type: 'article' as const,
  publishedTime: post.published_at,
  modifiedTime: post.updated_at,
  category: post.category,
});

// Base Morocco keywords for blog posts
export const getMoroccoBaseKeywords = (lang: 'en' | 'fr' | 'ar' = 'en') => {
  const base = {
    en: 'SEO Morocco, SEO Casablanca, SEO Rabat, SEO Marrakech, free SEO audit Morocco, website optimization Morocco',
    fr: 'SEO Maroc, SEO Casablanca, SEO Rabat, SEO Marrakech, audit SEO gratuit Maroc, référencement Maroc',
    ar: 'SEO المغرب, SEO الدار البيضاء, SEO الرباط, SEO مراكش, تدقيق SEO مجاني, تحسين محركات البحث المغرب',
  };
  return base[lang];
};
