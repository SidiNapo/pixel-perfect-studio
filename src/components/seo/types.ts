export interface SEOIssue {
  id: string;
  title: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  evidence: string;
  fix: string;
}

export interface SEORecommendation {
  id: string;
  title: string;
  description: string;
  example?: string;
}

export interface SEOResults {
  url: string;
  score: number;
  technical: {
    https: { value: string; passed: boolean };
    robotsTxt: { value: string; passed: boolean; url?: string };
    sitemapXml: { value: string; passed: boolean; url?: string };
    mobileFriendly: { value: string; passed: boolean };
  };
  onPage: {
    titleTag: { value: string; length: number; passed: boolean };
    metaDescription: { value: string; length: number; passed: boolean };
    canonicalUrl: { value: string; present: boolean };
    robotsMeta: { value: string; present: boolean };
    h1Count: number;
    h1First: string;
    h2Count: number;
    h3Count: number;
    imageAltTexts: { total: number; missing: number };
    internalLinks: number;
    externalLinks: number;
  };
  content: {
    wordCount: number;
    readabilityScore: number;
    contentQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    isThinContent: boolean;
  };
  openGraph: {
    hasOgTitle: boolean;
    hasOgDescription: boolean;
    hasOgImage: boolean;
  };
  issues: SEOIssue[];
  recommendations: SEORecommendation[];
  scoreBreakdown: {
    category: string;
    points: number;
    maxPoints: number;
    details: string;
  }[];
}
