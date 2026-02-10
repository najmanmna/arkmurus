'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const navLinks = [
  { name: 'Who We Are', href: '#who-we-are' },
  { name: 'For Governments', href: '#governments' },
  { name: 'For Industry', href: '#industry' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 1. Handle Glass Background (Standard Scroll)
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // 2. INTERSECTION OBSERVER (The Precision Logic)
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-50% 0px -50% 0px', // Creates a "Laser Line" in the middle of screen
      threshold: 0 // Trigger as soon as one pixel crosses that line
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If the Hero section is crossing the middle line, CLEAR the highlight
          if (entry.target.id === 'hero') {
            setActiveSection(''); 
          } 
          // Otherwise, highlight the current section
          else {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Track all sections
    const sections = document.querySelectorAll('section[id], div[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-ark-bg/80 backdrop-blur-md border-white/5 py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* BRAND */}
        <Link 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="cursor-pointer z-50"
        >
          <div className="text-xl font-serif font-bold tracking-tighter text-white">
            ARKMURUS
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-12">
          
          {/* LIVE STATUS */}
          <div className="flex gap-6 border-r border-white/10 pr-8">
            {['London', 'Istanbul', 'Dubai'].map((city) => (
              <div key={city} className="group flex items-center gap-2 cursor-default">
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

          {/* NAVIGATION LINKS */}
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
                    const el = document.querySelector(item.href);
                    if (el) {
                        const navHeight = 80;
                        const elementPosition = el.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                  }}
                >
                  {item.name}
                  
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