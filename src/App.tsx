import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { getAdminBasePath } from "@/config/adminConfig";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import SEO from "./components/SEO";
import StructuredDataSchemas from "./components/StructuredDataSchemas";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import HowItWorks from "./pages/HowItWorks";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import ToolsCatalog from "./pages/tools/ToolsCatalog";
import WordCounter from "./pages/tools/WordCounter";
import SeoAudit from "./pages/tools/SeoAudit";
import BacklinkChecker from "./pages/tools/BacklinkChecker";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import PostsList from "./pages/admin/PostsList";
import PostEditor from "./pages/admin/PostEditor";
import CategoriesManager from "./pages/admin/CategoriesManager";

const queryClient = new QueryClient();

// Get dynamic admin path from environment or use secure default
const adminBasePath = getAdminBasePath();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* SEO Components */}
          <SEO />
          <StructuredDataSchemas />
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/tools" element={<ToolsCatalog />} />
            <Route path="/tools/word-counter" element={<WordCounter />} />
            <Route path="/tools/seo-audit" element={<SeoAudit />} />
            <Route path="/tools/backlink-checker" element={<BacklinkChecker />} />
            
            {/* Admin Routes - Dynamic path from environment */}
            <Route path={`${adminBasePath}/login`} element={<AdminLogin />} />
            <Route path={adminBasePath} element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="posts" element={<PostsList />} />
              <Route path="posts/:id" element={<PostEditor />} />
              <Route path="categories" element={<CategoriesManager />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
