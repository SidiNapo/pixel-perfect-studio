import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';
const teamMembers = [{
  name: "Dr. Sarah Chen",
  role: "CEO & Co-Founder",
  bio: "Former Google Search Quality Engineer with 15 years of experience in AI and machine learning.",
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
}, {
  name: "Marcus Rodriguez",
  role: "CTO & Co-Founder",
  bio: "Ex-Amazon principal engineer, specializing in scalable data systems and NLP technologies.",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
}, {
  name: "Emily Zhang",
  role: "Head of AI Research",
  bio: "PhD in Computer Science from MIT, leading our proprietary SEO intelligence algorithms.",
  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
}, {
  name: "David Kim",
  role: "Lead Data Scientist",
  bio: "Former Spotify data lead, expert in predictive analytics and trend forecasting.",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
}];
const stats = [{
  value: 10,
  suffix: "M+",
  label: "Pages Analyzed"
}, {
  value: 5000,
  suffix: "+",
  label: "Happy Clients"
}, {
  value: 98,
  suffix: "%",
  label: "Accuracy Rate"
}, {
  value: 24,
  suffix: "/7",
  label: "Support Available"
}];
function AnimatedCounter({
  value,
  suffix
}: {
  value: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true
  });
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  return <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>;
}
const About = () => {
  return <main className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="absolute inset-0 gradient-purple-radial" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.7
          }}>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Revolutionizing SEO with{' '}
                <span className="text-primary">Artificial Intelligence</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 2024, E-SEOMAX emerged from a simple belief: SEO shouldn't be guesswork. 
                Our team of world-class engineers and data scientists built the most advanced AI-powered 
                SEO platform to give businesses the competitive edge they deserve.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We've analyzed over 10 million web pages, uncovering patterns that human analysts 
                would take years to discover. Our proprietary algorithms process 50,000+ ranking 
                factors in real-time, delivering insights that transform how businesses approach search visibility.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.7,
            delay: 0.2
          }} className="relative">
              <div className="relative rounded-3xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop" alt="E-SEOMAX Team" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              {/* Floating decoration */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-primary/20 border border-primary/30 backdrop-blur-xl animate-float" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-xl bg-primary/30 border border-primary/40 backdrop-blur-xl animate-float-slow" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => <motion.div key={stat.label} initial={{
            opacity: 0,
            scale: 0.8
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="text-center p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              "To democratize access to enterprise-grade SEO intelligence, empowering businesses 
              of all sizes to compete on equal footing in the digital landscape."
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Innovation First', 'Data-Driven', 'Client Success', 'Transparency'].map((value, index) => <motion.span key={value} initial={{
              opacity: 0,
              scale: 0.8
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.3,
              delay: index * 0.1
            }} className="px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
                  {value}
                </motion.span>)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      

      <Footer />
    </main>;
};
export default About;