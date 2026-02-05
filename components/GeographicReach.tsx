'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Crosshair, MapPin, Wifi, Globe, Activity } from 'lucide-react';

// --- DATA: STRATEGIC REGIONS ---
const theatres = [
  { 
    id: "UK", 
    name: "United Kingdom", 
    status: "Operational HQ", 
    cx: 47, cy: 26, 
    description: "Primary legal jurisdiction and strategic command centre for global operations." 
  },
  { 
    id: "GCC", 
    name: "Gulf Cooperation Council", 
    status: "Strategic Hub", 
    cx: 58, cy: 42, 
    description: "Deep-rooted network across the Middle East, facilitating sovereign fund liaison and defence procurement." 
  },
  { 
    id: "EU", 
    name: "Europe", 
    status: "Partner Network", 
    cx: 51, cy: 30, 
    description: "Established defence market coverage across key NATO industrial bases and regulatory frameworks." 
  },
  { 
    id: "AFR", 
    name: "Africa", 
    status: "Emerging Market", 
    cx: 53, cy: 55, 
    description: "Navigating complex operational theatres for resource security and infrastructure development." 
  },
  { 
    id: "APAC", 
    name: "Asia-Pacific", 
    status: "Growth Sector", 
    cx: 78, cy: 45, 
    description: "High-growth region for maritime security, technology partnerships, and industrial cooperation." 
  },
  { 
    id: "AME", 
    name: "Americas", 
    status: "Established", 
    cx: 28, cy: 35, 
    description: "Liaison office for Foreign Military Sales (FMS) cases and North American federal procurement." 
  },
];

// --- HIGH-DENSITY MAP DATA (The "Satellite Scan") ---
const mapDots = [
  // NORTH AMERICA (Canada/Alaska)
  {x: 100, y: 100}, {x: 120, y: 90}, {x: 140, y: 85}, {x: 160, y: 80}, {x: 190, y: 80}, {x: 220, y: 80}, {x: 250, y: 85}, {x: 280, y: 90},
  {x: 110, y: 110}, {x: 130, y: 110}, {x: 150, y: 105}, {x: 180, y: 100}, {x: 210, y: 100}, {x: 240, y: 105}, {x: 270, y: 110},
  // USA
  {x: 130, y: 130}, {x: 150, y: 125}, {x: 170, y: 120}, {x: 200, y: 120}, {x: 230, y: 120}, {x: 260, y: 125},
  {x: 140, y: 150}, {x: 160, y: 145}, {x: 180, y: 140}, {x: 210, y: 140}, {x: 240, y: 140}, {x: 260, y: 145},
  {x: 160, y: 165}, {x: 190, y: 160}, {x: 220, y: 160}, {x: 240, y: 160}, {x: 210, y: 170},
  // Central America
  {x: 200, y: 190}, {x: 220, y: 200}, {x: 230, y: 215}, {x: 240, y: 225},

  // SOUTH AMERICA
  {x: 260, y: 240}, {x: 280, y: 240}, {x: 300, y: 250}, {x: 320, y: 260}, {x: 330, y: 270},
  {x: 270, y: 260}, {x: 290, y: 270}, {x: 310, y: 280}, {x: 330, y: 290},
  {x: 280, y: 290}, {x: 300, y: 300}, {x: 320, y: 310}, {x: 340, y: 300},
  {x: 290, y: 320}, {x: 310, y: 330}, {x: 320, y: 340},
  {x: 300, y: 350}, {x: 315, y: 360}, {x: 310, y: 380}, {x: 315, y: 400}, {x: 320, y: 420},

  // EUROPE
  {x: 450, y: 100}, {x: 470, y: 95}, {x: 490, y: 95}, {x: 460, y: 120}, {x: 480, y: 115}, {x: 500, y: 110},
  {x: 450, y: 140}, {x: 470, y: 135}, {x: 490, y: 130}, {x: 510, y: 130}, {x: 530, y: 130},
  {x: 460, y: 155}, {x: 480, y: 150}, {x: 500, y: 150}, {x: 520, y: 145}, {x: 540, y: 145},
  {x: 470, y: 170}, {x: 490, y: 165}, {x: 510, y: 165}, {x: 530, y: 160},

  // AFRICA
  {x: 460, y: 200}, {x: 480, y: 200}, {x: 500, y: 195}, {x: 520, y: 195}, {x: 540, y: 195}, {x: 560, y: 200},
  {x: 450, y: 220}, {x: 470, y: 220}, {x: 490, y: 220}, {x: 510, y: 220}, {x: 530, y: 220}, {x: 550, y: 220}, {x: 570, y: 225},
  {x: 460, y: 240}, {x: 480, y: 240}, {x: 500, y: 240}, {x: 520, y: 240}, {x: 540, y: 240}, {x: 560, y: 240}, {x: 580, y: 235},
  {x: 470, y: 260}, {x: 490, y: 260}, {x: 510, y: 260}, {x: 530, y: 260}, {x: 550, y: 260},
  {x: 480, y: 280}, {x: 500, y: 280}, {x: 520, y: 280}, {x: 540, y: 280}, {x: 560, y: 275},
  {x: 490, y: 300}, {x: 510, y: 300}, {x: 530, y: 300}, {x: 550, y: 295},
  {x: 500, y: 320}, {x: 520, y: 320}, {x: 540, y: 315},
  {x: 510, y: 340}, {x: 530, y: 335}, {x: 520, y: 360}, {x: 530, y: 380},

  // ASIA (Russia/China)
  {x: 550, y: 100}, {x: 580, y: 95}, {x: 610, y: 90}, {x: 640, y: 90}, {x: 670, y: 90}, {x: 700, y: 95}, {x: 730, y: 100}, {x: 760, y: 105},
  {x: 560, y: 120}, {x: 590, y: 115}, {x: 620, y: 110}, {x: 650, y: 110}, {x: 680, y: 110}, {x: 710, y: 115}, {x: 740, y: 120}, {x: 770, y: 125}, {x: 800, y: 120},
  {x: 570, y: 140}, {x: 600, y: 135}, {x: 630, y: 130}, {x: 660, y: 130}, {x: 690, y: 130}, {x: 720, y: 135}, {x: 750, y: 140}, {x: 780, y: 140},
  {x: 600, y: 155}, {x: 630, y: 150}, {x: 660, y: 150}, {x: 690, y: 150}, {x: 720, y: 150}, {x: 750, y: 155}, {x: 780, y: 160}, {x: 810, y: 150},
  {x: 620, y: 170}, {x: 650, y: 170}, {x: 680, y: 170}, {x: 710, y: 170}, {x: 740, y: 175}, {x: 770, y: 180}, {x: 800, y: 170},

  // ASIA (India/SE Asia)
  {x: 600, y: 190}, {x: 630, y: 190}, {x: 660, y: 190}, {x: 690, y: 190}, {x: 720, y: 195}, {x: 750, y: 200}, {x: 780, y: 200},
  {x: 620, y: 210}, {x: 640, y: 220}, {x: 660, y: 225}, // India
  {x: 700, y: 210}, {x: 730, y: 215}, {x: 760, y: 220}, {x: 790, y: 210}, // SE Asia
  {x: 720, y: 235}, {x: 740, y: 245}, {x: 760, y: 250}, {x: 780, y: 240}, // Indonesia/Malaysia

  // OCEANIA / AUSTRALIA
  {x: 780, y: 300}, {x: 810, y: 300}, {x: 840, y: 300},
  {x: 770, y: 320}, {x: 800, y: 320}, {x: 830, y: 320}, {x: 860, y: 310},
  {x: 780, y: 340}, {x: 810, y: 340}, {x: 840, y: 340},
  {x: 790, y: 360}, {x: 820, y: 360}, {x: 830, y: 380},
  {x: 880, y: 360}, {x: 900, y: 370}, // NZ
];

export default function GeographicReach() {
  const [activeRegion, setActiveRegion] = useState(theatres[0]); 

  return (
    <section id="geographic-reach" className="relative py-32 border-t border-white/5 bg-[#080808] overflow-hidden">
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- 1. HEADER SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20 items-end">
            
            <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3 text-[#cc9966]">
                    <Globe size={18} strokeWidth={1.5} />
                    <span className="text-xs font-mono uppercase tracking-[0.2em]">Geographic Reach</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[0.9]">
                    Worldwide.
                </h2>
            </div>

            <div className="lg:col-span-7">
                <div className="border-l border-white/10 pl-8 space-y-6">
                    <p className="text-lg text-white/80 font-light leading-relaxed">
                        Arkmurus has established a network of trusted government and commercial contacts across the globe. We are experienced in matching clients with opportunities and partners who can advance their objectives in a range of markets.
                    </p>
                    <p className="text-base text-gray-500 font-sans leading-relaxed max-w-2xl">
                        From established defence markets in Europe and North America to high-growth regions across the Middle East, Africa, and Asia-Pacific, our reach extends from mature regulatory environments to some of the most challenging operational theatres.
                    </p>
                </div>
            </div>
        </div>

        {/* --- 2. INTERACTIVE MAP INTERFACE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* LEFT: THE MAP (Span 8) */}
            <div className="lg:col-span-8 relative aspect-[1.8/1] bg-[#0c0c0c] border border-white/5 rounded-sm overflow-hidden group">
                
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
                />
                
                {/* Point Cloud Map */}
                <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full pointer-events-none">
                    {mapDots.map((dot, i) => (
                        <circle 
                            key={i} 
                            cx={dot.x} 
                            cy={dot.y} 
                            r={1.5} 
                            className="fill-white/20"
                        />
                    ))}
                    {/* Decorative Data Lines */}
                    <path d="M490,120 L580,100" className="stroke-white/5" strokeWidth="1" />
                    <path d="M240,90 L460,130" className="stroke-white/5" strokeWidth="1" />
                    <path d="M530,310 L780,360" className="stroke-white/5" strokeWidth="1" />
                </svg>

                {/* Interactive Beacons */}
                {theatres.map((region) => (
                    <button
                        key={region.id}
                        onClick={() => setActiveRegion(region)}
                        onMouseEnter={() => setActiveRegion(region)}
                        className="absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center group/beacon focus:outline-none z-20 cursor-crosshair"
                        style={{ left: `${region.cx}%`, top: `${region.cy}%` }}
                    >
                        {/* Ping Effect */}
                        <span className={`absolute inline-flex h-full w-full rounded-full bg-[#cc9966] opacity-0 group-hover/beacon:opacity-20 animate-ping duration-1000 ${activeRegion.id === region.id ? 'opacity-20' : ''}`} />
                        
                        {/* Center Dot */}
                        <span className={`relative inline-flex rounded-full transition-all duration-300 ${activeRegion.id === region.id ? 'h-3 w-3 bg-[#cc9966] shadow-[0_0_15px_#cc9966]' : 'h-1.5 w-1.5 bg-white/40 group-hover/beacon:bg-white'}`} />
                        
                        {/* Target Reticle (Only active) */}
                        {activeRegion.id === region.id && (
                             <motion.div 
                                layoutId="reticle"
                                className="absolute w-8 h-8 border border-[#cc9966]/50 rounded-full"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                             />
                        )}
                    </button>
                ))}

                {/* Scanning Laser */}
                <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#cc9966]/40 to-transparent animate-[scan_6s_linear_infinite]" />
            </div>


            {/* RIGHT: THE DATA TERMINAL (Span 4) */}
            <div className="lg:col-span-4 bg-[#0c0c0c] border border-white/5 p-8 lg:p-10 flex flex-col relative overflow-hidden">
                
                {/* Top Active Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#cc9966]" />

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeRegion.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="h-full flex flex-col"
                    >
                        {/* Status Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-2 py-1 bg-[#cc9966]/10 border border-[#cc9966]/20 text-[10px] font-mono text-[#cc9966] uppercase tracking-widest">
                                {activeRegion.id}
                            </span>
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                                <Activity size={10} className="text-[#cc9966]" />
                                Status: {activeRegion.status}
                            </span>
                        </div>

                        {/* Region Name */}
                        <h3 className="text-3xl lg:text-4xl font-serif text-white mb-6">
                            {activeRegion.name}
                        </h3>

                        <div className="w-12 h-[1px] bg-white/10 mb-6" />

                        {/* Description */}
                        <p className="text-base text-gray-400 font-light leading-relaxed mb-auto">
                            {activeRegion.description}
                        </p>

                        {/* Technical Data Footer */}
                        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
                            <div>
                                <span className="text-[9px] text-white/20 uppercase tracking-widest block mb-1">Latency</span>
                                <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                                    <Wifi size={12} /> 12ms
                                </div>
                            </div>
                            <div>
                                <span className="text-[9px] text-white/20 uppercase tracking-widest block mb-1">Coordinates</span>
                                <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                                    <Crosshair size={12} /> {activeRegion.cx}.{activeRegion.cy}
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </AnimatePresence>

                {/* Subtle Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
            </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes scan {
            0% { left: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}