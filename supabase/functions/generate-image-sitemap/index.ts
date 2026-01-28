import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = 'https://e-seomax.com';

// Static assets to be indexed
const staticAssets = [
  {
    loc: `${BASE_URL}/`,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        title: 'E-SEOMAX - #1 SEO Tool in Morocco',
        caption: 'E-SEOMAX AI-powered SEO analysis platform for Morocco. Serving Casablanca, Rabat, Marrakech and all Moroccan cities.',
        license: `${BASE_URL}/terms-of-service`,
      },
      {
        url: `${BASE_URL}/favicon.png`,
        title: 'E-SEOMAX Logo',
        caption: 'E-SEOMAX brand logo - Morocco\'s leading SEO platform',
      },
    ],
  },
  {
    loc: `${BASE_URL}/about`,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        title: 'About E-SEOMAX - AI-Powered SEO Platform',
        caption: 'Learn about E-SEOMAX, Morocco\'s premier SEO analysis platform.',
      },
    ],
  },
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch published blog posts with featured images
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('slug, title, excerpt, featured_image, published_at')
      .eq('status', 'published')
      .not('featured_image', 'is', null)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
    }

    // Build image sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

    // Add static assets
    for (const asset of staticAssets) {
      sitemap += `  <url>
    <loc>${asset.loc}</loc>
`;
      for (const image of asset.images) {
        sitemap += `    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
`;
        if (image.license) {
          sitemap += `      <image:license>${image.license}</image:license>
`;
        }
        sitemap += `    </image:image>
`;
      }
      sitemap += `  </url>
`;
    }

    // Add blog post images
    if (blogPosts && blogPosts.length > 0) {
      for (const post of blogPosts) {
        if (post.featured_image) {
          sitemap += `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <image:image>
      <image:loc>${escapeXml(post.featured_image)}</image:loc>
      <image:title>${escapeXml(post.title)} - E-SEOMAX Blog Morocco</image:title>
      <image:caption>${escapeXml(post.excerpt || post.title)}</image:caption>
    </image:image>
  </url>
`;
        }
      }
    }

    sitemap += `</urlset>`;

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });

  } catch (error) {
    console.error('Image sitemap generation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate image sitemap' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Helper function to escape XML special characters
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
