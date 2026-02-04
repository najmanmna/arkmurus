'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export default function CityscapeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  
  // We use a ref to store scroll progress so the Canvas loop can access it instantly
  const scrollRef = useRef(0);

  // Sync Framer Motion scroll to our Ref
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    scrollRef.current = latest;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // --- CONFIGURATION ---
    const particleCount = 200; 
    const buildingsCount = 15;
    
    // State to track animation logic
    const particles: Particle[] = [];
    const buildings: Building[] = [];

    // --- CLASS 1: REACTIVE PARTICLES ---
    class Particle {
      x: number;
      y: number;
      size: number;
      baseSpeedX: number;
      baseSpeedY: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2;
        this.baseSpeedX = (Math.random() - 0.5) * 0.5;
        this.baseSpeedY = (Math.random() - 0.5) * 0.5;
      }

      update(scroll: number) {
        // REACTIVE PHYSICS:
        // As you scroll down (scroll increases), particles move faster downwards
        // simulating a "descent" or "warp" effect.
        const speedMultiplier = 1 + (scroll * 5); // Speed increases up to 5x
        
        this.x += this.baseSpeedX * speedMultiplier;
        this.y += (this.baseSpeedY + (scroll * 2)); // Add vertical drop based on scroll

        // Loop screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(scroll: number) {
        if (!ctx) return;
        
        // REACTIVE COLOR:
        // 0.0 - 0.3 (Hero): Cool Blue (Strategic)
        // 0.3 - 0.6 (Services): Gold Tint (Value/Money)
        // 0.6 - 1.0 (Contact): White/Grey (Structured)
        
        let r, g, b;
        
        if (scroll < 0.3) {
            // Blue Zone
            r = 100; g = 150; b = 255; 
        } else if (scroll < 0.7) {
            // Gold Transition
            r = 200; g = 180; b = 100; 
        } else {
            // White/Clean
            r = 200; g = 200; b = 220;
        }

        const opacity = 0.2 + (Math.random() * 0.3);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- CLASS 2: DYNAMIC BUILDINGS ---
    class Building {
        x: number;
        w: number;
        h: number;
        speed: number;
        
        constructor() {
            this.x = Math.random() * width;
            this.w = 50 + Math.random() * 150;
            this.h = height * 0.2 + Math.random() * (height * 0.5); 
            this.speed = 0.2 + Math.random() * 0.5;
        }

        update(scroll: number) {
            // Parallax moves faster as you scroll
            this.x -= this.speed * (1 + scroll * 2); 
            if (this.x + this.w < 0) this.x = width;
        }

        draw(scroll: number) {
            if (!ctx) return;
            
            // REACTIVE HEIGHT:
            // As you scroll, buildings "rise" visually (camera goes down)
            const apparentHeight = this.h * (1 + scroll * 0.5);
            
            // Dynamic Gradient based on section
            const grad = ctx.createLinearGradient(this.x, height, this.x, height - apparentHeight);
            
            if (scroll < 0.4) {
                // Hero: Dark Navy base
                grad.addColorStop(0, 'rgba(10, 15, 26, 1)'); 
                grad.addColorStop(1, 'rgba(74, 111, 165, 0.05)'); 
            } else {
                // Services: Darker, sharper
                grad.addColorStop(0, 'rgba(5, 8, 15, 1)'); 
                grad.addColorStop(1, 'rgba(197, 160, 89, 0.05)'); // Hint of Gold
            }

            ctx.fillStyle = grad;
            ctx.fillRect(this.x, height - apparentHeight, this.w, apparentHeight);
            
            // Border Wireframe
            ctx.strokeStyle = scroll < 0.4 ? 'rgba(74, 111, 165, 0.1)' : 'rgba(197, 160, 89, 0.1)';
            ctx.lineWidth = 1;
            ctx.strokeRect(this.x, height - apparentHeight, this.w, apparentHeight);
        }
    }

    // Init
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    for (let i = 0; i < buildingsCount; i++) buildings.push(new Building());

    // --- ANIMATION LOOP ---
    function animate() {
      if (!ctx || !canvas) return;
      
      const scroll = scrollRef.current; // Get live scroll value (0.0 to 1.0)

      // Trail Effect:
      // We clear the screen with a semi-transparent black.
      // High scroll = Less opacity (Longer trails/Warp speed look)
      const clearOpacity = 0.2 - (scroll * 0.1); 
      ctx.fillStyle = `rgba(10, 15, 26, ${clearOpacity})`;
      ctx.fillRect(0, 0, width, height);

      // Draw Buildings
      buildings.forEach(b => {
          b.update(scroll);
          b.draw(scroll);
      });

      // Draw Particles
      particles.forEach(p => {
        p.update(scroll);
        p.draw(scroll);
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-ark-bg">
        <canvas ref={canvasRef} className="block w-full h-full" />
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0f1a_100%)] pointer-events-none" />
    </div>
  );
}