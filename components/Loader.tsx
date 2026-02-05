'use client';

import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader() {
  const { progress, active } = useProgress(); // Hooks into the 3D Canvas
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Wait for 3D to finish (progress = 100), then wait a tiny bit for drama, then fade out
    if (progress === 100) {
      const timer = setTimeout(() => setShow(false), 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Smooth Fade Out
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center"
        >
          {/* 1. The Brand Pulse */}
          <div className="mb-8">
             <div className="w-2 h-2 bg-[#cc9966] rounded-full animate-ping" />
          </div>

          {/* 2. The Text Status */}
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#cc9966] mb-4">
             {progress < 100 ? `Initializing Secure Environment... ${Math.round(progress)}%` : 'Access Granted'}
          </div>

          {/* 3. The Progress Bar */}
          <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-[#cc9966]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }} // Snappy updates
            />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}