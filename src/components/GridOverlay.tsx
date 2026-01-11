export default function GridOverlay() {
  return (
    <>
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none grid-overlay opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
        }}
      />
      
      {/* Purple gradient overlay */}
      <div 
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 85% 100%, hsl(262 83% 58% / 0.25), transparent 60%)',
        }}
      />
      
      {/* Additional subtle glow */}
      <div 
        className="absolute bottom-0 right-0 w-[80%] h-[60%] z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 80%, hsl(262 83% 50% / 0.15), transparent 50%)',
        }}
      />
    </>
  );
}
