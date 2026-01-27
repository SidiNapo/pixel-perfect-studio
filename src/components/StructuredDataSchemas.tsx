import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BASE_URL = 'https://e-seomax.com';

// SoftwareApplication Schema - Critical for SaaS recognition
const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "E-SEOMAX",
  "description": "AI-powered SEO analysis platform helping businesses in Morocco and worldwide improve their search engine rankings with comprehensive audits and actionable recommendations.",
  "url": BASE_URL,
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free SEO audit available"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Organization",
    "name": "E-SEOMAX"
  },
  "screenshot": `${BASE_URL}/og-image.png`,
  "featureList": [
    "AI-Powered SEO Analysis",
    "Technical SEO Audit",
    "Keyword Research",
    "Content Optimization",
    "Backlink Analysis",
    "Competitor Analysis",
    "Mobile SEO Check",
    "Core Web Vitals Analysis"
  ]
};

// Enhanced Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "E-SEOMAX",
  "alternateName": "E-SEOMAX SEO Platform",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/favicon.png`,
    "width": 512,
    "height": 512
  },
  "description": "E-SEOMAX is Morocco's leading AI-powered SEO analysis platform that helps website owners, marketers, and businesses improve their search engine visibility.",
  "foundingDate": "2020",
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MA",
      "addressLocality": "Casablanca"
    }
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Morocco"
    },
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
    "https://github.com/eseomax"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@e-seomax.com",
      "availableLanguage": ["English", "French", "Arabic"]
    },
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "hello@e-seomax.com",
      "availableLanguage": ["English", "French", "Arabic"]
    }
  ],
  "knowsLanguage": ["en", "fr", "ar"]
};

// WebSite Schema with SearchAction
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "E-SEOMAX",
  "alternateName": "E-SEOMAX - #1 SEO Tool in Morocco",
  "url": BASE_URL,
  "description": "AI-Powered SEO Analysis Platform - Analyze, optimize, and dominate search results with intelligent insights.",
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
  ]
};

// BreadcrumbList Schema generator
const generateBreadcrumbSchema = (pathname: string, lang: string) => {
  const pathParts = pathname.split('/').filter(Boolean);
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
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
        "text": "E-SEOMAX is an AI-powered SEO analysis platform that helps businesses improve their search engine rankings through comprehensive audits, keyword research, and actionable recommendations."
      }
    },
    {
      "@type": "Question",
      "name": "Is E-SEOMAX free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, E-SEOMAX offers a free SEO audit for your website. You can analyze your site's SEO performance and get recommendations without any cost."
      }
    },
    {
      "@type": "Question",
      "name": "Does E-SEOMAX work for websites in Morocco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! E-SEOMAX is specifically optimized for the Moroccan market and supports Arabic, French, and English languages. It's the #1 SEO tool in Morocco."
      }
    },
    {
      "@type": "Question",
      "name": "What SEO features does E-SEOMAX offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "E-SEOMAX offers technical SEO audits, content optimization, keyword research, backlink analysis, competitor analysis, mobile SEO checks, and Core Web Vitals analysis."
      }
    }
  ]
};

// LocalBusiness Schema for Morocco targeting
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "E-SEOMAX",
  "image": `${BASE_URL}/favicon.png`,
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
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://twitter.com/eseomax",
    "https://linkedin.com/company/eseomax"
  ]
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
  }
});
