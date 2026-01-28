import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { createBlogPostSchema } from '@/components/StructuredDataSchemas';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

interface BlogPost {
  id: string;
  title: string;
  title_fr?: string | null;
  slug: string;
  excerpt: string | null;
  excerpt_fr?: string | null;
  content: string | null;
  content_fr?: string | null;
  category: string | null;
  category_fr?: string | null;
  featured_image: string | null;
  read_time: string | null;
  read_time_fr?: string | null;
  published_at: string | null;
  updated_at: string;
  seo_title: string | null;
  seo_title_fr?: string | null;
  seo_description: string | null;
  seo_description_fr?: string | null;
  seo_keywords: string | null;
  seo_keywords_fr?: string | null;
}

const BlogPost = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  // Add/remove blog post schema
  useEffect(() => {
    if (!post) return;

    const isFrench = i18n.language === 'fr';
    const title = isFrench ? post.title_fr || post.title : post.title;
    const description = isFrench ? post.excerpt_fr || post.excerpt : post.excerpt;
    const category = isFrench ? post.category_fr || post.category : post.category;
    const keywords = isFrench ? post.seo_keywords_fr || post.seo_keywords : post.seo_keywords;

    const schema = createBlogPostSchema({
      title,
      description: description || '',
      image: post.featured_image || 'https://e-seomax.com/og-image.png',
      datePublished: post.published_at || post.updated_at,
      dateModified: post.updated_at,
      slug: post.slug,
      author: 'E-SEOMAX Team',
      category: category || 'SEO',
      keywords: keywords || undefined,
    });

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-blog-schema', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[data-blog-schema]');
      if (existingScript) existingScript.remove();
    };
  }, [post, i18n.language]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';

    const locale = i18n.language === 'fr' ? 'fr-FR' : i18n.language === 'ar' ? 'ar-SA' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isFrench = i18n.language === 'fr';
  const title = post ? (isFrench ? post.title_fr || post.title : post.title) : '';
  const excerpt = post ? (isFrench ? post.excerpt_fr || post.excerpt : post.excerpt) : null;
  const category = post ? (isFrench ? post.category_fr || post.category : post.category) : null;
  const readTime = post ? (isFrench ? post.read_time_fr || post.read_time : post.read_time) : null;
  const seoTitle = post ? (isFrench ? post.seo_title_fr || post.seo_title : post.seo_title) : null;
  const seoDescription = post ? (isFrench ? post.seo_description_fr || post.seo_description : post.seo_description) : null;
  const seoKeywords = post ? (isFrench ? post.seo_keywords_fr || post.seo_keywords : post.seo_keywords) : null;
  const content = post ? (isFrench ? post.content_fr || post.content : post.content) : null;

  // Add Morocco base keywords to post keywords
  const moroccoBaseKeywords = isFrench 
    ? 'SEO Maroc, SEO Casablanca, SEO Rabat, référencement Maroc'
    : 'SEO Morocco, SEO Casablanca, SEO Rabat, SEO Marrakech';
  const finalKeywords = seoKeywords 
    ? `${seoKeywords}, ${moroccoBaseKeywords}`
    : moroccoBaseKeywords;

  if (loading) {
    return (
      <main className="bg-background min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="bg-background min-h-screen">
        <SEO 
          title={t('blog.notFoundTitle') + ' | E-SEOMAX Blog'}
          description="The blog post you're looking for could not be found. Browse our SEO blog for tips on ranking in Morocco."
        />
        <Navbar />
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">{t('blog.notFoundTitle')}</h1>
            <p className="text-muted-foreground mb-8">
              {t('blog.notFoundDescription')}
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('blog.backToBlog')}
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen">
      <SEO 
        title={seoTitle || `${title} | E-SEOMAX Blog Morocco`}
        description={seoDescription || excerpt || `Read ${title} on E-SEOMAX Blog. Expert SEO tips for Morocco.`}
        keywords={finalKeywords}
        image={post.featured_image || 'https://e-seomax.com/og-image.png'}
        type="article"
        publishedTime={post.published_at || undefined}
        modifiedTime={post.updated_at}
        author="E-SEOMAX Team"
        category={category || undefined}
      />
      <Navbar />
      
      <article className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('blog.backToBlog')}
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {category && (
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {category}
              </span>
            )}
            
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground">
              {post.published_at && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                </span>
              )}
              {readTime && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {readTime}
                </span>
              )}
            </div>
          </motion.header>

          {/* Featured Image */}
          {post.featured_image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10"
            >
              <img
                src={post.featured_image}
                alt={title}
                className="w-full h-auto max-h-[500px] object-cover rounded-2xl border border-border"
                loading="eager"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-invert prose-purple max-w-none"
            dangerouslySetInnerHTML={{ __html: content || '' }}
          />
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPost;
