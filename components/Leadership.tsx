'use client';

import { motion } from 'framer-motion';

// DATA STRUCTURE (Restored from your brief)
const leaders = [
  {
    id: 1,
    name: "Name TBC",
    title: "Managing Partner",
    bio: "Former senior diplomat with 20 years of experience navigating complex inter-governmental negotiations across the Middle East and North Africa."
  },
  {
    id: 2,
    name: "Name TBC",
    title: "Director of Defence",
    bio: "Retired Senior Officer with deep operational expertise in defence procurement, capability development, and strategic military partnerships."
  },
  {
    id: 3,
    name: "Name TBC",
    title: "Head of Strategy",
    bio: "Strategy consultant specializing in market entry and stakeholder mapping for multinational corporations in high-growth operational theatres."
  }
];

// REGIONS (For the Ticker)
const regions = [
  "United Kingdom", "Gulf Cooperation Council", "Europe", "Africa", "Asia-Pacific", "Americas"
];

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-32 border-t border-white/10  overflow-hidden">
      
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

        {/* 2. THE TICKER (Restored & Refined) */}
        {/* Styled like a "Newswire" or "Ticker Tape" - slow and deliberate */}
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
                            {/* Detailed divider */}
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
              {/* IMAGE PLACEHOLDER (Portrait Ratio) */}
              <div className="w-full aspect-[3/4] mb-8 relative overflow-hidden bg-[#111] border border-white/5 group-hover:border-white/10 transition-colors">
                 {/* This represents a professional headshot */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                 
                 {/* "TBC" Silhouette Effect */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                 </div>
                 
                 {/* Hover Effect: Subtle Gold Line */}
                 <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#cc9966] scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>

              {/* TEXT CONTENT */}
              <div className="space-y-3">
                 <h3 className="text-2xl font-serif text-white group-hover:text-[#cc9966] transition-colors duration-300">
                    {leader.name}
                 </h3>
                 
                 <div className="text-xs font-mono uppercase tracking-widest text-white/50 border-b border-white/10 pb-4 mb-4">
                    {leader.title}
                 </div>
                 
                 <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {leader.bio}
                 </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}