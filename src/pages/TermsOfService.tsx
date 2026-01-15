import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

const TermsOfService = () => {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-8">
              Last Updated: January 15, 2026
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to E-SEOMAX. These Terms of Service ("Terms") govern your access to and use of the E-SEOMAX website located at e-seomax.com (the "Site") and all related services, features, content, and applications offered by E-SEOMAX (collectively, the "Services").
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services. These Terms constitute a legally binding agreement between you and E-SEOMAX.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  E-SEOMAX provides AI-powered search engine optimization (SEO) analysis tools and services designed to help website owners, marketers, and businesses improve their online visibility and search engine rankings. Our Services include, but are not limited to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>Website SEO analysis and auditing</li>
                  <li>Keyword research and recommendations</li>
                  <li>Technical SEO assessments</li>
                  <li>Content optimization suggestions</li>
                  <li>Backlink analysis</li>
                  <li>Performance monitoring and reporting</li>
                  <li>Educational resources and blog content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">3.1 Account Registration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To access certain features of our Services, you may be required to create an account. When registering, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">3.2 Account Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for safeguarding your password and for any activities or actions under your account. You agree to notify us immediately of any unauthorized access to or use of your account. E-SEOMAX will not be liable for any loss or damage arising from your failure to comply with this security obligation.
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">3.3 Account Termination</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to suspend or terminate your account at any time for any reason, including but not limited to violation of these Terms, fraudulent activity, or non-payment of fees. You may also terminate your account at any time by contacting us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Acceptable Use Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree NOT to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>Use the Services in any way that violates any applicable federal, state, local, or international law or regulation</li>
                  <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services</li>
                  <li>Impersonate or attempt to impersonate E-SEOMAX, an E-SEOMAX employee, another user, or any other person or entity</li>
                  <li>Use the Services to transmit any advertising or promotional material without our prior written consent</li>
                  <li>Attempt to gain unauthorized access to any portion of the Services or any related systems or networks</li>
                  <li>Use any robot, spider, scraper, or other automated means to access the Services</li>
                  <li>Introduce any viruses, trojan horses, worms, or other material that is malicious or technologically harmful</li>
                  <li>Attempt to reverse engineer, decompile, or disassemble any part of the Services</li>
                  <li>Use the Services to analyze websites you do not own or have permission to analyze</li>
                  <li>Resell, sublicense, or redistribute the Services without our express written permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property Rights</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">5.1 Our Intellectual Property</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, audio, and the design, selection, and arrangement thereof) are owned by E-SEOMAX, its licensors, or other providers and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">5.2 Limited License</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your personal or internal business purposes. This license does not include the right to sublicense, modify, adapt, translate, reverse engineer, decompile, disassemble, or create derivative works based on the Services.
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">5.3 User Content</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You retain ownership of any content you submit to the Services. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content solely for the purpose of providing the Services to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Payment Terms</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">6.1 Fees and Billing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Certain features of our Services may require payment of fees. All fees are stated in US dollars unless otherwise specified. You agree to pay all applicable fees as described on our Site. We reserve the right to change our fees at any time upon notice.
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">6.2 Subscription Services</h3>
                <p className="text-muted-foreground leading-relaxed">
                  If you subscribe to a paid plan, your subscription will automatically renew at the end of each billing period unless you cancel before the renewal date. You may cancel your subscription at any time through your account settings or by contacting us.
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">6.3 Refunds</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Refund requests are handled on a case-by-case basis. Generally, fees are non-refundable except where required by applicable law. Please contact our support team if you believe you are entitled to a refund.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Disclaimers</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">7.1 No Guarantee of Results</h3>
                <p className="text-muted-foreground leading-relaxed">
                  E-SEOMAX provides SEO analysis and recommendations based on industry best practices and our proprietary algorithms. However, <strong>we do not guarantee any specific results, rankings, or outcomes</strong>. Search engine algorithms are complex and constantly changing. Results may vary based on numerous factors beyond our control, including competition, content quality, technical implementation, and search engine algorithm updates.
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">7.2 "As Is" and "As Available"</h3>
                <p className="text-muted-foreground leading-relaxed">
                  THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, E-SEOMAX DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">7.3 Accuracy of Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to provide accurate and up-to-date information, we make no representations or warranties about the accuracy, reliability, completeness, or timeliness of any information provided through the Services. The SEO analysis results are for informational purposes only and should not be considered professional advice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL E-SEOMAX, ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICES.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES EXCEED THE AMOUNT YOU HAVE PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to defend, indemnify, and hold harmless E-SEOMAX, its affiliates, and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Services may contain links to third-party websites or services that are not owned or controlled by E-SEOMAX. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that E-SEOMAX shall not be responsible or liable for any damage or loss caused by or in connection with the use of any such third-party websites or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Governing Law and Dispute Resolution</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">11.1 Governing Law</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">11.2 Dispute Resolution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Any dispute arising out of or relating to these Terms or the Services shall first be attempted to be resolved through good-faith negotiation. If the dispute cannot be resolved through negotiation, it shall be submitted to binding arbitration in San Francisco, California, in accordance with the rules of the American Arbitration Association.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by posting the updated Terms on this page and updating the "Last Updated" date. Your continued use of the Services after any changes constitutes your acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">13. Severability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall remain in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">14. Entire Agreement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms, together with our Privacy Policy and any other agreements expressly incorporated by reference, constitute the entire agreement between you and E-SEOMAX regarding the use of the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">15. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="mt-4 p-6 bg-card/50 rounded-lg border border-border">
                  <p className="text-foreground font-medium">E-SEOMAX</p>
                  <p className="text-muted-foreground mt-2">Email: legal@e-seomax.com</p>
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

export default TermsOfService;
