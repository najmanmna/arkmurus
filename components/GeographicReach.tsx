'use client';

import { motion } from 'framer-motion';

// Regions from 
const theatres = [
  { name: "United Kingdom", status: "Operational", coords: "51.50N / 0.12W" },
  { name: "GCC Region", status: "High Activity", coords: "25.35N / 55.40E" },
  { name: "Europe", status: "Strategic Partner", coords: "48.85N / 2.35E" },
  { name: "Africa", status: "Emerging Market", coords: "09.10N / 07.53E" },
  { name: "Asia-Pacific", status: "Growth Sector", coords: "01.35N / 103.8E" },
  { name: "Americas", status: "Established", coords: "38.90N / 77.03W" }
];

export default function GeographicReach() {
  return (
    <section id="geographic-reach" className="relative py-32  border-t border-white/5 overflow-hidden">
      
      {/* Background Map Texture (Abstract Grid) */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: THE NARRATIVE */}
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-white tracking-tight"
            >
              Worldwide Reach
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-lg text-gray-400 font-sans leading-relaxed"
            >
              <p>
                Arkmurus has established a network of trusted government and commercial 
                contacts across the globe. We are experienced in matching clients with 
                opportunities and partners who can advance their objectives in a range of markets.
              </p>
              <p>
                From established defence markets in Europe and North America to high-growth 
                regions across the Middle East, Africa, and Asia-Pacific, our reach extends 
                from mature regulatory environments to some of the most challenging 
                operational theatres.
              </p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: THE THEATRES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {theatres.map((region, idx) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="group relative p-6 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-ark-gold/30 transition-all duration-300"
              >
                {/* Header: Name and Pulse */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-white font-serif text-xl group-hover:text-ark-gold transition-colors">
                    {region.name}
                  </h3>
                  <span className="relative flex h-2 w-2 mt-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </div>

                {/* Footer: Data */}
                <div className="space-y-1">
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                    {region.coords}
                  </div>
                  <div className="text-xs text-ark-blue font-sans uppercase tracking-wider opacity-80 group-hover:opacity-100">
                    {region.status}
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-ark-gold transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-ark-gold transition-colors" />

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}