'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import InkMonkNibLogo from '@/components/InkMonkNibLogo';
import { ThemeToggle } from '@/components/ThemeProvider';

const NAV_LINKS = [
  { href: '/about', label: 'Who We Help' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/quote', label: 'Pricing' },
  { href: '/services', label: 'Get Published', isNew: true },
  { href: '/samples', label: 'Samples' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 border-2 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-slate-300 shadow-[0_14px_35px_rgba(0,0,0,0.1)]'
            : 'bg-white/90 backdrop-blur-md border-slate-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.06)]'
        } flex items-center justify-between`}
      >
        {/* Left: 3D InkMonk Nib Logo */}
        <Link href="/" className="group shrink-0">
          <InkMonkNibLogo className="h-9 sm:h-10" />
        </Link>

        {/* Center: Clean Nav Links matching Mockup */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold tracking-tight transition-colors flex items-center gap-1.5 ${
                  active
                    ? 'text-[#F95721]'
                    : 'text-slate-800 hover:text-[#F95721]'
                }`}
              >
                <span>{link.label}</span>
                {link.isNew && (
                  <span className="text-[10px] font-black uppercase bg-[#F95721] text-white px-1.5 py-0.2 rounded-full leading-tight shadow-sm">
                    New
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Flow:
            1. Get Free Estimate -> (3D Orange Clay Button)
            2. Client Portal (Clay White/Gray Pill Button)
            3. Theme Toggle (Sun/Moon icon right beside)
        */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/quote"
            className="btn-clay-orange !py-2 !px-4 !text-xs sm:!text-sm font-bold"
          >
            <span>Get Free Estimate</span>
            <span className="text-base font-black">→</span>
          </Link>

          <Link
            href="/login"
            className="btn-clay-portal !py-2 !px-3.5 !text-xs sm:!text-sm font-bold"
            title="Client & Scholar Portal Access"
          >
            Client Portal
          </Link>

          {/* Theme Switcher Icon */}
          <div className="pl-1">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 border border-slate-200"
            aria-label="Toggle mobile menu"
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

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="sm:hidden mt-2 max-w-sm mx-auto bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-2xl"
          >
            <div className="flex flex-col gap-3 text-left">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between text-sm font-bold text-slate-800 p-2 rounded-xl hover:bg-orange-50 hover:text-[#F95721]"
                >
                  <span>{link.label}</span>
                  {link.isNew && (
                    <span className="text-[10px] font-black uppercase bg-[#F95721] text-white px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </Link>
              ))}

              <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
                <Link
                  href="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="btn-clay-orange w-full !py-2.5 text-center text-xs"
                >
                  Get Free Estimate →
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-clay-portal w-full !py-2.5 text-center text-xs"
                >
                  Client Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
