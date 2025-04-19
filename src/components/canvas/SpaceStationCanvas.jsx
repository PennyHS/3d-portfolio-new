import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import CanvasLoader from "../Loader";

const SpaceStation = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  const [hovered, setHovered] = useState(false);
  const solarPanelsRef = useRef();
  const ringRef = useRef();

  // Rotation animations
  useFrame((state) => {
    if (solarPanelsRef.current) {
      // Rotate solar panels
      solarPanelsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      solarPanelsRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
    if (ringRef.current) {
      // Rotate outer ring
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });

  // LEGO colors - brighter, more saturated
  const legoBlue = props.accentColor || '#2f6bd6';
  const legoWhite = props.mainColor || '#FFFFFF';
  const legoYellow = props.detailColor || '#F8C300';
  const legoGreen = props.panelColor || '#00852B';
  const legoGrey = props.supportColor || '#A0A5A9';
  const legoRed = '#C91A09';

  return (
    <Float 
      speed={props.floatSpeed || 1} 
      rotationIntensity={0.2} 
      floatIntensity={0.5}
    >
      <group scale={props.scale || 2}>
        {/* Main Station Body */}
        <mesh 
          castShadow 
          receiveShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <cylinderGeometry args={[1, 1, 2, 8]} />
          <meshStandardMaterial
            color={legoWhite}
            metalness={0}
            roughness={0.2}
            flatShading={true}
          />
          <Decal
            position={[0, 0, 1]}
            rotation={[0, 0, 0]}
            scale={1.5}
            map={decal}
          />
        </mesh>

        {/* Station Ends */}
        {[-1, 1].map((pos) => (
          <mesh key={pos} position={[0, pos, 0]} castShadow>
            <cylinderGeometry args={[1.2, 1.2, 0.2, 8]} />
            <meshStandardMaterial
              color={legoBlue}
              metalness={0}
              roughness={0.2}
              flatShading={true}
            />
          </mesh>
        ))}

        {/* Rotating Ring - simplified for LEGO style */}
        <group ref={ringRef}>
          <mesh castShadow>
            <torusGeometry args={[2, 0.2, 8, 16]} /> {/* Reduced segments */}
            <meshStandardMaterial
              color={legoBlue}
              metalness={0}
              roughness={0.2}
              flatShading={true}
            />
          </mesh>
        </group>

        {/* Solar Panels - simplified */}
        <group ref={solarPanelsRef}>
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 2, 0, 0]} rotation={[0, 0, side * Math.PI / 2]}>
              <mesh castShadow>
                <boxGeometry args={[2, 0.1, 1]} />
                <meshStandardMaterial
                  color={legoGreen}
                  metalness={0}
                  roughness={0.2}
                  flatShading={true}
                />
              </mesh>
              
              {/* Panel Support */}
              <mesh position={[0, 0, 0]} castShadow>
                <boxGeometry args={[0.2, 0.2, 1]} /> {/* Box instead of cylinder */}
                <meshStandardMaterial
                  color={legoGrey}
                  metalness={0}
                  roughness={0.2}
                  flatShading={true}
                />
              </mesh>
            </group>
          ))}
        </group>

        {/* Detail Elements - LEGO blocks */}
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos(i * Math.PI / 2) * 1.2,
              0,
              Math.sin(i * Math.PI / 2) * 1.2
            ]}
            scale={0.2}
          >
            <boxGeometry args={[0.5, 0.5, 0.5]} /> {/* Box instead of sphere */}
            <meshStandardMaterial
              color={i % 2 === 0 ? legoRed : legoYellow}
              metalness={0}
              roughness={0.2}
              flatShading={true}
              emissive={hovered ? legoRed : '#000000'}
              emissiveIntensity={hovered ? 0.5 : 0}
            />
          </mesh>
        ))}

        {/* Antenna elements */}
        <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.1, 1, 0.1]} /> {/* Box instead of cylinder */}
          <meshStandardMaterial
            color={legoGrey}
            metalness={0}
            roughness={0.2}
            flatShading={true}
          />
        </mesh>
        <mesh position={[0, 2, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} /> {/* Box instead of sphere */}
          <meshStandardMaterial
            color={legoRed}
            metalness={0}
            roughness={0.2}
            flatShading={true}
            emissive={legoRed}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Communication dish */}
        <group position={[1.3, 0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 8]} /> {/* Reduced segments */}
            <meshStandardMaterial
              color={legoWhite}
              metalness={0}
              roughness={0.2}
              flatShading={true}
            />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.05, 0.2, 0.05]} /> {/* Box instead of cylinder */}
            <meshStandardMaterial
              color={legoGrey}
              metalness={0}
              roughness={0.2}
              flatShading={true}
            />
          </mesh>
        </group>

        {/* Hover Effects */}
        {hovered && (
          <pointLight
            position={[0, 0, 3]}
            intensity={0.6}
            color="#FFFF00"
            distance={5}
          />
        )}
      </group>
    </Float>
  );
};

const SpaceStationCanvas = ({
  icon,
  mainColor,
  accentColor,
  ringColor,
  panelColor,
  supportColor,
  detailColor,
  scale,
  floatSpeed,
}) => {
  return (
    <Canvas
      frameloop='always'
      dpr={[1, 2]}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: true,
        alpha: true  // Enable alpha channel for transparency
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 0, 12]
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Removed background color and stars for transparency */}
        
        {/* Lighting for LEGO - brighter, more playful */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4472C4" />
        
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
        
        <SpaceStation
          imgUrl={icon}
          mainColor={mainColor}
          accentColor={accentColor}
          ringColor={ringColor}
          panelColor={panelColor}
          supportColor={supportColor}
          detailColor={detailColor}
          scale={scale}
          floatSpeed={floatSpeed}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default SpaceStationCanvas;