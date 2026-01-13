export interface SEOResults {
  score: number;
  technical: {
    pageSpeed: { value: string; passed: boolean };
    mobileFriendly: { value: string; passed: boolean };
    https: { value: string; passed: boolean };
    robotsTxt: { value: string; passed: boolean };
  };
  onPage: {
    titleTag: { value: string; length: number; passed: boolean };
    metaDescription: { value: string; length: number; passed: boolean };
    h1Count: number;
    imageAltTexts: { total: number; missing: number };
    internalLinks: number;
    externalLinks?: number;
  };
  content: {
    wordCount: number;
    keywordDensity: string;
    readabilityScore: number;
    contentQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  };
  issues: Array<{
    id: string;
    title: string;
    severity: 'High' | 'Medium' | 'Low';
  }>;
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}
