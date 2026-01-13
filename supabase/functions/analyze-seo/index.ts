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

interface FirecrawlMetadata {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  viewport?: string;
  canonical?: string;
  robots?: string;
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

// Safely fetch a resource with timeout - use GET for better compatibility
async function safeFetch(url: string, timeoutMs: number = 8000): Promise<{ ok: boolean; status?: number }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    
    // Use GET instead of HEAD - some servers don't handle HEAD properly
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: { 
        'User-Agent': 'Mozilla/5.0 (compatible; SEOAnalyzer/1.0; +https://e-seomax.com)',
        'Accept': 'text/plain, text/html, application/xml, */*'
      },
      redirect: 'follow',
    });
    
    clearTimeout(timeout);
    return { ok: response.ok && response.status === 200, status: response.status };
  } catch (error) {
    console.log(`safeFetch failed for ${url}:`, error);
    return { ok: false };
  }
}

// Extract text content from HTML for word count
function extractTextContent(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#\d+;/g, ' ')
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

// Helper: Extract attribute value from meta tag
function extractMetaContent(html: string, patterns: RegExp[]): string {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return '';
}

// Extract SEO data from HTML with Firecrawl metadata fallbacks
async function extractSEOData(
  html: string, 
  url: string, 
  metadata: FirecrawlMetadata = {}
): Promise<SEOAnalysisResult['data']> {
  const urlObj = new URL(url);
  const hostname = urlObj.hostname.toLowerCase();
  const origin = urlObj.origin;

  console.log('Extracting SEO data for hostname:', hostname);
  console.log('HTML length:', html.length);
  console.log('Firecrawl metadata:', JSON.stringify(metadata));

  // ===== TITLE TAG (strict priority: <title> first) =====
  // Priority 1: Extract <title> from HTML head using multiple patterns
  let title = '';
  
  // Pattern 1: Standard title tag (handles most cases including multi-line)
  const titleMatch1 = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch1 && titleMatch1[1]) {
    // Clean up the title: remove inner tags, decode entities, trim whitespace
    title = titleMatch1[1]
      .replace(/<[^>]+>/g, '') // Remove any inner HTML tags
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
      .replace(/&#x([a-fA-F0-9]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }
  
  console.log('Title from <title> tag:', title, 'Length:', title.length);
  
  // Priority 2: Fallback to OG title only if <title> is empty
  if (!title) {
    const ogTitlePatterns = [
      /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i,
      /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:title["']/i,
    ];
    const ogTitle = extractMetaContent(html, ogTitlePatterns);
    if (ogTitle) {
      title = ogTitle.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
      console.log('Title from og:title:', title);
    }
  }
  
  // Priority 3: Fallback to Firecrawl metadata only if still empty
  if (!title && metadata.title) {
    title = metadata.title.trim();
    console.log('Title from Firecrawl metadata.title:', title);
  }
  if (!title && metadata.ogTitle) {
    title = metadata.ogTitle.trim();
    console.log('Title from Firecrawl metadata.ogTitle:', title);
  }
  
  const titleLength = title.length;
  const titlePassed = titleLength >= 30 && titleLength <= 60;
  console.log('Final extracted title:', title, 'Length:', titleLength);

  // ===== META DESCRIPTION (with multiple fallbacks) =====
  const metaDescPatterns = [
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i,
    /<meta[^>]*name=["']Description["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']Description["']/i,
  ];
  
  let metaDescription = extractMetaContent(html, metaDescPatterns);
  
  // Fallback to OG description
  if (!metaDescription) {
    const ogDescPatterns = [
      /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i,
      /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i,
    ];
    metaDescription = extractMetaContent(html, ogDescPatterns);
  }
  
  // Fallback to Firecrawl metadata
  if (!metaDescription && metadata.description) {
    metaDescription = metadata.description;
  }
  if (!metaDescription && metadata.ogDescription) {
    metaDescription = metadata.ogDescription;
  }
  
  const metaDescLength = metaDescription.length;
  const metaDescPassed = metaDescLength >= 120 && metaDescLength <= 160;
  console.log('Extracted meta description:', metaDescription.substring(0, 100), 'Length:', metaDescLength);

  // ===== CANONICAL URL =====
  const canonicalPatterns = [
    /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i,
    /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i,
  ];
  let canonicalUrl = extractMetaContent(html, canonicalPatterns);
  if (!canonicalUrl && metadata.canonical) {
    canonicalUrl = metadata.canonical;
  }

  // ===== ROBOTS META =====
  const robotsMetaPatterns = [
    /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']robots["']/i,
  ];
  let robotsMeta = extractMetaContent(html, robotsMetaPatterns);
  if (!robotsMeta && metadata.robots) {
    robotsMeta = metadata.robots;
  }

  // ===== HEADINGS =====
  const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  const h1Count = h1Matches.length;
  let h1First = '';
  if (h1Count > 0 && h1Matches[0]) {
    h1First = h1Matches[0].replace(/<[^>]+>/g, '').trim().substring(0, 100);
  }
  console.log('H1 count:', h1Count, 'First H1:', h1First);
  
  const h2Matches = html.match(/<h2[^>]*>/gi) || [];
  const h2Count = h2Matches.length;
  
  const h3Matches = html.match(/<h3[^>]*>/gi) || [];
  const h3Count = h3Matches.length;

  // ===== IMAGES (Improved: avoid false positives for decorative images) =====
  const imgMatches = html.match(/<img[^>]*>/gi) || [];
  let totalContentImages = 0;
  let missingAlt = 0;
  
  imgMatches.forEach(img => {
    // Skip tracking pixels and tiny images (1x1, spacer images, etc.)
    const widthMatch = img.match(/width=["']?(\d+)/i);
    const heightMatch = img.match(/height=["']?(\d+)/i);
    const width = widthMatch ? parseInt(widthMatch[1]) : null;
    const height = heightMatch ? parseInt(heightMatch[1]) : null;
    
    // Skip tiny images (likely tracking pixels)
    if ((width !== null && width <= 3) || (height !== null && height <= 3)) {
      return; // Skip tracking pixels
    }
    
    // Check for src attribute - skip if empty or data:image/gif (tracking)
    const srcMatch = img.match(/src=["']([^"']+)["']/i);
    if (!srcMatch || !srcMatch[1]) {
      return; // No src, skip
    }
    
    const src = srcMatch[1];
    // Skip common tracking/spacer patterns
    if (src.includes('data:image/gif') || 
        src.includes('spacer.gif') || 
        src.includes('blank.gif') ||
        src.includes('pixel.gif') ||
        src.includes('1x1') ||
        src.includes('tracking') ||
        src.includes('beacon')) {
      return;
    }
    
    // Check if explicitly decorative
    const hasAriaHidden = /aria-hidden=["']true["']/i.test(img);
    const hasRolePresentation = /role=["']presentation["']/i.test(img);
    const hasRoleNone = /role=["']none["']/i.test(img);
    
    // Skip decorative images (explicitly marked as such)
    if (hasAriaHidden || hasRolePresentation || hasRoleNone) {
      return; // Decorative, intentionally hidden from AT
    }
    
    // This is a content image that should be counted
    totalContentImages++;
    
    // Check for alt attribute
    const hasAltAttr = /\salt\s*=/i.test(img);
    
    if (!hasAltAttr) {
      // No alt attribute at all - this is an issue
      missingAlt++;
    } else {
      // Has alt attribute - check if it's empty (which is VALID for decorative)
      // alt="" is a valid way to mark decorative images, so we DON'T count it as missing
      const emptyAltMatch = img.match(/alt=["']\s*["']/i);
      // Only count as missing if alt attribute exists but has only whitespace AND
      // the image seems like it should have meaningful alt text based on context
      // Actually, alt="" is intentionally empty = decorative = valid, so we skip
      // We only flag truly missing alt (no attribute) above
    }
  });
  
  console.log('Total content images:', totalContentImages, 'Missing alt:', missingAlt, 'Skipped decorative/tracking:', imgMatches.length - totalContentImages);

  // ===== LINKS (Fixed: proper domain matching) =====
  const linkMatches = html.match(/<a[^>]+href=["']([^"'#]+)["'][^>]*>/gi) || [];
  let internalLinks = 0;
  let externalLinks = 0;

  linkMatches.forEach(link => {
    const hrefMatch = link.match(/href=["']([^"']+)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1].trim();
      
      // Skip anchors, javascript, mailto, tel
      if (!href || href.startsWith('#') || href.startsWith('javascript:') || 
          href.startsWith('mailto:') || href.startsWith('tel:') ||
          href.startsWith('data:')) {
        return;
      }
      
      try {
        // Handle relative URLs
        if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../')) {
          internalLinks++;
          return;
        }
        
        // Handle absolute URLs
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
          const absoluteHref = href.startsWith('//') ? `https:${href}` : href;
          const linkUrl = new URL(absoluteHref);
          const linkHostname = linkUrl.hostname.toLowerCase();
          
          // Check if same domain (including www variations)
          const cleanHostname = hostname.replace(/^www\./, '');
          const cleanLinkHostname = linkHostname.replace(/^www\./, '');
          
          if (cleanLinkHostname === cleanHostname || 
              linkHostname === hostname ||
              linkHostname.endsWith('.' + cleanHostname)) {
            internalLinks++;
          } else {
            externalLinks++;
          }
        } else if (!href.includes(':')) {
          // Likely a relative path without leading slash
          internalLinks++;
        }
      } catch (e) {
        // Invalid URL, skip
        console.log('Invalid href:', href);
      }
    }
  });
  console.log('Internal links:', internalLinks, 'External links:', externalLinks);

  // ===== CONTENT ANALYSIS =====
  const textContent = extractTextContent(html);
  const words = textContent.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const isThinContent = wordCount < 300;
  const readabilityScore = calculateReadability(textContent);
  const contentQuality = getContentQuality(wordCount, readabilityScore);
  console.log('Word count:', wordCount, 'Readability:', readabilityScore);

  // ===== TECHNICAL CHECKS =====
  const isHttps = url.startsWith('https://');
  
  // Viewport meta check - multiple patterns
  const viewportPatterns = [
    /<meta[^>]*name=["']viewport["'][^>]*>/i,
    /<meta[^>]*name=["']Viewport["'][^>]*>/i,
  ];
  let hasViewport = viewportPatterns.some(p => p.test(html));
  if (!hasViewport && metadata.viewport) {
    hasViewport = true;
  }
  console.log('Has viewport:', hasViewport);

  // Check robots.txt - use origin for correct URL construction
  const robotsTxtUrl = `${origin}/robots.txt`;
  console.log('Checking robots.txt:', robotsTxtUrl);
  const robotsTxtResult = await safeFetch(robotsTxtUrl);
  const hasRobotsTxt = robotsTxtResult.ok;
  console.log('robots.txt found:', hasRobotsTxt, 'status:', robotsTxtResult.status);

  // Check sitemap.xml
  const sitemapUrl = `${origin}/sitemap.xml`;
  console.log('Checking sitemap:', sitemapUrl);
  const sitemapResult = await safeFetch(sitemapUrl);
  const hasSitemap = sitemapResult.ok;
  console.log('sitemap.xml found:', hasSitemap, 'status:', sitemapResult.status);

  // ===== OPEN GRAPH =====
  const ogTitlePattern = /<meta[^>]*property=["']og:title["'][^>]*>/i;
  const ogDescPattern = /<meta[^>]*property=["']og:description["'][^>]*>/i;
  const ogImagePattern = /<meta[^>]*property=["']og:image["'][^>]*>/i;
  
  let hasOgTitle = ogTitlePattern.test(html);
  let hasOgDescription = ogDescPattern.test(html);
  let hasOgImage = ogImagePattern.test(html);
  
  // Use metadata fallbacks
  if (!hasOgTitle && metadata.ogTitle) hasOgTitle = true;
  if (!hasOgDescription && metadata.ogDescription) hasOgDescription = true;
  if (!hasOgImage && metadata.ogImage) hasOgImage = true;

  // ===== SCORING SYSTEM (Deterministic) =====
  const scoreBreakdown: { category: string; points: number; maxPoints: number; details: string }[] = [];
  let totalPoints = 0;

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
  if (totalContentImages === 0) {
    scoreBreakdown.push({ category: 'Image Alt Text', points: 10, maxPoints: 10, details: 'No content images to check' });
    totalPoints += 10;
  } else if (missingAlt === 0) {
    scoreBreakdown.push({ category: 'Image Alt Text', points: 10, maxPoints: 10, details: 'All content images have alt text' });
    totalPoints += 10;
  } else {
    const altPercentage = Math.round(((totalContentImages - missingAlt) / totalContentImages) * 100);
    const altPoints = Math.round((altPercentage / 100) * 10);
    scoreBreakdown.push({ category: 'Image Alt Text', points: altPoints, maxPoints: 10, details: `${missingAlt}/${totalContentImages} content images missing alt` });
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
      evidence: `${missingAlt} out of ${totalContentImages} content images are missing alt attributes`,
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
      imageAltTexts: { total: totalContentImages, missing: missingAlt },
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

    console.log('Analyzing SEO for URL:', formattedUrl);

    // Use Firecrawl to scrape the page - request rawHtml to get full HTML including <head>
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formattedUrl,
        formats: ['rawHtml', 'html'],  // rawHtml first to prioritize full HTML
        includeTags: ['head', 'body', 'title', 'meta', 'link', 'h1', 'h2', 'h3', 'img', 'a'],
        onlyMainContent: false,  // CRITICAL: Get full page HTML including <head>
        waitFor: 3000,
        timeout: 30000,
      }),
    });

    const firecrawlData = await response.json();
    console.log('Firecrawl response status:', response.status);
    console.log('Firecrawl success:', firecrawlData.success);

    // Handle Firecrawl errors - NO FALLBACK DATA
    if (!response.ok || !firecrawlData.success) {
      console.error('Firecrawl API error:', JSON.stringify(firecrawlData));
      
      let errorMessage = 'CRAWL_FAILED_OR_INCOMPLETE_HTML';
      
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

    // Extract HTML content - prioritize rawHtml for complete HTML including <head>
    const html = firecrawlData.data?.rawHtml || firecrawlData.data?.html || '';
    
    console.log('HTML received, length:', html.length);
    console.log('HTML contains <head>:', html.toLowerCase().includes('<head'));
    console.log('HTML contains <title>:', html.toLowerCase().includes('<title'));
    
    if (!html || html.trim().length < 100) {
      console.error('CRAWL_FAILED_OR_INCOMPLETE_HTML: Empty or too short HTML response');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'CRAWL_FAILED_OR_INCOMPLETE_HTML: Could not retrieve page content. The website may be empty, protected, or returning an error page.' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate we have proper HTML structure
    const hasHead = html.toLowerCase().includes('<head');
    const hasBody = html.toLowerCase().includes('<body');
    
    if (!hasHead && !hasBody) {
      console.error('CRAWL_FAILED_OR_INCOMPLETE_HTML: HTML missing head and body tags');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'CRAWL_FAILED_OR_INCOMPLETE_HTML: The retrieved content is not valid HTML. The crawler may have been blocked.' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract Firecrawl metadata as fallbacks
    const metadata: FirecrawlMetadata = {
      title: firecrawlData.data?.metadata?.title,
      description: firecrawlData.data?.metadata?.description,
      ogTitle: firecrawlData.data?.metadata?.ogTitle,
      ogDescription: firecrawlData.data?.metadata?.ogDescription,
      ogImage: firecrawlData.data?.metadata?.ogImage,
      viewport: firecrawlData.data?.metadata?.viewport,
      canonical: firecrawlData.data?.metadata?.canonical,
      robots: firecrawlData.data?.metadata?.robots,
    };
    
    console.log('Firecrawl metadata extracted:', JSON.stringify(metadata));

    // Extract and analyze SEO data
    const seoData = await extractSEOData(html, formattedUrl, metadata);

    if (!seoData) {
      console.error('Failed to extract SEO data');
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to parse page content for SEO analysis.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('SEO analysis complete. Score:', seoData.score, 'Title length:', seoData.onPage.titleTag.length, 'Issues:', seoData.issues.length);

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
