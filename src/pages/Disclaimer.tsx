import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { AlertTriangle } from 'lucide-react';

const Disclaimer = () => {
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
              Disclaimer
            </h1>
            <p className="text-muted-foreground mb-8">
              Last Updated: January 15, 2026
            </p>

            {/* Important Notice Box */}
            <div className="mb-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-500 mb-2">Important Notice</h3>
                  <p className="text-muted-foreground">
                    The information and services provided by E-SEOMAX are for general informational and educational purposes only. SEO results vary significantly based on numerous factors. We do not guarantee any specific rankings, traffic increases, or business outcomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. General Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  E-SEOMAX ("we," "our," or "us") provides AI-powered SEO analysis tools and educational content through our website e-seomax.com (the "Site"). The information, recommendations, and analysis provided through our Services are for general informational purposes only and should not be considered professional advice.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  While we strive to provide accurate, up-to-date, and helpful information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on our Site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. No Guarantee of SEO Results</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>E-SEOMAX does not guarantee any specific SEO results, search engine rankings, traffic increases, or business outcomes.</strong> Search engine optimization is a complex and dynamic field affected by numerous factors beyond our control, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>Search engine algorithm changes and updates (Google, Bing, etc.)</li>
                  <li>Competitor activities and market conditions</li>
                  <li>Quality and implementation of recommended changes</li>
                  <li>Website technical infrastructure and hosting</li>
                  <li>Content quality and relevance</li>
                  <li>Backlink profile and domain authority</li>
                  <li>User experience and engagement metrics</li>
                  <li>Industry-specific ranking factors</li>
                  <li>Geographic and demographic targeting</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Past performance of SEO strategies does not guarantee future results. Rankings can fluctuate significantly over time, and achieving top positions in search results requires ongoing effort and adaptation to changing conditions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Analysis Tool Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our SEO analysis tools use algorithms and artificial intelligence to evaluate websites and provide recommendations. While we continuously improve our technology, the analysis results:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>Are based on publicly available information and industry best practices</li>
                  <li>May not capture all aspects of your specific situation</li>
                  <li>Should be verified and validated before implementation</li>
                  <li>Are not a substitute for professional SEO consultation</li>
                  <li>May not reflect the most current search engine guidelines</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  The scores, grades, and metrics provided are relative measurements designed to help you understand areas for improvement. They should not be interpreted as absolute indicators of success or failure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Professional Advice Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The content and services provided by E-SEOMAX do not constitute professional advice. Our SEO analysis and recommendations are not intended to replace:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>Consultation with qualified SEO professionals or digital marketing agencies</li>
                  <li>Legal advice regarding website compliance, privacy, or intellectual property</li>
                  <li>Business or financial advice regarding marketing investments</li>
                  <li>Technical advice from web developers or IT professionals</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  For complex SEO projects or websites with significant traffic and revenue, we recommend consulting with experienced professionals who can assess your specific needs and circumstances.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Third-Party Content and Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Site may contain links to external websites, resources, or services that are not owned or controlled by E-SEOMAX. We are not responsible for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>The content, accuracy, or opinions expressed on third-party websites</li>
                  <li>The privacy practices or security of third-party sites</li>
                  <li>Products or services offered by third parties</li>
                  <li>Any damages or losses incurred through third-party interactions</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  The inclusion of any link does not imply endorsement or affiliation with the linked site. We encourage you to read the terms and privacy policies of any third-party websites you visit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Educational Content Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The blog posts, guides, tutorials, and other educational content on our Site are provided for informational purposes only. This content:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>Represents our understanding and interpretation of SEO best practices</li>
                  <li>May become outdated as search engines update their algorithms</li>
                  <li>Should be adapted to your specific circumstances and goals</li>
                  <li>Is not tailored to any individual's specific situation</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  SEO strategies and best practices evolve constantly. What works today may not work tomorrow, and what works for one website may not work for another.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Testimonials and Case Studies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Any testimonials, case studies, examples, or success stories presented on our Site represent individual experiences and are not intended to represent or guarantee that current or future users will achieve the same or similar results.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Results mentioned in testimonials or case studies are not typical and your results will vary based on many factors, including but not limited to your effort, experience, and market conditions. Some testimonials or examples may be composite illustrations based on typical user experiences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Accuracy of Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we endeavor to keep the information on our Site accurate and up-to-date, we make no representations, warranties, or guarantees regarding the accuracy, completeness, or currency of any information. The SEO industry is dynamic, and search engines frequently update their algorithms and guidelines without prior notice.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Users should independently verify any critical information before making decisions based on content found on our Site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by applicable law, E-SEOMAX and its affiliates, directors, employees, agents, and licensors shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>Loss of profits, revenue, or business opportunities</li>
                  <li>Loss of data or website traffic</li>
                  <li>Search engine penalties or ranking losses</li>
                  <li>Damage to reputation or goodwill</li>
                  <li>Any other commercial damages or losses</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  This limitation applies regardless of the theory of liability (contract, tort, strict liability, or otherwise) and even if we have been advised of the possibility of such damages.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">10. User Responsibility</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By using our Services, you acknowledge that you are solely responsible for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>Evaluating the appropriateness of any recommendations for your situation</li>
                  <li>Implementing SEO changes correctly and testing their impact</li>
                  <li>Maintaining backups of your website before making changes</li>
                  <li>Ensuring compliance with search engine guidelines and policies</li>
                  <li>Monitoring your website's performance and rankings</li>
                  <li>Seeking professional assistance when needed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Affiliate Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Some links on our Site may be affiliate links, meaning we may earn a commission if you make a purchase through those links at no additional cost to you. This does not affect our editorial integrity or the objectivity of our recommendations. We only recommend products and services we believe provide value to our users.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to This Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify this Disclaimer at any time. Changes will be effective immediately upon posting on this page with an updated "Last Updated" date. Your continued use of our Services after any changes constitutes acceptance of the modified Disclaimer.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Disclaimer, please contact us:
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

export default Disclaimer;
