'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AcademicLabCrestLogo, OfficialTurnitinLogo } from '@/components/RealIcons';

interface InkMonkCinematicCoreProps {
  onAnimationComplete?: () => void;
}

/**
 * InkMonk Research — Cinematic 3D Research Core
 * Strictly Purple, White, and Black Palette
 */
export default function InkMonkCinematicCore({ onAnimationComplete }: InkMonkCinematicCoreProps) {
  // Animation Phase: 'APPEARANCE' | 'APPROACH' | 'TRANSFORMATION' | 'SETTLED'
  const [phase, setPhase] = useState<'APPEARANCE' | 'APPROACH' | 'TRANSFORMATION' | 'SETTLED'>('APPEARANCE');
  const [isIntroOverlay, setIsIntroOverlay] = useState<boolean>(true);
  const [hasSkipped, setHasSkipped] = useState<boolean>(false);
  
  // Interactive mouse tilt for subtle living feel during settled state
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check if user already saw the cinematic intro in this session
    const alreadyPlayed = typeof window !== 'undefined' ? sessionStorage.getItem('inkmonk_cinematic_played') : null;
    
    if (alreadyPlayed === 'true') {
      setPhase('SETTLED');
      setIsIntroOverlay(false);
      if (onAnimationComplete) onAnimationComplete();
      return;
    }

    // Stage 1 -> Stage 2 (Approach begins)
    const t1 = setTimeout(() => {
      setPhase('APPROACH');
    }, 900);

    // Stage 2 -> Stage 3 (Transformation & convergence)
    const t2 = setTimeout(() => {
      setPhase('TRANSFORMATION');
    }, 2400);

    // Stage 3 -> Stage 4 (Final Position & Perfect Freeze)
    const t3 = setTimeout(() => {
      setPhase('SETTLED');
      setIsIntroOverlay(false);
      try {
        sessionStorage.setItem('inkmonk_cinematic_played', 'true');
      } catch {}
      if (onAnimationComplete) onAnimationComplete();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onAnimationComplete]);

  // Handle Skip Intro
  const handleSkip = () => {
    setHasSkipped(true);
    setPhase('SETTLED');
    setIsIntroOverlay(false);
    try {
      sessionStorage.setItem('inkmonk_cinematic_played', 'true');
    } catch {}
    if (onAnimationComplete) onAnimationComplete();
  };

  // Mouse Parallax for Settled 3D Core
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (phase !== 'SETTLED') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setMouseTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  // Dynamic Scale & Transform depending on phase
  const getTransformStyle = () => {
    switch (phase) {
      case 'APPEARANCE':
        return {
          scale: 0.22,
          y: -40,
          rotateX: 28,
          rotateY: -35,
          rotateZ: -8,
          opacity: 0.85,
        };
      case 'APPROACH':
        return {
          scale: 1.08,
          y: -10,
          rotateX: 16,
          rotateY: -18,
          rotateZ: -3,
          opacity: 1,
        };
      case 'TRANSFORMATION':
        return {
          scale: 1.15,
          y: 0,
          rotateX: 10,
          rotateY: -12,
          rotateZ: 0,
          opacity: 1,
        };
      case 'SETTLED':
      default:
        return {
          scale: 1.0,
          y: 0,
          rotateX: 12 + mouseTilt.x,
          rotateY: -14 + mouseTilt.y,
          rotateZ: -2,
          opacity: 1,
        };
    }
  };

  return (
    <>
      {/* ─── FULL-SCREEN CINEMATIC CURTAIN DURING INTRO ─────────────────────── */}
      <AnimatePresence>
        {isIntroOverlay && !hasSkipped && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-6 sm:p-12 overflow-hidden bg-black/95 backdrop-blur-3xl font-mono select-none"
          >
            {/* Top Tactical HUD Header */}
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 pointer-events-auto">
              <div className="flex items-center gap-3">
                <AcademicLabCrestLogo className="w-8 h-8 text-purple-400" />
                <div>
                  <div className="text-xs font-bold tracking-widest text-white uppercase">
                    INKMONK RESEARCH CORE
                  </div>
                  <div className="text-[10px] text-purple-300">
                    CINEMATIC INITIALIZATION SEQUENCE // 3D ARTIFACT
                  </div>
                </div>
              </div>

              {/* Skip Intro Button */}
              <button
                type="button"
                onClick={handleSkip}
                className="px-4 py-2 rounded-full border border-purple-400/40 bg-purple-950/60 hover:bg-purple-900/80 text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer"
              >
                [ SKIP INTRO ➔ ]
              </button>
            </div>

            {/* Stage Indicator Overlay */}
            <div className="text-center pointer-events-none">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 border border-purple-500/30 text-[11px] text-purple-200 backdrop-blur-md mb-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span>
                  {phase === 'APPEARANCE' && 'STAGE 1: RESEARCH CORE MATERIALIZATION'}
                  {phase === 'APPROACH' && 'STAGE 2: CINEMATIC TRAJECTORY APPROACH'}
                  {phase === 'TRANSFORMATION' && 'STAGE 3: COMPUTATIONAL MATRIX CONVERGENCE'}
                  {phase === 'SETTLED' && 'STAGE 4: SYNCHRONIZED HERO DOCKING'}
                </span>
              </div>
            </div>

            {/* Bottom HUD Telemetry Line */}
            <div className="flex items-center justify-between text-[10px] text-purple-300/70 border-t border-purple-500/20 pt-4 pointer-events-none">
              <span>LAT: 22.5850° N • LON: 88.4172° E</span>
              <span className="text-white font-bold">ETHICS: COPE COMPLIANT • REPRODUCIBILITY VERIFIED</span>
              <span>ONE-TIME PLAYBACK ENGINE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── THE 3D RESEARCH CORE COMPONENT ───────────────────────────────── */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-lg lg:max-w-xl h-[420px] sm:h-[480px] flex items-center justify-center select-none"
        style={{ perspective: '1600px' }}
      >
        {/* Ambient Volumetric Backlight Halo */}
        <motion.div
          animate={{
            scale: phase === 'APPROACH' || phase === 'TRANSFORMATION' ? 1.35 : 1.0,
            opacity: phase === 'APPEARANCE' ? 0.3 : 0.85,
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-purple-400/20 blur-3xl pointer-events-none"
        />

        {/* Orbiting Laser Data Rings (Rotating in 3D Space) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Ring 1: Outer Telemetry Ring */}
          <div
            className="absolute w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full border border-purple-500/30 animate-spin-slow"
            style={{
              transform: 'rotateX(72deg) rotateY(15deg)',
              boxShadow: '0 0 25px rgba(168,85,247,0.3), inset 0 0 25px rgba(168,85,247,0.15)',
            }}
          />

          {/* Ring 2: Inner Precision Ring */}
          <div
            className="absolute w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] rounded-full border border-purple-300/40 animate-reverse-spin"
            style={{
              transform: 'rotateX(60deg) rotateY(-20deg)',
              boxShadow: '0 0 20px rgba(192,132,252,0.35)',
            }}
          />
        </div>

        {/* Floating Research Nodes (Orbiting Octahedrons / Polyhedra) */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { id: 'node-1', x: '-28%', y: '-22%', label: 'IEEE XPLORE', color: 'border-purple-400 bg-black/80 text-purple-300' },
            { id: 'node-2', x: '78%', y: '-18%', label: 'PYTORCH 2.6', color: 'border-purple-300 bg-black/80 text-white' },
            { id: 'node-3', x: '-30%', y: '65%', label: 'TURNITIN 0% AI', color: 'border-purple-400 bg-black/80 text-purple-300' },
            { id: 'node-4', x: '82%', y: '60%', label: 'SCOPUS / SPRINGER', color: 'border-purple-300 bg-black/80 text-white' },
          ].map((node) => (
            <motion.div
              key={node.id}
              animate={{
                y: [0, -8, 0],
                opacity: phase === 'APPEARANCE' ? 0 : 1,
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ top: node.y, left: node.x }}
              className={`absolute hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl border text-[9px] font-mono font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] backdrop-blur-md ${node.color}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
              <span>{node.label}</span>
            </motion.div>
          ))}
        </div>

        {/* ─── 3D SCHOLARLY MANUSCRIPT TRANSFORMING INTO COMPUTATIONAL CORE ── */}
        <motion.div
          animate={getTransformStyle()}
          transition={
            phase === 'SETTLED'
              ? { type: 'spring', stiffness: 180, damping: 22 }
              : { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
          }
          className="relative w-80 sm:w-96 h-[260px] sm:h-[300px] cursor-pointer"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1200px',
          }}
        >
          {/* Layer 0: Obsidian Heavy Back Cover */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0c0517] via-[#04010a] to-black border-2 border-purple-500/40 shadow-2xl overflow-hidden"
            style={{
              transform: 'translateZ(-25px)',
              backgroundImage:
                'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 70%), linear-gradient(135deg, rgba(255,255,255,0.03) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.03) 25%, transparent 25%)',
              backgroundSize: '100% 100%, 8px 8px, 8px 8px',
            }}
          >
            {/* White/Chrome Trim Edge */}
            <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-purple-300 via-white to-purple-400 shadow-md" />
          </div>

          {/* Layer 1: Layered Metallic Pages */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0E041A] via-black to-[#0E041A] border border-purple-500/30 shadow-lg"
            style={{ transform: 'translateZ(-16px) rotateY(-4deg)' }}
          >
            <div className="absolute inset-y-2 right-2 w-8 bg-gradient-to-l from-purple-300 via-white to-purple-400 opacity-60 rounded-r" />
          </div>

          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0E041A] via-black to-[#0E041A] border border-purple-500/30 shadow-lg"
            style={{ transform: 'translateZ(-8px) rotateY(-8deg)' }}
          >
            <div className="absolute inset-y-2 right-2 w-8 bg-gradient-to-l from-purple-200 via-white to-purple-300 opacity-70 rounded-r" />
          </div>

          {/* Layer 2: The Core Scholarly Open Manuscript Page (Front Stage) */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0e041a] via-[#06010d] to-black border-2 border-purple-400/80 shadow-[0_0_50px_rgba(168,85,247,0.4)] p-5 sm:p-6 flex flex-col justify-between overflow-hidden"
            style={{
              transform: 'translateZ(10px)',
              boxShadow: '0 20px 50px -10px rgba(0,0,0,0.9), 0 0 35px rgba(168,85,247,0.35), inset 0 1px 1px rgba(255,255,255,0.2)',
            }}
          >
            {/* Top Tactical Manuscript Banner */}
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-3 font-mono">
              <div className="flex items-center gap-2">
                <AcademicLabCrestLogo className="w-6 h-6 text-purple-400" />
                <span className="text-[11px] font-bold text-white tracking-wider">
                  INKMONK CORE // V4.2
                </span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-300 font-bold">
                0% AI • &lt;10% SIMILARITY
              </span>
            </div>

            {/* Illuminated Mathematical & Computational Formulas */}
            <div className="my-auto space-y-2.5 font-mono text-left">
              {/* Formula 1 */}
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-white font-bold bg-black/60 border border-purple-500/30 px-3 py-1.5 rounded-lg">
                <span>∇ × B = μ₀J + μ₀ε₀(∂E/∂t)</span>
                <span className="text-[9px] text-purple-300 font-normal">MAXWELL // FIELD</span>
              </div>

              {/* Formula 2 */}
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-purple-300 font-bold bg-black/60 border border-purple-500/30 px-3 py-1.5 rounded-lg">
                <span>L_total = λ₁L_recon + λ₂L_adv + λ₃L_reg</span>
                <span className="text-[9px] text-white/60 font-normal">PYTORCH // LOSS</span>
              </div>

              {/* Formula 3 */}
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-purple-200 font-bold bg-black/60 border border-purple-500/30 px-3 py-1 rounded-lg">
                <span>Turnitin_Protocol: NON_REPOSITORY [SAFE]</span>
                <span className="text-[9px] text-white font-bold">VERIFIED</span>
              </div>
            </div>

            {/* Embedded Quantum Processor Spine */}
            <div className="flex items-center justify-between border-t border-purple-500/30 pt-3 text-[10px] font-mono text-purple-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-white font-bold">COMPUTATIONAL PRECISION</span>
              </span>
              <span className="text-white font-bold">SALT LAKE SEC 2</span>
            </div>

            {/* Radiant Specular Corner Flare */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-400/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Layer 3: Floating Holographic HUD Shield over Core */}
          <div
            className="absolute inset-x-4 -bottom-6 p-3 rounded-2xl bg-black/90 border border-purple-400/50 shadow-[0_15px_30px_rgba(0,0,0,0.9)] backdrop-blur-xl flex items-center justify-between font-mono z-30"
            style={{ transform: 'translateZ(35px)' }}
          >
            <div className="flex items-center gap-2">
              <OfficialTurnitinLogo className="w-5 h-5" />
              <div className="text-left">
                <div className="text-[10px] font-bold text-white uppercase">Human Intellect Verified</div>
                <div className="text-[8px] text-purple-300">Subject-Matter Doctoral Oversight</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-white">100% REPRODUCIBLE</div>
              <div className="text-[8px] text-purple-300/80">IEEE / Scopus Standards</div>
            </div>
          </div>
        </motion.div>

        {/* Ambient Ground Shadow Floor */}
        <div
          className="absolute -bottom-8 w-72 sm:w-80 h-10 rounded-full bg-purple-600/20 blur-2xl pointer-events-none transition-all duration-700"
          style={{ transform: 'rotateX(80deg)' }}
        />
      </div>
    </>
  );
}
