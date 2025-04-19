import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const modelRef = useRef(null);
  const computer = useGLTF('./models/lego/scene.gltf'); // ✅ Ensure correct path
  
  // Store the base position values
  const basePosition = isMobile ? [0, -22, 0] : [0, -22.5, 0]; // Much lower Y values
  
  // Set initial position
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(basePosition[0], basePosition[1], basePosition[2]);
    }
  }, [isMobile, basePosition]);
  
  // Use useFrame for animation - this is more efficient than requestAnimationFrame
  useFrame(({ clock }) => {
    if (modelRef.current) {
      // Floating animation based on sine wave, but keep the base Y position
      modelRef.current.position.y = basePosition[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.3; 
      
      // Gentle rotation animation
      modelRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });
  
  return (
    <mesh>
      <hemisphereLight intensity={2.5} groundColor="black" />
      <primitive
        ref={modelRef}
        object={computer.scene}
        scale={isMobile ? 0.015 : 0.035}
        position={basePosition} // Use the base position here too
        rotation={isMobile ? [0, 0, -0.05] : [-0.01, -0.1, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle responsive design
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always" // Change to "always" to ensure animations run smoothly
      shadows
      camera={{ position: [20, -15, 5], fov: 25 }} // Lower camera position
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          target={[0, -20, 0]} // Target lower to look at the model
          maxPolarAngle={Math.PI / 2} // Locking the vertical rotation (down)
          minPolarAngle={Math.PI / 2} // Locking the vertical rotation (up)
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;