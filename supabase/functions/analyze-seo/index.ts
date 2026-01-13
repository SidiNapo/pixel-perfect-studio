const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SEOAnalysisResult {
  success: boolean;
  error?: string;
  data?: {
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
      externalLinks: number;
    };
    content: {
      wordCount: number;
      keywordDensity: string;
      readabilityScore: number;
      contentQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    };
    issues: Array<{ id: string; title: string; severity: 'High' | 'Medium' | 'Low' }>;
    recommendations: Array<{ id: string; title: string; description: string }>;
  };
}

function extractSEOData(html: string, url: string): SEOAnalysisResult['data'] {
  // Extract title tag
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const titleLength = title.length;
  const titlePassed = titleLength >= 30 && titleLength <= 60;

  // Extract meta description
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';
  const metaDescLength = metaDescription.length;
  const metaDescPassed = metaDescLength >= 120 && metaDescLength <= 160;

  // Count H1 tags
  const h1Matches = html.match(/<h1[^>]*>/gi) || [];
  const h1Count = h1Matches.length;

  // Count images and missing alt texts
  const imgMatches = html.match(/<img[^>]*>/gi) || [];
  const totalImages = imgMatches.length;
  let missingAlt = 0;
  imgMatches.forEach(img => {
    if (!img.match(/alt=["'][^"']+["']/i)) {
      missingAlt++;
    }
  });

  // Count links
  const linkMatches = html.match(/<a[^>]*href=["']([^"']*)["'][^>]*>/gi) || [];
  let internalLinks = 0;
  let externalLinks = 0;
  const urlObj = new URL(url);
  const domain = urlObj.hostname;

  linkMatches.forEach(link => {
    const hrefMatch = link.match(/href=["']([^"']*)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1];
      if (href.startsWith('/') || href.startsWith('#') || href.includes(domain)) {
        internalLinks++;
      } else if (href.startsWith('http')) {
        externalLinks++;
      }
    }
  });

  // Extract text content and count words
  const textContent = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = textContent.split(' ').filter(word => word.length > 0);
  const wordCount = words.length;

  // Check HTTPS
  const isHttps = url.startsWith('https://');

  // Check for robots.txt reference or meta robots
  const robotsMetaMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*>/i);
  const hasRobotsMeta = !!robotsMetaMatch;

  // Check Open Graph tags
  const hasOgTags = !!html.match(/<meta[^>]*property=["']og:/i);

  // Check viewport meta tag for mobile friendliness
  const hasViewport = !!html.match(/<meta[^>]*name=["']viewport["'][^>]*>/i);

  // Calculate readability score (simplified Flesch-Kincaid approximation)
  const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const avgWordsPerSentence = sentences > 0 ? wordCount / sentences : 0;
  const readabilityScore = Math.min(100, Math.max(0, Math.round(100 - (avgWordsPerSentence * 1.5))));

  // Determine content quality
  let contentQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor' = 'Poor';
  if (wordCount >= 2000 && readabilityScore >= 60) {
    contentQuality = 'Excellent';
  } else if (wordCount >= 1000 && readabilityScore >= 50) {
    contentQuality = 'Good';
  } else if (wordCount >= 500 && readabilityScore >= 40) {
    contentQuality = 'Fair';
  }

  // Calculate keyword density (top words)
  const wordFreq: Record<string, number> = {};
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'is', 'it', 'this', 'that', 'with', 'as', 'by', 'from', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can']);
  words.forEach(word => {
    const lowerWord = word.toLowerCase().replace(/[^a-z]/g, '');
    if (lowerWord.length > 3 && !stopWords.has(lowerWord)) {
      wordFreq[lowerWord] = (wordFreq[lowerWord] || 0) + 1;
    }
  });
  const topWord = Object.entries(wordFreq).sort((a, b) => b[1] - a[1])[0];
  const keywordDensity = topWord && wordCount > 0 
    ? `${((topWord[1] / wordCount) * 100).toFixed(1)}%` 
    : '0%';

  // Build issues array
  const issues: Array<{ id: string; title: string; severity: 'High' | 'Medium' | 'Low' }> = [];
  
  if (!titlePassed) {
    issues.push({
      id: 'title',
      title: titleLength === 0 ? 'Missing page title' : `Title length (${titleLength} chars) is ${titleLength < 30 ? 'too short' : 'too long'}`,
      severity: titleLength === 0 ? 'High' : 'Medium'
    });
  }
  
  if (!metaDescPassed) {
    issues.push({
      id: 'meta-desc',
      title: metaDescLength === 0 ? 'Missing meta description' : `Meta description (${metaDescLength} chars) is ${metaDescLength < 120 ? 'too short' : 'too long'}`,
      severity: metaDescLength === 0 ? 'High' : 'Medium'
    });
  }
  
  if (h1Count === 0) {
    issues.push({ id: 'h1-missing', title: 'No H1 tag found on the page', severity: 'High' });
  } else if (h1Count > 1) {
    issues.push({ id: 'h1-multiple', title: `Multiple H1 tags found (${h1Count})`, severity: 'Medium' });
  }
  
  if (missingAlt > 0) {
    issues.push({
      id: 'alt-missing',
      title: `${missingAlt} image${missingAlt > 1 ? 's' : ''} missing alt text`,
      severity: missingAlt > 3 ? 'High' : 'Medium'
    });
  }
  
  if (!isHttps) {
    issues.push({ id: 'https', title: 'Website is not using HTTPS', severity: 'High' });
  }
  
  if (!hasViewport) {
    issues.push({ id: 'viewport', title: 'Missing viewport meta tag for mobile', severity: 'High' });
  }
  
  if (!hasOgTags) {
    issues.push({ id: 'og-tags', title: 'Missing Open Graph tags for social sharing', severity: 'Low' });
  }
  
  if (wordCount < 300) {
    issues.push({ id: 'thin-content', title: 'Thin content - page has less than 300 words', severity: 'Medium' });
  }

  // Build recommendations
  const recommendations: Array<{ id: string; title: string; description: string }> = [];
  
  if (!titlePassed || titleLength === 0) {
    recommendations.push({
      id: 'rec-title',
      title: 'Optimize Title Tag',
      description: 'Write a compelling title between 30-60 characters that includes your main keyword'
    });
  }
  
  if (!metaDescPassed || metaDescLength === 0) {
    recommendations.push({
      id: 'rec-meta',
      title: 'Improve Meta Description',
      description: 'Create a unique meta description between 120-160 characters with a clear call to action'
    });
  }
  
  if (missingAlt > 0) {
    recommendations.push({
      id: 'rec-alt',
      title: 'Add Alt Text to Images',
      description: 'Add descriptive alt text to all images to improve accessibility and SEO'
    });
  }
  
  if (wordCount < 1000) {
    recommendations.push({
      id: 'rec-content',
      title: 'Expand Your Content',
      description: 'Consider adding more comprehensive content to your pages. Aim for at least 1000 words for important pages'
    });
  }
  
  if (internalLinks < 3) {
    recommendations.push({
      id: 'rec-internal-links',
      title: 'Add Internal Links',
      description: 'Include more internal links to help search engines discover and understand your site structure'
    });
  }

  // Calculate overall score
  let score = 100;
  issues.forEach(issue => {
    if (issue.severity === 'High') score -= 15;
    else if (issue.severity === 'Medium') score -= 8;
    else score -= 3;
  });
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    technical: {
      pageSpeed: { value: 'N/A', passed: true }, // Would need real performance API
      mobileFriendly: { value: hasViewport ? 'Responsive' : 'Not Optimized', passed: hasViewport },
      https: { value: isHttps ? 'Secure' : 'Not Secure', passed: isHttps },
      robotsTxt: { value: hasRobotsMeta ? 'Found' : 'Not Found', passed: hasRobotsMeta },
    },
    onPage: {
      titleTag: { value: title || 'Not found', length: titleLength, passed: titlePassed },
      metaDescription: { value: metaDescription || 'Not found', length: metaDescLength, passed: metaDescPassed },
      h1Count,
      imageAltTexts: { total: totalImages, missing: missingAlt },
      internalLinks,
      externalLinks,
    },
    content: {
      wordCount,
      keywordDensity,
      readabilityScore,
      contentQuality,
    },
    issues,
    recommendations,
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'SEO analysis service not configured. Please contact support.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format URL
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    console.log('Analyzing SEO for URL:', formattedUrl);

    // Use Firecrawl to scrape the page
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formattedUrl,
        formats: ['html', 'markdown'],
        onlyMainContent: false, // We need full HTML for SEO analysis
        waitFor: 3000, // Wait for dynamic content
      }),
    });

    const firecrawlData = await response.json();

    if (!response.ok || !firecrawlData.success) {
      console.error('Firecrawl API error:', firecrawlData);
      
      // Handle specific error cases
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: 'SEO analysis quota exceeded. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: firecrawlData.error || 'Failed to analyze the website. The site may be blocking crawlers or unreachable.' 
        }),
        { status: response.status || 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract HTML content
    const html = firecrawlData.data?.html || firecrawlData.data?.rawHtml || '';
    
    if (!html) {
      return new Response(
        JSON.stringify({ success: false, error: 'Could not retrieve page content. The website may be protected or unavailable.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract SEO data from HTML
    const seoData = extractSEOData(html, formattedUrl);

    if (!seoData) {
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to extract SEO data from the page.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('SEO analysis complete. Score:', seoData.score);

    return new Response(
      JSON.stringify({ success: true, data: seoData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error analyzing SEO:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze website';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
