import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import GoogleSearchPreview from '@/components/admin/GoogleSearchPreview';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  title_fr: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().optional(),
  excerpt_fr: z.string().optional(),
  content: z.string().optional(),
  content_fr: z.string().optional(),
  featured_image: z.string().optional(),
  category: z.string().optional(),
  category_fr: z.string().optional(),
  seo_title: z.string().optional(),
  seo_title_fr: z.string().optional(),
  seo_description: z.string().optional(),
  seo_description_fr: z.string().optional(),
  seo_keywords: z.string().optional(),
  seo_keywords_fr: z.string().optional(),
  canonical_url: z.string().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

const categories = ['AI', 'Tutorial', 'Algorithm', 'Content', 'Link Building', 'Voice SEO', 'Technical'];

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const isEditing = Boolean(id && id !== 'new');

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      title_fr: '',
      slug: '',
      excerpt: '',
      excerpt_fr: '',
      content: '',
      content_fr: '',
      featured_image: '',
      category: '',
      category_fr: '',
      seo_title: '',
      seo_title_fr: '',
      seo_description: '',
      seo_description_fr: '',
      seo_keywords: '',
      seo_keywords_fr: '',
      canonical_url: '',
    },
  });

  const { watch, setValue } = form;
  const title = watch('title');
  const seoTitle = watch('seo_title') || '';
  const seoDescription = watch('seo_description') || '';
  const slug = watch('slug');

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditing && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', generatedSlug);
    }
  }, [title, isEditing, setValue]);

  // Fetch existing post
  useEffect(() => {
    if (isEditing && id) {
      fetchPost(id);
    }
  }, [id, isEditing]);

  const fetchPost = async (postId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load post.',
      });
      navigate('/admin/posts');
    } else if (data) {
      // Cast to any to handle columns not yet in generated types
      const postData = data as Record<string, unknown>;
      form.reset({
        title: postData.title as string,
        title_fr: (postData.title_fr as string) || '',
        slug: postData.slug as string,
        excerpt: (postData.excerpt as string) || '',
        excerpt_fr: (postData.excerpt_fr as string) || '',
        content: (postData.content as string) || '',
        content_fr: (postData.content_fr as string) || '',
        featured_image: (postData.featured_image as string) || '',
        category: (postData.category as string) || '',
        category_fr: (postData.category_fr as string) || '',
        seo_title: (postData.seo_title as string) || '',
        seo_title_fr: (postData.seo_title_fr as string) || '',
        seo_description: (postData.seo_description as string) || '',
        seo_description_fr: (postData.seo_description_fr as string) || '',
        seo_keywords: (postData.seo_keywords as string) || '',
        seo_keywords_fr: (postData.seo_keywords_fr as string) || '',
        canonical_url: (postData.canonical_url as string) || '',
      });
    }
    setLoading(false);
  };

  const savePost = async (data: PostFormData, status: 'draft' | 'published') => {
    const isPublishing = status === 'published';
    if (isPublishing) {
      setPublishing(true);
    } else {
      setSaving(true);
    }

    const postData = {
      title: data.title,
      title_fr: data.title_fr || null,
      slug: data.slug,
      excerpt: data.excerpt || null,
      excerpt_fr: data.excerpt_fr || null,
      content: data.content || null,
      content_fr: data.content_fr || null,
      featured_image: data.featured_image || null,
      category: data.category || null,
      category_fr: data.category_fr || null,
      seo_title: data.seo_title || null,
      seo_title_fr: data.seo_title_fr || null,
      seo_description: data.seo_description || null,
      seo_description_fr: data.seo_description_fr || null,
      seo_keywords: data.seo_keywords || null,
      seo_keywords_fr: data.seo_keywords_fr || null,
      canonical_url: data.canonical_url || null,
      status,
      author_id: user?.id || null,
      published_at: status === 'published' ? new Date().toISOString() : null,
    };

    let result;
    if (isEditing && id) {
      result = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();
    }

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error.message,
      });
    } else {
      toast({
        title: 'Success',
        description: isPublishing ? 'Post published!' : 'Post saved as draft.',
      });
      navigate('/admin/posts');
    }

    if (isPublishing) {
      setPublishing(false);
    } else {
      setSaving(false);
    }
  };

  const onSave = form.handleSubmit((data) => savePost(data, 'draft'));
  const onPublish = form.handleSubmit((data) => savePost(data, 'published'));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin/posts')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">
              {isEditing ? 'Edit Post' : 'New Post'}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onSave}
              disabled={saving || publishing}
              className="border-border"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Draft
            </Button>
            <Button
              onClick={onPublish}
              disabled={saving || publishing}
              className="bg-primary hover:bg-primary/90"
            >
              {publishing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Publish
            </Button>
          </div>
        </div>
      </header>

      {/* Form */}
      <Form {...form}>
        <form className="p-6 lg:p-8">
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="bg-secondary border border-border">
              <TabsTrigger value="content" className="data-[state=active]:bg-card">
                Content & General
              </TabsTrigger>
              <TabsTrigger value="seo" className="data-[state=active]:bg-card">
                SEO & Metadata
              </TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-3 gap-6"
              >
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter post title..."
                            className="bg-input border-border focus:border-primary text-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Slug</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <span className="px-3 py-2 bg-secondary border border-r-0 border-border rounded-l-md text-muted-foreground text-sm">
                              /blog/
                            </span>
                            <Input
                              {...field}
                              placeholder="post-slug"
                              className="bg-input border-border focus:border-primary rounded-l-none"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Excerpt</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Brief summary of the post..."
                            className="bg-input border-border focus:border-primary resize-none"
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Content</FormLabel>
                        <FormControl>
                          <RichTextEditor
                            value={field.value || ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-base font-semibold text-foreground mb-4">
                      French Translation (optional)
                    </h3>
                    <div className="space-y-5">
                      <FormField
                        control={form.control}
                        name="title_fr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Title (FR)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Titre en français..."
                                className="bg-input border-border focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="excerpt_fr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Excerpt (FR)</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Résumé en français..."
                                className="bg-input border-border focus:border-primary resize-none"
                                rows={3}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="content_fr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Content (FR)</FormLabel>
                            <FormControl>
                              <RichTextEditor
                                value={field.value || ''}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <FormField
                      control={form.control}
                      name="featured_image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Featured Image</FormLabel>
                          <FormControl>
                            <ImageUpload
                              value={field.value || ''}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-card border border-border rounded-xl p-5">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Category</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-input border-border">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border-border">
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="mt-5 pt-5 border-t border-border">
                      <FormField
                        control={form.control}
                        name="category_fr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Category (FR)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Catégorie en français..."
                                className="bg-input border-border focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-6"
              >
                {/* SEO Fields */}
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Search Engine Optimization
                    </h3>

                    <div className="space-y-5">
                      <FormField
                        control={form.control}
                        name="seo_title"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel className="text-foreground">SEO Title</FormLabel>
                              <span className={`text-xs ${(field.value?.length || 0) > 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
                                {field.value?.length || 0}/60
                              </span>
                            </div>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Optimized title for search engines"
                                className="bg-input border-border focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="seo_title_fr"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel className="text-foreground">SEO Title (FR)</FormLabel>
                              <span className={`text-xs ${(field.value?.length || 0) > 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
                                {field.value?.length || 0}/60
                              </span>
                            </div>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Titre optimisé (FR)"
                                className="bg-input border-border focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="seo_description"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel className="text-foreground">SEO Description</FormLabel>
                              <span className={`text-xs ${(field.value?.length || 0) > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                                {field.value?.length || 0}/160
                              </span>
                            </div>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Meta description for search results..."
                                className="bg-input border-border focus:border-primary resize-none"
                                rows={3}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="seo_description_fr"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel className="text-foreground">SEO Description (FR)</FormLabel>
                              <span className={`text-xs ${(field.value?.length || 0) > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                                {field.value?.length || 0}/160
                              </span>
                            </div>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Meta description (FR)..."
                                className="bg-input border-border focus:border-primary resize-none"
                                rows={3}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="seo_keywords"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Keywords</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="seo, ranking, google, optimization"
                                className="bg-input border-border focus:border-primary"
                              />
                            </FormControl>
                            <p className="text-xs text-muted-foreground mt-1">
                              Comma-separated keywords
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="seo_keywords_fr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Keywords (FR)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="seo, classement, google, optimisation"
                                className="bg-input border-border focus:border-primary"
                              />
                            </FormControl>
                            <p className="text-xs text-muted-foreground mt-1">
                              Comma-separated keywords
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="canonical_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Canonical URL</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="https://yoursite.com/original-post"
                                className="bg-input border-border focus:border-primary"
                              />
                            </FormControl>
                            <p className="text-xs text-muted-foreground mt-1">
                              Leave empty to use the post URL
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Search Preview
                    </h3>
                    <GoogleSearchPreview
                      title={seoTitle || title}
                      description={seoDescription}
                      url={`https://e-seomax.com/blog/${slug}`}
                    />
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      SEO Tips
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Keep your title under 60 characters for optimal display
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Meta descriptions should be 150-160 characters
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Include your primary keyword early in the title
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Use action words to improve click-through rates
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default PostEditor;
