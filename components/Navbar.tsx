'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Added Icons

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
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu State

  useEffect(() => {
    // 1. Handle Scroll
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // 2. Intersection Observer
    const observerOptions = {
      root: null, 
      rootMargin: '-50% 0px -50% 0px', 
      threshold: 0 
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'hero') {
            setActiveSection(''); 
          } else {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section[id], div[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Smooth Scroll Helper
  const scrollToSection = (href: string) => {
    setIsOpen(false); // Close mobile menu first
    const el = document.querySelector(href);
    if (el) {
        const navHeight = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <>
        <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
            scrolled || isOpen
            ? 'bg-[#050505]/90 backdrop-blur-md border-white/5 py-4'
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
                setIsOpen(false);
            }} 
            className="cursor-pointer z-50 relative"
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
                    <a 
                    key={item.name} 
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                    className={`text-sm font-sans transition-colors duration-300 relative group tracking-wide ${
                        isActive ? 'text-[#cc9966]' : 'text-gray-400 hover:text-white'
                    }`}
                    >
                    {item.name}
                    {isActive && (
                        <motion.span 
                        layoutId="activeNavLine" 
                        className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#cc9966]"
                        />
                    )}
                    </a>
                );
                })}
            </div>
            </div>

            {/* MOBILE TOGGLE BUTTON */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden z-50 p-2 text-white hover:text-[#cc9966] transition-colors focus:outline-none"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
        </nav>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[90] bg-[#050505] pt-24 px-6 md:hidden flex flex-col"
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
                        style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
                    />

                    <div className="flex flex-col gap-6 relative z-10">
                        {navLinks.map((item, i) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + (i * 0.05) }}
                                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                                className={`text-3xl font-serif border-b border-white/10 pb-4 ${
                                    activeSection === item.href ? 'text-[#cc9966]' : 'text-white'
                                }`}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Mobile Footer Status */}
                    <div className="mt-auto pb-12 relative z-10 border-t border-white/10 pt-8">
                         <div className="flex flex-wrap gap-6">
                            {['London', 'Istanbul', 'Dubai'].map((city) => (
                                <div key={city} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    <span className="text-xs uppercase tracking-widest text-gray-500">
                                        {city}
                                    </span>
                                </div>
                            ))}
                         </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  );
}