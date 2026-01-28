import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: {
    "@type": "ContactPoint";
    contactType: string;
    email: string;
    availableLanguage: string[];
  };
}

interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  publisher: {
    "@type": "Organization";
    name: string;
  };
  potentialAction: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

const organizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "E-SEOMAX",
  url: "https://e-seomax.com",
  logo: "https://e-seomax.com/favicon.png",
  description: "E-SEOMAX is an AI-powered SEO analysis platform that helps website owners, marketers, and businesses improve their search engine visibility through comprehensive audits and actionable recommendations.",
  sameAs: [
    "https://twitter.com/eseomax",
    "https://linkedin.com/company/eseomax",
    "https://github.com/eseomax"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "support@e-seomax.com",
    availableLanguage: ["English"]
  }
};

const websiteSchema: WebSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "E-SEOMAX",
  url: "https://e-seomax.com",
  description: "AI-Powered SEO Analysis Platform - Analyze, optimize, and dominate search results with intelligent insights.",
  publisher: {
    "@type": "Organization",
    name: "E-SEOMAX"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://e-seomax.com/blog?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const StructuredData = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[data-structured-data]');
    existingScripts.forEach(script => script.remove());

    // Add Organization schema
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.setAttribute('data-structured-data', 'organization');
    orgScript.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(orgScript);

    // Add WebSite schema
    const webScript = document.createElement('script');
    webScript.type = 'application/ld+json';
    webScript.setAttribute('data-structured-data', 'website');
    webScript.textContent = JSON.stringify(websiteSchema);
    document.head.appendChild(webScript);

    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll('script[data-structured-data]');
      scripts.forEach(script => script.remove());
    };
  }, [location.pathname]);

  return null;
};

export default StructuredData;

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
  headline: post.title,
  description: post.description,
  image: post.image,
  datePublished: post.datePublished,
  dateModified: post.dateModified,
  url: `https://e-seomax.com/blog/${post.slug}`,
  author: {
    "@type": "Organization",
    name: post.author || "E-SEOMAX Team"
  },
  publisher: {
    "@type": "Organization",
    name: "E-SEOMAX",
    logo: {
      "@type": "ImageObject",
      url: "https://e-seomax.com/favicon.png"
    }
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://e-seomax.com/blog/${post.slug}`
  }
});
