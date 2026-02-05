'use client';

import { motion } from 'framer-motion';
import { Globe, Crosshair, MapPin, Wifi } from 'lucide-react';
import { useState } from 'react';

// Enhanced Data Model
const theatres = [
  { id: "UK", name: "United Kingdom", status: "Operational HQ", coords: "51.50N  0.12W", type: "Primary" },
  { id: "GCC", name: "GCC Region", status: "High Activity", coords: "25.35N  55.40E", type: "Strategic" },
  { id: "EU", name: "Europe", status: "Partner Network", coords: "48.85N  2.35E", type: "Alliance" },
  { id: "AFR", name: "Africa", status: "Emerging Market", coords: "09.10N  07.53E", type: "Growth" },
  { id: "APAC", name: "Asia-Pacific", status: "Sector Growth", coords: "01.35N  103.8E", type: "Expansion" },
  { id: "AME", name: "Americas", status: "Established", coords: "38.90N  77.03W", type: "Primary" }
];

// --- 1. ABSTRACT WORLD MAP BACKGROUND ---
// A programmed dot-matrix map that sits behind the content
const WorldMapBackground = () => (
  <div className="absolute inset-0 z-0 opacity-20 pointer-events-none select-none overflow-hidden">
     {/* Grid Lines */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
    
    {/* Abstract Continents (Circles representing density) */}
    {/* UK/Europe */}
    <div className="absolute top-[30%] left-[48%] w-32 h-32 bg-white/5 rounded-full blur-3xl" />
    {/* Americas */}
    <div className="absolute top-[35%] left-[25%] w-40 h-40 bg-white/5 rounded-full blur-3xl" />
    {/* Asia */}
    <div className="absolute top-[40%] left-[70%] w-48 h-48 bg-white/5 rounded-full blur-3xl" />
  </div>
);

export default function GeographicReach() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <section id="geographic-reach" className="relative py-32 border-t border-white/5 overflow-hidden ">
      
      <WorldMapBackground />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-6 max-w-2xl">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex items-center gap-3 text-[#cc9966]"
            >
               <Globe size={18} strokeWidth={1.5} />
               <span className="text-xs font-mono uppercase tracking-[0.2em]">Global Theatres</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-serif text-white tracking-tight"
            >
              Operational <br /> <span className="text-white/30">Reach.</span>
            </motion.h2>
          </div>

          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-white/60 text-sm md:text-base font-sans max-w-md leading-relaxed border-l border-white/10 pl-6"
          >
            We maintain active networks across key geopolitical zones, facilitating seamless market entry and government liaison in complex regulatory environments.
          </motion.p>
        </div>

        {/* --- THE HUD GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {theatres.map((region, idx) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              className="group relative h-48 bg-[#111] border border-white/5 hover:border-[#cc9966]/50 transition-colors duration-500 overflow-hidden"
            >
              
              {/* 1. HOVER SCAN LINE */}
              <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#cc9966] to-transparent opacity-0 group-hover:opacity-100 group-hover:left-[100%] transition-all duration-1000 ease-in-out" />
              
              {/* 2. BACKGROUND DATA NOISE */}
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity" 
                   style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent)', backgroundSize: '30px 30px' }}
              />

              <div className="relative p-6 h-full flex flex-col justify-between z-10">
                
                {/* TOP ROW: Status Beacon & Coordinates */}
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-3">
                      {/* The "Beacon" */}
                      <div className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cc9966] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${region.type === 'Primary' ? 'bg-[#cc9966]' : 'bg-white/20 group-hover:bg-[#cc9966]'} transition-colors duration-300`} />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">
                        {region.status}
                      </span>
                   </div>
                   
                   <Crosshair size={14} className="text-white/20 group-hover:text-[#cc9966] transition-colors" />
                </div>

                {/* MIDDLE: Region Name */}
                <div>
                   <h3 className="text-2xl font-serif text-white group-hover:translate-x-2 transition-transform duration-500">
                     {region.name}
                   </h3>
                   <div className="h-[1px] w-12 bg-[#cc9966]/30 mt-4 group-hover:w-full transition-all duration-700 ease-out" />
                </div>

                {/* BOTTOM: Coordinates Data */}
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-white/30 uppercase tracking-widest mb-1">Coordinates</span>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#cc9966]">
                            <MapPin size={10} />
                            {region.coords}
                        </div>
                    </div>
                    
                    {/* Signal Strength Icon */}
                    <Wifi size={14} className="text-white/10 group-hover:text-white/40" />
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}