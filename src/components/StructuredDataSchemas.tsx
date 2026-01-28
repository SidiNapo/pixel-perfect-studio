import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BASE_URL = 'https://e-seomax.com';

// Morocco cities for ServiceArea schema
const moroccanCities = [
  { name: 'Casablanca', nameAr: 'الدار البيضاء', nameFr: 'Casablanca' },
  { name: 'Rabat', nameAr: 'الرباط', nameFr: 'Rabat' },
  { name: 'Marrakech', nameAr: 'مراكش', nameFr: 'Marrakech' },
  { name: 'Tangier', nameAr: 'طنجة', nameFr: 'Tanger' },
  { name: 'Fes', nameAr: 'فاس', nameFr: 'Fès' },
  { name: 'Agadir', nameAr: 'أكادير', nameFr: 'Agadir' },
  { name: 'Meknes', nameAr: 'مكناس', nameFr: 'Meknès' },
  { name: 'Oujda', nameAr: 'وجدة', nameFr: 'Oujda' },
  { name: 'Kenitra', nameAr: 'القنيطرة', nameFr: 'Kénitra' },
  { name: 'Tetouan', nameAr: 'تطوان', nameFr: 'Tétouan' },
  { name: 'Safi', nameAr: 'آسفي', nameFr: 'Safi' },
  { name: 'El Jadida', nameAr: 'الجديدة', nameFr: 'El Jadida' },
  { name: 'Nador', nameAr: 'الناظور', nameFr: 'Nador' },
  { name: 'Mohammedia', nameAr: 'المحمدية', nameFr: 'Mohammédia' },
  { name: 'Beni Mellal', nameAr: 'بني ملال', nameFr: 'Béni Mellal' },
];

// SoftwareApplication Schema - Critical for SaaS recognition
const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "E-SEOMAX",
  "alternateName": ["E-SEOMAX Morocco", "إي-سيوماكس", "E-SEOMAX Maroc"],
  "description": "AI-powered SEO analysis platform helping businesses in Morocco and worldwide improve their search engine rankings. #1 SEO tool in Casablanca, Rabat, Marrakech, and all Moroccan cities.",
  "url": BASE_URL,
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "SEO Tool",
  "operatingSystem": "Web Browser",
  "offers": [
    {
      "@type": "Offer",
      "name": "Free SEO Audit",
      "price": "0",
      "priceCurrency": "MAD",
      "description": "Free comprehensive SEO audit for your website",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Pro Plan",
      "price": "299",
      "priceCurrency": "MAD",
      "description": "Professional SEO tools and analytics",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Enterprise Plan",
      "price": "999",
      "priceCurrency": "MAD",
      "description": "Enterprise SEO solution for large businesses",
      "availability": "https://schema.org/InStock"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1250",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "980"
  },
  "author": {
    "@type": "Organization",
    "name": "E-SEOMAX",
    "url": BASE_URL
  },
  "screenshot": `${BASE_URL}/og-image.png`,
  "featureList": [
    "AI-Powered SEO Analysis",
    "Technical SEO Audit",
    "Keyword Research for Morocco",
    "Content Optimization",
    "Backlink Analysis",
    "Competitor Analysis",
    "Mobile SEO Check",
    "Core Web Vitals Analysis",
    "Local SEO for Moroccan Cities",
    "Multilingual SEO (Arabic, French, English)",
    "SERP Tracking Morocco",
    "Site Speed Analysis"
  ],
  "availableLanguage": ["en", "fr", "ar"],
  "countryOfOrigin": {
    "@type": "Country",
    "name": "Morocco"
  }
};

// Enhanced Organization Schema with Service Areas
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "E-SEOMAX",
  "alternateName": ["E-SEOMAX Morocco", "إي-سيوماكس", "E-SEOMAX Maroc"],
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/favicon.png`,
    "width": 512,
    "height": 512
  },
  "image": `${BASE_URL}/og-image.png`,
  "description": "E-SEOMAX is Morocco's leading AI-powered SEO analysis platform serving businesses in Casablanca, Rabat, Marrakech, Tangier, Fes, Agadir, and all Moroccan cities.",
  "foundingDate": "2020",
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MA",
      "addressLocality": "Casablanca",
      "addressRegion": "Casablanca-Settat"
    }
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Morocco",
      "alternateName": ["Maroc", "المغرب"]
    },
    ...moroccanCities.map(city => ({
      "@type": "City",
      "name": city.name,
      "alternateName": [city.nameAr, city.nameFr]
    })),
    {
      "@type": "Country",
      "name": "France"
    },
    {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 31.7917,
        "longitude": -7.0926
      },
      "geoRadius": "5000"
    }
  ],
  "sameAs": [
    "https://twitter.com/eseomax",
    "https://linkedin.com/company/eseomax",
    "https://github.com/eseomax",
    "https://facebook.com/eseomax"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@e-seomax.com",
      "availableLanguage": ["English", "French", "Arabic"],
      "areaServed": "MA"
    },
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "hello@e-seomax.com",
      "availableLanguage": ["English", "French", "Arabic"],
      "areaServed": "MA"
    }
  ],
  "knowsLanguage": ["en", "fr", "ar"],
  "slogan": "#1 SEO Tool in Morocco"
};

// WebSite Schema with SearchAction
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "E-SEOMAX",
  "alternateName": ["E-SEOMAX - #1 SEO Tool in Morocco", "E-SEOMAX Maroc", "إي-سيوماكس المغرب"],
  "url": BASE_URL,
  "description": "AI-Powered SEO Analysis Platform - Analyze, optimize, and dominate search results in Morocco with intelligent insights.",
  "inLanguage": ["en", "fr", "ar"],
  "publisher": {
    "@type": "Organization",
    "name": "E-SEOMAX"
  },
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  ],
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "E-SEOMAX SEO Platform"
  }
};

// BreadcrumbList Schema generator
const generateBreadcrumbSchema = (pathname: string, lang: string) => {
  const pathParts = pathname.split('/').filter(Boolean);
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": lang === 'fr' ? 'Accueil' : lang === 'ar' ? 'الرئيسية' : 'Home',
      "item": BASE_URL
    }
  ];

  let currentPath = '';
  pathParts.forEach((part, index) => {
    currentPath += `/${part}`;
    const name = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
    breadcrumbs.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": `${BASE_URL}${currentPath}`
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  };
};

// FAQ Schema for FAQ page
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is E-SEOMAX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "E-SEOMAX is Morocco's #1 AI-powered SEO analysis platform that helps businesses in Casablanca, Rabat, Marrakech, and all Moroccan cities improve their search engine rankings through comprehensive audits, keyword research, and actionable recommendations."
      }
    },
    {
      "@type": "Question",
      "name": "Is E-SEOMAX free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, E-SEOMAX offers a free SEO audit for your website. You can analyze your site's SEO performance and get recommendations without any cost. Premium plans are available for advanced features."
      }
    },
    {
      "@type": "Question",
      "name": "Does E-SEOMAX work for websites in Morocco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! E-SEOMAX is specifically optimized for the Moroccan market with support for Arabic, French, and English. We serve businesses in Casablanca, Rabat, Marrakech, Tangier, Fes, Agadir, and all Moroccan cities."
      }
    },
    {
      "@type": "Question",
      "name": "What SEO features does E-SEOMAX offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "E-SEOMAX offers technical SEO audits, content optimization, keyword research for Morocco, backlink analysis, competitor analysis, mobile SEO checks, Core Web Vitals analysis, and local SEO optimization for Moroccan cities."
      }
    },
    {
      "@type": "Question",
      "name": "What cities in Morocco does E-SEOMAX serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "E-SEOMAX serves all major Moroccan cities including Casablanca, Rabat, Marrakech, Tangier, Fes, Agadir, Meknes, Oujda, Kenitra, Tetouan, Safi, El Jadida, Nador, Mohammedia, and Beni Mellal."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que E-SEOMAX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "E-SEOMAX est la plateforme d'analyse SEO #1 au Maroc alimentée par l'IA, aidant les entreprises de Casablanca, Rabat, Marrakech et toutes les villes marocaines à améliorer leur classement sur les moteurs de recherche."
      }
    },
    {
      "@type": "Question",
      "name": "ما هو E-SEOMAX؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "E-SEOMAX هي منصة تحليل SEO رقم 1 في المغرب مدعومة بالذكاء الاصطناعي، تساعد الشركات في الدار البيضاء والرباط ومراكش وجميع المدن المغربية على تحسين ترتيبها في محركات البحث."
      }
    }
  ]
};

// LocalBusiness Schema for Morocco targeting
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "E-SEOMAX",
  "alternateName": ["E-SEOMAX Morocco", "إي-سيوماكس", "E-SEOMAX Maroc"],
  "image": `${BASE_URL}/og-image.png`,
  "logo": `${BASE_URL}/favicon.png`,
  "url": BASE_URL,
  "telephone": "",
  "email": "support@e-seomax.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MA",
    "addressLocality": "Casablanca",
    "addressRegion": "Casablanca-Settat"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.5731,
    "longitude": -7.5898
  },
  "priceRange": "Free - Premium",
  "currenciesAccepted": "MAD, USD, EUR",
  "paymentAccepted": "Credit Card, PayPal, Bank Transfer",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "areaServed": moroccanCities.map(city => ({
    "@type": "City",
    "name": city.name
  })),
  "serviceType": [
    "SEO Analysis",
    "Website Audit",
    "Keyword Research",
    "Technical SEO",
    "Content Optimization",
    "Local SEO Morocco"
  ],
  "sameAs": [
    "https://twitter.com/eseomax",
    "https://linkedin.com/company/eseomax"
  ]
};

// Product Schema for SaaS offering
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "E-SEOMAX SEO Platform",
  "description": "Morocco's #1 AI-powered SEO analysis platform. Comprehensive SEO tools for businesses in Casablanca, Rabat, Marrakech and all Morocco.",
  "image": `${BASE_URL}/og-image.png`,
  "brand": {
    "@type": "Brand",
    "name": "E-SEOMAX"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "E-SEOMAX"
  },
  "category": "SEO Software",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "0",
    "highPrice": "999",
    "priceCurrency": "MAD",
    "offerCount": "3",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "980",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Ahmed B."
      },
      "reviewBody": "Best SEO tool for Morocco! Helped my Casablanca business rank #1 on Google."
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Marie L."
      },
      "reviewBody": "Excellent outil SEO pour le Maroc. Interface en français parfaite!"
    }
  ]
};

// Service Schema for SEO services
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "SEO Analysis Platform",
  "name": "E-SEOMAX SEO Services",
  "description": "AI-powered SEO analysis and optimization services for businesses in Morocco. Serving Casablanca, Rabat, Marrakech, Tangier, Fes, Agadir and all Moroccan cities.",
  "provider": {
    "@type": "Organization",
    "name": "E-SEOMAX"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Morocco"
    },
    ...moroccanCities.slice(0, 6).map(city => ({
      "@type": "City",
      "name": city.name
    }))
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "E-SEOMAX Plans",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Free SEO Audit"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pro SEO Analysis"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Enterprise SEO Solution"
        }
      }
    ]
  },
  "availableLanguage": ["English", "French", "Arabic"]
};

const StructuredDataSchemas = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';

  useEffect(() => {
    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[data-structured-data]');
    existingScripts.forEach(script => script.remove());

    // Helper to add JSON-LD script
    const addSchema = (id: string, schema: object) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-structured-data', id);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    // Always add core schemas
    addSchema('software-application', softwareApplicationSchema);
    addSchema('organization', organizationSchema);
    addSchema('website', websiteSchema);
    addSchema('local-business', localBusinessSchema);
    addSchema('product', productSchema);
    addSchema('service', serviceSchema);

    // Add breadcrumb for non-home pages
    if (location.pathname !== '/') {
      addSchema('breadcrumb', generateBreadcrumbSchema(location.pathname, lang));
    }

    // Add FAQ schema on FAQ page
    if (location.pathname === '/faq') {
      addSchema('faq', faqSchema);
    }

    return () => {
      const scripts = document.querySelectorAll('script[data-structured-data]');
      scripts.forEach(script => script.remove());
    };
  }, [location.pathname, lang]);

  return null;
};

export default StructuredDataSchemas;

// Export helper for blog post schema
export const createBlogPostSchema = (post: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  slug: string;
  author?: string;
  category?: string;
  keywords?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.description,
  "image": post.image,
  "datePublished": post.datePublished,
  "dateModified": post.dateModified,
  "url": `${BASE_URL}/blog/${post.slug}`,
  "inLanguage": ["en", "fr", "ar"],
  "author": {
    "@type": "Organization",
    "name": post.author || "E-SEOMAX Team",
    "url": BASE_URL
  },
  "publisher": {
    "@type": "Organization",
    "name": "E-SEOMAX",
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/favicon.png`
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${BASE_URL}/blog/${post.slug}`
  },
  "isPartOf": {
    "@type": "Blog",
    "name": "E-SEOMAX Blog",
    "url": `${BASE_URL}/blog`
  },
  "about": {
    "@type": "Thing",
    "name": post.category || "SEO"
  },
  "keywords": post.keywords || "SEO Morocco, Casablanca, Rabat, Marrakech"
});
