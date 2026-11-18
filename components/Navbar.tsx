'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeProvider';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalMenuOpen, setPortalMenuOpen] = useState(false);
  const portalDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, openAuthModal, signOut } = useSupabaseAuth();

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

  // Navigation Links:
  // SERVICES -> RESEARCH AREAS -> SAMPLES -> HOW IT WORKS -> ABOUT -> CONTACT & FAQ
  // All in CAPITAL LETTERS
  const NAV_LINKS = [
    { href: '/services', label: 'SERVICES' },
    { href: '/research-areas', label: 'RESEARCH AREAS' },
    { href: '/samples', label: 'SAMPLES' },
    { href: '/how-it-works', label: 'HOW IT WORKS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT & FAQ' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 md:px-5 pt-3 transition-all duration-300">
      <div
        className={`w-full max-w-[1540px] mx-auto rounded-full px-3 sm:px-5 py-2 sm:py-2.5 transition-all duration-300 border-2 ${
          scrolled
            ? 'bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl border-slate-300 dark:border-slate-700 shadow-[0_14px_35px_rgba(0,0,0,0.1)]'
            : 'bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md border-slate-200/90 dark:border-slate-800 shadow-[0_8px_25px_rgba(0,0,0,0.06)]'
        } flex items-center justify-between gap-2 lg:gap-3`}
      >
        {/* Left: Authentic Original High-Resolution InkMonk Logo (Crystal Clear on Zoom) */}
        <Link href="/" className="group shrink-0 flex items-center gap-2 sm:gap-2.5 pl-1" title="InkMonk Research">
          <Image
            src="/logo.png"
            alt="InkMonk Research Logo"
            width={80}
            height={80}
            className="h-10 sm:h-11 w-auto object-contain rounded-xl drop-shadow-sm group-hover:scale-105 transition-transform"
            priority
            unoptimized
            style={{ imageRendering: '-webkit-optimize-contrast' }}
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

        {/* Center: Equal-Distance Main Navigation Links in CAPITAL LETTERS */}
        <nav
          className="hidden xl:flex items-center justify-center gap-0.5 2xl:gap-1.5 flex-1 px-1 min-w-0"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[9.5px] 2xl:text-[11px] font-black tracking-wider uppercase whitespace-nowrap transition-colors py-1.5 px-1.5 2xl:px-2.5 text-center rounded-lg hover:bg-slate-100/60 dark:hover:bg-slate-800/60 ${
                  active
                    ? 'text-[#F95721]'
                    : 'text-slate-700 dark:text-slate-200 hover:text-[#F95721]'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: The 4 Distinctly Styled Action Options Sequence:
            1. GET FREE ESTIMATE (Orange 3D Push Button)
            2. ASK AI (Electric Blue AI Pill)
            3. CLIENT PORTAL (Slate/Navy Portal Pill with Dropdown)
            4. HOME (Clean White/Slate Claymorphic Button)
            Followed by Theme Toggle
        */}
        <div className="hidden xl:flex items-center gap-2 shrink-0 ml-1">
          {/* 1. GET FREE ESTIMATE */}
          <Link
            href="/quote"
            className="btn-clay-orange"
            title="Get Free Estimate"
          >
            <span>GET FREE ESTIMATE</span>
            <span className="font-black">→</span>
          </Link>

          {/* 2. ASK AI */}
          <Link
            href="/chat"
            className="btn-clay-ai"
            title="Ask AI Assistant"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
            <span>ASK AI</span>
          </Link>

          {/* 3. CLIENT PORTAL / USER SESSION SYNC */}
          <div className="relative shrink-0" ref={portalDropdownRef}>
            {user ? (
              /* Signed-In State: User Avatar / Email & Sign Out Dropdown */
              <button
                onClick={() => setPortalMenuOpen(!portalMenuOpen)}
                className="btn-clay-portal flex items-center gap-1.5 cursor-pointer max-w-[160px] text-left"
                title={`Signed in as ${user.email}`}
              >
                <span className="w-4 h-4 rounded-full bg-blue-500 text-white font-black text-[9px] flex items-center justify-center shrink-0">
                  {user.email?.[0].toUpperCase() || 'U'}
                </span>
                <span className="truncate text-[10px]">
                  {user.email?.split('@')[0]}
                </span>
                <span className="text-[9px] text-slate-400 shrink-0">▼</span>
              </button>
            ) : (
              /* Signed-Out State: Opens Auth Modal or Portal Menu */
              <button
                onClick={() => setPortalMenuOpen(!portalMenuOpen)}
                className="btn-clay-portal flex items-center gap-1.5 cursor-pointer"
                title="Scholar & Admin Portals"
              >
                <span>CLIENT PORTAL</span>
                <span className="text-[9px] text-slate-400">▼</span>
              </button>
            )}

            {/* Dropdown Menu */}
            <AnimatePresence>
              {portalMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-700 shadow-2xl p-2 z-50 text-center"
                >
                  {user ? (
                    /* User Profile Dropdown when Logged In */
                    <div>
                      <div className="p-2 border-b border-slate-100 dark:border-slate-800 text-center">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Authenticated Scholar
                        </div>
                        <div className="text-xs font-black text-slate-900 dark:text-white truncate">
                          {user.email}
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/client"
                          onClick={() => setPortalMenuOpen(false)}
                          className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white transition-colors"
                        >
                          <span>🎓</span>
                          <span>My Client Portal</span>
                        </Link>
                        <Link
                          href="/quote"
                          onClick={() => setPortalMenuOpen(false)}
                          className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white transition-colors"
                        >
                          <span>📋</span>
                          <span>My Estimates &amp; Scopes</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={async () => {
                            setPortalMenuOpen(false);
                            await signOut();
                          }}
                          className="w-full text-center p-2 rounded-xl text-xs font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors uppercase cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Sign In / Destination Menu when Logged Out */
                    <div>
                      <div className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 py-1 border-b border-slate-100 dark:border-slate-800 mb-1">
                        Select Portal Destination
                      </div>
                      <button
                        onClick={() => {
                          setPortalMenuOpen(false);
                          openAuthModal(() => router.push('/client'));
                        }}
                        className="w-full flex flex-col items-center justify-center p-2.5 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors group mb-1 text-center cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#F95721]">
                          <span>🎓</span>
                          <span className="uppercase">Client Scholar Portal</span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          Sign in with Google or 6-digit OTP
                        </span>
                      </button>

                      <Link
                        href="/login?portal=admin"
                        onClick={() => setPortalMenuOpen(false)}
                        className="flex flex-col items-center justify-center p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors group border-t border-slate-100 dark:border-slate-800 text-center"
                      >
                        <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#2563EB]">
                          <span>🛡️</span>
                          <span className="uppercase">Admin Directorate Portal</span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          Tuhit Roy &amp; Sampreeti Mukherjee
                        </span>
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. HOME */}
          <Link
            href="/"
            className="btn-clay-home"
            title="Return to Home"
          >
            <span>HOME</span>
          </Link>

          {/* Theme Switcher Icon */}
          <div className="shrink-0 pl-1">
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
            <div className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 p-2.5 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#F95721] text-center"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                <Link
                  href="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="btn-clay-orange w-full !py-2.5 text-center text-xs"
                >
                  GET FREE ESTIMATE →
                </Link>
                <Link
                  href="/chat"
                  onClick={() => setMobileOpen(false)}
                  className="btn-clay-ai w-full !py-2.5 text-center text-xs"
                >
                  ASK AI ASSISTANT
                </Link>
                {user ? (
                  <>
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white text-center">
                      <span className="text-[10px] text-slate-500 block uppercase">Logged in as</span>
                      <span className="truncate block font-black">{user.email}</span>
                    </div>
                    <Link
                      href="/client"
                      onClick={() => setMobileOpen(false)}
                      className="btn-clay-portal w-full !py-2 text-center text-xs"
                    >
                      🎓 OPEN CLIENT PORTAL
                    </Link>
                    <button
                      onClick={async () => {
                        setMobileOpen(false);
                        await signOut();
                      }}
                      className="w-full py-2 rounded-xl text-xs font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-800 text-center uppercase cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        openAuthModal(() => router.push('/client'));
                      }}
                      className="btn-clay-portal w-full !py-2 text-center text-xs cursor-pointer"
                    >
                      🎓 CLIENT SCHOLAR PORTAL
                    </button>
                    <Link
                      href="/login?portal=admin"
                      onClick={() => setMobileOpen(false)}
                      className="btn-clay-white w-full !py-2 text-center text-xs uppercase"
                    >
                      🛡️ ADMIN DIRECTORATE PORTAL
                    </Link>
                  </>
                )}
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="btn-clay-home w-full !py-2 text-center text-xs"
                >
                  HOME
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
