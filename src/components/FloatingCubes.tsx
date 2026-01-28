import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

interface CubeProps {
  position: [number, number, number];
  size: number;
  rotationSpeed: number;
  floatSpeed: number;
  floatAmount: number;
  initialRotation: [number, number, number];
}

function Cube({ position, size, rotationSpeed, floatSpeed, floatAmount, initialRotation }: CubeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = position[1];
  
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(size, size, size), [size]);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(boxGeometry), [boxGeometry]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotationSpeed * 0.0008;
      groupRef.current.rotation.y += rotationSpeed * 0.001;
      groupRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmount;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={initialRotation}>
      {/* Main cube body - dark with slight visibility */}
      <mesh geometry={boxGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#0c0c14"
          metalness={0.85}
          roughness={0.25}
          emissive="#1a1a2e"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      {/* Purple glowing edges - slightly thicker appearance */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color="#a855f7" transparent opacity={1} />
      </lineSegments>
    </group>
  );
}

function Lights({ isRTL }: { isRTL: boolean }) {
  const xMultiplier = isRTL ? -1 : 1;
  
  return (
    <>
      {/* Ambient light for base visibility of dark surfaces */}
      <ambientLight intensity={0.4} color="#ffffff" />
      
      {/* Main purple point lights */}
      <pointLight position={[8 * xMultiplier, 4, 6]} intensity={5} color="#8b5cf6" distance={35} decay={2} />
      <pointLight position={[6 * xMultiplier, -5, 4]} intensity={4} color="#7c3aed" distance={30} decay={2} />
      <pointLight position={[2 * xMultiplier, 2, 8]} intensity={3} color="#a855f7" distance={25} decay={2} />
      
      {/* Blue accent highlight */}
      <pointLight position={[7 * xMultiplier, 1, 0]} intensity={2.5} color="#6366f1" distance={20} decay={2} />
      
      {/* Key light from top - white for sharp highlights */}
      <directionalLight position={[4 * xMultiplier, 12, 6]} intensity={1.5} color="#ffffff" />
      
      {/* Rim light from right - purple tint for edge glow */}
      <directionalLight position={[12 * xMultiplier, 3, 5]} intensity={1.5} color="#c084fc" />
      
      {/* Fill from front-bottom */}
      <directionalLight position={[3 * xMultiplier, -6, 8]} intensity={0.8} color="#a78bfa" />
      
      {/* Front face fill */}
      <directionalLight position={[-2 * xMultiplier, 0, 12]} intensity={0.6} color="#f5f3ff" />
    </>
  );
}

function Scene({ isRTL }: { isRTL: boolean }) {
  const { camera } = useThree();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const xMultiplier = isRTL ? -1 : 1;
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 0.5 * xMultiplier,
        y: (e.clientY / window.innerHeight - 0.5) * 0.35,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [xMultiplier]);
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePos.x, 0.012);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePos.y, 0.012);
    camera.lookAt(3.5 * xMultiplier, 0, 0);
  });

  const cubes = useMemo(() => {
    const baseCubes = [
      // Top right area
      { position: [3.8, 2.0, 0.3] as [number, number, number], size: 1.25, rotationSpeed: 0.25, floatSpeed: 0.26, floatAmount: 0.16, initialRotation: [0.5, 0.45, 0.35] as [number, number, number] },
      { position: [5.0, 1.2, -0.6] as [number, number, number], size: 1.1, rotationSpeed: 0.32, floatSpeed: 0.3, floatAmount: 0.14, initialRotation: [0.35, 0.6, 0.25] as [number, number, number] },
      
      // Middle cluster
      { position: [3.2, 0.1, 0.4] as [number, number, number], size: 1.45, rotationSpeed: 0.2, floatSpeed: 0.22, floatAmount: 0.18, initialRotation: [0.6, 0.35, 0.5] as [number, number, number] },
      { position: [5.2, -0.2, -0.5] as [number, number, number], size: 1.15, rotationSpeed: 0.35, floatSpeed: 0.32, floatAmount: 0.15, initialRotation: [0.25, 0.7, 0.4] as [number, number, number] },
      
      // Lower cluster
      { position: [4.0, -1.5, 0.6] as [number, number, number], size: 1.3, rotationSpeed: 0.28, floatSpeed: 0.28, floatAmount: 0.17, initialRotation: [0.7, 0.25, 0.55] as [number, number, number] },
      { position: [5.5, -1.8, -0.2] as [number, number, number], size: 0.95, rotationSpeed: 0.4, floatSpeed: 0.36, floatAmount: 0.13, initialRotation: [0.45, 0.55, 0.35] as [number, number, number] },
      
      // Small accents
      { position: [2.6, 3.0, -0.1] as [number, number, number], size: 0.65, rotationSpeed: 0.48, floatSpeed: 0.42, floatAmount: 0.09, initialRotation: [0.55, 0.5, 0.45] as [number, number, number] },
      { position: [6.0, 2.2, -1.0] as [number, number, number], size: 0.8, rotationSpeed: 0.42, floatSpeed: 0.4, floatAmount: 0.11, initialRotation: [0.35, 0.75, 0.25] as [number, number, number] },
    ];
    
    // Flip x positions for RTL
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

export default function FloatingCubes({ isRTL = false }: FloatingCubesProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 32 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Scene isRTL={isRTL} />
      </Canvas>
    </div>
  );
}
