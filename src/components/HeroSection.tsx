import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import HeroContent from './HeroContent';
import FloatingCubes from './FloatingCubes';
import GridOverlay from './GridOverlay';
import { getDirection } from '@/i18n';

export default function HeroSection() {
  const { i18n } = useTranslation();
  const isRTL = getDirection(i18n.language) === 'rtl';
  
  return (
    <section className="relative min-h-screen w-full overflow-auto bg-background noise-texture">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#0a0a0a]" />
      
      {/* Grid and purple gradient overlays */}
      <GridOverlay />
      
      {/* 3D Floating Cubes - flip position for RTL */}
      <div className={`absolute top-0 w-full lg:w-[60%] h-full ${isRTL ? 'left-0' : 'right-0'}`}>
        <Suspense fallback={null}>
          <FloatingCubes isRTL={isRTL} />
        </Suspense>
      </div>
      
      {/* Content */}
      <HeroContent />
    </section>
  );
}
