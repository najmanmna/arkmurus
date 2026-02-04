'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 1. CONTEXT: The Cities
const locations = ['London', 'Washington', 'Dubai'];

// 2. ACTION: The Navigation Links
// Note: "What We Do" points to #governments (the start of that topic)
const navLinks = [
  { name: 'Who We Are', href: '#who-we-are' },
  { name: 'What We Do', href: '#governments' }, 
  { name: 'Leadership', href: '#leadership' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState(''); // Tracks which LINK is active, not just section
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // The "Look Line": The point on screen we are checking (40% down)
      const scrollFocus = window.scrollY + (window.innerHeight * 0.4);

      // Get all sections based on your specific IDs
      const sectionIds = ['hero', 'who-we-are', 'governments', 'industry', 'leadership', 'contact'];
      
      let currentSectionId = '';

      // Find which section is currently under the "Look Line"
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollFocus >= top && scrollFocus < top + height) {
            currentSectionId = id;
          }
        }
      }

      // MAP SECTIONS TO NAV LINKS
      if (currentSectionId === 'hero') {
        setActiveLink(''); // Hero active = No link highlighted
      } else if (currentSectionId === 'who-we-are') {
        setActiveLink('#who-we-are');
      } else if (currentSectionId === 'governments' || currentSectionId === 'industry') {
        setActiveLink('#governments'); // Both sections highlight "What We Do"
      } else if (currentSectionId === 'leadership') {
        setActiveLink('#leadership');
      } else if (currentSectionId === 'contact') {
        setActiveLink('#contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled 
          ? 'py-4 bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.08]' 
          : 'py-8 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* --- BRAND --- */}
        <Link href="/" className="group z-50">
          <h1 className="text-xl font-serif font-bold text-white tracking-tight leading-none group-hover:text-[#cc9966] transition-colors duration-500">
            ARKMURUS
          </h1>
        </Link>

        {/* --- GLOBAL LINE --- */}
        <div className="hidden md:flex items-center">
          
          {/* LOCATIONS */}
          <div className="flex items-center select-none">
            {locations.map((city, i) => (
              <div key={city} className="flex items-center">
                <span className="text-[10px] uppercase font-mono tracking-[0.15em] text-white/40 cursor-default hover:text-[#cc9966] transition-colors duration-300">
                  {city}
                </span>
                {i < locations.length && (
                  <span className="mx-4 text-[10px] text-white/10 font-light">|</span>
                )}
              </div>
            ))}
          </div>

          <div className="mx-8 h-4 w-[1px] bg-white/20 rotate-12" />

          {/* NAVIGATION */}
          <div className="flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = activeLink === item.href;
              
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
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
                  className="group relative"
                >
                  <span className={`text-[11px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-[#cc9966]'
                  }`}>
                    {item.name}
                  </span>

                  {/* Gold Dot Indicator */}
                  <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#cc9966] transition-all duration-500 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`} />
                </Link>
              );
            })}
          </div>

        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button className="md:hidden text-white/80 hover:text-[#cc9966] transition-colors">
            <span className="text-xs uppercase tracking-widest border border-white/20 px-3 py-1">Menu</span>
        </button>

      </div>
    </nav>
  );
}