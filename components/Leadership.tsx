'use client';

import { motion } from 'framer-motion';

// Placeholder Data 
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

// Regions 
const regions = [
  "United Kingdom", "Gulf Cooperation Council", "Europe", "Africa", "Asia-Pacific", "Americas"
];

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-32  border-t border-white/5 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* 1. SECTION HEADER */}
        <div className="max-w-3xl mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-white mb-8"
          >
            Leadership
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 font-sans leading-relaxed"
          >
            Our team combines decades of experience across military service, government, 
            and international business. We bring operational credibility, strategic insight, 
            and established relationships to every engagement[cite: 72].
          </motion.p>
        </div>

        {/* 2. GEOGRAPHIC REACH TICKER (Connecting People to Places) */}
        <div className="mb-20 py-6 border-y border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-ark-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex overflow-hidden whitespace-nowrap mask-image-linear-gradient(to right, transparent, black, transparent)">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-16 items-center"
            >
              {[...regions, ...regions].map((region, i) => (
                <span key={i} className="text-sm font-sans uppercase tracking-[0.2em] text-gray-500 flex items-center gap-4">
                  {region}
                  <div className="w-1.5 h-1.5 rounded-full bg-ark-gold/30" />
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 3. THE LEADERSHIP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="group relative bg-white/[0.02] border border-white/5 hover:border-ark-gold/30 p-8 transition-colors duration-500"
            >
              {/* Image Placeholder */}
              <div className="w-full aspect-[4/5] bg-gradient-to-b from-white/5 to-transparent mb-8 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white/10 group-hover:text-ark-gold/20 transition-colors duration-500">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>

              {/* Text Info */}
              <h3 className="text-xl font-serif text-white mb-2 group-hover:text-ark-gold transition-colors duration-300">
                {leader.name}
              </h3>
              <div className="text-xs font-sans uppercase tracking-widest text-ark-blue mb-4">
                {leader.title}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                {leader.bio}
              </p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}