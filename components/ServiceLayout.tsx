'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ServiceLayoutProps {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  isReversed?: boolean; 
  index?: number; 
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
    <section id={id} className="relative py-40 overflow-hidden">
      
      {/* 1. DECORATIVE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[5%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        <div className="absolute right-[5%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className={`flex flex-col lg:flex-row gap-20 lg:gap-32 items-start ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* --- COLUMN 1: THE STRATEGIC CONTENT --- */}
          <div className="lg:w-1/2 relative">
            
            {/* Section Index & Line */}
            <motion.div 
               initial={{ opacity: 0, height: 0 }}
               whileInView={{ opacity: 1, height: '100%' }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className={`absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#cc9966]/50 via-white/10 to-transparent ${isReversed ? '-right-12' : '-left-12'} hidden lg:block`}
            >
               <span className="absolute top-0 -left-2 text-[10px] font-mono text-[#cc9966] bg-[#050505] py-2">
                 0{index}
               </span>
            </motion.div>

            <div className="space-y-12">
                {/* Header Group */}
                <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4"
                    >
                        <div className="h-[1px] w-8 bg-[#cc9966]" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#cc9966]">
                            Strategic Context
                        </span>
                    </motion.div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-serif text-white leading-[1.05] tracking-tight"
                    >
                        {title}
                    </motion.h2>
                </div>

                {/* The "Briefing Document" Text Block */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative pl-8 border-l border-white/10"
                >
                    {/* Active Reading Marker */}
                    <div className="absolute left-[-1px] top-0 h-12 w-[1px] bg-[#cc9966]" />
                    
                    <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed whitespace-pre-line">
                        {description}
                    </p>
                </motion.div>

                {/* CAPABILITIES / ACTION ITEMS */}
                <div className="pt-4">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-6">
                        Operational Capabilities
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {capabilities.map((cap, i) => (
                        <motion.div
                          key={cap}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + (i * 0.05) }}
                          className="group flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 hover:border-[#cc9966]/30 hover:bg-white/[0.05] transition-all duration-300"
                        >
                           <div className="flex items-center gap-3">
                               <CheckCircle2 size={14} className="text-[#cc9966] opacity-60 group-hover:opacity-100 transition-opacity" />
                               <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                                   {cap}
                               </span>
                           </div>
                           <ArrowUpRight size={14} className="text-white/20 group-hover:text-[#cc9966] transition-colors" />
                        </motion.div>
                      ))}
                    </div>
                </div>
            </div>
          </div>

          {/* --- COLUMN 2: THE VISUAL ENGINE --- */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end sticky top-32">
             <div className="relative w-full aspect-square max-w-[600px] flex items-center justify-center">
                
                {/* Background Radar Rings */}
                <div className="absolute inset-0 border border-white/5 rounded-full" />
                <div className="absolute inset-[20%] border border-white/5 rounded-full" />
                
                {/* Animated Orbital Rings */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[10%] border border-dashed border-white/10 rounded-full"
                />
                 <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[30%] border border-white/10 rounded-full opacity-30"
                    style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
                />

                {/* Central Motif */}
                <div className="relative z-10 w-40 h-40 flex items-center justify-center bg-[#050505] border border-white/10 rounded-full shadow-[0_0_60px_rgba(204,153,102,0.05)]">
                    <div className="w-32 h-32 border border-[#cc9966]/20 rounded-full flex items-center justify-center relative">
                        {/* Core Pulse */}
                        <div className="w-2 h-2 bg-[#cc9966] rounded-full animate-pulse shadow-[0_0_10px_#cc9966]" />
                        
                        {/* Scanning Line */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full"
                            style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(204,153,102,0.1) 60deg, transparent 60deg)' }}
                        />
                    </div>
                </div>

                {/* Network Lines */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                </div>
                
                {/* Floating Label */}
                <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[15%] right-[15%] px-3 py-1.5 border border-[#cc9966]/30 bg-[#0a0a0a]"
                >
                    <span className="text-[9px] font-mono text-[#cc9966] tracking-widest uppercase">
                        {isReversed ? 'MARKET_ENTRY_PROTOCOL' : 'SOVEREIGN_CAPABILITY'}
                    </span>
                </motion.div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
}