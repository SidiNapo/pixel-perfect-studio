import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import logo from '@/assets/e-seomax-logo.png';
const footerLinks = {
  product: [{
    label: 'Features',
    href: '/#features'
  }, {
    label: 'Pricing',
    href: '/#pricing'
  }, {
    label: 'API',
    href: '#'
  }, {
    label: 'Integrations',
    href: '#'
  }],
  company: [{
    label: 'About Us',
    href: '/about'
  }, {
    label: 'Blog',
    href: '/blog'
  }, {
    label: 'Careers',
    href: '#'
  }, {
    label: 'Contact',
    href: '/contact'
  }],
  resources: [{
    label: 'Documentation',
    href: '#'
  }, {
    label: 'Help Center',
    href: '#'
  }, {
    label: 'Community',
    href: '#'
  }, {
    label: 'Status',
    href: '#'
  }],
  legal: [{
    label: 'Privacy',
    href: '#'
  }, {
    label: 'Terms',
    href: '#'
  }, {
    label: 'Security',
    href: '#'
  }, {
    label: 'Cookies',
    href: '#'
  }]
};
const socialLinks = [{
  icon: Twitter,
  href: '#',
  label: 'Twitter'
}, {
  icon: Linkedin,
  href: '#',
  label: 'LinkedIn'
}, {
  icon: Github,
  href: '#',
  label: 'GitHub'
}, {
  icon: Mail,
  href: 'mailto:hello@e-seomax.com',
  label: 'Email'
}];
const Footer = () => {
  return <footer className="bg-card/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="E-SEOMAX" className="h-12 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              The most advanced AI-powered SEO platform. Analyze, optimize, and dominate search results.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(social => <a key={social.label} href={social.href} className="p-2.5 rounded-lg bg-secondary hover:bg-primary/20 border border-transparent hover:border-primary/30 transition-all duration-300" aria-label={social.label}>
                  <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary" />
                </a>)}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => <div key={category}>
              <h4 className="font-semibold text-foreground mb-4 capitalize">{category}</h4>
              <ul className="space-y-3">
                {links.map(link => <li key={link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>)}
              </ul>
            </div>)}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 E-SEOMAX. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;