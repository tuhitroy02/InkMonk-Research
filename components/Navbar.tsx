'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { AcademicLabCrestLogo } from '@/components/RealIcons';
import { ThemeToggle } from '@/components/ThemeProvider';

const NAV_LINKS = [
  { href: '/services',                label: 'SERVICES' },
  { href: '/services#research-areas', label: 'RESEARCH AREAS' },
  { href: '/samples',                 label: 'SAMPLES' },
  { href: '/how-it-works',            label: 'HOW IT WORKS' },
  { href: '/about',                   label: 'ABOUT' },
  { href: '/contact',                 label: 'CONTACT' },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#030712]/95 backdrop-blur-xl border-b border-slate-200 dark:border-cyan-500/20 shadow-sm dark:shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
          : 'bg-white/90 dark:bg-[#030712]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-11 h-11 shrink-0 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-md flex items-center justify-center p-1"
            >
              <AcademicLabCrestLogo className="w-9 h-9" />
            </motion.div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xl tracking-tight leading-none text-slate-900 dark:text-white">
                  InkMonk
                </span>
                <span className="font-sans font-bold text-[10px] tracking-wider bg-[#0284C7] dark:bg-cyan-500 text-white dark:text-black px-1.5 py-0.5 rounded leading-none">
                  RESEARCH
                </span>
              </div>
              <span className="text-[11px] font-medium tracking-wide mt-1 text-slate-500 dark:text-cyan-200/80">
                Research with care. Writing with clarity.
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all ${
                    active
                      ? 'text-[#0284C7] dark:text-cyan-300 bg-sky-50 dark:bg-cyan-950/70 border border-sky-200 dark:border-cyan-400/40 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs:
              1. CLIENT PORTAL
              2. GET A QUOTE →
              3. ASK AI
              4. HOME
              5. ThemeToggle (Icon only, placed right next to HOME as requested!)
          */}
          <div className="hidden md:flex items-center gap-2">
            {/* Single Client Portal link */}
            <Link
              href="/login"
              className="text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-transparent"
              title="Client Portal (Includes Admin Portal access)"
            >
              CLIENT PORTAL
            </Link>

            {/* Get a Quote */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/quote"
                className="btn-primary-glow text-xs !py-2 !px-3.5"
              >
                GET A QUOTE →
              </Link>
            </motion.div>

            {/* AI Option After Get a Quote */}
            <Link
              href="/chat"
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-sky-300 dark:border-cyan-400/60 bg-sky-50 dark:bg-cyan-950/60 text-sky-700 dark:text-cyan-300 hover:bg-sky-100 dark:hover:bg-cyan-900/80 transition-all flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-cyan-400 animate-ping" />
              <span>ASK AI</span>
            </Link>

            {/* Home Option */}
            <Link
              href="/"
              className={`text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${
                pathname === '/'
                  ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-400/40 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-slate-700/60'
              }`}
            >
              HOME
            </Link>

            {/* Small icon-only Theme Toggle right beside HOME button */}
            <ThemeToggle className="ml-1 shrink-0" />
          </div>

          {/* Mobile Right Bar: Theme Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-[#030712] px-2 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-xs font-semibold ${
                  pathname === link.href ? 'text-[#0284C7] bg-sky-50 dark:bg-cyan-950/60' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2 text-xs font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-800 dark:text-slate-200"
              >
                CLIENT PORTAL
              </Link>
              <Link
                href="/quote"
                onClick={() => setMobileOpen(false)}
                className="btn-primary-glow w-full text-center text-xs font-semibold !py-2.5"
              >
                GET A QUOTE →
              </Link>
              <Link
                href="/chat"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2 text-xs font-semibold bg-sky-50 dark:bg-cyan-950/60 border border-sky-300 dark:border-cyan-400/40 rounded-lg text-sky-800 dark:text-cyan-300 flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-cyan-400 animate-ping" />
                <span>ASK AI</span>
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
