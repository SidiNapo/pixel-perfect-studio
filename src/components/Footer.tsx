import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import logo from '@/assets/e-seomax-logo.png';

const footerLinks = {
  product: [
    { label: 'Features', href: '/#features' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/#pricing' }
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' }
  ],
  resources: [
    { label: 'FAQ', href: '/faq' },
    { label: 'How It Works', href: '/how-it-works' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Disclaimer', href: '/disclaimer' }
  ]
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/eseomax', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/eseomax', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/eseomax', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@e-seomax.com', label: 'Email' }
];

const Footer = () => {
  return (
    <footer className="bg-card/30 border-t border-border">
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
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-secondary hover:bg-primary/20 border border-transparent hover:border-primary/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground mb-4 capitalize">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} E-SEOMAX. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="/cookie-policy" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
