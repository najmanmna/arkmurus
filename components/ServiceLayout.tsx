'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ServiceLayoutProps {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  isReversed?: boolean; // If true, text is on the right
}

export default function ServiceLayout({ 
  id, 
  title, 
  description, 
  capabilities, 
  isReversed = false 
}: ServiceLayoutProps) {
  
  return (
    <section id={id} className="relative py-32  border-t border-white/5 overflow-hidden">
      
      {/* BACKGROUND GLOW (Subtle ambient light) */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ark-blue/10 rounded-full blur-[120px] pointer-events-none ${isReversed ? 'right-0' : 'left-0'}`} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* COLUMN 1: TEXT CONTENT */}
          <div className="lg:w-1/2 space-y-8">
            <motion.h2 
              initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-white tracking-tight"
            >
              {title}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400 font-sans leading-relaxed"
            >
              {description}
            </motion.p>

            {/* THE "CAPABILITIES" GRID (Not bullet points) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  className="group flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300"
                >
                  {/* Tiny Accent Square */}
                  <div className="w-1.5 h-1.5 bg-ark-gold/50 group-hover:bg-ark-gold transition-colors" />
                  <span className="text-sm font-sans text-gray-300 tracking-wide">
                    {cap}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: ABSTRACT VISUAL (The "Network") */}
          <div className="lg:w-1/2 w-full flex justify-center">
             <div className="relative w-full aspect-square max-w-[500px]">
                {/* Abstract 'Radar' Circles */}
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 border border-white/5 rounded-full border-dashed"
                />
                <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[10%] border border-white/10 rounded-full"
                />
                <motion.div 
                   animate={{ scale: [1, 1.05, 1] }}
                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute inset-[25%] bg-gradient-to-br from-ark-blue/20 to-transparent rounded-full blur-2xl"
                />
                
                {/* Central Motif */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-xs font-sans uppercase tracking-[0.3em] text-white/20">
                    {isReversed ? 'Market Access' : 'Sovereign Capability'}
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}