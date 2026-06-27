import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from 'react';

const faqs = [
  {
    question: "What is an AI-powered SEO audit and how does it work?",
    answer: "An AI-powered SEO audit uses advanced machine learning algorithms to crawl your website like a search engine would. It automatically identifies technical issues, analyzes on-page optimization, checks for broken links, evaluates mobile responsiveness, and scores your content against top-ranking competitors. Unlike manual audits, our AI instantly processes hundreds of ranking factors to give you actionable, data-driven recommendations.",
  },
  {
    question: "Why do I need a free word counter for my SEO strategy?",
    answer: "Word count directly correlates with content depth and search engine rankings. Our free word counter helps you calculate exactly how long your articles are, ensuring you hit the optimal length for your target keywords. Additionally, tracking keyword density prevents keyword stuffing—a practice that can trigger Google penalties. A precise word counter is an essential micro-tool for any content creator.",
  },
  {
    question: "How important are backlinks, and how does your checker help?",
    answer: "Backlinks act as 'votes of confidence' from other websites to yours. They are one of Google's top three ranking factors. Our free backlink checker allows you to instantly see who is linking to your domain, evaluate the domain authority of those links, and identify potentially toxic links that could harm your rankings. Spying on competitor backlinks also reveals lucrative link-building opportunities.",
  },
  {
    question: "Can I use E-SEOMAX tools for free?",
    answer: "Yes, E-SEOMAX provides a comprehensive suite of free AI-powered micro-tools including our instant SEO audit analyzer, word counter, and backlink checker. Our mission is to make enterprise-level search engine optimization technology accessible to digital marketers, bloggers, and businesses worldwide without requiring expensive monthly SaaS subscriptions.",
  },
  {
    question: "How often should I audit my website's SEO?",
    answer: "We recommend running a technical SEO audit at least once a month, or immediately after making significant structural changes to your website. Frequent audits ensure that new content is properly indexed, broken links are caught early, and your site remains compliant with Google's ever-evolving core algorithm updates.",
  }
];

const HomeFAQ = () => {
  useEffect(() => {
    // Generate FAQPage structured data schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-faq-schema', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[data-faq-schema]');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about our global AI-powered SEO micro-tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeFAQ;
