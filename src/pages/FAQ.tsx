import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqCategories = [
  {
    title: "General SEO Questions",
    questions: [
      {
        question: "What is SEO and why is it important for my website?",
        answer: "SEO (Search Engine Optimization) is the practice of optimizing your website to improve its visibility and ranking in search engine results pages (SERPs). It's important because higher rankings lead to more organic traffic, increased brand visibility, better user experience, and ultimately more conversions and revenue. Unlike paid advertising, SEO provides sustainable, long-term results. Studies show that over 90% of online experiences begin with a search engine, and websites on the first page of Google receive the vast majority of clicks, making SEO crucial for online success."
      },
      {
        question: "How long does it take to see results from SEO?",
        answer: "SEO is a long-term strategy, and results typically take 3-6 months to become noticeable, with significant improvements often appearing around 6-12 months. The timeline depends on several factors: your website's current state, competition level in your industry, the quality of your content, your backlink profile, and how consistently you implement SEO best practices. New websites generally take longer than established ones. While some quick wins (like fixing technical issues) can show improvements in weeks, sustainable rankings require ongoing effort and patience."
      },
      {
        question: "What's the difference between on-page and off-page SEO?",
        answer: "On-page SEO refers to optimizations you make directly on your website, including content quality, keyword optimization, meta tags, header structure, internal linking, URL structure, and page load speed. Off-page SEO involves actions taken outside your website to improve rankings, primarily through building high-quality backlinks from other websites, social media marketing, brand mentions, and guest posting. Both are essential for a comprehensive SEO strategy. On-page SEO ensures search engines understand your content, while off-page SEO builds your site's authority and trustworthiness."
      },
      {
        question: "Is SEO better than paid advertising (PPC)?",
        answer: "SEO and PPC serve different purposes and work best together. SEO provides sustainable, long-term traffic at a lower cost-per-acquisition over time, builds brand credibility, and captures users throughout the buying journey. PPC delivers immediate visibility and precise targeting but requires continuous spending. For most businesses, a combined approach is ideal: use PPC for immediate results and testing while building SEO for long-term growth. The best strategy depends on your budget, timeline, and business goals."
      },
      {
        question: "What are keywords and how do I choose the right ones?",
        answer: "Keywords are the words and phrases people type into search engines when looking for information, products, or services. Choosing the right keywords involves understanding your audience's search intent, analyzing search volume and competition, and identifying terms relevant to your business. Effective keyword research includes: targeting a mix of head terms (short, competitive) and long-tail keywords (longer, more specific), focusing on keywords with clear commercial or informational intent, and considering local keywords if you serve specific geographic areas. Tools like Google Keyword Planner, SEMrush, or Ahrefs can help identify valuable keywords."
      }
    ]
  },
  {
    title: "Technical SEO",
    questions: [
      {
        question: "What is technical SEO and why does it matter?",
        answer: "Technical SEO refers to the optimization of your website's infrastructure to help search engines crawl, index, and understand your content more effectively. It includes site speed optimization, mobile-friendliness, SSL security (HTTPS), XML sitemaps, robots.txt configuration, structured data markup, fixing crawl errors, and ensuring proper URL structure. Technical SEO is the foundation of your SEO efforts—without it, even the best content may not rank well. Search engines prioritize websites that provide fast, secure, and accessible experiences for users."
      },
      {
        question: "How important is page speed for SEO?",
        answer: "Page speed is a critical ranking factor for both desktop and mobile searches. Google's Core Web Vitals specifically measure loading performance (Largest Contentful Paint), interactivity (First Input Delay), and visual stability (Cumulative Layout Shift). Slow-loading pages lead to higher bounce rates—studies show that 53% of mobile users abandon sites that take over 3 seconds to load. To improve speed, optimize images, enable compression, leverage browser caching, minimize JavaScript and CSS, use a CDN, and consider upgrading your hosting. Aim for a page load time under 3 seconds."
      },
      {
        question: "What is mobile-first indexing?",
        answer: "Mobile-first indexing means Google predominantly uses the mobile version of your website for indexing and ranking. Since the majority of searches now come from mobile devices, Google prioritizes mobile user experience. To succeed with mobile-first indexing: ensure your mobile and desktop sites have the same content, use responsive design, optimize images for mobile, ensure text is readable without zooming, make buttons and links easy to tap, and avoid intrusive pop-ups. Use Google's Mobile-Friendly Test tool to check your site's mobile compatibility."
      },
      {
        question: "What are Core Web Vitals?",
        answer: "Core Web Vitals are a set of specific metrics Google uses to measure user experience. They include: Largest Contentful Paint (LCP) - measures loading performance, should occur within 2.5 seconds; First Input Delay (FID) - measures interactivity, should be less than 100 milliseconds; and Cumulative Layout Shift (CLS) - measures visual stability, should be less than 0.1. These metrics became official ranking factors in 2021. You can measure your Core Web Vitals using Google Search Console, PageSpeed Insights, or Lighthouse. Improving these metrics involves optimizing server response time, eliminating render-blocking resources, and properly sizing images."
      },
      {
        question: "How do I fix crawl errors and broken links?",
        answer: "Crawl errors occur when search engines can't access pages on your site. To fix them: regularly audit your site using Google Search Console to identify errors, set up proper 301 redirects for moved or deleted pages, fix broken internal and external links, ensure your robots.txt doesn't block important pages, check that your sitemap is updated and properly formatted, and verify your server returns correct HTTP status codes. For broken links specifically, use tools like Screaming Frog or Ahrefs to find them, then either update the links to correct URLs or remove them if the destination no longer exists."
      }
    ]
  },
  {
    title: "Content & Keywords",
    questions: [
      {
        question: "How do I create SEO-friendly content?",
        answer: "Creating SEO-friendly content involves several key practices: Start with thorough keyword research to understand what your audience is searching for. Create comprehensive, valuable content that answers user questions and solves problems. Use your target keyword in the title, first paragraph, headers, and naturally throughout the content. Write compelling meta titles and descriptions. Structure content with proper heading hierarchy (H1, H2, H3). Include internal links to related content and external links to authoritative sources. Add optimized images with descriptive alt text. Aim for content that's better and more thorough than what currently ranks—focus on user value first, optimization second."
      },
      {
        question: "What is keyword stuffing and why should I avoid it?",
        answer: "Keyword stuffing is the practice of overloading a webpage with keywords in an attempt to manipulate search rankings. This includes repeating keywords excessively, using hidden text, or adding irrelevant keywords. Google's algorithms can easily detect keyword stuffing and will penalize sites that engage in this practice. Instead, focus on writing naturally for your audience while strategically placing keywords where they make sense. Use synonyms and related terms (LSI keywords) to demonstrate topical relevance. A good rule of thumb is to read your content aloud—if it sounds unnatural or repetitive, you're likely over-optimizing."
      },
      {
        question: "How often should I publish new content?",
        answer: "There's no one-size-fits-all answer, but consistency matters more than frequency. It's better to publish one high-quality, comprehensive article per week than several low-quality posts daily. Consider your resources, industry, and competition. Some successful strategies include: publishing 2-4 blog posts monthly for most businesses, updating existing content regularly to keep it fresh, creating evergreen content that remains relevant over time, and developing a content calendar based on keyword research and seasonal trends. Focus on creating content that genuinely helps your audience rather than hitting arbitrary publishing quotas."
      },
      {
        question: "What is search intent and why is it important?",
        answer: "Search intent (or user intent) is the reason behind a user's search query—what they're trying to accomplish. There are four main types: Informational (seeking information, e.g., 'how to tie a tie'), Navigational (looking for a specific website, e.g., 'Facebook login'), Commercial (researching before buying, e.g., 'best laptops 2026'), and Transactional (ready to purchase, e.g., 'buy iPhone 15 Pro'). Understanding search intent is crucial because Google prioritizes content that matches what users want. If you target a keyword but your content doesn't match the intent, you won't rank well regardless of other optimizations. Always analyze the current top-ranking pages for a keyword to understand the expected content format and type."
      },
      {
        question: "Should I focus on long-tail or short-tail keywords?",
        answer: "A balanced approach targeting both is ideal. Short-tail keywords (1-2 words) have high search volume but are very competitive and often have vague intent. Long-tail keywords (3+ words) have lower search volume but are less competitive, more specific, and often indicate higher purchase intent. For most websites, especially newer ones, focusing primarily on long-tail keywords is smart because: they're easier to rank for, they attract more qualified traffic, they often have better conversion rates, and they help you build topical authority. As your site gains authority, you can target more competitive short-tail keywords."
      }
    ]
  },
  {
    title: "Link Building",
    questions: [
      {
        question: "What are backlinks and why are they important?",
        answer: "Backlinks are links from other websites pointing to your site. They're crucial for SEO because search engines view them as 'votes of confidence'—when reputable sites link to you, it signals that your content is valuable and trustworthy. Not all backlinks are equal; quality matters more than quantity. A single link from a high-authority, relevant website can be worth more than dozens of links from low-quality sites. Key factors include the linking site's authority, relevance to your niche, anchor text used, and whether the link is follow or nofollow. Building a natural, diverse backlink profile is essential for ranking competitively."
      },
      {
        question: "How can I build backlinks ethically?",
        answer: "Ethical (white-hat) link building focuses on earning links through value creation: Create exceptional content that people naturally want to link to (linkable assets like research, infographics, tools, or comprehensive guides). Guest post on reputable industry websites with valuable, non-promotional content. Build relationships with industry peers, influencers, and journalists. Participate in industry communities and forums helpfully. Create newsworthy content that earns media coverage. Fix broken links on other sites by offering your content as a replacement. Develop tools, calculators, or resources others find useful. The key is focusing on genuine value rather than manipulative tactics."
      },
      {
        question: "What are toxic backlinks and how do I remove them?",
        answer: "Toxic backlinks are low-quality or spammy links that can harm your site's rankings. They often come from link farms, adult sites, irrelevant foreign sites, private blog networks (PBNs), or sites penalized by Google. To identify toxic links, use tools like Google Search Console, Ahrefs, or SEMrush to analyze your backlink profile. Look for links from suspicious sources, sites with low domain authority, or those with unnatural anchor text patterns. To remove them, first contact the linking site's webmaster requesting removal. If that fails, use Google's Disavow Tool to tell Google to ignore those links. Be careful—only disavow clearly harmful links, as over-disavowing can hurt your rankings."
      },
      {
        question: "What is the difference between dofollow and nofollow links?",
        answer: "Dofollow links pass 'link juice' (PageRank value) to the linked page, helping it rank higher. These are the traditional links that directly influence SEO. Nofollow links include a rel='nofollow' attribute that tells search engines not to pass ranking credit. Common sources include social media, forums, comments, and sponsored content. While nofollow links don't directly boost rankings, they're still valuable: they diversify your link profile (which looks natural), drive referral traffic, increase brand visibility, and can lead to dofollow links. Additionally, Google now treats nofollow as a 'hint' rather than a directive, meaning some nofollow links may pass value."
      }
    ]
  },
  {
    title: "E-SEOMAX Platform",
    questions: [
      {
        question: "What is E-SEOMAX and how does it work?",
        answer: "E-SEOMAX is an AI-powered SEO analysis platform designed to help website owners, marketers, and businesses improve their search engine visibility. Our tool analyzes your website across multiple SEO factors—including technical issues, on-page optimization, content quality, and performance metrics—and provides actionable recommendations for improvement. Simply enter your website URL, and our AI will crawl and evaluate your site, generating a comprehensive SEO score and detailed report highlighting areas for improvement with step-by-step guidance."
      },
      {
        question: "How accurate is the E-SEOMAX SEO analysis?",
        answer: "Our SEO analysis is based on industry best practices, current search engine guidelines, and proprietary AI algorithms trained on extensive SEO data. While we strive for accuracy, it's important to understand that SEO is not an exact science—search engines use hundreds of ranking factors, many of which are not publicly disclosed. Our analysis provides a strong foundation for improvement, but results may vary. We recommend using our insights alongside other tools and professional consultation for complex SEO projects. We continuously update our algorithms to reflect the latest search engine changes."
      },
      {
        question: "Is my website data secure with E-SEOMAX?",
        answer: "Yes, we take data security seriously. We use industry-standard encryption (HTTPS/SSL) for all data transmission. Your website URLs and analysis results are processed securely and not shared with third parties. We do not store sensitive login credentials, and all data is handled in compliance with GDPR and other privacy regulations. For detailed information, please review our Privacy Policy. If you have specific security concerns, please contact our support team."
      },
      {
        question: "Can E-SEOMAX help me rank #1 on Google?",
        answer: "While E-SEOMAX provides powerful tools and insights to improve your SEO, we cannot guarantee any specific rankings. Achieving top positions depends on many factors beyond SEO analysis, including competition level, content quality, backlink profile, domain age and authority, and search engine algorithm changes. What we can do is identify issues holding your site back, provide actionable recommendations based on best practices, and help you make data-driven decisions. Consistent implementation of good SEO practices over time is the most reliable path to improved rankings."
      },
      {
        question: "Do you offer customer support?",
        answer: "Yes! We offer customer support through multiple channels. You can reach us via email at support@e-seomax.com for general inquiries. Our Help Center contains extensive documentation, tutorials, and guides. For faster responses, Pro and Enterprise plan users have access to priority support and live chat. We typically respond to all inquiries within 24-48 hours during business days. We're committed to helping you succeed with your SEO efforts."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about SEO, our platform, and how to improve your website's search visibility.
            </p>
          </motion.div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-6 pb-2 border-b border-border">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="bg-card/50 border border-border rounded-lg px-6 data-[state=open]:bg-card/80"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:text-primary py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center p-8 bg-card/50 border border-border rounded-xl"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
