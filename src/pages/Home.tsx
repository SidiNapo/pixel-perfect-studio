import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import HomeFAQ from '@/components/home/HomeFAQ';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <HomeFAQ />
      <Footer />
    </main>
  );
};

export default Home;
