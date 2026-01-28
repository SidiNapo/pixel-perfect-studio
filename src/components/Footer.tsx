import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/e-seomax-logo.png';
import { getDirection } from '@/i18n';
const Footer = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const isRTL = getDirection(i18n.language) === 'rtl';
  const footerLinks = {
    product: [{
      label: t('common.footer.product'),
      href: '/#features'
    }, {
      label: t('common.footer.howItWorks'),
      href: '/how-it-works'
    }, {
      label: t('common.footer.pricing'),
      href: '/#pricing'
    }],
    company: [{
      label: t('common.nav.about'),
      href: '/about'
    }, {
      label: t('common.nav.blog'),
      href: '/blog'
    }, {
      label: t('common.nav.contact'),
      href: '/contact'
    }],
    resources: [{
      label: t('common.footer.faq'),
      href: '/faq'
    }, {
      label: t('common.footer.howItWorks'),
      href: '/how-it-works'
    }],
    legal: [{
      label: t('common.footer.privacy'),
      href: '/privacy-policy'
    }, {
      label: t('common.footer.terms'),
      href: '/terms-of-service'
    }, {
      label: t('common.footer.cookies'),
      href: '/cookie-policy'
    }, {
      label: t('common.footer.disclaimer'),
      href: '/disclaimer'
    }]
  };
  const socialLinks = [{
    icon: Twitter,
    href: 'https://twitter.com/eseomax',
    label: t('common.social.twitter')
  }, {
    icon: Linkedin,
    href: 'https://linkedin.com/company/eseomax',
    label: t('common.social.linkedin')
  }, {
    icon: Github,
    href: 'https://github.com/eseomax',
    label: t('common.social.github')
  }, {
    icon: Mail,
    href: 'mailto:hello@e-seomax.com',
    label: t('common.social.email')
  }];
  return <footer className="bg-card/30 border-t border-border">
      
    </footer>;
};
export default Footer;