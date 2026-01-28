import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/e-seomax-logo.png';
import { getDirection } from '@/i18n';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = getDirection(i18n.language) === 'rtl';

  const footerLinks = {
    product: [
      { label: t('common.footer.product'), href: '/#features' },
      { label: t('common.footer.howItWorks'), href: '/how-it-works' }
    ],
    company: [
      { label: t('common.nav.about'), href: '/about' },
      { label: t('common.nav.blog'), href: '/blog' },
      { label: t('common.nav.contact'), href: '/contact' }
    ],
    resources: [
      { label: t('common.footer.faq'), href: '/faq' },
      { label: t('common.footer.howItWorks'), href: '/how-it-works' }
    ],
    legal: [
      { label: t('common.footer.privacy'), href: '/privacy-policy' },
      { label: t('common.footer.terms'), href: '/terms-of-service' },
      { label: t('common.footer.cookies'), href: '/cookie-policy' },
      { label: t('common.footer.disclaimer'), href: '/disclaimer' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/eseomax', label: t('common.social.twitter') },
    { icon: Linkedin, href: 'https://linkedin.com/company/eseomax', label: t('common.social.linkedin') },
    { icon: Github, href: 'https://github.com/eseomax', label: t('common.social.github') },
    { icon: Mail, href: 'mailto:hello@e-seomax.com', label: t('common.social.email') }
  ];

  return (
    <footer className="bg-card/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className={`grid grid-cols-2 md:grid-cols-6 gap-8 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
          {/* Brand */}
          <div className={`col-span-2 ${isRTL ? 'md:col-start-5' : ''}`}>
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt={t('common.brand.logoAlt')} className="h-12 w-auto" />
            </Link>
            <p className={`text-muted-foreground text-sm mb-6 max-w-xs ${isRTL ? 'text-right' : ''}`}>
              {t('common.footer.description')}
            </p>
            <div className={`flex gap-3 ${isRTL ? 'justify-end' : ''}`}>
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
              <h4 className={`font-semibold text-foreground mb-4 capitalize ${isRTL ? 'text-right' : ''}`}>{t(`common.footer.${category}`)}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className={`text-sm text-muted-foreground hover:text-primary transition-colors duration-200 ${isRTL ? 'text-right block' : ''}`}
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
        <div className={`mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <p className="text-sm text-muted-foreground">
            {t('common.footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className={`flex items-center gap-6 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              {t('common.footer.privacy')}
            </Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">
              {t('common.footer.terms')}
            </Link>
            <Link to="/cookie-policy" className="hover:text-primary transition-colors">
              {t('common.footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
