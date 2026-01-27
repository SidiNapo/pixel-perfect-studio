-- Add French translation columns to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS title_fr TEXT,
ADD COLUMN IF NOT EXISTS excerpt_fr TEXT,
ADD COLUMN IF NOT EXISTS content_fr TEXT,
ADD COLUMN IF NOT EXISTS category_fr TEXT,
ADD COLUMN IF NOT EXISTS seo_title_fr TEXT,
ADD COLUMN IF NOT EXISTS seo_description_fr TEXT,
ADD COLUMN IF NOT EXISTS seo_keywords_fr TEXT,
ADD COLUMN IF NOT EXISTS read_time_fr TEXT;