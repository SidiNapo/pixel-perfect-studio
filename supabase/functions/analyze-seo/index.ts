const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SEOIssue {
  id: string;
  title: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  evidence: string;
  fix: string;
}

interface SEORecommendation {
  id: string;
  title: string;
  description: string;
  example?: string;
}

interface SEOAnalysisResult {
  success: boolean;
  error?: string;
  data?: {
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
  };
}

// Validate URL format
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Safely fetch a resource with timeout
async function safeFetch(url: string, timeoutMs: number = 5000): Promise<{ ok: boolean; status?: number }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: { 'User-Agent': 'SEOAnalyzer/1.0' },
    });
    
    clearTimeout(timeout);
    return { ok: response.ok, status: response.status };
  } catch {
    return { ok: false };
  }
}

// Extract text content from HTML
function extractTextContent(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Calculate readability score (simplified Flesch Reading Ease approximation)
function calculateReadability(text: string): number {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (words.length === 0 || sentences.length === 0) return 0;
  
  const avgWordsPerSentence = words.length / sentences.length;
  
  // Simplified readability: shorter sentences = higher readability
  // Ideal: 15-20 words per sentence
  const score = Math.round(100 - Math.abs(avgWordsPerSentence - 17) * 3);
  return Math.max(0, Math.min(100, score));
}

// Determine content quality based on word count and readability
function getContentQuality(wordCount: number, readability: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' {
  if (wordCount >= 1500 && readability >= 60) return 'Excellent';
  if (wordCount >= 800 && readability >= 50) return 'Good';
  if (wordCount >= 300 && readability >= 40) return 'Fair';
  return 'Poor';
}

// Extract SEO data from HTML
async function extractSEOData(html: string, url: string): Promise<SEOAnalysisResult['data']> {
  const urlObj = new URL(url);
  const domain = urlObj.hostname;
  const baseUrl = `${urlObj.protocol}//${domain}`;

  // ===== TITLE TAG =====
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const titleLength = title.length;
  const titlePassed = titleLength >= 30 && titleLength <= 60;

  // ===== META DESCRIPTION =====
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';
  const metaDescLength = metaDescription.length;
  const metaDescPassed = metaDescLength >= 120 && metaDescLength <= 160;

  // ===== CANONICAL URL =====
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i) ||
                         html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/i);
  const canonicalUrl = canonicalMatch ? canonicalMatch[1].trim() : '';

  // ===== ROBOTS META =====
  const robotsMetaMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                          html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']robots["'][^>]*>/i);
  const robotsMeta = robotsMetaMatch ? robotsMetaMatch[1].trim() : '';

  // ===== HEADINGS =====
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h1Count = h1Matches.length;
  let h1First = '';
  if (h1Count > 0 && h1Matches[0]) {
    h1First = h1Matches[0].replace(/<[^>]+>/g, '').trim().substring(0, 100);
  }
  
  const h2Matches = html.match(/<h2[^>]*>/gi) || [];
  const h2Count = h2Matches.length;
  
  const h3Matches = html.match(/<h3[^>]*>/gi) || [];
  const h3Count = h3Matches.length;

  // ===== IMAGES =====
  const imgMatches = html.match(/<img[^>]*>/gi) || [];
  const totalImages = imgMatches.length;
  let missingAlt = 0;
  
  imgMatches.forEach(img => {
    // Check for alt attribute that has actual content
    const altMatch = img.match(/alt=["']([^"']*)["']/i);
    if (!altMatch || altMatch[1].trim() === '') {
      missingAlt++;
    }
  });

  // ===== LINKS =====
  const linkMatches = html.match(/<a[^>]*href=["']([^"']*)["'][^>]*>/gi) || [];
  let internalLinks = 0;
  let externalLinks = 0;

  linkMatches.forEach(link => {
    const hrefMatch = link.match(/href=["']([^"']*)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1].trim();
      // Skip anchors, javascript, mailto, tel
      if (href.startsWith('#') || href.startsWith('javascript:') || 
          href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }
      
      if (href.startsWith('/') || href.includes(domain)) {
        internalLinks++;
      } else if (href.startsWith('http://') || href.startsWith('https://')) {
        externalLinks++;
      }
    }
  });

  // ===== CONTENT ANALYSIS =====
  const textContent = extractTextContent(html);
  const words = textContent.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const isThinContent = wordCount < 300;
  const readabilityScore = calculateReadability(textContent);
  const contentQuality = getContentQuality(wordCount, readabilityScore);

  // ===== TECHNICAL CHECKS =====
  const isHttps = url.startsWith('https://');
  const hasViewport = !!html.match(/<meta[^>]*name=["']viewport["'][^>]*>/i);

  // Check robots.txt
  const robotsTxtUrl = `${baseUrl}/robots.txt`;
  const robotsTxtResult = await safeFetch(robotsTxtUrl);
  const hasRobotsTxt = robotsTxtResult.ok;

  // Check sitemap.xml
  const sitemapUrl = `${baseUrl}/sitemap.xml`;
  const sitemapResult = await safeFetch(sitemapUrl);
  const hasSitemap = sitemapResult.ok;

  // ===== OPEN GRAPH =====
  const hasOgTitle = !!html.match(/<meta[^>]*property=["']og:title["'][^>]*>/i);
  const hasOgDescription = !!html.match(/<meta[^>]*property=["']og:description["'][^>]*>/i);
  const hasOgImage = !!html.match(/<meta[^>]*property=["']og:image["'][^>]*>/i);

  // ===== SCORING SYSTEM (Deterministic) =====
  const scoreBreakdown: { category: string; points: number; maxPoints: number; details: string }[] = [];
  let totalPoints = 0;
  const maxPoints = 100;

  // Title (15 points max)
  if (titleLength > 0 && titlePassed) {
    scoreBreakdown.push({ category: 'Title Tag', points: 15, maxPoints: 15, details: `Valid length (${titleLength} chars)` });
    totalPoints += 15;
  } else if (titleLength > 0) {
    scoreBreakdown.push({ category: 'Title Tag', points: 8, maxPoints: 15, details: `Suboptimal length (${titleLength} chars)` });
    totalPoints += 8;
  } else {
    scoreBreakdown.push({ category: 'Title Tag', points: 0, maxPoints: 15, details: 'Missing title tag' });
  }

  // Meta Description (15 points max)
  if (metaDescLength > 0 && metaDescPassed) {
    scoreBreakdown.push({ category: 'Meta Description', points: 15, maxPoints: 15, details: `Valid length (${metaDescLength} chars)` });
    totalPoints += 15;
  } else if (metaDescLength > 0) {
    scoreBreakdown.push({ category: 'Meta Description', points: 8, maxPoints: 15, details: `Suboptimal length (${metaDescLength} chars)` });
    totalPoints += 8;
  } else {
    scoreBreakdown.push({ category: 'Meta Description', points: 0, maxPoints: 15, details: 'Missing meta description' });
  }

  // H1 Tag (10 points max)
  if (h1Count === 1) {
    scoreBreakdown.push({ category: 'H1 Tag', points: 10, maxPoints: 10, details: 'Single H1 tag found' });
    totalPoints += 10;
  } else if (h1Count > 1) {
    scoreBreakdown.push({ category: 'H1 Tag', points: 5, maxPoints: 10, details: `Multiple H1 tags (${h1Count})` });
    totalPoints += 5;
  } else {
    scoreBreakdown.push({ category: 'H1 Tag', points: 0, maxPoints: 10, details: 'No H1 tag found' });
  }

  // HTTPS (10 points max)
  if (isHttps) {
    scoreBreakdown.push({ category: 'HTTPS', points: 10, maxPoints: 10, details: 'Site uses HTTPS' });
    totalPoints += 10;
  } else {
    scoreBreakdown.push({ category: 'HTTPS', points: 0, maxPoints: 10, details: 'Site not using HTTPS' });
  }

  // Canonical URL (5 points max)
  if (canonicalUrl) {
    scoreBreakdown.push({ category: 'Canonical URL', points: 5, maxPoints: 5, details: 'Canonical tag present' });
    totalPoints += 5;
  } else {
    scoreBreakdown.push({ category: 'Canonical URL', points: 0, maxPoints: 5, details: 'No canonical tag' });
  }

  // robots.txt (5 points max)
  if (hasRobotsTxt) {
    scoreBreakdown.push({ category: 'robots.txt', points: 5, maxPoints: 5, details: 'robots.txt found' });
    totalPoints += 5;
  } else {
    scoreBreakdown.push({ category: 'robots.txt', points: 0, maxPoints: 5, details: 'robots.txt not found' });
  }

  // sitemap.xml (5 points max)
  if (hasSitemap) {
    scoreBreakdown.push({ category: 'sitemap.xml', points: 5, maxPoints: 5, details: 'sitemap.xml found' });
    totalPoints += 5;
  } else {
    scoreBreakdown.push({ category: 'sitemap.xml', points: 0, maxPoints: 5, details: 'sitemap.xml not found' });
  }

  // Mobile Viewport (10 points max)
  if (hasViewport) {
    scoreBreakdown.push({ category: 'Mobile Viewport', points: 10, maxPoints: 10, details: 'Viewport meta tag present' });
    totalPoints += 10;
  } else {
    scoreBreakdown.push({ category: 'Mobile Viewport', points: 0, maxPoints: 10, details: 'No viewport meta tag' });
  }

  // Image Alt Text (10 points max)
  if (totalImages === 0) {
    scoreBreakdown.push({ category: 'Image Alt Text', points: 10, maxPoints: 10, details: 'No images to check' });
    totalPoints += 10;
  } else if (missingAlt === 0) {
    scoreBreakdown.push({ category: 'Image Alt Text', points: 10, maxPoints: 10, details: 'All images have alt text' });
    totalPoints += 10;
  } else {
    const altPercentage = Math.round(((totalImages - missingAlt) / totalImages) * 100);
    const altPoints = Math.round((altPercentage / 100) * 10);
    scoreBreakdown.push({ category: 'Image Alt Text', points: altPoints, maxPoints: 10, details: `${missingAlt}/${totalImages} images missing alt` });
    totalPoints += altPoints;
  }

  // Content Quality (15 points max)
  if (contentQuality === 'Excellent') {
    scoreBreakdown.push({ category: 'Content Quality', points: 15, maxPoints: 15, details: `${wordCount} words, excellent readability` });
    totalPoints += 15;
  } else if (contentQuality === 'Good') {
    scoreBreakdown.push({ category: 'Content Quality', points: 10, maxPoints: 15, details: `${wordCount} words, good readability` });
    totalPoints += 10;
  } else if (contentQuality === 'Fair') {
    scoreBreakdown.push({ category: 'Content Quality', points: 5, maxPoints: 15, details: `${wordCount} words, fair readability` });
    totalPoints += 5;
  } else {
    scoreBreakdown.push({ category: 'Content Quality', points: 0, maxPoints: 15, details: `${wordCount} words, needs improvement` });
  }

  // Clamp score between 0-100
  const score = Math.max(0, Math.min(100, totalPoints));

  // ===== BUILD ISSUES =====
  const issues: SEOIssue[] = [];

  if (titleLength === 0) {
    issues.push({
      id: 'title-missing',
      title: 'Missing Page Title',
      description: 'The page has no title tag, which is critical for SEO and user experience.',
      severity: 'High',
      evidence: 'No <title> tag found in page HTML',
      fix: 'Add a unique, descriptive title tag between 30-60 characters that includes your main keyword.',
    });
  } else if (!titlePassed) {
    issues.push({
      id: 'title-length',
      title: titleLength < 30 ? 'Title Tag Too Short' : 'Title Tag Too Long',
      description: `Title length is ${titleLength} characters. Optimal length is 30-60 characters.`,
      severity: 'Medium',
      evidence: `Current title: "${title.substring(0, 60)}${title.length > 60 ? '...' : ''}" (${titleLength} chars)`,
      fix: titleLength < 30 
        ? 'Expand your title to include more descriptive keywords (aim for 30-60 chars).' 
        : 'Shorten your title to under 60 characters to prevent truncation in search results.',
    });
  }

  if (metaDescLength === 0) {
    issues.push({
      id: 'meta-missing',
      title: 'Missing Meta Description',
      description: 'No meta description found. Search engines may use random page content instead.',
      severity: 'High',
      evidence: 'No <meta name="description"> tag found',
      fix: 'Add a compelling meta description between 120-160 characters that summarizes the page content.',
    });
  } else if (!metaDescPassed) {
    issues.push({
      id: 'meta-length',
      title: metaDescLength < 120 ? 'Meta Description Too Short' : 'Meta Description Too Long',
      description: `Meta description is ${metaDescLength} characters. Optimal length is 120-160 characters.`,
      severity: 'Medium',
      evidence: `Current description: "${metaDescription.substring(0, 80)}${metaDescription.length > 80 ? '...' : ''}" (${metaDescLength} chars)`,
      fix: metaDescLength < 120 
        ? 'Expand your meta description to provide more context (aim for 120-160 chars).' 
        : 'Shorten your meta description to under 160 characters to prevent truncation.',
    });
  }

  if (h1Count === 0) {
    issues.push({
      id: 'h1-missing',
      title: 'No H1 Tag Found',
      description: 'The page is missing an H1 heading, which is important for SEO and accessibility.',
      severity: 'High',
      evidence: 'No <h1> tag found in page HTML',
      fix: 'Add a single, descriptive H1 heading that includes your main keyword.',
    });
  } else if (h1Count > 1) {
    issues.push({
      id: 'h1-multiple',
      title: 'Multiple H1 Tags',
      description: 'Multiple H1 tags can confuse search engines about the page\'s main topic.',
      severity: 'Medium',
      evidence: `Found ${h1Count} H1 tags on the page`,
      fix: 'Reduce to a single H1 tag and use H2-H6 for subheadings.',
    });
  }

  if (!isHttps) {
    issues.push({
      id: 'https-missing',
      title: 'Not Using HTTPS',
      description: 'The page is not served over HTTPS, which is a ranking factor and security concern.',
      severity: 'High',
      evidence: `URL starts with http:// instead of https://`,
      fix: 'Install an SSL certificate and redirect all HTTP traffic to HTTPS.',
    });
  }

  if (!hasViewport) {
    issues.push({
      id: 'viewport-missing',
      title: 'Missing Viewport Meta Tag',
      description: 'No viewport meta tag found, which may cause mobile display issues.',
      severity: 'High',
      evidence: 'No <meta name="viewport"> tag found',
      fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the <head>.',
    });
  }

  if (missingAlt > 0) {
    issues.push({
      id: 'alt-missing',
      title: 'Images Missing Alt Text',
      description: 'Some images lack alt text, hurting accessibility and image SEO.',
      severity: missingAlt > 5 ? 'High' : 'Medium',
      evidence: `${missingAlt} out of ${totalImages} images are missing alt attributes`,
      fix: 'Add descriptive alt text to all images that describes their content.',
    });
  }

  if (isThinContent) {
    issues.push({
      id: 'thin-content',
      title: 'Thin Content Detected',
      description: 'The page has less than 300 words, which may be considered thin content.',
      severity: 'Medium',
      evidence: `Word count: ${wordCount} (minimum recommended: 300)`,
      fix: 'Add more comprehensive, valuable content to your page. Aim for at least 300-500 words.',
    });
  }

  if (!hasRobotsTxt) {
    issues.push({
      id: 'robots-missing',
      title: 'robots.txt Not Found',
      description: 'No robots.txt file detected at the root of the domain.',
      severity: 'Low',
      evidence: `${robotsTxtUrl} returned 404 or error`,
      fix: 'Create a robots.txt file to guide search engine crawlers.',
    });
  }

  if (!hasSitemap) {
    issues.push({
      id: 'sitemap-missing',
      title: 'sitemap.xml Not Found',
      description: 'No XML sitemap detected at the standard location.',
      severity: 'Low',
      evidence: `${sitemapUrl} returned 404 or error`,
      fix: 'Create and submit an XML sitemap to help search engines discover your pages.',
    });
  }

  if (!canonicalUrl) {
    issues.push({
      id: 'canonical-missing',
      title: 'No Canonical URL',
      description: 'Missing canonical tag may cause duplicate content issues.',
      severity: 'Low',
      evidence: 'No <link rel="canonical"> tag found',
      fix: 'Add a canonical tag pointing to the preferred URL for this page.',
    });
  }

  if (!hasOgTitle || !hasOgDescription || !hasOgImage) {
    const missing = [];
    if (!hasOgTitle) missing.push('og:title');
    if (!hasOgDescription) missing.push('og:description');
    if (!hasOgImage) missing.push('og:image');
    
    issues.push({
      id: 'og-incomplete',
      title: 'Incomplete Open Graph Tags',
      description: 'Missing Open Graph tags will result in poor social media previews.',
      severity: 'Low',
      evidence: `Missing: ${missing.join(', ')}`,
      fix: 'Add complete Open Graph meta tags (og:title, og:description, og:image) for better social sharing.',
    });
  }

  // ===== BUILD RECOMMENDATIONS =====
  const recommendations: SEORecommendation[] = [];

  if (!titlePassed || titleLength === 0) {
    recommendations.push({
      id: 'rec-title',
      title: 'Optimize Your Title Tag',
      description: 'Create a compelling, keyword-rich title between 30-60 characters.',
      example: title ? `Consider: "${title.substring(0, 50)}..." → Add key benefits or unique value` : 
        `Example: "Your Main Keyword | Brand Name - Unique Value Proposition"`,
    });
  }

  if (!metaDescPassed || metaDescLength === 0) {
    recommendations.push({
      id: 'rec-meta',
      title: 'Improve Meta Description',
      description: 'Write a unique meta description between 120-160 characters with a clear call-to-action.',
      example: title 
        ? `Based on your title "${title.substring(0, 30)}...", consider describing the key benefits and including a CTA.`
        : 'Include your main keyword, describe the page content, and add a compelling reason to click.',
    });
  }

  if (missingAlt > 0) {
    recommendations.push({
      id: 'rec-alt',
      title: 'Add Alt Text to All Images',
      description: `${missingAlt} images need descriptive alt text for accessibility and SEO.`,
      example: 'Use descriptive alt text like "Red running shoes on display" instead of "image1" or empty alt.',
    });
  }

  if (wordCount < 1000) {
    recommendations.push({
      id: 'rec-content',
      title: 'Expand Your Content',
      description: `Current word count is ${wordCount}. Consider adding more comprehensive content.`,
      example: 'Aim for 1000+ words for important pages. Add FAQs, detailed explanations, or related topics.',
    });
  }

  if (internalLinks < 3) {
    recommendations.push({
      id: 'rec-internal',
      title: 'Add Internal Links',
      description: `Only ${internalLinks} internal links found. More internal links improve site navigation and SEO.`,
      example: 'Link to related content, category pages, or your most important pages.',
    });
  }

  if (!canonicalUrl) {
    recommendations.push({
      id: 'rec-canonical',
      title: 'Add Canonical Tag',
      description: 'Set a canonical URL to prevent duplicate content issues.',
      example: `<link rel="canonical" href="${url}" />`,
    });
  }

  if (!hasRobotsTxt || !hasSitemap) {
    recommendations.push({
      id: 'rec-crawl',
      title: 'Improve Crawlability',
      description: 'Add robots.txt and sitemap.xml to help search engines crawl your site effectively.',
      example: 'Create /robots.txt with crawl directives and /sitemap.xml listing all important pages.',
    });
  }

  return {
    url,
    score,
    technical: {
      https: { value: isHttps ? 'Secure (HTTPS)' : 'Not Secure (HTTP)', passed: isHttps },
      robotsTxt: { value: hasRobotsTxt ? 'Found' : 'Not Found', passed: hasRobotsTxt, url: robotsTxtUrl },
      sitemapXml: { value: hasSitemap ? 'Found' : 'Not Found', passed: hasSitemap, url: sitemapUrl },
      mobileFriendly: { value: hasViewport ? 'Responsive' : 'Not Optimized', passed: hasViewport },
    },
    onPage: {
      titleTag: { value: title || 'Not found', length: titleLength, passed: titlePassed },
      metaDescription: { value: metaDescription || 'Not found', length: metaDescLength, passed: metaDescPassed },
      canonicalUrl: { value: canonicalUrl || 'Not set', present: !!canonicalUrl },
      robotsMeta: { value: robotsMeta || 'Not set', present: !!robotsMeta },
      h1Count,
      h1First,
      h2Count,
      h3Count,
      imageAltTexts: { total: totalImages, missing: missingAlt },
      internalLinks,
      externalLinks,
    },
    content: {
      wordCount,
      readabilityScore,
      contentQuality,
      isThinContent,
    },
    openGraph: {
      hasOgTitle,
      hasOgDescription,
      hasOgImage,
    },
    issues,
    recommendations,
    scoreBreakdown,
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    // Validate URL is provided
    if (!url) {
      console.error('No URL provided');
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format and validate URL
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    if (!isValidUrl(formattedUrl)) {
      console.error('Invalid URL format:', formattedUrl);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid URL format. URL must start with http:// or https://' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check for Firecrawl API key
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'SEO analysis service not configured. Please connect Firecrawl in settings.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Starting SEO analysis for:', formattedUrl);

    // Use Firecrawl to scrape the page
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formattedUrl,
        formats: ['html', 'rawHtml'],
        onlyMainContent: false, // Need full HTML for SEO analysis
        waitFor: 5000, // Wait for dynamic content
        timeout: 30000,
      }),
    });

    const firecrawlData = await response.json();

    // Handle Firecrawl errors - NO FALLBACK DATA
    if (!response.ok || !firecrawlData.success) {
      console.error('Firecrawl API error:', JSON.stringify(firecrawlData));
      
      let errorMessage = 'Failed to analyze the website.';
      
      if (response.status === 402) {
        errorMessage = 'SEO analysis quota exceeded. Please try again later.';
      } else if (response.status === 408 || firecrawlData.error?.includes('timeout')) {
        errorMessage = 'The website took too long to respond. It may be slow or blocking automated requests.';
      } else if (response.status === 403 || firecrawlData.error?.includes('blocked') || firecrawlData.error?.includes('Cloudflare')) {
        errorMessage = 'The website is blocking our crawler (possibly using Cloudflare or similar protection).';
      } else if (firecrawlData.error) {
        errorMessage = `Could not crawl the website: ${firecrawlData.error}`;
      }

      return new Response(
        JSON.stringify({ success: false, error: errorMessage }),
        { status: response.status || 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract HTML content
    const html = firecrawlData.data?.rawHtml || firecrawlData.data?.html || '';
    
    if (!html || html.trim().length < 100) {
      console.error('Empty or too short HTML response');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Could not retrieve page content. The website may be empty, protected, or returning an error page.' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('HTML received, length:', html.length);

    // Extract and analyze SEO data
    const seoData = await extractSEOData(html, formattedUrl);

    if (!seoData) {
      console.error('Failed to extract SEO data');
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to parse page content for SEO analysis.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('SEO analysis complete. Score:', seoData.score, 'Issues:', seoData.issues.length);

    return new Response(
      JSON.stringify({ success: true, data: seoData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in SEO analysis:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during analysis.';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
