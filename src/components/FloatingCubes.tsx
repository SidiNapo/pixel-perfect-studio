import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect, memo } from 'react';
import * as THREE from 'three';

interface CubeProps {
  position: [number, number, number];
  size: number;
  rotationSpeed: number;
  floatSpeed: number;
  floatAmount: number;
  initialRotation: [number, number, number];
}

// Memoized Cube component for performance
const Cube = memo(function Cube({ position, size, rotationSpeed, floatSpeed, floatAmount, initialRotation }: CubeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = position[1];
  
  // Memoize geometries to prevent recreation
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(size, size, size), [size]);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(boxGeometry), [boxGeometry]);
  
  // Optimized animation with reduced calculations
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.x += rotationSpeed * 0.0006;
      groupRef.current.rotation.y += rotationSpeed * 0.0008;
      groupRef.current.position.y = initialY + Math.sin(time * floatSpeed) * floatAmount;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={initialRotation}>
      <mesh geometry={boxGeometry} castShadow={false} receiveShadow={false}>
        <meshStandardMaterial
          color="#0c0c14"
          metalness={0.85}
          roughness={0.25}
          emissive="#1a1a2e"
          emissiveIntensity={0.05}
        />
      </mesh>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color="#a855f7" transparent opacity={1} />
      </lineSegments>
    </group>
  );
});

// Memoized lights for performance
const Lights = memo(function Lights({ isRTL }: { isRTL: boolean }) {
  const xMultiplier = isRTL ? -1 : 1;
  
  return (
    <>
      <ambientLight intensity={0.4} color="#ffffff" />
      <pointLight position={[8 * xMultiplier, 4, 6]} intensity={5} color="#8b5cf6" distance={35} decay={2} />
      <pointLight position={[6 * xMultiplier, -5, 4]} intensity={4} color="#7c3aed" distance={30} decay={2} />
      <pointLight position={[2 * xMultiplier, 2, 8]} intensity={3} color="#a855f7" distance={25} decay={2} />
      <pointLight position={[7 * xMultiplier, 1, 0]} intensity={2.5} color="#6366f1" distance={20} decay={2} />
      <directionalLight position={[4 * xMultiplier, 12, 6]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[12 * xMultiplier, 3, 5]} intensity={1.5} color="#c084fc" />
      <directionalLight position={[3 * xMultiplier, -6, 8]} intensity={0.8} color="#a78bfa" />
      <directionalLight position={[-2 * xMultiplier, 0, 12]} intensity={0.6} color="#f5f3ff" />
    </>
  );
});

function Scene({ isRTL }: { isRTL: boolean }) {
  const { camera } = useThree();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const xMultiplier = isRTL ? -1 : 1;
  
  useEffect(() => {
    // Throttled mouse handler for performance
    let lastCall = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastCall < 32) return; // ~30fps throttle
      lastCall = now;
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 0.5 * xMultiplier,
        y: (e.clientY / window.innerHeight - 0.5) * 0.35,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [xMultiplier]);
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePos.x, 0.01);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePos.y, 0.01);
    camera.lookAt(3.5 * xMultiplier, 0, 0);
  });

  // Reduced number of cubes for better performance (6 instead of 8)
  const cubes = useMemo(() => {
    const baseCubes = [
      { position: [3.8, 2.0, 0.3] as [number, number, number], size: 1.25, rotationSpeed: 0.25, floatSpeed: 0.26, floatAmount: 0.16, initialRotation: [0.5, 0.45, 0.35] as [number, number, number] },
      { position: [5.0, 1.2, -0.6] as [number, number, number], size: 1.1, rotationSpeed: 0.32, floatSpeed: 0.3, floatAmount: 0.14, initialRotation: [0.35, 0.6, 0.25] as [number, number, number] },
      { position: [3.2, 0.1, 0.4] as [number, number, number], size: 1.45, rotationSpeed: 0.2, floatSpeed: 0.22, floatAmount: 0.18, initialRotation: [0.6, 0.35, 0.5] as [number, number, number] },
      { position: [5.2, -0.2, -0.5] as [number, number, number], size: 1.15, rotationSpeed: 0.35, floatSpeed: 0.32, floatAmount: 0.15, initialRotation: [0.25, 0.7, 0.4] as [number, number, number] },
      { position: [4.0, -1.5, 0.6] as [number, number, number], size: 1.3, rotationSpeed: 0.28, floatSpeed: 0.28, floatAmount: 0.17, initialRotation: [0.7, 0.25, 0.55] as [number, number, number] },
      { position: [5.5, -1.8, -0.2] as [number, number, number], size: 0.95, rotationSpeed: 0.4, floatSpeed: 0.36, floatAmount: 0.13, initialRotation: [0.45, 0.55, 0.35] as [number, number, number] },
    ];
    
    if (isRTL) {
      return baseCubes.map(cube => ({
        ...cube,
        position: [cube.position[0] * -1, cube.position[1], cube.position[2]] as [number, number, number],
      }));
    }
    
    return baseCubes;
  }, [isRTL]);

  return (
    <>
      <Lights isRTL={isRTL} />
      {cubes.map((cube, index) => (
        <Cube key={index} {...cube} />
      ))}
    </>
  );
}

interface FloatingCubesProps {
  isRTL?: boolean;
}

// Main component with performance optimizations
const FloatingCubes = memo(function FloatingCubes({ isRTL = false }: FloatingCubesProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 32 }}
        gl={{ 
          antialias: false, // Disable for performance
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]} // Cap DPR for performance
        frameloop="demand" // Only render when needed
        performance={{ min: 0.5 }}
      >
        <Scene isRTL={isRTL} />
      </Canvas>
    </div>
  );
});

export default FloatingCubes;