'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// DATA STRUCTURE
const leaders = [
  {
    id: 1,
    name: "Antonio Correa",
    title: "Partner",
    image: "/Antonio.png", // Make sure this file exists in /public
  },
  {
    id: 2,
    name: "Arthur Ronchetti",
    title: "Partner",
    image: "/Arthur.png", // Make sure this file exists in /public
  },
  {
    id: 3,
    name: "Andre Meyers",
    title: "Partner",
    image: "/Andre.png", // Make sure this file exists in /public
  }
];

// REGIONS (Ticker)
const regions = [
  "United Kingdom", "Gulf Cooperation Council", "Europe", "Africa", "Asia-Pacific", "Americas"
];

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-32 border-t border-white/10 overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* 1. SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
                <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif text-white tracking-tight"
                >
                    Leadership
                </motion.h2>
                <div className="h-[2px] w-24 bg-[#cc9966]" />
            </div>

            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-white/60 text-lg font-light max-w-xl leading-relaxed"
            >
               Our team combines decades of experience across military service, government, and international business. We bring operational credibility to every engagement.
            </motion.p>
        </div>

        {/* 2. THE TICKER */}
        <div className="mb-24 border-y border-white/5 bg-white/[0.02]">
            <div className="flex overflow-hidden whitespace-nowrap mask-image-linear-gradient(to right, transparent, black, transparent)">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                    className="flex items-center py-4"
                >
                    {[...regions, ...regions, ...regions].map((region, i) => (
                        <div key={i} className="flex items-center gap-12 px-6">
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
                                {region}
                            </span>
                            <div className="flex items-center gap-1">
                                <div className="w-1 h-1 rounded-full bg-[#cc9966]/40" />
                                <div className="w-8 h-[1px] bg-white/10" />
                                <div className="w-1 h-1 rounded-full bg-[#cc9966]/40" />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>

        {/* 3. THE PARTNERSHIP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* IMAGE FRAME */}
              <div className="w-full aspect-[3/4] mb-6 relative overflow-hidden bg-[#111] border border-white/5 group-hover:border-[#cc9966]/50 transition-colors duration-500">
                  
                  {/* The Image */}
                  <Image 
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                  />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />

                  {/* Hover Scan Line */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#cc9966] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>

              {/* TEXT CONTENT */}
              <div className="space-y-2 border-l border-white/10 pl-4 group-hover:border-[#cc9966] transition-colors duration-300">
                 <h3 className="text-2xl font-serif text-white group-hover:text-[#cc9966] transition-colors duration-300">
                    {leader.name}
                 </h3>
                 
                 <div className="text-xs font-mono uppercase tracking-widest text-white/50">
                    {leader.title}
                 </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}