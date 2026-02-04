'use client';

import { motion } from 'framer-motion';

export default function WhoWeAre() {
  return (
    <section 
      id="who-we-are" 
      className="relative min-h-screen flex items-center justify-center py-24 "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* LEFT COLUMN: THE PITCH (Span 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-sm font-sans font-bold uppercase tracking-[0.2em] text-ark-gold mb-12"
            >
              Who We Are
            </motion.h2>

            {/* Paragraph 1 */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-serif text-white leading-tight"
            >
              Arkmurus specialises in building strategic connections that achieve 
              transformational outcomes for our clients.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 text-gray-400 font-sans leading-relaxed text-lg"
            >
              <p>
                We operate at the nexus of government relations, defence procurement, and 
                international commerce — providing discreet advisory services to sovereign 
                entities, defence ministries, and multinational corporations.
              </p>
              <p>
                Our foundations are trusted relationships cultivated over decades across 
                an influential global network. Whether facilitating introductions at the 
                highest levels of government or guiding stakeholders through sensitive 
                negotiations, we deliver outcomes that matter.
              </p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: THE SOCIAL PROOF (Span 5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Decorative Vertical Line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-0 top-0 w-[1px] bg-white/10 hidden lg:block"
            />

            <motion.blockquote 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="pl-0 lg:pl-12 relative"
            >
              {/* Huge Quotation Mark */}
              <span className="absolute -top-12 -left-2 lg:left-6 text-8xl font-serif text-white/5 select-none">
                &ldquo;
              </span>

              <p className="text-xl md:text-2xl font-serif italic text-gray-200 leading-relaxed relative z-10">
                "Arkmurus has been instrumental in navigating opportunities we would 
                otherwise never have accessed."
              </p>
              
              <footer className="mt-8 flex items-center gap-4">
                <div className="h-[1px] w-12 bg-ark-gold"></div>
                <cite className="not-italic text-xs font-sans uppercase tracking-widest text-gray-500">
                  Senior Government Advisor <br/> GCC Region
                </cite>
              </footer>
            </motion.blockquote>
          </div>

        </div>
      </div>
    </section>
  );
}