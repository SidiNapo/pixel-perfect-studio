import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Jennifer Morrison",
    role: "CMO at TechFlow Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content: "E-SEOMAX completely transformed our organic traffic strategy. Within 3 months, we saw a 340% increase in qualified leads. The AI recommendations are incredibly accurate.",
    rating: 5
  },
  {
    name: "Michael Chang",
    role: "Founder of Growth Labs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "As an agency owner, I've tried every SEO tool on the market. Nothing comes close to the depth of analysis E-SEOMAX provides. It's become indispensable for our client work.",
    rating: 5
  },
  {
    name: "Sarah Williams",
    role: "SEO Director at Retail Giant",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content: "The competitor analysis feature alone is worth 10x the subscription. We discovered content gaps that generated $2M in additional revenue last quarter.",
    rating: 5
  },
  {
    name: "David Park",
    role: "VP Marketing at SaaS Co",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    content: "From technical audits to content optimization, E-SEOMAX handles it all. Our team productivity increased by 60% after switching from our previous tool.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Loved by <span className="text-primary">5,000+</span> Teams
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what industry leaders say about E-SEOMAX.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 -left-6 p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <Quote className="w-8 h-8 text-primary" />
            </div>

            <div className="p-8 md:p-12 rounded-3xl bg-card/50 backdrop-blur-sm border border-border">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 rounded-full border-2 border-primary/30"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
