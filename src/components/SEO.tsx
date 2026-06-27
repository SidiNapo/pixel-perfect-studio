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

// Comprehensive Global-optimized SEO keywords
const defaultSEO = {
  en: {
    title: 'Free AI-Powered SEO Tools & Website Audit | E-SEOMAX',
    description: 'Discover the ultimate suite of free AI-powered SEO tools at E-SEOMAX, meticulously designed to skyrocket your global search engine rankings. Our incredibly fast, highly accurate, and comprehensive micro-tools include a precise word counter, an advanced plagiarism checker, a robust backlink spy tool, and an instant website SEO score analyzer. Built specifically for ambitious digital marketers, content creators, and enterprise SEO professionals worldwide, E-SEOMAX allows you to effortlessly dominate SERPs without expensive subscriptions. Instantly optimize your on-page content, uncover hidden technical SEO errors, and generate massive organic traffic with absolutely zero cost. Join millions of users leveraging our cutting-edge artificial intelligence to perfectly scale their online presence, secure the coveted first-page Google ranking, and massively accelerate their digital marketing success today.',
    keywords: [
      'free AI SEO tools', 'website SEO score', 'plagiarism checker free', 'word counter tool',
      'free backlink checker', 'SEO audit tool', 'global digital marketing', 'search engine optimization',
      'E-SEOMAX', 'SEO platform', 'free SEO software', 'SERP analyzer', 'keyword research tool',
      'technical SEO audit', 'on-page SEO analysis', 'off-page SEO tools', 'content optimization tool'
    ].join(', '),
  },
  fr: {
    title: 'Outils SEO gratuits basés sur l\'IA et audit de site web | E-SEOMAX',
    description: 'Découvrez la suite ultime d\'outils SEO gratuits basés sur l\'IA chez E-SEOMAX, méticuleusement conçue pour propulser vos classements mondiaux sur les moteurs de recherche. Nos micro-outils incroyablement rapides, très précis et complets incluent un compteur de mots précis, un vérificateur de plagiat avancé, un outil robuste d\'analyse de backlinks et un analyseur instantané de score SEO de site web. Conçu spécifiquement pour les spécialistes du marketing numérique ambitieux, les créateurs de contenu et les professionnels du SEO d\'entreprise du monde entier, E-SEOMAX vous permet de dominer les SERP sans abonnements coûteux. Optimisez instantanément votre contenu, découvrez les erreurs techniques cachées et générez un trafic organique massif sans aucun coût. Rejoignez des millions d\'utilisateurs pour accélérer massivement votre succès.',
    keywords: [
      'outils SEO gratuits IA', 'score SEO site web', 'vérificateur de plagiat gratuit', 'compteur de mots',
      'vérificateur de backlinks gratuit', 'outil d\'audit SEO', 'marketing numérique mondial', 'optimisation moteurs de recherche',
      'E-SEOMAX', 'plateforme SEO', 'logiciel SEO gratuit', 'analyseur SERP', 'outil de recherche de mots-clés'
    ].join(', '),
  },
  ar: {
    title: 'أدوات SEO مجانية مدعومة بالذكاء الاصطناعي وتدقيق المواقع | E-SEOMAX',
    description: 'اكتشف المجموعة النهائية من أدوات تحسين محركات البحث المجانية المدعومة بالذكاء الاصطناعي في E-SEOMAX، والمصممة بدقة لرفع تصنيفاتك العالمية في محركات البحث. تشتمل أدواتنا الدقيقة الشاملة والسريعة والآمنة على عداد كلمات دقيق، ومدقق انتحال متقدم، وأداة قوية لتحليل الروابط الخلفية، ومحلل فوري لدرجة سيو الموقع. تم تصميم E-SEOMAX خصيصًا للمسوقين الرقميين الطموحين، ومحترفي السيو في جميع أنحاء العالم، مما يسمح لك بالسيطرة على صفحات نتائج محركات البحث دون اشتراكات باهظة الثمن. قم بتحسين المحتوى الخاص بك على الفور، واكتشف الأخطاء الفنية المخفية، وقم بتوليد حركة مرور عضوية ضخمة بتكلفة صفرية تمامًا. انضم إلى ملايين المستخدمين الذين يستفيدون من الذكاء الاصطناعي المتطور لدينا لتوسيع نطاق تواجدهم عبر الإنترنت.',
    keywords: [
      'أدوات SEO مجانية', 'فحص السيو', 'كشف النسخ مجانا', 'عداد الكلمات',
      'فحص الروابط الخلفية', 'أداة تدقيق المواقع', 'التسويق الرقمي العالمي', 'تحسين محركات البحث',
      'منصة SEO', 'برنامج SEO مجاني', 'تحليل الكلمات المفتاحية', 'السيو التقني'
    ].join(', '),
  },
};

// Page-specific SEO configurations
const pageSEO: Record<string, { en: Partial<SEOProps>; fr: Partial<SEOProps>; ar: Partial<SEOProps> }> = {
  '/': {
    en: { 
      title: 'Free AI-Powered SEO Tools & Website Audit | E-SEOMAX',
      description: defaultSEO.en.description,
    },
    fr: { 
      title: 'Outils SEO gratuits basés sur l\'IA et audit de site web | E-SEOMAX',
      description: defaultSEO.fr.description,
    },
    ar: { 
      title: 'أدوات SEO مجانية مدعومة بالذكاء الاصطناعي وتدقيق المواقع | E-SEOMAX',
      description: defaultSEO.ar.description,
    },
  },
  '/tools': {
    en: {
      title: 'All Free SEO Tools | Word Counter, Audit, Backlinks | E-SEOMAX',
      description: 'Access the complete directory of our globally recognized free AI-powered SEO micro-tools. Instantly use our highly accurate word counter, in-depth website SEO audit analyzer, robust backlink checker, and advanced plagiarism detector. Optimize your digital content perfectly and completely dominate search engines at zero cost.',
    },
    fr: {
      title: 'Tous les Outils SEO Gratuits | E-SEOMAX',
      description: 'Accédez au répertoire complet de nos micro-outils SEO gratuits basés sur l\'IA reconnus mondialement. Utilisez instantanément notre compteur de mots précis, notre analyseur d\'audit SEO de site web approfondi, notre vérificateur de backlinks robuste et notre détecteur de plagiat avancé.',
    },
    ar: {
      title: 'جميع أدوات السيو المجانية | E-SEOMAX',
      description: 'قم بالوصول إلى الدليل الكامل لأدوات السيو المصغرة المجانية المدعومة بالذكاء الاصطناعي والمعترف بها عالميًا. استخدم فورًا عداد الكلمات الدقيق لدينا، ومحلل تدقيق سيو الموقع، ومدقق الروابط الخلفية القوي، وكاشف الانتحال المتقدم.',
    }
  },
  '/tools/word-counter': {
    en: {
      title: 'Free Word Counter Tool | Character & Word Count | E-SEOMAX',
      description: 'Use our lightning-fast, highly accurate free word counter tool to instantly calculate word count, character limits, reading time, and keyword density. Perfect for global copywriters, SEO professionals, and content creators aiming to flawlessly optimize their digital marketing campaigns and blog posts for top Google rankings.',
      keywords: 'word counter tool, character count online, free word counter, keyword density checker',
    },
    fr: {
      title: 'Outil Compteur de Mots Gratuit | E-SEOMAX',
      description: 'Utilisez notre outil de compteur de mots gratuit, ultra-rapide et très précis pour calculer instantanément le nombre de mots, les limites de caractères, le temps de lecture et la densité des mots-clés. Parfait pour les rédacteurs mondiaux et les professionnels du SEO.',
    },
    ar: {
      title: 'أداة عداد الكلمات المجانية | E-SEOMAX',
      description: 'استخدم أداة عداد الكلمات المجانية فائقة السرعة وعالية الدقة لحساب عدد الكلمات وحدود الأحرف ووقت القراءة وكثافة الكلمات الرئيسية على الفور. مثالي لكتاب النصوص العالميين ومحترفي تحسين محركات البحث.',
    }
  },
  '/tools/seo-audit': {
    en: {
      title: 'Instant Website SEO Score & Free Audit Tool | E-SEOMAX',
      description: 'Get an instant website SEO score with our advanced free technical SEO audit tool. We meticulously analyze your on-page optimization, meta tags, page speed, mobile responsiveness, and internal linking structures to deliver incredibly actionable insights that dramatically boost your worldwide organic search engine rankings.',
      keywords: 'website seo score, free seo audit tool, instant seo analyzer, on-page seo checker',
    },
    fr: {
      title: 'Score SEO de Site Web Instantané & Audit Gratuit | E-SEOMAX',
      description: 'Obtenez un score SEO de site web instantané avec notre outil gratuit d\'audit SEO technique avancé. Nous analysons minutieusement votre optimisation on-page, vos balises meta, la vitesse de votre page et la réactivité mobile pour fournir des informations incroyablement exploitables.',
    },
    ar: {
      title: 'درجة سيو الموقع الفورية وأداة التدقيق المجانية | E-SEOMAX',
      description: 'احصل على درجة سيو فورية لموقعك مع أداة التدقيق الفني المجانية المتقدمة. نقوم بتحليل تحسين صفحتك، والعلامات الوصفية، وسرعة الصفحة، والاستجابة للأجهزة المحمولة لتقديم رؤى قابلة للتنفيذ بشكل لا يصدق.',
    }
  },
  '/tools/backlink-checker': {
    en: {
      title: 'Free Backlink Checker Tool | Analyze Links | E-SEOMAX',
      description: 'Discover precisely who is linking to your domain using our incredibly powerful free backlink checker tool. Analyze domain authority, monitor toxic links, and spy on competitor backlink profiles globally to massively scale your off-page SEO strategy and dominate SERPs completely.',
      keywords: 'free backlink checker, backlink analysis tool, check backlinks free, competitor link profile',
    },
    fr: {
      title: 'Outil de Vérification de Backlinks Gratuit | E-SEOMAX',
      description: 'Découvrez précisément qui crée des liens vers votre domaine en utilisant notre outil gratuit et incroyablement puissant de vérification de backlinks. Analysez l\'autorité de domaine, surveillez les liens toxiques et espionnez les profils de backlinks des concurrents à l\'échelle mondiale.',
    },
    ar: {
      title: 'أداة فحص الروابط الخلفية المجانية | E-SEOMAX',
      description: 'اكتشف بدقة من يربط بنطاقك باستخدام أداة فحص الروابط الخلفية المجانية القوية بشكل لا يصدق. قم بتحليل سلطة النطاق، ومراقبة الروابط السامة، والتجسس على ملفات تعريف الروابط الخلفية للمنافسين على مستوى العالم.',
    }
  },
  '/about': {
    en: { 
      title: 'About E-SEOMAX | Global AI SEO Platform',
      description: 'Learn about E-SEOMAX, the leading international AI-powered SEO platform dedicated to building powerful free micro-tools for global marketers. Discover our mission to make enterprise-level SEO accessible to everyone.',
    },
    fr: { 
      title: 'À Propos E-SEOMAX | Plateforme SEO IA Mondiale',
      description: 'Découvrez E-SEOMAX, la principale plateforme SEO internationale basée sur l\'IA dédiée à la création d\'outils gratuits puissants pour les spécialistes du marketing mondial.',
    },
    ar: { 
      title: 'حول E-SEOMAX | منصة SEO العالمية',
      description: 'تعرف على E-SEOMAX، منصة تحسين محركات البحث العالمية الرائدة المدعومة بالذكاء الاصطناعي والمخصصة لبناء أدوات مجانية قوية للمسوقين العالميين.',
    },
  },
  '/blog': {
    en: { 
      title: 'Global SEO Blog | Digital Marketing Guides | E-SEOMAX',
      description: 'Explore the highly authoritative E-SEOMAX blog for essential expert SEO tips, comprehensive guides, and profound industry insights uniquely tailored for the global digital landscape. Dive deep into incredibly advanced search engine optimization strategies.',
    },
    fr: { 
      title: 'Blog SEO Mondial | Guides Marketing Digital | E-SEOMAX',
      description: 'Explorez le blog très réputé d\'E-SEOMAX pour des conseils SEO d\'experts absolument essentiels, des guides complets et des informations approfondies sur l\'industrie mondiale.',
    },
    ar: { 
      title: 'مدونة السيو العالمية | أدلة التسويق الرقمي | E-SEOMAX',
      description: 'استكشف مدونة E-SEOMAX للحصول على نصائح السيو الضرورية من الخبراء والأدلة الشاملة للمشهد الرقمي العالمي.',
    },
  },
  '/contact': {
    en: { 
      title: 'Contact E-SEOMAX | Global SEO Support',
      description: 'Get in touch with the highly responsive E-SEOMAX team to secure superior, enterprise-level SEO support globally. Our exceptionally dedicated experts are fully prepared to meticulously assist you.',
    },
    fr: { 
      title: 'Contactez E-SEOMAX | Support SEO Mondial',
      description: 'Entrez en contact avec l\'équipe très réactive d\'E-SEOMAX pour obtenir un support SEO absolument supérieur, de niveau entreprise, dans le monde entier.',
    },
    ar: { 
      title: 'اتصل بـ E-SEOMAX | دعم السيو العالمي',
      description: 'تواصل مع فريق E-SEOMAX سريع الاستجابة للحصول على دعم سيو متفوق تماماً وعلى مستوى المؤسسات على مستوى العالم.',
    },
  },
  '/faq': {
    en: { 
      title: 'Global SEO FAQ | Free Tools Questions | E-SEOMAX',
      description: 'Browse our incredibly extensive and intensely detailed Frequently Asked Questions section to uncover authoritative, enterprise-grade answers regarding our free AI-powered micro-tools and advanced SEO strategies globally.',
    },
    fr: { 
      title: 'FAQ SEO Mondial | Questions Outils Gratuits | E-SEOMAX',
      description: 'Parcourez notre section de questions fréquemment posées, incroyablement vaste et détaillée, pour découvrir des réponses faisant autorité concernant nos micro-outils gratuits.',
    },
    ar: { 
      title: 'الأسئلة الشائعة للسيو العالمي | E-SEOMAX',
      description: 'تصفح قسم الأسئلة الشائعة لاكتشاف إجابات موثوقة فيما يتعلق بأدواتنا المجانية المدعومة بالذكاء الاصطناعي.',
    },
  },
  '/how-it-works': {
    en: { 
      title: 'How E-SEOMAX Works | Global Micro-Tools',
      description: 'Discover exactly how E-SEOMAX utilizes magnificently advanced artificial intelligence to power our high-volume free SEO micro-tools. Gain an incredibly deep understanding of our remarkably powerful proprietary algorithms.',
    },
    fr: { 
      title: 'Comment Fonctionne E-SEOMAX | Outils Mondiaux',
      description: 'Découvrez comment E-SEOMAX utilise une intelligence artificielle avancée pour alimenter nos micro-outils SEO gratuits à fort volume.',
    },
    ar: { 
      title: 'كيف يعمل E-SEOMAX | الأدوات العالمية',
      description: 'اكتشف كيف تستخدم E-SEOMAX الذكاء الاصطناعي المتقدم لتشغيل أدوات السيو المجانية عالية الحجم.',
    },
  },
  '/privacy-policy': {
    en: { title: 'Privacy Policy | E-SEOMAX', description: 'At E-SEOMAX, the leading enterprise-level global AI-powered SEO tools platform, we tremendously value and ferociously protect your personal digital privacy.', noIndex: false },
    fr: { title: 'Politique de Confidentialité | E-SEOMAX', description: 'Chez E-SEOMAX, la plateforme mondiale d\'outils SEO de niveau entreprise, nous valorisons énormément et protégeons farouchement votre confidentialité numérique personnelle.', noIndex: false },
    ar: { title: 'سياسة الخصوصية | E-SEOMAX', description: 'في E-SEOMAX، منصة أدوات السيو العالمية الرائدة، نحن نقدر بشكل كبير ونحمي خصوصيتك الرقمية الشخصية بشراسة.', noIndex: false },
  },
  '/terms-of-service': {
    en: { title: 'Terms of Service | E-SEOMAX', description: 'Carefully review the comprehensive Terms of Service governing your extensive use of E-SEOMAX, undeniably the premier global AI-powered SEO micro-tools platform.', noIndex: false },
    fr: { title: 'Conditions d\'Utilisation | E-SEOMAX', description: 'Examinez attentivement les conditions d\'utilisation qui régissent votre utilisation intensive d\'E-SEOMAX, la première plateforme mondiale de micro-outils SEO.', noIndex: false },
    ar: { title: 'شروط الخدمة | E-SEOMAX', description: 'راجع بعناية شروط الخدمة الشاملة التي تحكم استخدامك لـ E-SEOMAX، منصة أدوات السيو العالمية الأولى.', noIndex: false },
  },
  '/cookie-policy': {
    en: { title: 'Cookie Policy | E-SEOMAX', description: 'Explore the profoundly detailed E-SEOMAX Cookie Policy to perfectly understand precisely how our global SEO platform employs digital cookies.', noIndex: false },
    fr: { title: 'Politique des Cookies | E-SEOMAX', description: 'Explorez de manière approfondie la politique des cookies d\'E-SEOMAX pour comprendre comment notre plateforme SEO mondiale utilise les cookies.', noIndex: false },
    ar: { title: 'سياسة ملفات تعريف الارتباط | E-SEOMAX', description: 'استكشف سياسة ملفات تعريف الارتباط E-SEOMAX لفهم كيف تستخدم منصة السيو العالمية ملفات تعريف الارتباط.', noIndex: false },
  },
  '/disclaimer': {
    en: { title: 'Disclaimer | E-SEOMAX', description: 'Intensively peruse the extraordinarily comprehensive E-SEOMAX legal disclaimer explicitly related to your usage of our global AI-powered SEO tools.', noIndex: false },
    fr: { title: 'Avertissement | E-SEOMAX', description: 'Parcourez intensément l\'avertissement légal extraordinairement complet d\'E-SEOMAX lié à votre utilisation de nos outils SEO.', noIndex: false },
    ar: { title: 'إخلاء المسؤولية | E-SEOMAX', description: 'اقرأ بتمعن إخلاء المسؤولية القانوني الشامل لـ E-SEOMAX المرتبط باستخدامك لأدوات السيو العالمية الخاصة بنا.', noIndex: false },
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
    updateMeta('og:locale', lang === 'ar' ? 'ar_SA' : lang === 'fr' ? 'fr_FR' : 'en_US', true);
    updateMeta('og:locale:alternate', 'en_US', true);
    updateMeta('og:locale:alternate', 'fr_FR', true);
    updateMeta('og:locale:alternate', 'ar_SA', true);

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

    return () => {
      // Cleanup is optional as tags will be updated on next render
    };
  }, [finalTitle, finalDescription, finalKeywords, image, type, currentPath, lang, shouldNoIndex, author, publishedTime, modifiedTime, category]);

  return null;
};

export default SEO;

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
  title: `${post.title} | E-SEOMAX Blog`,
  description: post.excerpt || `Immerse yourself deeply in the authoritative E-SEOMAX blog post titled '${post.title}'. Discover an incredibly comprehensive array of global SEO insights, highly advanced technical optimization strategies, and extraordinarily effective digital marketing tactics explicitly tailored for ambitious worldwide businesses. Our immensely dedicated team of world-class SEO experts thoroughly dissects complex search engine algorithms, providing phenomenally actionable recommendations to dramatically skyrocket your global organic traffic, significantly elevate your Google rankings internationally, and ruthlessly dominate your global competitors. Do not miss this utterly essential reading.`,
  image: post.featured_image || 'https://e-seomax.com/og-image.png',
  type: 'article' as const,
  publishedTime: post.published_at,
  modifiedTime: post.updated_at,
  category: post.category,
});

// Base global keywords for blog posts
export const getGlobalBaseKeywords = (lang: 'en' | 'fr' | 'ar' = 'en') => {
  const base = {
    en: 'global SEO, SEO micro-tools, free SEO audit, website optimization, AI SEO platform',
    fr: 'SEO mondial, micro-outils SEO, audit SEO gratuit, optimisation site web, IA SEO',
    ar: 'السيو العالمي, أدوات السيو المجانية, تدقيق السيو, تحسين المواقع, الذكاء الاصطناعي',
  };
  return base[lang];
};
