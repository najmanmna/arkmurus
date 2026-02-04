'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Define the links and their target Section IDs
const navLinks = [
  { name: 'Who We Are', href: '#who-we-are' },
  { name: 'For Governments', href: '#governments' }, // Added per brief
  { name: 'For Industry', href: '#industry' },       // Added per brief
  { name: 'Leadership', href: '#leadership' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Handle Glass Effect
      setScrolled(window.scrollY > 50);

      // 2. Handle Scroll Spy (Active Section)
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Trigger point

      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop;
        const height = (section as HTMLElement).offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(`#${id}`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-ark-bg/80 backdrop-blur-md border-white/5 py-4' // Scrolled State
          : 'bg-transparent border-transparent py-6'            // Top State
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* BRAND */}
        <div className="text-xl font-serif font-bold tracking-tighter text-white">
          ARKMURUS
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-12">
          
          {/* LEFT: LIVE STATUS (The "Sticky Right" feeling of global presence) */}
          <div className="flex gap-6 border-r border-white/10 pr-8">
            {['London', 'Washington', 'Dubai'].map((city) => (
              <div key={city} className="group flex items-center gap-2 cursor-default">
                {/* Status Dot */}
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500/50 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500/80"></span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-sans">
                  {city}
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT: NAVIGATION LINKS */}
          <div className="flex gap-8">
            {navLinks.map((item) => {
              const isActive = activeSection === item.href;
              
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`text-sm font-sans transition-colors duration-300 relative group tracking-wide ${
                    isActive ? 'text-ark-gold' : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    // Smooth scroll to section
                    document.querySelector(item.href)?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                >
                  {item.name}
                  
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavLine" 
                      className="absolute -bottom-2 left-0 w-full h-[1px] bg-ark-gold"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button className="md:hidden text-white uppercase text-xs tracking-widest border border-white/20 px-3 py-1 rounded-sm">
          Menu
        </button>
      </div>
    </nav>
  );
}