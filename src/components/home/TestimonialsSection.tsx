import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
const testimonials = [{
  name: "Jennifer Morrison",
  role: "CMO at TechFlow Inc.",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  content: "E-SEOMAX completely transformed our organic traffic strategy. Within 3 months, we saw a 340% increase in qualified leads. The AI recommendations are incredibly accurate.",
  rating: 5
}, {
  name: "Michael Chang",
  role: "Founder of Growth Labs",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  content: "As an agency owner, I've tried every SEO tool on the market. Nothing comes close to the depth of analysis E-SEOMAX provides. It's become indispensable for our client work.",
  rating: 5
}, {
  name: "Sarah Williams",
  role: "SEO Director at Retail Giant",
  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  content: "The competitor analysis feature alone is worth 10x the subscription. We discovered content gaps that generated $2M in additional revenue last quarter.",
  rating: 5
}, {
  name: "David Park",
  role: "VP Marketing at SaaS Co",
  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  content: "From technical audits to content optimization, E-SEOMAX handles it all. Our team productivity increased by 60% after switching from our previous tool.",
  rating: 5
}];
const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };
  return;
};
export default TestimonialsSection;