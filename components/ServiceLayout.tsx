'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ServiceLayoutProps {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  isReversed?: boolean; 
  index?: number; // Added to handle section numbering (01, 02)
}

export default function ServiceLayout({ 
  id, 
  title, 
  description, 
  capabilities, 
  isReversed = false,
  index = 1
}: ServiceLayoutProps) {
  
  return (
    <section id={id} className="relative py-32 overflow-hidden">
      
      {/* 1. DECORATIVE BACKGROUND ELEMENTS */}
      {/* A very subtle vertical grid line to anchor the page */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className={`flex flex-col lg:flex-row gap-20 lg:gap-32 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* --- COLUMN 1: THE STRATEGIC CONTENT --- */}
          <div className="lg:w-1/2 space-y-10 relative">
            
            {/* Section Numbering (The "Dossier" Look) */}
            <div className="absolute -left-12 top-2 hidden lg:flex flex-col items-center gap-4">
               <span className="text-[10px] font-mono text-[#cc9966]">0{index}</span>
               <div className="w-[1px] h-12 bg-gradient-to-b from-[#cc9966] to-transparent" />
            </div>

            <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                    <div className="h-[1px] w-12 bg-[#cc9966]" />
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#cc9966]">
                        Core Competency
                    </span>
                </motion.div>

                <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-serif text-white leading-[1.1]"
                >
                {title}
                </motion.h2>

                <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/60 font-light leading-relaxed max-w-xl border-l border-white/10 pl-6"
                >
                {description}
                </motion.p>
            </div>

            {/* THE "DATA GRID" (Capabilities) */}
            <div className="grid grid-cols-1 gap-3 pt-6">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.05) }}
                  className="group relative overflow-hidden"
                >
                  {/* The Card Background */}
                  <div className="relative flex items-center justify-between p-5 bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm transition-all duration-500 group-hover:bg-[#cc9966]/10 group-hover:border-[#cc9966]/30">
                    
                    {/* Hover Glow Line (Left) */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#cc9966] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-white/20 group-hover:text-[#cc9966] transition-colors">
                            0{i + 1}
                        </span>
                        <span className="text-sm font-medium tracking-wide text-white/80 group-hover:text-white transition-colors">
                            {cap}
                        </span>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#cc9966] transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- COLUMN 2: THE VISUAL (Strategic Map) --- */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
             <div className="relative w-full aspect-square max-w-[600px] flex items-center justify-center">
                
                {/* 1. Base Grid (Static) */}
                <div className="absolute inset-0 border border-white/5 rounded-full" />
                <div className="absolute inset-[15%] border border-white/5 rounded-full" />
                
                {/* 2. Rotating Orbits (Slow, Kinetic) */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[5%] border border-dashed border-white/10 rounded-full"
                />
                 <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[25%] border border-white/10 rounded-full opacity-40"
                    style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
                />

                {/* 3. The "Node" (Central Intelligence) */}
                <div className="relative z-10 w-32 h-32 flex items-center justify-center bg-[#080808] border border-white/10 rounded-full shadow-[0_0_50px_rgba(204,153,102,0.1)]">
                    <div className="w-24 h-24 border border-[#cc9966]/20 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#cc9966] rounded-full animate-pulse" />
                    </div>
                </div>

                {/* 4. Connection Lines (Simulating Network) */}
                {/* These mimic straight lines drawn on a map */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                </div>
                
                {/* 5. Floating Labels (Decor) */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] right-[10%] px-3 py-1 border border-white/10 bg-black/40 backdrop-blur-md"
                >
                    <span className="text-[9px] font-mono text-[#cc9966] tracking-widest">
                        {isReversed ? 'MARKET_ENTRY' : 'POLICY_FRAMEWORK'}
                    </span>
                </motion.div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
}