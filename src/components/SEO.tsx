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
}

// Morocco-optimized default SEO configuration
const defaultSEO = {
  en: {
    title: 'E-SEOMAX | #1 SEO Tool in Morocco – Free Audit',
    description: 'E-SEOMAX is Morocco\'s leading AI-powered SEO platform. Get your free website audit, boost rankings, and dominate search results with smart optimization tools.',
    keywords: 'SEO Morocco, SEO tool Morocco, website analysis Morocco, free SEO audit, تحسين محركات البحث المغرب, référencement Maroc, SEO Maroc, audit SEO gratuit, analyse site web, keyword research Morocco',
  },
  fr: {
    title: 'E-SEOMAX | Outil SEO #1 au Maroc – Audit Gratuit',
    description: 'E-SEOMAX est la plateforme SEO IA leader au Maroc. Obtenez votre audit gratuit, améliorez vos classements et dominez les résultats de recherche.',
    keywords: 'SEO Maroc, outil SEO Maroc, analyse site web Maroc, audit SEO gratuit, référencement naturel Maroc, optimisation moteur de recherche, agence SEO Maroc',
  },
  ar: {
    title: 'E-SEOMAX | أداة SEO رقم 1 في المغرب – تدقيق مجاني',
    description: 'E-SEOMAX هي منصة تحسين محركات البحث الرائدة في المغرب. احصل على تدقيق موقعك المجاني وتصدر نتائج البحث.',
    keywords: 'تحسين محركات البحث المغرب, SEO المغرب, تحليل المواقع المغرب, تدقيق SEO مجاني, تحسين محركات البحث, تصدر نتائج البحث',
  },
};

const BASE_URL = 'https://e-seomax.com';

// Page-specific SEO configurations
const pageSEO: Record<string, { en: Partial<SEOProps>; fr: Partial<SEOProps>; ar: Partial<SEOProps> }> = {
  '/': {
    en: { title: 'E-SEOMAX | #1 SEO Tool in Morocco – Free Audit' },
    fr: { title: 'E-SEOMAX | Outil SEO #1 au Maroc – Audit Gratuit' },
    ar: { title: 'E-SEOMAX | أداة SEO رقم 1 في المغرب – تدقيق مجاني' },
  },
  '/about': {
    en: { 
      title: 'About E-SEOMAX | AI-Powered SEO Platform from Morocco',
      description: 'Learn about E-SEOMAX, Morocco\'s premier AI-powered SEO platform. Our mission is to help businesses dominate search results.',
    },
    fr: { 
      title: 'À Propos E-SEOMAX | Plateforme SEO IA du Maroc',
      description: 'Découvrez E-SEOMAX, la plateforme SEO IA leader au Maroc. Notre mission est d\'aider les entreprises à dominer les résultats de recherche.',
    },
    ar: { 
      title: 'حول E-SEOMAX | منصة SEO بالذكاء الاصطناعي من المغرب',
      description: 'تعرف على E-SEOMAX، منصة تحسين محركات البحث الرائدة في المغرب.',
    },
  },
  '/blog': {
    en: { 
      title: 'SEO Blog | Tips & Insights from E-SEOMAX Morocco',
      description: 'Expert SEO tips, guides, and insights from Morocco\'s leading SEO platform. Stay updated with the latest search engine optimization strategies.',
    },
    fr: { 
      title: 'Blog SEO | Conseils et Astuces de E-SEOMAX Maroc',
      description: 'Conseils SEO d\'experts, guides et astuces de la plateforme SEO leader au Maroc. Restez à jour avec les dernières stratégies d\'optimisation.',
    },
    ar: { 
      title: 'مدونة SEO | نصائح وإرشادات من E-SEOMAX المغرب',
      description: 'نصائح SEO من الخبراء ودليل من منصة تحسين محركات البحث الرائدة في المغرب.',
    },
  },
  '/contact': {
    en: { 
      title: 'Contact E-SEOMAX | Get SEO Support in Morocco',
      description: 'Contact E-SEOMAX for SEO support and inquiries. We\'re here to help your business succeed in search results across Morocco.',
    },
    fr: { 
      title: 'Contactez E-SEOMAX | Support SEO au Maroc',
      description: 'Contactez E-SEOMAX pour le support SEO et les demandes. Nous sommes là pour aider votre entreprise à réussir au Maroc.',
    },
    ar: { 
      title: 'اتصل بـ E-SEOMAX | دعم SEO في المغرب',
      description: 'تواصل مع E-SEOMAX للحصول على دعم تحسين محركات البحث في المغرب.',
    },
  },
  '/faq': {
    en: { 
      title: 'SEO FAQ | Common Questions Answered | E-SEOMAX Morocco',
      description: 'Find answers to frequently asked questions about SEO and the E-SEOMAX platform. Get help with your SEO journey.',
    },
    fr: { 
      title: 'FAQ SEO | Questions Fréquentes | E-SEOMAX Maroc',
      description: 'Trouvez les réponses aux questions fréquentes sur le SEO et la plateforme E-SEOMAX.',
    },
    ar: { 
      title: 'الأسئلة الشائعة | E-SEOMAX المغرب',
      description: 'اعثر على إجابات للأسئلة المتكررة حول تحسين محركات البحث ومنصة E-SEOMAX.',
    },
  },
  '/how-it-works': {
    en: { 
      title: 'How E-SEOMAX Works | SEO Analysis Made Simple',
      description: 'Discover how E-SEOMAX\'s AI-powered SEO analysis works. From audit to optimization, we make improving your search rankings easy.',
    },
    fr: { 
      title: 'Comment Fonctionne E-SEOMAX | Analyse SEO Simplifiée',
      description: 'Découvrez comment l\'analyse SEO alimentée par l\'IA d\'E-SEOMAX fonctionne.',
    },
    ar: { 
      title: 'كيف يعمل E-SEOMAX | تحليل SEO بسيط',
      description: 'اكتشف كيف يعمل تحليل SEO بالذكاء الاصطناعي من E-SEOMAX.',
    },
  },
  '/privacy-policy': {
    en: { title: 'Privacy Policy | E-SEOMAX', noIndex: false },
    fr: { title: 'Politique de Confidentialité | E-SEOMAX', noIndex: false },
    ar: { title: 'سياسة الخصوصية | E-SEOMAX', noIndex: false },
  },
  '/terms-of-service': {
    en: { title: 'Terms of Service | E-SEOMAX', noIndex: false },
    fr: { title: 'Conditions d\'Utilisation | E-SEOMAX', noIndex: false },
    ar: { title: 'شروط الخدمة | E-SEOMAX', noIndex: false },
  },
  '/cookie-policy': {
    en: { title: 'Cookie Policy | E-SEOMAX', noIndex: false },
    fr: { title: 'Politique des Cookies | E-SEOMAX', noIndex: false },
    ar: { title: 'سياسة ملفات تعريف الارتباط | E-SEOMAX', noIndex: false },
  },
  '/disclaimer': {
    en: { title: 'Disclaimer | E-SEOMAX', noIndex: false },
    fr: { title: 'Avertissement | E-SEOMAX', noIndex: false },
    ar: { title: 'إخلاء المسؤولية | E-SEOMAX', noIndex: false },
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
  }, [finalTitle, finalDescription, finalKeywords, image, type, currentPath, lang, shouldNoIndex, author, publishedTime, modifiedTime]);

  return null;
};

export default SEO;

// Export for use in blog posts
export const getBlogPostSEO = (post: {
  title: string;
  excerpt: string;
  slug: string;
  featured_image?: string;
  published_at?: string;
  updated_at?: string;
}) => ({
  title: `${post.title} | E-SEOMAX Blog`,
  description: post.excerpt,
  image: post.featured_image || 'https://e-seomax.com/og-image.png',
  type: 'article' as const,
  publishedTime: post.published_at,
  modifiedTime: post.updated_at,
});
