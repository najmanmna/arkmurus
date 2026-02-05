'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import { useScroll } from 'framer-motion';
import { Cloud, Stars, Environment, Float, PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { FogExp2, Color, CanvasTexture } from 'three';

// --- 1. OPTIMIZED SKYLINE GENERATOR ---
function useSkylineTexture(city: 'london' | 'dc' | 'dubai') {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    // Reduced resolution slightly (2048 -> 1024) for performance. 
    // In fog, you can't tell the difference.
    canvas.width = 1024; 
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.scale(0.5, 0.5); // Adjust scale for the lower res canvas
    ctx.clearRect(0, 0, 2048, 1024);
    
    ctx.shadowBlur = 0; // Removing shadowBlur saves massive CPU time during generation
    ctx.fillStyle = "#ffffff";

    if (city === 'london') {
        ctx.fillRect(0, 950, 2048, 74); 
        ctx.beginPath(); ctx.moveTo(600, 950); ctx.lineTo(700, 200); ctx.lineTo(800, 950); ctx.fill();
        ctx.beginPath(); ctx.ellipse(1200, 950, 100, 400, 0, Math.PI, 0); ctx.fill();
        ctx.lineWidth = 40; ctx.strokeStyle = "#ffffff"; ctx.beginPath(); ctx.arc(300, 800, 150, 0, Math.PI * 2); ctx.stroke();
    } 
    else if (city === 'dc') {
        ctx.fillRect(0, 900, 2048, 124);
        ctx.beginPath(); ctx.arc(1024, 900, 180, Math.PI, 0); ctx.fill(); ctx.fillRect(1000, 680, 48, 50);
        ctx.beginPath(); ctx.moveTo(400, 900); ctx.lineTo(430, 300); ctx.lineTo(460, 900); ctx.fill();
        ctx.fillRect(1500, 800, 300, 100);
    } 
    else if (city === 'dubai') {
        ctx.fillRect(0, 980, 2048, 44); 
        ctx.fillRect(980, 200, 88, 800); ctx.fillRect(1000, 50, 48, 150); 
        ctx.fillRect(800, 600, 60, 400); ctx.fillRect(1200, 700, 60, 300);
        ctx.beginPath(); ctx.moveTo(1600, 980); ctx.quadraticCurveTo(1700, 500, 1600, 400); ctx.lineTo(1800, 980); ctx.fill();
        ctx.fillRect(400, 500, 100, 480);
    }

    const tex = new CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [city]);
}

function CityBillboard({ type, z, scale, color }: { type: 'london' | 'dc' | 'dubai', z: number, scale: number[], color: string }) {
    const texture = useSkylineTexture(type);
    
    return (
        <group position={[0, -20, z]}>
            <Float speed={1} rotationIntensity={0.01} floatIntensity={0.05}>
                <mesh>
                    <planeGeometry args={[scale[0], scale[1]]} />
                    <meshBasicMaterial 
                        map={texture} 
                        transparent 
                        opacity={0.85} 
                        color={color}
                        alphaTest={0.01} 
                        side={THREE.DoubleSide}
                        depthWrite={false} 
                    />
                </mesh>
            </Float>
        </group>
    );
}

// --- 2. SCENE DIRECTOR ---
function Scene({ dpr }: { dpr: number }) {
  const { scrollYProgress } = useScroll();
  const { camera, scene } = useThree();

  useFrame(() => {
    const scroll = scrollYProgress.get();
    const targetZ = -scroll * 1000;
    
    // Only update camera if moving (Minor optimization)
    if (Math.abs(camera.position.z - targetZ) > 0.1) {
        camera.position.z += (targetZ - camera.position.z) * 0.03;
    }
    
    // Breathing motion
    const time = Date.now() * 0.0001;
    camera.position.x = Math.sin(time) * 1;
    camera.position.y = Math.sin(time * 2) * 0.5;
    
    // Fog Logic
    const z = Math.abs(camera.position.z);
    let fogColor = new Color("#000000");
    if (z < 300) fogColor.lerp(new Color("#0a1016"), 0.5); 
    else if (z < 700) fogColor.lerp(new Color("#151515"), 0.8); 
    else fogColor.lerp(new Color("#1a1205"), 0.8); 

    scene.fog = new FogExp2(fogColor, 0.01);
    scene.background = fogColor;
  });

  return (
    <>
      {/* Reduced Star Count (5000 -> 1500) */}
      <Stars radius={300} depth={50} count={1500} factor={4} saturation={0} fade speed={0.2} />
      <Environment preset="night" />

      {/* LONDON */}
      <CityBillboard type="london" z={-150} scale={[250, 125, 1]} color="#8899aa" />
      {/* Reduced Cloud Opacity segments for performance */}
      <Cloud position={[0, 0, -100]} opacity={0.15} speed={0.1} width={20} depth={1} segments={10} />

      {/* DC */}
      <CityBillboard type="dc" z={-500} scale={[300, 150, 1]} color="#dddddd" />
      <Cloud position={[0, 0, -450]} opacity={0.15} speed={0.1} width={20} depth={1} segments={10} />

      {/* DUBAI */}
      <CityBillboard type="dubai" z={-900} scale={[250, 250, 1]} color="#cc9966" />
      <Cloud position={[0, 0, -800]} opacity={0.15} speed={0.1} width={20} depth={1} segments={10} />
    </>
  );
}

export default function CinematicBackground() {
  const [dpr, setDpr] = useState(1); // Default to 1 (Fastest)

  return (
    <div className="fixed inset-0 z-0 bg-ark-bg">
      <Canvas 
        // 3. CAP PIXEL RATIO: Never go above 1.5, even on retina
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ 
            antialias: false, // Post-processing handles smoothing, so native AA is waste
            powerPreference: "high-performance",
            stencil: false,
            depth: true 
        }}
      >
        {/* Automatic Performance Tuner */}
        <PerformanceMonitor onIncline={() => setDpr(1.5)} onDecline={() => setDpr(1)} />
        
        <Scene dpr={dpr} />
        
        <EffectComposer disableNormalPass multisampling={0}> 
            {/* Multisampling={0} is the KEY to fixing lag */}
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.0} radius={0.5} levels={4} />
            <Noise opacity={0.1} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-ark-bg/40 via-transparent to-ark-bg/40" />
    </div>
  );
}