import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </main>
  );
};

export default Home;
