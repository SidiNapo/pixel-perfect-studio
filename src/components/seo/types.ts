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

export const generateMockResults = (url: string): SEOResults => {
  const baseScore = Math.floor(Math.random() * 30) + 55; // 55-85
  
  return {
    score: baseScore,
    technical: {
      pageSpeed: { value: `${(Math.random() * 2 + 1.5).toFixed(1)}s`, passed: Math.random() > 0.3 },
      mobileFriendly: { value: 'Responsive', passed: Math.random() > 0.2 },
      https: { value: url.startsWith('https') ? 'Secure' : 'Not Secure', passed: url.startsWith('https') },
      robotsTxt: { value: 'Found', passed: Math.random() > 0.2 },
    },
    onPage: {
      titleTag: { value: 'Homepage | Your Brand', length: 24, passed: true },
      metaDescription: { value: 'Your site description...', length: Math.floor(Math.random() * 100) + 80, passed: Math.random() > 0.4 },
      h1Count: Math.floor(Math.random() * 3) + 1,
      imageAltTexts: { total: Math.floor(Math.random() * 20) + 5, missing: Math.floor(Math.random() * 5) },
      internalLinks: Math.floor(Math.random() * 30) + 10,
    },
    content: {
      wordCount: Math.floor(Math.random() * 1500) + 500,
      keywordDensity: `${(Math.random() * 2 + 1).toFixed(1)}%`,
      readabilityScore: Math.floor(Math.random() * 30) + 60,
      contentQuality: baseScore > 75 ? 'Good' : baseScore > 60 ? 'Fair' : 'Poor',
    },
    issues: ([
      { id: '1', title: 'Missing meta descriptions on 3 pages', severity: 'High' as const },
      { id: '2', title: 'Images without alt text detected', severity: 'Medium' as const },
      { id: '3', title: 'Page load time exceeds 3 seconds', severity: 'High' as const },
      { id: '4', title: 'Low keyword density in main content', severity: 'Low' as const },
      { id: '5', title: 'Missing Open Graph tags', severity: 'Medium' as const },
    ]).slice(0, Math.floor(Math.random() * 3) + 2),
    recommendations: [
      { id: '1', title: 'Add meta descriptions', description: 'Add unique meta descriptions to improve CTR in search results' },
      { id: '2', title: 'Optimize images', description: 'Compress images and add alt text to improve load time and accessibility' },
      { id: '3', title: 'Fix broken links', description: 'Repair or remove 3 broken internal links found on your site' },
      { id: '4', title: 'Improve content length', description: 'Add more comprehensive content to key landing pages' },
    ].slice(0, Math.floor(Math.random() * 2) + 3),
  };
};
