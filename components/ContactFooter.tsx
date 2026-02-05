'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

// Live Time Component for that "Global Ops" feel
const LocalTime = ({ offset, city }: { offset: number, city: string }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      const nd = new Date(utc + (3600000 * offset));
      setTime(nd.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [offset]);

  return (
    <div className="flex items-center gap-2 text-[10px] font-mono text-[#cc9966]">
      <Clock size={10} />
      <span>{time} {city.toUpperCase()}</span>
    </div>
  );
};

export default function ContactFooter() {
  return (
    <section id="contact" className="relative bg-[#050505] pt-32 pb-12 border-t border-white/5 overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          
          {/* --- LEFT: THE INVITATION --- */}
          <div className="space-y-12">
            <div className="space-y-6">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-[#cc9966]"
                >
                    <Mail size={16} strokeWidth={1.5} />
                    <span className="text-xs font-mono uppercase tracking-[0.2em]">Secure Channel</span>
                </motion.div>

                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-6xl font-serif text-white leading-tight"
                >
                    Initiate <br /> Dialogue.
                </motion.h2>

                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-white/50 text-lg font-light max-w-md leading-relaxed"
                >
                    For confidential inquiries regarding sovereign advisory or industrial partnerships, please contact our central office.
                </motion.p>
            </div>

            {/* DIRECT CONTACT CARD */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="p-8 border border-white/10 bg-white/[0.02] hover:border-[#cc9966]/30 transition-colors duration-500 group"
            >
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-4">Central Desk</span>
                <a href="mailto:contact@arkmurus.com" className="text-2xl md:text-3xl font-serif text-white group-hover:text-[#cc9966] transition-colors flex items-center gap-4">
                    contact@arkmurus.com
                    <ArrowUpRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </a>
            </motion.div>
          </div>

          {/* --- RIGHT: THE NETWORK TERMINALS --- */}
          <div className="space-y-6">
            <h3 className="text-xs font-mono text-white/30 uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">
                Regional Operations
            </h3>

            {[
              { city: "London", email: "info.uk@arkmurus.com", offset: 0 },
              { city: "Washington", email: "info.us@arkmurus.com", offset: -5 },
              { city: "Dubai", email: "info.uae@arkmurus.com", offset: 4 }
            ].map((office, idx) => (
              <motion.div 
                key={office.city}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="group relative p-6 border-l border-white/10 hover:border-[#cc9966] bg-gradient-to-r from-white/[0.01] to-transparent hover:from-white/[0.03] transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-serif text-white group-hover:text-[#cc9966] transition-colors">
                        {office.city}
                    </h4>
                    {/* Live Time */}
                    <LocalTime offset={office.offset} city={office.city.substring(0,3)} />
                </div>
                
                <a href={`mailto:${office.email}`} className="text-sm font-mono text-white/40 hover:text-white transition-colors tracking-wide">
                    {office.email}
                </a>

                {/* Decorative Status Light */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#cc9966]/20 group-hover:bg-[#cc9966] transition-colors" />
                
              </motion.div>
            ))}
          </div>

        </div>

        {/* --- FOOTER BOTTOM --- */}
        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-widest text-white/30">
          <p>© 2026 Arkmurus Group. All Rights Reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#cc9966] transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-[#cc9966] transition-colors">Legal</a>
            <span className="text-[#cc9966]">System Status: Operational</span>
          </div>
        </div>

      </div>
    </section>
  );
}