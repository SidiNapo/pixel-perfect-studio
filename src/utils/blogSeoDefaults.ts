/**
 * Blog SEO Defaults Utility
 * Automatically generates SEO-optimized metadata for blog posts
 * Focused on Morocco market with multilingual support
 */

const BASE_URL = 'https://e-seomax.com';

// Morocco-focused base keywords by language
export const moroccoBaseKeywords = {
  en: [
    'SEO Morocco', 'SEO Casablanca', 'SEO Rabat', 'SEO Marrakech',
    'SEO Tangier', 'SEO Fes', 'SEO Agadir', 'website optimization Morocco',
    'free SEO audit Morocco', 'digital marketing Morocco', 'E-SEOMAX'
  ],
  fr: [
    'SEO Maroc', 'référencement Maroc', 'SEO Casablanca', 'SEO Rabat',
    'SEO Marrakech', 'audit SEO gratuit Maroc', 'optimisation site web Maroc',
    'marketing digital Maroc', 'agence SEO Maroc', 'E-SEOMAX'
  ],
  ar: [
    'SEO المغرب', 'تحسين محركات البحث المغرب', 'SEO الدار البيضاء', 'SEO الرباط',
    'SEO مراكش', 'تدقيق SEO مجاني', 'تحسين المواقع المغرب', 'E-SEOMAX'
  ],
};

// Category-specific keywords
export const categoryKeywords: Record<string, { en: string[]; fr: string[]; ar: string[] }> = {
  'Technical SEO': {
    en: ['technical SEO', 'site speed', 'Core Web Vitals', 'mobile optimization', 'crawlability'],
    fr: ['SEO technique', 'vitesse de site', 'Core Web Vitals', 'optimisation mobile', 'crawlabilité'],
    ar: ['SEO التقني', 'سرعة الموقع', 'مقاييس الويب الأساسية', 'تحسين الجوال'],
  },
  'Content Marketing': {
    en: ['content marketing', 'content strategy', 'blog optimization', 'copywriting', 'content SEO'],
    fr: ['marketing de contenu', 'stratégie de contenu', 'optimisation blog', 'rédaction web'],
    ar: ['تسويق المحتوى', 'استراتيجية المحتوى', 'تحسين المدونة', 'كتابة المحتوى'],
  },
  'Local SEO': {
    en: ['local SEO', 'Google My Business', 'local search', 'local citations', 'NAP consistency'],
    fr: ['SEO local', 'Google My Business', 'recherche locale', 'citations locales'],
    ar: ['SEO المحلي', 'جوجل ماي بيزنس', 'البحث المحلي', 'التواجد المحلي'],
  },
  'Link Building': {
    en: ['link building', 'backlinks', 'domain authority', 'link outreach', 'guest posting'],
    fr: ['netlinking', 'backlinks', 'autorité de domaine', 'acquisition de liens'],
    ar: ['بناء الروابط', 'الروابط الخلفية', 'سلطة النطاق', 'استراتيجية الروابط'],
  },
  'Keyword Research': {
    en: ['keyword research', 'keyword strategy', 'search intent', 'long-tail keywords', 'keyword ranking'],
    fr: ['recherche de mots-clés', 'stratégie mots-clés', 'intention de recherche'],
    ar: ['بحث الكلمات المفتاحية', 'استراتيجية الكلمات', 'نية البحث'],
  },
  'Analytics': {
    en: ['SEO analytics', 'Google Analytics', 'Search Console', 'SEO metrics', 'conversion tracking'],
    fr: ['analytique SEO', 'Google Analytics', 'Search Console', 'métriques SEO'],
    ar: ['تحليلات SEO', 'جوجل أناليتكس', 'مقاييس SEO', 'تتبع التحويلات'],
  },
};

/**
 * Generate SEO title for a blog post
 */
export const generateSeoTitle = (title: string, lang: 'en' | 'fr' | 'ar' = 'en'): string => {
  const suffix = {
    en: ' | E-SEOMAX Blog Morocco',
    fr: ' | E-SEOMAX Blog Maroc',
    ar: ' | مدونة E-SEOMAX المغرب',
  };
  
  // Ensure title + suffix is under 60 characters
  const maxTitleLength = 60 - suffix[lang].length;
  const truncatedTitle = title.length > maxTitleLength 
    ? title.slice(0, maxTitleLength - 3) + '...'
    : title;
  
  return truncatedTitle + suffix[lang];
};

/**
 * Generate SEO description from excerpt or content
 */
export const generateSeoDescription = (
  excerpt: string | null, 
  title: string,
  lang: 'en' | 'fr' | 'ar' = 'en'
): string => {
  if (excerpt && excerpt.length > 20) {
    // Truncate to 160 chars max
    return excerpt.slice(0, 157) + (excerpt.length > 157 ? '...' : '');
  }
  
  // Generate default description
  const defaults = {
    en: `Read "${title}" on E-SEOMAX Blog. Expert SEO tips and guides for Morocco businesses.`,
    fr: `Lisez "${title}" sur le blog E-SEOMAX. Conseils SEO experts pour les entreprises au Maroc.`,
    ar: `اقرأ "${title}" على مدونة E-SEOMAX. نصائح SEO احترافية للشركات في المغرب.`,
  };
  
  return defaults[lang].slice(0, 160);
};

/**
 * Generate SEO keywords combining base keywords with category-specific ones
 */
export const generateSeoKeywords = (
  category: string | null,
  lang: 'en' | 'fr' | 'ar' = 'en',
  additionalKeywords: string[] = []
): string => {
  const base = moroccoBaseKeywords[lang];
  const categorySpecific = category && categoryKeywords[category]?.[lang] 
    ? categoryKeywords[category][lang] 
    : [];
  
  const allKeywords = [...base, ...categorySpecific, ...additionalKeywords];
  const uniqueKeywords = [...new Set(allKeywords)];
  
  return uniqueKeywords.join(', ');
};

/**
 * Generate complete blog SEO metadata
 */
export const generateBlogSeoDefaults = (
  post: {
    title: string;
    excerpt?: string | null;
    category?: string | null;
    featured_image?: string | null;
    published_at?: string | null;
    updated_at?: string | null;
    slug: string;
  },
  lang: 'en' | 'fr' | 'ar' = 'en'
) => {
  return {
    title: generateSeoTitle(post.title, lang),
    description: generateSeoDescription(post.excerpt || null, post.title, lang),
    keywords: generateSeoKeywords(post.category || null, lang),
    image: post.featured_image || `${BASE_URL}/og-image.png`,
    url: `${BASE_URL}/blog/${post.slug}`,
    type: 'article' as const,
    publishedTime: post.published_at || new Date().toISOString(),
    modifiedTime: post.updated_at || post.published_at || new Date().toISOString(),
    category: post.category || undefined,
  };
};

/**
 * Get canonical URL for a blog post
 */
export const getBlogCanonicalUrl = (slug: string): string => {
  return `${BASE_URL}/blog/${slug}`;
};

/**
 * Generate Open Graph data for blog post
 */
export const generateBlogOpenGraph = (
  post: {
    title: string;
    excerpt?: string | null;
    slug: string;
    featured_image?: string | null;
    published_at?: string | null;
  },
  lang: 'en' | 'fr' | 'ar' = 'en'
) => {
  return {
    type: 'article',
    title: generateSeoTitle(post.title, lang),
    description: generateSeoDescription(post.excerpt || null, post.title, lang),
    url: `${BASE_URL}/blog/${post.slug}`,
    image: post.featured_image || `${BASE_URL}/og-image.png`,
    siteName: 'E-SEOMAX',
    locale: lang === 'ar' ? 'ar_MA' : lang === 'fr' ? 'fr_MA' : 'en_US',
    publishedTime: post.published_at,
  };
};

export default {
  generateSeoTitle,
  generateSeoDescription,
  generateSeoKeywords,
  generateBlogSeoDefaults,
  getBlogCanonicalUrl,
  generateBlogOpenGraph,
  moroccoBaseKeywords,
  categoryKeywords,
};
