'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalMenuOpen, setPortalMenuOpen] = useState(false);
  const portalDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (portalDropdownRef.current && !portalDropdownRef.current.contains(event.target as Node)) {
        setPortalMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation Links strictly ordered as requested:
  // Services -> Research Areas -> How It Works -> Samples -> About -> Contact & FAQ -> Get a Quote -> Ask AI -> Home
  const NAV_LINKS = [
    { href: '/services', label: 'Services' },
    { href: '/services#research-areas', label: 'Research Areas' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/samples', label: 'Samples' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact & FAQ' },
    { href: '/quote', label: 'Get a Quote', highlight: true },
    { href: '/chat', label: 'Ask AI' },
    { href: '/', label: 'Home' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 md:px-6 pt-3 transition-all duration-300">
      <div
        className={`w-full max-w-[1400px] mx-auto rounded-full px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 transition-all duration-300 border-2 ${
          scrolled
            ? 'bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl border-slate-300 dark:border-slate-700 shadow-[0_14px_35px_rgba(0,0,0,0.1)]'
            : 'bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md border-slate-200/90 dark:border-slate-800 shadow-[0_8px_25px_rgba(0,0,0,0.06)]'
        } flex items-center justify-between gap-2 lg:gap-4`}
      >
        {/* Left: Authentic Original High-Resolution InkMonk Logo */}
        <Link href="/" className="group shrink-0 flex items-center gap-2 sm:gap-3 pl-1">
          <Image
            src="/logo.png"
            alt="InkMonk Research Logo"
            width={48}
            height={48}
            className="h-10 sm:h-11 w-auto object-contain rounded-xl drop-shadow-sm group-hover:scale-105 transition-transform"
            priority
          />
          <div className="flex flex-col text-center leading-tight">
            <span className="font-serif font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
              <span className="text-[#1E3A8A] dark:text-[#60A5FA]">Ink</span><span className="text-[#F95721]">Monk</span>
            </span>
            <span className="text-[9px] font-black tracking-widest uppercase text-slate-500 dark:text-slate-400">
              RESEARCH
            </span>
          </div>
        </Link>

        {/* Center: Equal-Distance Nav Links (Strictly Equal Spacing, Zero Overlapping) */}
        <nav
          className="hidden xl:flex items-center justify-evenly flex-1 px-3 min-w-0"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[12.5px] 2xl:text-sm font-bold tracking-tight whitespace-nowrap transition-colors py-1.5 px-2 text-center rounded-lg hover:bg-slate-100/60 dark:hover:bg-slate-800/60 ${
                  active
                    ? 'text-[#F95721] font-black'
                    : 'text-slate-700 dark:text-slate-200 hover:text-[#F95721]'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions:
            1. 3D "Get Free Estimate →" Push Button (With Safe Separation)
            2. "Client Portal" Button (with Admin Portal Dropdown Option Inside)
            3. Light/Dark Theme Switcher Icon Beside It
        */}
        <div className="hidden sm:flex items-center gap-2.5 2xl:gap-3.5 shrink-0 ml-2">
          <Link
            href="/quote"
            className="btn-clay-orange !py-2 !px-4 !text-xs font-bold shrink-0 whitespace-nowrap shadow-md"
          >
            <span>Get Free Estimate</span>
            <span className="font-black">→</span>
          </Link>

          {/* Client Portal with Integrated Admin Portal Dropdown */}
          <div className="relative shrink-0" ref={portalDropdownRef}>
            <button
              onClick={() => setPortalMenuOpen(!portalMenuOpen)}
              className="btn-clay-portal !py-2 !px-3.5 !text-xs font-bold shrink-0 whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
              title="Scholar & Admin Portals"
            >
              <span>Client Portal</span>
              <span className="text-[10px] text-slate-500">▼</span>
            </button>

            {/* Dropdown containing Client Portal and Admin Portal option */}
            <AnimatePresence>
              {portalMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-700 shadow-2xl p-2 z-50 text-center"
                >
                  <div className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 py-1 border-b border-slate-100 dark:border-slate-800 mb-1">
                    Select Portal Destination
                  </div>
                  <Link
                    href="/login?portal=client"
                    onClick={() => setPortalMenuOpen(false)}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors group mb-1"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#F95721]">
                      <span>🎓</span>
                      <span>Client Scholar Portal</span>
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      View deliverables, drafts &amp; status
                    </span>
                  </Link>

                  <Link
                    href="/login?portal=admin"
                    onClick={() => setPortalMenuOpen(false)}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors group border-t border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#2563EB]">
                      <span>🛡️</span>
                      <span>Admin Directorate Portal</span>
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      Tuhit Roy &amp; Sampreeti Mukherjee
                    </span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Switcher Icon right beside */}
          <div className="shrink-0 pl-0.5">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-2 shrink-0">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="xl:hidden mt-2 max-w-md mx-auto bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-2xl text-center"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-bold text-slate-800 dark:text-slate-200 p-2.5 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#F95721] text-center"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
                <Link
                  href="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="btn-clay-orange w-full !py-2.5 text-center text-xs"
                >
                  Get Free Estimate →
                </Link>
                <Link
                  href="/login?portal=client"
                  onClick={() => setMobileOpen(false)}
                  className="btn-clay-portal w-full !py-2 text-center text-xs"
                >
                  🎓 Client Scholar Portal
                </Link>
                <Link
                  href="/login?portal=admin"
                  onClick={() => setMobileOpen(false)}
                  className="btn-clay-white w-full !py-2 text-center text-xs"
                >
                  🛡️ Admin Directorate Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
