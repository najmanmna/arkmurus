'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { useScroll } from 'framer-motion';
import { Cloud, Stars, Environment, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { FogExp2, Color, CanvasTexture } from 'three';

// --- 1. PRECISION SKYLINE GENERATOR ---
// Generates sharp, architectural silhouettes on the fly (No external assets needed)
function useSkylineTexture(city: 'london' | 'dc' | 'dubai') {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 2048; 
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, 2048, 1024);
    
    // STYLE: Reduced glow for a sharper, more serious architectural look
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(255,255,255, 0.5)";
    ctx.fillStyle = "#ffffff";

    if (city === 'london') {
        // Horizon
        ctx.fillRect(0, 950, 2048, 74); 
        // The Shard
        ctx.beginPath(); ctx.moveTo(600, 950); ctx.lineTo(700, 200); ctx.lineTo(800, 950); ctx.fill();
        // The Gherkin
        ctx.beginPath(); ctx.ellipse(1200, 950, 100, 400, 0, Math.PI, 0); ctx.fill();
        // London Eye
        ctx.lineWidth = 40; ctx.strokeStyle = "#ffffff"; ctx.beginPath(); ctx.arc(300, 800, 150, 0, Math.PI * 2); ctx.stroke();
    } 
    else if (city === 'dc') {
        // Horizon
        ctx.fillRect(0, 900, 2048, 124);
        // Capitol Dome
        ctx.beginPath(); ctx.arc(1024, 900, 180, Math.PI, 0); ctx.fill(); ctx.fillRect(1000, 680, 48, 50);
        // Monument
        ctx.beginPath(); ctx.moveTo(400, 900); ctx.lineTo(430, 300); ctx.lineTo(460, 900); ctx.fill();
        // Lincoln Memorial
        ctx.fillRect(1500, 800, 300, 100);
    } 
    else if (city === 'dubai') {
        // Horizon
        ctx.fillRect(0, 980, 2048, 44); 
        // Burj Khalifa
        ctx.fillRect(980, 200, 88, 800); ctx.fillRect(1000, 50, 48, 150); 
        ctx.fillRect(800, 600, 60, 400); ctx.fillRect(1200, 700, 60, 300);
        // Burj Al Arab
        ctx.beginPath(); ctx.moveTo(1600, 980); ctx.quadraticCurveTo(1700, 500, 1600, 400); ctx.lineTo(1800, 980); ctx.fill();
        // Cayan Tower
        ctx.fillRect(400, 500, 100, 480);
    }

    const tex = new CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [city]);
}

// --- 2. BILLBOARD COMPONENT ---
// Displays the generated texture as a massive, ghostly layer in the fog
function CityBillboard({ type, z, scale, color }: { type: 'london' | 'dc' | 'dubai', z: number, scale: number[], color: string }) {
    const texture = useSkylineTexture(type);
    
    return (
        <group position={[0, -20, z]}>
            <Float speed={1.5} rotationIntensity={0.01} floatIntensity={0.05}>
                <mesh>
                    <planeGeometry args={[scale[0], scale[1]]} />
                    <meshBasicMaterial 
                        map={texture} 
                        transparent 
                        opacity={0.85} // Ghostly transparency
                        color={color}
                        alphaTest={0.01} 
                        side={THREE.DoubleSide}
                        depthWrite={false} // Prevents "boxy" fog artifacts
                    />
                </mesh>
            </Float>
        </group>
    );
}

// --- 3. SCENE DIRECTOR ---
function Scene() {
  const { scrollYProgress } = useScroll();
  const { camera, scene } = useThree();

  useFrame(() => {
    const scroll = scrollYProgress.get();

    // FLIGHT PATH: 0 to -1000
    const targetZ = -scroll * 1000;
    
    // HEAVIER CAMERA: 0.03 damping gives a sense of scale and weight (Satellite/Heavy Drone)
    camera.position.z += (targetZ - camera.position.z) * 0.03;
    
    // Subtle breathing motion
    camera.position.x = Math.sin(Date.now() * 0.0001) * 1;
    camera.position.y = Math.sin(Date.now() * 0.0002) * 0.5;
    
    // ATMOSPHERE CONTROL: Biome Switching
    const z = Math.abs(camera.position.z);
    let fogColor = new Color("#000000");
    
    // London: Steel Blue / Grey (Professional)
    if (z < 300) fogColor.lerp(new Color("#0a1016"), 0.5); 
    // DC: Granite Grey (Authority)
    else if (z < 700) fogColor.lerp(new Color("#151515"), 0.8); 
    // Dubai: Deep Bronze (Wealth)
    else fogColor.lerp(new Color("#1a1205"), 0.8); 

    scene.fog = new FogExp2(fogColor, 0.01);
    scene.background = fogColor;
  });

  return (
    <>
      {/* Stars pushed back for depth, not sparkle */}
      <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={0.2} />
      <Environment preset="night" />

      {/* --- SCENE 1: LONDON --- */}
      {/* Color: Steel Blue (#8899aa) */}
      <CityBillboard type="london" z={-150} scale={[250, 125, 1]} color="#8899aa" />
      {/* Cloud layer acts as the "Floor" without being a solid plane */}
      <Cloud position={[0, 0, -100]} opacity={0.2} speed={0.1} width={20} depth={5} />

      {/* --- SCENE 2: WASHINGTON --- */}
      {/* Color: Off-White/Granite (#dddddd) */}
      <CityBillboard type="dc" z={-500} scale={[300, 150, 1]} color="#dddddd" />
      <Cloud position={[0, 0, -450]} opacity={0.2} speed={0.1} width={20} depth={5} />

      {/* --- SCENE 3: DUBAI --- */}
      {/* Color: Sand Gold/Bronze (#cc9966) */}
      <CityBillboard type="dubai" z={-900} scale={[250, 250, 1]} color="#cc9966" />
      <Cloud position={[0, 0, -800]} opacity={0.2} speed={0.1} width={20} depth={5} />
      
    </>
  );
}

export default function CinematicBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-ark-bg">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
      >
        <Scene />
        <EffectComposer disableNormalPass>
            {/* SUBTLE GLOW: Clean, professional bloom */}
            <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.0} radius={0.6} />
            {/* FILM GRAIN: Adds cinematic texture, prevents color banding */}
            <Noise opacity={0.1} />
            {/* VIGNETTE: Focuses eye on center */}
            <Vignette eskil={false} offset={0.1} darkness={1.2} />
        </EffectComposer>
      </Canvas>
      {/* Gradient Overlay ensures text readability */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-ark-bg/40 via-transparent to-ark-bg/40" />
    </div>
  );
}