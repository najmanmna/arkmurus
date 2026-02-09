'use client';

import { motion, Variants } from 'framer-motion';

// Animation Variants for the "Staggered Reveal"
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // 0.3s delay between each item
      delayChildren: 0.5,   // Wait 0.5s before starting
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    y: 30, 
    opacity: 0, 
    // filter: 'blur(10px)' <-- REMOVED FOR PERFORMANCE
  }, 
  visible: { 
    y: 0, 
    opacity: 1, 
    // filter: 'blur(0px)', <-- REMOVED FOR PERFORMANCE
    transition: { 
      duration: 1.2, 
      // FIX: Add 'as const' so TS knows this is a Bezier curve tuple, not a number[]
      ease: [0.16, 1, 0.3, 1] as const 
    } 
  },
};

export default function HeroSection() {
  return (
    <section 
      id="hero" 
      className="relative h-screen w-full flex flex-col items-center justify-center px-6 z-10"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-5xl mx-auto space-y-8"
      >
        {/* 1. THE HEADLINE */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[1.1]"
        >
          Strategic Advisory for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Complex Environments
          </span>
        </motion.h1>

        {/* 2. THE SUBHEADLINE */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 font-sans font-light max-w-2xl mx-auto leading-relaxed"
        >
          Navigating the intersection of government, defence, and commerce across 
          the world’s most demanding markets.
        </motion.p>

        {/* 3. THE "GOLD" ACCENT LINE */}
        <motion.div 
          variants={itemVariants}
          className="w-24 h-[1px] bg-[#cc9966] mx-auto opacity-70"
        />

      </motion.div>

      {/* 4. SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }} 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#cc9966]/0 via-[#cc9966] to-[#cc9966]/0 animate-pulse" />
      </motion.div>
    </section>
  );
}