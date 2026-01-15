import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

const CookiePolicy = () => {
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
              Cookie Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last Updated: January 15, 2026
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is being used.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device after you close your browser, while session cookies are deleted when you close your browser.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  E-SEOMAX uses cookies and similar tracking technologies to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>Ensure our website functions properly</li>
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you use our website</li>
                  <li>Improve our services and user experience</li>
                  <li>Deliver relevant advertisements</li>
                  <li>Analyze website traffic and performance</li>
                  <li>Protect against fraud and enhance security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Types of Cookies We Use</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">3.1 Essential Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not work properly.
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm text-muted-foreground border border-border rounded-lg">
                    <thead className="bg-card/50">
                      <tr>
                        <th className="text-left p-3 border-b border-border">Cookie Name</th>
                        <th className="text-left p-3 border-b border-border">Purpose</th>
                        <th className="text-left p-3 border-b border-border">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-b border-border">cookie-consent</td>
                        <td className="p-3 border-b border-border">Stores your cookie consent preferences</td>
                        <td className="p-3 border-b border-border">1 year</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-border">session_id</td>
                        <td className="p-3 border-b border-border">Maintains your session state</td>
                        <td className="p-3 border-b border-border">Session</td>
                      </tr>
                      <tr>
                        <td className="p-3">auth_token</td>
                        <td className="p-3">Authentication and security</td>
                        <td className="p-3">7 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">3.2 Performance & Analytics Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous.
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm text-muted-foreground border border-border rounded-lg">
                    <thead className="bg-card/50">
                      <tr>
                        <th className="text-left p-3 border-b border-border">Cookie Name</th>
                        <th className="text-left p-3 border-b border-border">Provider</th>
                        <th className="text-left p-3 border-b border-border">Purpose</th>
                        <th className="text-left p-3 border-b border-border">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-b border-border">_ga</td>
                        <td className="p-3 border-b border-border">Google Analytics</td>
                        <td className="p-3 border-b border-border">Distinguishes unique users</td>
                        <td className="p-3 border-b border-border">2 years</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-border">_gid</td>
                        <td className="p-3 border-b border-border">Google Analytics</td>
                        <td className="p-3 border-b border-border">Distinguishes unique users</td>
                        <td className="p-3 border-b border-border">24 hours</td>
                      </tr>
                      <tr>
                        <td className="p-3">_gat</td>
                        <td className="p-3">Google Analytics</td>
                        <td className="p-3">Throttles request rate</td>
                        <td className="p-3">1 minute</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">3.3 Advertising Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies are used to deliver advertisements that are more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns. These cookies are usually placed by advertising networks with the website operator's permission.
                </p>
                
                <h4 className="text-lg font-medium text-foreground mt-4 mb-2">Google AdSense Cookies</h4>
                <p className="text-muted-foreground leading-relaxed">
                  We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website and other sites on the Internet.
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm text-muted-foreground border border-border rounded-lg">
                    <thead className="bg-card/50">
                      <tr>
                        <th className="text-left p-3 border-b border-border">Cookie Name</th>
                        <th className="text-left p-3 border-b border-border">Provider</th>
                        <th className="text-left p-3 border-b border-border">Purpose</th>
                        <th className="text-left p-3 border-b border-border">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-b border-border">__gads</td>
                        <td className="p-3 border-b border-border">Google</td>
                        <td className="p-3 border-b border-border">Ad serving and measurement</td>
                        <td className="p-3 border-b border-border">2 years</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-border">__gpi</td>
                        <td className="p-3 border-b border-border">Google</td>
                        <td className="p-3 border-b border-border">Ad personalization</td>
                        <td className="p-3 border-b border-border">2 years</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-border">IDE</td>
                        <td className="p-3 border-b border-border">DoubleClick (Google)</td>
                        <td className="p-3 border-b border-border">Retargeting, optimization, reporting, and attribution</td>
                        <td className="p-3 border-b border-border">1 year</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-border">DSID</td>
                        <td className="p-3 border-b border-border">DoubleClick (Google)</td>
                        <td className="p-3 border-b border-border">Identifies signed-in user for ad personalization</td>
                        <td className="p-3 border-b border-border">2 weeks</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-border">NID</td>
                        <td className="p-3 border-b border-border">Google</td>
                        <td className="p-3 border-b border-border">Stores visitor preferences and personalizes ads</td>
                        <td className="p-3 border-b border-border">6 months</td>
                      </tr>
                      <tr>
                        <td className="p-3">_gcl_au</td>
                        <td className="p-3">Google Ads</td>
                        <td className="p-3">Conversion tracking</td>
                        <td className="p-3">90 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">3.4 Preference Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Third-Party Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In addition to the cookies we set, third parties may also set cookies when you visit our website. These include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li><strong>Google:</strong> Analytics, AdSense, DoubleClick advertising services</li>
                  <li><strong>Social Media Platforms:</strong> If you use social sharing buttons, these platforms may set their own cookies</li>
                  <li><strong>Embedded Content Providers:</strong> Videos and other embedded content from third parties may include cookies</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We do not control third-party cookies. Please refer to the respective third party's cookie policy for more information about their practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Managing Your Cookie Preferences</h2>
                
                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">5.1 Cookie Consent Banner</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When you first visit our website, you will see a cookie consent banner that allows you to accept all cookies, reject non-essential cookies, or manage your preferences. You can change your preferences at any time by clicking on the "Cookie Settings" link in our footer.
                </p>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">5.2 Browser Settings</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Most web browsers allow you to control cookies through their settings. Here's how to manage cookies in common browsers:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                  <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>

                <h3 className="text-xl font-medium text-foreground mt-6 mb-3">5.3 Opt-Out of Personalized Advertising</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You can opt out of personalized advertising by visiting:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li><a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></li>
                  <li><a href="https://www.aboutads.info/choices/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance (DAA)</a></li>
                  <li><a href="https://www.networkadvertising.org/choices/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative (NAI)</a></li>
                  <li><a href="https://www.youronlinechoices.eu/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Your Online Choices (EU)</a></li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Impact of Disabling Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you choose to disable or block certain cookies, some features of our website may not function properly. For example:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>You may need to log in every time you visit</li>
                  <li>Your preferences may not be remembered</li>
                  <li>Some interactive features may not work</li>
                  <li>You may still see ads, but they will be less relevant to your interests</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Updates to This Cookie Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. Please check this page periodically for updates. The "Last Updated" date at the top of this page indicates when this policy was last revised.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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

export default CookiePolicy;
