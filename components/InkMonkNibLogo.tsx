'use client';

import React from 'react';

export function InkMonkNibIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          {/* Orange Barrel Gradient */}
          <linearGradient id="nibOrangeBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA24C" />
            <stop offset="40%" stopColor="#FF6B18" />
            <stop offset="100%" stopColor="#C43B00" />
          </linearGradient>

          {/* Blue Nib Gradient */}
          <linearGradient id="nibBlueTip" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* Gold Collar Gradient */}
          <linearGradient id="nibGoldCollar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* 3D Drop Shadow */}
          <filter id="clayShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Floating Sparkle Stars */}
        <path d="M70 18 L71.5 22 L75 23 L71.5 24 L70 28 L68.5 24 L65 23 L68.5 22 Z" fill="#F59E0B" />
        <path d="M16 62 L17 65 L20 66 L17 67 L16 70 L15 67 L12 66 L15 65 Z" fill="#F97316" />

        {/* Group rotated ~ -30deg for dynamic desk angle */}
        <g transform="rotate(-30 40 40)" filter="url(#clayShadow)">
          {/* Pen Barrel (Upper part) */}
          <path
            d="M26 12 C26 7 54 7 54 12 L50 36 C50 38 30 38 30 36 Z"
            fill="url(#nibOrangeBody)"
          />
          {/* Gloss highlight on barrel */}
          <path
            d="M30 14 C33 11 47 11 50 14 L48 34 C47 35 33 35 32 34 Z"
            fill="#FFFFFF"
            opacity="0.25"
          />

          {/* Gold Metallic Ring Collar */}
          <rect x="29" y="36" width="22" height="6" rx="3" fill="url(#nibGoldCollar)" stroke="#B45309" strokeWidth="0.75" />

          {/* Fountain Pen Blue Nib */}
          <path
            d="M30 42 L50 42 L48 56 C46 64 42 70 40 76 C38 70 34 64 32 56 Z"
            fill="url(#nibBlueTip)"
          />

          {/* Nib Inner Shading */}
          <path
            d="M33 44 L47 44 L45 56 C43 62 41 68 40 73 C39 68 37 62 35 56 Z"
            fill="#FFFFFF"
            opacity="0.18"
          />

          {/* Center Slit Line & Breather Hole */}
          <line x1="40" y1="46" x2="40" y2="76" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="40" cy="54" r="2.5" fill="#FEF08A" />
        </g>
      </svg>
    </div>
  );
}

export default function InkMonkNibLogo({ className = "h-11" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <InkMonkNibIcon className="w-11 h-11 shrink-0" />
      <div className="flex flex-col text-left leading-none">
        <span className="font-extrabold text-2xl tracking-tight text-[#FF6B18] drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
          INKMONK
        </span>
        <span className="font-black text-xs tracking-[0.2em] text-[#1E40AF] mt-0.5">
          RESEARCH
        </span>
      </div>
    </div>
  );
}
