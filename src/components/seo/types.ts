export interface SEOIssue {
  id: string;
  title: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  evidence: string;
  fix: string;
  impact?: number;
  category?: 'technical' | 'content' | 'onpage' | 'social';
  codeExample?: string;
  learnMoreUrl?: string;
}

export interface SEORecommendation {
  id: string;
  title: string;
  description: string;
  example?: string;
  priority?: number;
  estimatedImpact?: 'High' | 'Medium' | 'Low';
  steps?: string[];
  codeSnippet?: string;
}

export interface SEOResults {
  url: string;
  score: number;
  scanTimestamp?: string;
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

export type ScoreGrade = 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';

export const getScoreGrade = (score: number): ScoreGrade => {
  if (score >= 95) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 50) return 'C';
  if (score >= 30) return 'D';
  return 'F';
};

export const getScoreColor = (score: number): string => {
  if (score >= 90) return 'hsl(var(--seo-excellent))';
  if (score >= 70) return 'hsl(var(--seo-good))';
  if (score >= 50) return 'hsl(var(--seo-fair))';
  if (score >= 30) return 'hsl(var(--seo-poor))';
  return 'hsl(var(--seo-critical))';
};

export const getScoreColorClass = (score: number): string => {
  if (score >= 90) return 'text-emerald-500';
  if (score >= 70) return 'text-lime-500';
  if (score >= 50) return 'text-amber-500';
  if (score >= 30) return 'text-orange-500';
  return 'text-red-500';
};

export const getScoreBgClass = (score: number): string => {
  if (score >= 90) return 'from-emerald-500/20 to-emerald-600/10';
  if (score >= 70) return 'from-lime-500/20 to-lime-600/10';
  if (score >= 50) return 'from-amber-500/20 to-amber-600/10';
  if (score >= 30) return 'from-orange-500/20 to-orange-600/10';
  return 'from-red-500/20 to-red-600/10';
};
