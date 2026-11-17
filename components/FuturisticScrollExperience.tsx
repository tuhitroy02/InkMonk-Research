'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * InkMonk Research — Elite 3D Scroll Experience & Parallax System
 * Optimized for Light Mode (Default) & Dark Mode
 */

/* ─── 1. Fixed Top Scroll Progress Scanner & HUD ────────────────────────── */
export function ScrollProgressLaser() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('HERO');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }

      const scrollY = window.scrollY;
      if (scrollY < 650) setActiveSection('01 // CORE_HERO');
      else if (scrollY < 1500) setActiveSection('02 // PRIMARY_PILLARS');
      else if (scrollY < 2400) setActiveSection('03 // ESCROW_TIMELINE');
      else if (scrollY < 3400) setActiveSection('04 // 9_CAPABILITIES');
      else if (scrollY < 4400) setActiveSection('05 // 12_RESEARCH_AREAS');
      else if (scrollY < 5400) setActiveSection('06 // 5_STAGE_PIPELINE');
      else if (scrollY < 6400) setActiveSection('07 // SCHOLAR_DIRECTORATE');
      else setActiveSection('08 // SECURE_COMMS_FAQ');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const percentage = Math.round(scrollProgress * 100);

  return (
    <>
      {/* Top Fixed Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-200/60 dark:bg-slate-900/60 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 dark:from-cyan-400 dark:via-teal-300 dark:to-emerald-400 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(2,132,199,0.5)] dark:shadow-[0_0_15px_#00F2FE]"
          style={{ width: `${percentage}%` }}
        />
        {/* Leading Flare */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_15px_rgba(2,132,199,0.6)] dark:shadow-[0_0_20px_#00F2FE] pointer-events-none transition-all duration-150"
          style={{ left: `calc(${percentage}% - 7px)` }}
        />
      </div>

      {/* Floating Section Tracker Badge (Bottom Right on Desktop) */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-3 bg-white/95 dark:bg-[#030712]/90 border border-slate-200 dark:border-cyan-500/40 px-4 py-2 rounded-full backdrop-blur-xl shadow-lg dark:shadow-[0_0_25px_rgba(6,182,212,0.3)] select-none pointer-events-none font-sans">
        <span className="w-2.5 h-2.5 rounded-full bg-sky-500 dark:bg-cyan-400 animate-ping" />
        <span className="text-[10px] text-slate-700 dark:text-cyan-300 font-bold uppercase tracking-wider font-mono">
          {activeSection}
        </span>
        <span className="text-[10px] text-slate-300 dark:text-slate-600">|</span>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
          DEPTH: {percentage}%
        </span>
      </div>
    </>
  );
}

/* ─── 2. Vertical Timeline Spine Connecting Sections ────────────────────── */
export function CyberCircuitSpine({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center my-8 pointer-events-none ${className}`}>
      {/* Upper Node */}
      <div className="relative flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-sky-500 dark:bg-cyan-400 shadow-[0_0_10px_rgba(2,132,199,0.4)] dark:shadow-[0_0_15px_#00F2FE]" />
        <div className="absolute w-6 h-6 rounded-full border border-sky-400/40 dark:border-cyan-400/40 animate-ping" />
      </div>

      {/* Track */}
      <div className="w-[2px] h-16 bg-gradient-to-b from-sky-400 via-teal-400 to-emerald-400 dark:from-cyan-400 dark:via-teal-400 dark:to-emerald-400 relative overflow-hidden my-1">
        <div className="absolute inset-0 bg-white/70 animate-scanline" />
      </div>

      {/* Lower Node */}
      <div className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.4)] dark:shadow-[0_0_15px_#10B981]" />
    </div>
  );
}

/* ─── 3. Premium Interactive 3D Perspective Tilt Card with Cursor Spotlight ─── */
export function Interactive3DCard({
  children,
  className = '',
  glowColor = 'cyan',
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'emerald' | 'indigo';
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Subtle 3D tilt angles (tuned for elegant feel)
    const tiltX = ((y / rect.height) - 0.5) * -12;
    const tiltY = ((x / rect.width) - 0.5) * 12;

    setRotate({ x: tiltX, y: tiltY });
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  const glowStyles = {
    cyan: 'border-slate-200/90 dark:border-cyan-500/30 hover:border-sky-400 dark:hover:border-cyan-400 hover:shadow-[0_20px_45px_-10px_rgba(2,132,199,0.15)] dark:hover:shadow-[0_25px_50px_-10px_rgba(6,182,212,0.35)]',
    emerald: 'border-slate-200/90 dark:border-emerald-500/30 hover:border-emerald-400 dark:hover:border-emerald-400 hover:shadow-[0_20px_45px_-10px_rgba(16,185,129,0.15)] dark:hover:shadow-[0_25px_50px_-10px_rgba(16,185,129,0.35)]',
    indigo: 'border-slate-200/90 dark:border-indigo-500/30 hover:border-indigo-400 dark:hover:border-indigo-400 hover:shadow-[0_20px_45px_-10px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_25px_50px_-10px_rgba(99,102,241,0.35)]',
  }[glowColor];

  const spotlightColor = {
    cyan: 'rgba(2, 132, 199, 0.08)',
    emerald: 'rgba(16, 185, 129, 0.08)',
    indigo: 'rgba(99, 102, 241, 0.08)',
  }[glowColor];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: spotlight.opacity ? 1.015 : 1,
        y: spotlight.opacity ? -4 : 0,
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.6 }}
      className={`relative rounded-3xl border transition-all duration-300 overflow-hidden transform-gpu bg-white dark:bg-[#080E1E] shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)] ${glowStyles} ${className}`}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Cursor Spotlight Beam */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(450px circle at ${spotlight.x}px ${spotlight.y}px, ${spotlightColor}, transparent 60%)`,
        }}
      />

      {/* Internal Content (Elevated on Z-Axis for 3D Layering) */}
      <div className="relative z-20 h-full w-full" style={{ transform: 'translateZ(12px)' }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ─── 4. Scroll-Triggered 3D Section Reveal ──────────────────────────────── */
export function ScrollReveal3D({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 4 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`transform-gpu ${className}`}
      style={{ perspective: '1000px' }}
    >
      {children}
    </motion.div>
  );
}

/* ─── 5. Dynamic 3D Scroll Parallax Container (Moves Elements On Scroll) ─── */
export function Scroll3DParallaxSection({
  children,
  className = '',
  offsetY = 60,
  rotateFactor = 3,
}: {
  children: React.ReactNode;
  className?: string;
  offsetY?: number;
  rotateFactor?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], [offsetY, -offsetY]);
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [rotateFactor, 0, -rotateFactor]);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ perspective: '1200px' }}>
      <motion.div style={{ y, rotateX, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ─── 6. Floating Parallax Research Badges (Move as user scrolls) ────────── */
export function FloatingScrollBadge({
  children,
  speed = 1,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -50 * speed]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── 7. Procedural Subtle Ambient Dust / Particles ──────────────────────── */
export function CyberParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-60">
      <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-sky-400/40 dark:bg-cyan-400 shadow-[0_0_10px_rgba(2,132,199,0.3)] animate-ping" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-emerald-500/40 dark:bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-teal-400/40 dark:bg-teal-300 shadow-[0_0_8px_rgba(45,212,191,0.3)] animate-ping" />
      <div className="absolute top-3/4 right-1/6 w-2 h-2 rounded-full bg-indigo-400/30 dark:bg-cyan-300/60 shadow-[0_0_15px_rgba(99,102,241,0.3)] animate-pulse" />
    </div>
  );
}
