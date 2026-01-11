import { Suspense } from 'react';
import HeroContent from './HeroContent';
import FloatingCubes from './FloatingCubes';
import GridOverlay from './GridOverlay';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background noise-texture">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#0a0a0a]" />
      
      {/* Grid and purple gradient overlays */}
      <GridOverlay />
      
      {/* 3D Floating Cubes */}
      <div className="absolute right-0 top-0 w-full lg:w-[60%] h-full">
        <Suspense fallback={null}>
          <FloatingCubes />
        </Suspense>
      </div>
      
      {/* Content */}
      <HeroContent />
    </section>
  );
}
