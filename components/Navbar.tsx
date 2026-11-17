'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/95 dark:bg-[#030712]/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-[#030712]/80 dark:bg-[#030712]/80 backdrop-blur-md border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="relative w-12 h-12 shrink-0 rounded-2xl overflow-hidden bg-[#060B18] shadow-md border-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors flex items-center justify-center p-1">
              <AcademicLabCrestLogo className="w-10 h-10" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-black text-xl tracking-tight leading-none text-white dark:text-white">
                  InkMonk
                </span>
                <span className="font-mono font-bold text-xs bg-cyan-500 text-black px-1.5 py-0.5 rounded leading-none">
                  RESEARCH
                </span>
              </div>
              <span className="text-[11px] font-medium tracking-wide mt-1 text-cyan-200/80">
                Research with care. Writing with clarity.
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (FAQ Removed as requested) */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all ${
                    active
                      ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs:
              1. Theme Toggle (Dark/Light)
              2. CLIENT PORTAL (Single portal header - Admin Portal removed from header)
              3. GET A QUOTE
              4. ASK AI (After Get a Quote)
              5. HOME (After AI option)
          */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle (Dark / Light Switcher) */}
            <ThemeToggle />

            {/* Only 1 Header named Client Portal (Admin Portal removed from header) */}
            <Link
              href="/login"
              className="text-xs font-mono font-bold px-3 py-2 rounded-xl text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-colors border border-transparent hover:border-cyan-500/30"
              title="Client Portal (Includes Admin Portal option inside)"
            >
              CLIENT PORTAL
            </Link>

            {/* Get a Quote */}
            <Link
              href="/quote"
              className="btn-primary-glow text-xs !py-2 !px-3.5 font-mono"
            >
              GET A QUOTE →
            </Link>

            {/* AI Option After Get a Quote */}
            <Link
              href="/chat"
              className="text-xs font-mono font-bold px-3 py-2 rounded-xl border border-cyan-400/60 bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900/80 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>ASK AI</span>
            </Link>

            {/* Home Option After AI */}
            <Link
              href="/"
              className={`text-xs font-mono font-bold px-3 py-2 rounded-xl transition-colors ${
                pathname === '/'
                  ? 'text-emerald-300 bg-emerald-950/60 border border-emerald-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-slate-700/60'
              }`}
            >
              HOME
            </Link>
          </div>

          {/* Mobile Right Bar: Theme Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-white hover:bg-white/10"
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
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#060B18] border-t border-cyan-500/30 px-6 py-5 shadow-2xl space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-slate-200 font-mono text-sm font-semibold py-2 hover:text-cyan-400"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-cyan-300 font-mono text-sm font-semibold py-2"
            >
              CLIENT PORTAL (ADMIN INSIDE)
            </Link>
            <Link
              href="/quote"
              onClick={() => setMobileOpen(false)}
              className="btn-primary-glow w-full text-center font-mono block py-2.5"
            >
              GET A QUOTE →
            </Link>
            <Link
              href="/chat"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center font-mono block py-2 rounded-xl border border-cyan-400/50 bg-cyan-950/60 text-cyan-300 font-bold text-xs"
            >
              ⚡ ASK AI ASSISTANT
            </Link>
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center font-mono block py-2 rounded-xl border border-slate-700 bg-white/5 text-slate-300 font-bold text-xs"
            >
              🏠 HOME
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
