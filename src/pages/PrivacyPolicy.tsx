import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last Updated: January 15, 2026
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to E-SEOMAX ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website e-seomax.com (the "Site") and use our AI-powered SEO analysis services.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site. By accessing or using our Site, you agree to this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">2.1 Personal Information You Provide</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>Register for an account on our platform</li>
                  <li>Subscribe to our newsletter or marketing communications</li>
                  <li>Fill out a contact form or request customer support</li>
                  <li>Participate in surveys, contests, or promotions</li>
                  <li>Post comments or content on our blog</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  This information may include your name, email address, phone number, company name, job title, billing address, and payment information.
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">2.2 Information Automatically Collected</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When you visit our Site, we automatically collect certain information about your device, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>IP address and geographic location</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referring website addresses</li>
                  <li>Pages viewed and time spent on pages</li>
                  <li>Click patterns and navigation paths</li>
                  <li>Device identifiers and characteristics</li>
                </ul>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">2.3 SEO Analysis Data</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When you use our SEO analysis tools, we collect the URLs you submit for analysis. We process this data to provide you with SEO recommendations and insights. This data is used solely for delivering our services and is not shared with third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cookies and Tracking Technologies</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">3.1 Types of Cookies We Use</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our Site and store certain information. The types of cookies we use include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the operation of our Site. They enable core functionality such as security, network management, and accessibility.</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Site by collecting and reporting information anonymously.</li>
                  <li><strong>Advertising Cookies:</strong> Used to deliver advertisements relevant to you and your interests.</li>
                  <li><strong>Preference Cookies:</strong> Enable our Site to remember information that changes the way the Site behaves or looks.</li>
                </ul>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">3.2 Google AdSense and Third-Party Advertising</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We use Google AdSense to display advertisements on our Site. Google AdSense uses cookies, including the DoubleClick cookie, to serve ads based on your prior visits to our Site and other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our Site and/or other sites on the Internet.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. Google's use of the DoubleClick cookie enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">3.3 Managing Your Cookie Preferences</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You can control and manage cookies through your browser settings. Most browsers allow you to refuse to accept cookies and to delete cookies. However, if you block or delete cookies, some features of our Site may not function properly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>Providing, operating, and maintaining our SEO analysis services</li>
                  <li>Improving, personalizing, and expanding our services</li>
                  <li>Processing transactions and sending related information</li>
                  <li>Sending promotional communications (with your consent)</li>
                  <li>Responding to your comments, questions, and customer service requests</li>
                  <li>Monitoring and analyzing usage patterns and trends</li>
                  <li>Detecting, preventing, and addressing technical issues and security threats</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Information Sharing and Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may share your information in the following situations:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li><strong>Service Providers:</strong> We may share your information with third-party vendors who provide services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
                  <li><strong>Legal Requirements:</strong> If required to do so by law or in response to valid requests by public authorities.</li>
                  <li><strong>Protection of Rights:</strong> To protect our rights, privacy, safety, or property, and/or that of our affiliates, you, or others.</li>
                  <li><strong>With Your Consent:</strong> With your consent for any other purpose.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures designed to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, firewalls, and regular security assessments.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymize it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Your Privacy Rights</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">8.1 General Rights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>The right to access the personal information we hold about you</li>
                  <li>The right to request correction of inaccurate personal information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to object to or restrict certain processing activities</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time</li>
                </ul>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">8.2 European Economic Area (EEA) Residents - GDPR</h3>
                <p className="text-muted-foreground leading-relaxed">
                  If you are a resident of the European Economic Area, you have additional rights under the General Data Protection Regulation (GDPR). We process your data based on one or more legal bases: your consent, contract performance, legal obligation, or legitimate interests.
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">8.3 California Residents - CCPA</h3>
                <p className="text-muted-foreground leading-relaxed">
                  If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to request deletion, and the right to opt out of the sale of personal information. We do not sell personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Site is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16 without verification of parental consent, we will take steps to remove that information from our servers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">10. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. We take appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Site may contain links to third-party websites and services. We are not responsible for the privacy practices or content of these third parties. We encourage you to read the privacy policies of any third-party sites you visit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, or if you wish to exercise any of your privacy rights, please contact us:
                </p>
                <div className="mt-4 p-6 bg-card/50 rounded-lg border border-border">
                  <p className="text-foreground font-medium">E-SEOMAX</p>
                  <p className="text-muted-foreground mt-2">Email: privacy@e-seomax.com</p>
                  <p className="text-muted-foreground">Address: 123 Tech Innovation Drive, Suite 500, San Francisco, CA 94105, USA</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
