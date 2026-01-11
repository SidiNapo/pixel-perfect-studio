import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Linkedin, Twitter, Target, Zap, Shield, TrendingUp, Users, Award, Globe, BarChart3, Search, Brain, Lightbulb, Rocket, CheckCircle } from 'lucide-react';

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former Google Search Quality Engineer with 15 years of experience in AI and machine learning. Sarah led the development of core ranking algorithms that serve billions of searches daily.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Ex-Amazon principal engineer, specializing in scalable data systems and NLP technologies. Marcus architected systems processing petabytes of search data.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Emily Zhang",
    role: "Head of AI Research",
    bio: "PhD in Computer Science from MIT, leading our proprietary SEO intelligence algorithms. Emily has published over 30 papers on machine learning and information retrieval.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "David Kim",
    role: "Lead Data Scientist",
    bio: "Former Spotify data lead, expert in predictive analytics and trend forecasting. David brings expertise in understanding user behavior patterns at scale.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  }
];

const stats = [
  { value: 10, suffix: "M+", label: "Pages Analyzed Monthly" },
  { value: 5000, suffix: "+", label: "Happy Clients Worldwide" },
  { value: 98, suffix: "%", label: "Client Satisfaction Rate" },
  { value: 24, suffix: "/7", label: "Expert Support Available" }
];

const coreValues = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We constantly push the boundaries of what's possible with AI and machine learning, delivering cutting-edge SEO solutions that keep our clients ahead of the competition."
  },
  {
    icon: Target,
    title: "Data-Driven Excellence",
    description: "Every recommendation we make is backed by comprehensive data analysis. We believe in measurable results and transparent reporting for all our clients."
  },
  {
    icon: Users,
    title: "Client Success Focus",
    description: "Your success is our success. We work as an extension of your team, providing personalized strategies that align with your unique business goals."
  },
  {
    icon: Shield,
    title: "Ethical SEO Practices",
    description: "We only use white-hat SEO techniques that build sustainable, long-term rankings. No shortcuts, no black-hat tactics – just honest, effective optimization."
  }
];

const seoServices = [
  {
    icon: Search,
    title: "Technical SEO Audit",
    description: "Comprehensive analysis of your website's technical infrastructure, including site speed, mobile optimization, crawlability, and indexation issues."
  },
  {
    icon: Brain,
    title: "AI-Powered Content Optimization",
    description: "Leverage our proprietary AI algorithms to optimize your content for search engines while maintaining natural, engaging writing for your audience."
  },
  {
    icon: BarChart3,
    title: "Rank Tracking & Analytics",
    description: "Real-time monitoring of your keyword rankings across search engines with detailed analytics and competitive benchmarking."
  },
  {
    icon: Globe,
    title: "International SEO",
    description: "Expand your global reach with multi-language and multi-region SEO strategies tailored to different markets and search behaviors."
  },
  {
    icon: TrendingUp,
    title: "Link Building Intelligence",
    description: "Strategic link acquisition powered by AI that identifies high-quality opportunities and builds authoritative backlink profiles."
  },
  {
    icon: Rocket,
    title: "Competitor Analysis",
    description: "Deep-dive analysis of your competitors' SEO strategies, uncovering opportunities and gaps you can exploit for better rankings."
  }
];

const milestones = [
  { year: "2020", title: "Company Founded", description: "E-SEOMAX was born from a vision to democratize enterprise-grade SEO tools for businesses of all sizes." },
  { year: "2021", title: "AI Engine Launch", description: "Released our first AI-powered SEO recommendation engine, processing over 50,000 ranking factors." },
  { year: "2022", title: "Global Expansion", description: "Expanded operations to serve clients in 50+ countries with localized SEO strategies." },
  { year: "2023", title: "1 Million Pages Milestone", description: "Reached the milestone of analyzing over 1 million web pages monthly for our clients." },
  { year: "2024", title: "Next-Gen AI Platform", description: "Launched our revolutionary AI platform with predictive ranking algorithms and real-time optimization." }
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const About = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="absolute inset-0 gradient-purple-radial" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                About E-SEOMAX
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Revolutionizing SEO with{' '}
                <span className="text-primary">Artificial Intelligence</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 2020, E-SEOMAX emerged from a simple yet powerful belief: SEO shouldn't be guesswork. 
                Our team of world-class engineers, data scientists, and SEO experts came together to build the most 
                advanced AI-powered SEO platform ever created, giving businesses of all sizes the competitive edge they deserve.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We've analyzed over 10 million web pages, uncovering patterns and insights that human analysts 
                would take years to discover. Our proprietary algorithms process 50,000+ ranking factors in real-time, 
                delivering actionable insights that transform how businesses approach search visibility and digital marketing.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, E-SEOMAX serves over 5,000 clients worldwide, from ambitious startups to Fortune 500 companies, 
                helping them achieve and maintain top search rankings through the power of artificial intelligence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
                  alt="E-SEOMAX Team collaborating on AI-powered SEO solutions"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-primary/20 border border-primary/30 backdrop-blur-xl animate-float" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-xl bg-primary/30 border border-primary/40 backdrop-blur-xl animate-float-slow" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose E-SEOMAX Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              The E-SEOMAX <span className="text-primary">Advantage</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              What sets E-SEOMAX apart from traditional SEO tools and agencies? Our unique combination of 
              cutting-edge AI technology, deep industry expertise, and unwavering commitment to client success.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                alt="Advanced SEO analytics dashboard showing real-time data"
                className="rounded-2xl w-full h-auto shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                AI-Powered SEO Intelligence That Delivers Results
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our proprietary AI engine analyzes millions of data points across the web, identifying patterns 
                and opportunities that human analysts would miss. From technical SEO audits to content optimization 
                and link building strategies, every recommendation is backed by comprehensive data analysis.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time ranking updates and competitive monitoring",
                  "Predictive analytics for search trend forecasting",
                  "Automated technical SEO issue detection and fixes",
                  "Content optimization with semantic analysis",
                  "Intelligent link opportunity identification"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 order-2 lg:order-1"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Enterprise-Grade Technology, Accessible to All
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe every business deserves access to the same powerful SEO tools used by industry giants. 
                Our platform democratizes enterprise-grade SEO intelligence, making sophisticated analysis and 
                optimization accessible to startups, small businesses, and agencies alike.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're a solo entrepreneur looking to improve your website's visibility or a large 
                corporation managing hundreds of domains, E-SEOMAX scales to meet your needs with customizable 
                solutions and dedicated support.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Zap, label: "Fast Analysis" },
                  { icon: Shield, label: "Secure Platform" },
                  { icon: Globe, label: "Global Reach" },
                  { icon: Award, label: "Award-Winning" }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border"
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt="Team analyzing SEO performance metrics on multiple screens"
                className="rounded-2xl w-full h-auto shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Our Values
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              What Drives <span className="text-primary">Our Team</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our core values shape everything we do, from product development to customer service. 
              These principles guide our decisions and define our company culture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Our Services
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Comprehensive SEO <span className="text-primary">Solutions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From technical audits to content strategy, we offer a complete suite of AI-powered SEO services 
              designed to improve your search visibility and drive organic growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seoServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Building the Future of <span className="text-primary">SEO</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From a small startup to an industry leader, our journey has been defined by innovation, 
              growth, and an unwavering commitment to excellence.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 last:mb-0 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                  <div className="p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300">
                    <span className="text-primary font-bold text-lg">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-foreground mt-2 mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Democratizing SEO Intelligence
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              "To democratize access to enterprise-grade SEO intelligence, empowering businesses 
              of all sizes to compete on equal footing in the digital landscape. We believe that 
              every business deserves the tools and insights needed to succeed in search."
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Our platform combines the power of artificial intelligence with deep SEO expertise 
              to deliver actionable insights that drive real results. We're not just building tools – 
              we're building the future of search engine optimization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Our Team
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Meet the <span className="text-primary">Experts</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our leadership team brings together decades of experience from the world's top technology 
              companies, united by a shared passion for innovation and excellence in SEO.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6 rounded-2xl overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role} at E-SEOMAX`}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="#" className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your SEO Strategy?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using E-SEOMAX to dominate search rankings. 
              Start your free trial today and experience the power of AI-driven SEO.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Started Free
              </a>
              <a
                href="/blog"
                className="px-8 py-4 rounded-xl bg-secondary text-foreground border border-border font-semibold hover:border-primary/50 transition-colors"
              >
                Read Our Blog
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
