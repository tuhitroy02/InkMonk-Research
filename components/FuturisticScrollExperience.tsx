'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * InkMonk Research — Futuristic 3D Scroll Experience & Cyber Telemetry System
 * Palette: Kevlar Obsidian (#030712), Liquid Chrome (#E2E8F0), & Cyber Flare (Cyan #00F2FE / Emerald #10B981)
 */

/* ─── 1. Fixed Top Laser Scroll Progress Scanner & HUD ───────────────────── */
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

      // Section telemetry mapping
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
      {/* Top Fixed Glowing Laser Beam */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-900/60 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 transition-all duration-150 ease-out shadow-[0_0_15px_#00F2FE,0_0_30px_#10B981]"
          style={{ width: `${percentage}%` }}
        />
        {/* Leading Laser Flare Blip */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_20px_#00F2FE,0_0_40px_#FFFFFF] pointer-events-none transition-all duration-150"
          style={{ left: `calc(${percentage}% - 7px)` }}
        />
      </div>

      {/* Floating HUD Telemetry Badge (Bottom Right on Desktop) */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-3 bg-[#030712]/90 border border-cyan-500/40 px-4 py-2 rounded-full backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.3)] select-none pointer-events-none font-mono">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
          {activeSection}
        </span>
        <span className="text-[10px] text-slate-500">|</span>
        <span className="text-[10px] text-emerald-400 font-bold">
          DEPTH: {percentage}%
        </span>
      </div>
    </>
  );
}

/* ─── 2. Vertical Cyber Circuit Trace Spine Connecting Sections ─────────── */
export function CyberCircuitSpine({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center my-10 pointer-events-none ${className}`}>
      {/* Upper Node with Laser Rings */}
      <div className="relative flex items-center justify-center">
        <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#00F2FE]" />
        <div className="absolute w-7 h-7 rounded-full border border-cyan-400/40 animate-ping" />
      </div>

      {/* Pulsing Vertical Laser Track */}
      <div className="w-[2px] h-24 bg-gradient-to-b from-cyan-400 via-teal-400 to-emerald-400 relative overflow-hidden my-1">
        <div className="absolute inset-0 bg-white/90 animate-scanline" />
      </div>

      {/* Lower Node */}
      <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_15px_#10B981]" />
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

    // Calculate 3D tilt angles
    const tiltX = ((y / rect.height) - 0.5) * -16;
    const tiltY = ((x / rect.width) - 0.5) * 16;

    setRotate({ x: tiltX, y: tiltY });
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  const glowStyles = {
    cyan: 'border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_25px_50px_-10px_rgba(6,182,212,0.35),0_0_30px_rgba(6,182,212,0.2)]',
    emerald: 'border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_25px_50px_-10px_rgba(16,185,129,0.35),0_0_30px_rgba(16,185,129,0.2)]',
    indigo: 'border-indigo-500/30 hover:border-indigo-400 hover:shadow-[0_25px_50px_-10px_rgba(99,102,241,0.35),0_0_30px_rgba(99,102,241,0.2)]',
  }[glowColor];

  const spotlightColor = {
    cyan: 'rgba(6, 182, 212, 0.18)',
    emerald: 'rgba(16, 185, 129, 0.18)',
    indigo: 'rgba(99, 102, 241, 0.18)',
  }[glowColor];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: spotlight.opacity ? 1.02 : 1,
        y: spotlight.opacity ? -6 : 0,
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.6 }}
      className={`relative rounded-3xl border transition-all duration-300 overflow-hidden transform-gpu bg-[#060B18]/90 backdrop-blur-xl ${glowStyles} ${className}`}
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
      <div className="relative z-20 h-full w-full" style={{ transform: 'translateZ(15px)' }}>
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
      initial={{ opacity: 0, y: 35, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.7,
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

/* ─── 5. Procedural Floating Cyber Particles ─────────────────────────────── */
export function CyberParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-1/4 left-1/6 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_#00F2FE] animate-ping" />
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#10B981] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-teal-300 shadow-[0_0_8px_#2DD4BF] animate-ping" />
      <div className="absolute top-3/4 right-1/6 w-2 h-2 rounded-full bg-cyan-300/60 shadow-[0_0_15px_#22D3EE] animate-pulse" />
    </div>
  );
}
