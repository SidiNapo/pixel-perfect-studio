import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in SEO: What 2026 Holds",
    excerpt: "Discover how artificial intelligence is reshaping search engine optimization and what strategies will dominate the coming years.",
    category: "AI",
    date: "Jan 8, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Google's 2026 Core Update: Everything You Need to Know",
    excerpt: "A comprehensive breakdown of the latest algorithm changes and how to adapt your SEO strategy for maximum visibility.",
    category: "Algorithm",
    date: "Jan 5, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Mastering Technical SEO: A Complete Guide",
    excerpt: "From site speed to structured data, learn the technical foundations that will boost your rankings significantly.",
    category: "Tutorial",
    date: "Jan 3, 2026",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Content Strategy That Ranks: Beyond Keywords",
    excerpt: "Modern SEO demands more than keyword stuffing. Explore semantic search and user intent optimization.",
    category: "Content",
    date: "Dec 28, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Link Building in 2026: Quality Over Quantity",
    excerpt: "The definitive guide to earning high-authority backlinks that actually move the needle for your domain.",
    category: "Link Building",
    date: "Dec 22, 2025",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Voice Search Optimization: The Untapped Opportunity",
    excerpt: "With voice assistants everywhere, optimizing for conversational queries is no longer optional.",
    category: "Voice SEO",
    date: "Dec 18, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&h=400&fit=crop"
  }
];

const Blog = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="absolute inset-0 gradient-purple-radial" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Insights & Updates
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              The E-SEOMAX <span className="text-primary">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay ahead of the curve with expert insights, industry trends, and actionable SEO strategies from our team of specialists.
            </p>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-4 rounded-xl bg-primary/10 border border-primary/30 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Load More Articles
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Blog;
