import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MessageCircle, Twitter, MapPin, Phone, Send } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@e-seomax.com",
    description: "We'll respond within 24 hours"
  },
  {
    icon: MessageCircle,
    label: "Discord Community",
    value: "discord.gg/eseomax",
    description: "Join 5,000+ SEO professionals"
  },
  {
    icon: Twitter,
    label: "Twitter",
    value: "@eseomax",
    description: "Follow for daily SEO tips"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri, 9am-6pm EST"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="bg-background min-h-screen relative">
      <Navbar />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Let's Start a <span className="text-primary">Conversation</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our platform? Want to discuss enterprise solutions? 
              We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Reach Out Directly
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                      <p className="text-primary font-medium">{item.value}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Headquarters</h3>
                </div>
                <p className="text-muted-foreground">
                  123 Innovation Drive, Suite 500<br />
                  San Francisco, CA 94107<br />
                  United States
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                {/* Glow effect behind form */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl" />
                
                <form
                  onSubmit={handleSubmit}
                  className="relative p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-border"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Send us a Message
                  </h2>

                  <div className="space-y-6">
                    {/* Name Field */}
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-4 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder-transparent peer"
                        placeholder="Your Name"
                        required
                      />
                      <label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          formData.name || focusedField === 'name'
                            ? 'top-1 text-xs text-primary'
                            : 'top-4 text-muted-foreground'
                        }`}
                      >
                        Your Name
                      </label>
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-4 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder-transparent peer"
                        placeholder="Email Address"
                        required
                      />
                      <label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          formData.email || focusedField === 'email'
                            ? 'top-1 text-xs text-primary'
                            : 'top-4 text-muted-foreground'
                        }`}
                      >
                        Email Address
                      </label>
                    </div>

                    {/* Subject Field */}
                    <div className="relative">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-4 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder-transparent peer"
                        placeholder="Subject"
                        required
                      />
                      <label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          formData.subject || focusedField === 'subject'
                            ? 'top-1 text-xs text-primary'
                            : 'top-4 text-muted-foreground'
                        }`}
                      >
                        Subject
                      </label>
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={5}
                        className="w-full px-4 py-4 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder-transparent peer resize-none"
                        placeholder="Your Message"
                        required
                      />
                      <label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          formData.message || focusedField === 'message'
                            ? 'top-1 text-xs text-primary'
                            : 'top-4 text-muted-foreground'
                        }`}
                      >
                        Your Message
                      </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-300"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
