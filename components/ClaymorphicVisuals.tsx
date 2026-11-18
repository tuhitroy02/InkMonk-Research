'use client';

import React from 'react';

/**
 * 3D Curved Orange Pointer Arrow looping towards "Published."
 * Inspired directly by the user's uploaded mockup.
 */
export function CurvedPointerArrow({ className = "w-28 h-20" }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        viewBox="0 0 160 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(249,87,33,0.35)]"
      >
        <defs>
          <linearGradient id="clayArrowGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFA45B" />
            <stop offset="50%" stopColor="#FF641A" />
            <stop offset="100%" stopColor="#D94100" />
          </linearGradient>
          <linearGradient id="arrowHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id="arrowShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="3" floodColor="#9A2E00" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Thick curved tail looping from right to left */}
        <path
          d="M145 25 C145 80 85 85 45 80"
          stroke="url(#clayArrowGrad)"
          strokeWidth="18"
          strokeLinecap="round"
          filter="url(#arrowShadow)"
        />
        {/* Soft top highlight bevel on curved body */}
        <path
          d="M142 22 C142 74 88 78 48 74"
          stroke="url(#arrowHighlight)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Arrowhead pointing down-left at "Published." */}
        <path
          d="M20 78 L65 52 C65 52 58 72 65 92 Z"
          fill="url(#clayArrowGrad)"
          filter="url(#arrowShadow)"
        />
        {/* Arrowhead top highlight bevel */}
        <path
          d="M26 77 L60 58"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
      </svg>
    </div>
  );
}

/**
 * 3D Category 1: Research Paper (Spiral Notepad + Tilted Pencil)
 */
export function NotepadPencilIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="padCover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          <linearGradient id="pencilBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="60%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
        </defs>

        {/* Notepad base */}
        <rect x="10" y="8" width="40" height="50" rx="6" fill="url(#padCover)" stroke="#CBD5E1" strokeWidth="2" />
        
        {/* Spiral rings at top */}
        {[16, 24, 32, 40].map((x) => (
          <rect key={x} x={x} y="5" width="4" height="8" rx="2" fill="#64748B" />
        ))}

        {/* Paper lines */}
        <line x1="16" y1="22" x2="44" y2="22" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="30" x2="44" y2="30" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="38" x2="38" y2="38" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="46" x2="32" y2="46" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

        {/* Tilted Pencil */}
        <g transform="rotate(35 48 38)">
          <rect x="42" y="16" width="7" height="34" rx="2" fill="url(#pencilBody)" stroke="#A16207" strokeWidth="1" />
          {/* Eraser */}
          <rect x="42" y="12" width="7" height="5" rx="1.5" fill="#F43F5E" />
          <rect x="42" y="16" width="7" height="2" fill="#94A3B8" />
          {/* Pencil Tip */}
          <polygon points="42,50 49,50 45.5,57" fill="#FDE68A" />
          <polygon points="44,54 47,54 45.5,57" fill="#1E293B" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 3D Category 2: Graduation Cap (Thesis & Dissertation)
 */
export function GraduationCapIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="tasselGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
        </defs>

        {/* Lower Skull Cap */}
        <path d="M22 35 C22 45 42 45 42 35 Z" fill="#0F172A" />

        {/* Cap Diamond Top (Beveled) */}
        <polygon points="32,14 58,26 32,38 6,26" fill="url(#capGrad)" stroke="#475569" strokeWidth="1.5" />
        
        {/* Diamond Highlight */}
        <polygon points="32,16 54,26 32,35 10,26" fill="#FFFFFF" opacity="0.15" />

        {/* Button */}
        <circle cx="32" cy="26" r="3" fill="url(#tasselGold)" />

        {/* Gold Tassel ribbon */}
        <path d="M32 26 C37 28 44 32 46 40" stroke="url(#tasselGold)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Tassel Fringe */}
        <rect x="44" y="39" width="4" height="9" rx="1.5" fill="url(#tasselGold)" />
      </svg>
    </div>
  );
}

/**
 * 3D Category 3: Book Stack (Literature Review)
 */
export function BookStackIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-md">
        {/* Bottom Book (Navy) */}
        <rect x="10" y="44" width="44" height="11" rx="3" fill="#1E3A8A" stroke="#172554" strokeWidth="1" />
        <rect x="12" y="46" width="40" height="7" rx="1" fill="#F8FAFC" />
        <rect x="8" y="44" width="5" height="11" rx="2" fill="#1E40AF" />

        {/* Middle Book (Orange) */}
        <rect x="12" y="32" width="40" height="11" rx="3" fill="#EA580C" stroke="#9A3412" strokeWidth="1" />
        <rect x="14" y="34" width="36" height="7" rx="1" fill="#FFF7ED" />
        <rect x="10" y="32" width="5" height="11" rx="2" fill="#F97316" />

        {/* Top Book (Teal / Emerald) */}
        <rect x="15" y="20" width="34" height="11" rx="3" fill="#0D9488" stroke="#115E59" strokeWidth="1" />
        <rect x="17" y="22" width="30" height="7" rx="1" fill="#F0FDFA" />
        <rect x="13" y="20" width="5" height="11" rx="2" fill="#14B8A6" />
      </svg>
    </div>
  );
}

/**
 * Decorative 3D Origami Paper Airplane
 */
export function OrigamiPaperAirplane({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]">
        <defs>
          <linearGradient id="planeTopWing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="planeUnderWing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>
        {/* Main Body Fuselage */}
        <polygon points="15,65 92,20 45,85" fill="url(#planeTopWing)" />
        {/* Bottom fold shading */}
        <polygon points="45,85 92,20 58,62" fill="url(#planeUnderWing)" />
        {/* Top Fold */}
        <polygon points="15,65 92,20 38,50" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

/**
 * Decorative Open Textbook Graphic
 */
export function DecorativeOpenBook({ className = "w-32 h-24" }: { className?: string }) {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 120 90" fill="none" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]">
        {/* Book Spine Center */}
        <path d="M60 22 C60 22 60 76 60 76" stroke="#94A3B8" strokeWidth="3" />
        {/* Left Page Leaf */}
        <path d="M60 22 C42 16 20 18 8 24 L8 78 C20 72 42 70 60 76 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        {/* Left Page Lines */}
        <line x1="16" y1="36" x2="52" y2="34" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="44" x2="52" y2="42" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="52" x2="48" y2="50" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="60" x2="44" y2="58" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

        {/* Right Page Leaf */}
        <path d="M60 22 C78 16 100 18 112 24 L112 78 C100 72 78 70 60 76 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
        {/* Right Page Lines */}
        <line x1="68" y1="34" x2="104" y2="36" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="68" y1="42" x2="104" y2="44" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="68" y1="50" x2="100" y2="52" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="68" y1="58" x2="96" y2="60" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * Decorative Reading Glasses Graphic
 */
export function DecorativeGlasses({ className = "w-24 h-16" }: { className?: string }) {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 100 50" fill="none" className="w-full h-full drop-shadow-md">
        {/* Bridge */}
        <path d="M42 22 C50 17 50 17 58 22" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" />
        {/* Left Rim */}
        <rect x="12" y="14" width="30" height="26" rx="12" stroke="#334155" strokeWidth="3.5" fill="#E0F2FE" fillOpacity="0.4" />
        {/* Right Rim */}
        <rect x="58" y="14" width="30" height="26" rx="12" stroke="#334155" strokeWidth="3.5" fill="#E0F2FE" fillOpacity="0.4" />
        {/* Temples */}
        <line x1="12" y1="20" x2="4" y2="12" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        <line x1="88" y1="20" x2="96" y2="12" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}
