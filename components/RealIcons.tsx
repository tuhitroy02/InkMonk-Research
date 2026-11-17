import React from 'react';

/**
 * InkMonk Research — Real Icon & Logo Suite
 * High-definition vector graphics replacing generic emojis with realistic,
 * 3D-styled academic and institutional imagery.
 */

// 1. UK / English Specialists Emblem
export function UkFlagLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="ukGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" />
            <stop offset="50%" stopColor="#FFF2D6" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <clipPath id="ukCircle">
            <circle cx="32" cy="32" r="27" />
          </clipPath>
        </defs>
        {/* Outer Gold Bezel */}
        <circle cx="32" cy="32" r="30" fill="url(#ukGoldRim)" stroke="#B45309" strokeWidth="1" />
        <circle cx="32" cy="32" r="28" fill="#0A1128" />
        {/* Union Jack Graphic */}
        <g clipPath="url(#ukCircle)">
          <rect width="64" height="64" fill="#012169" />
          {/* Diagonals */}
          <path d="M0 0 L64 64 M64 0 L0 64" stroke="#FFFFFF" strokeWidth="10" />
          <path d="M0 0 L64 64 M64 0 L0 64" stroke="#C8102E" strokeWidth="5" />
          {/* St George Cross */}
          <path d="M32 0 V64 M0 32 H64" stroke="#FFFFFF" strokeWidth="16" />
          <path d="M32 0 V64 M0 32 H64" stroke="#C8102E" strokeWidth="10" />
        </g>
        {/* Gloss highlight */}
        <ellipse cx="32" cy="20" rx="18" ry="10" fill="#FFFFFF" opacity="0.18" />
      </svg>
    </div>
  );
}

// 2. India / Hindi Specialists Emblem
export function IndiaFlagLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="inGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <clipPath id="inCircle">
            <circle cx="32" cy="32" r="27" />
          </clipPath>
        </defs>
        {/* Outer Gold Bezel */}
        <circle cx="32" cy="32" r="30" fill="url(#inGoldRim)" stroke="#92400E" strokeWidth="1" />
        <circle cx="32" cy="32" r="28" fill="#FFFFFF" />
        {/* Indian Tricolor */}
        <g clipPath="url(#inCircle)">
          <rect x="0" y="0" width="64" height="21.3" fill="#FF9933" />
          <rect x="0" y="21.3" width="64" height="21.4" fill="#FFFFFF" />
          <rect x="0" y="42.7" width="64" height="21.3" fill="#138808" />
          {/* Ashoka Chakra */}
          <circle cx="32" cy="32" r="8" stroke="#000080" strokeWidth="1.5" fill="none" />
          <circle cx="32" cy="32" r="2" fill="#000080" />
          {/* Spokes */}
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="32"
              y1="32"
              x2={32 + 7.5 * Math.cos((i * Math.PI) / 6)}
              y2={32 + 7.5 * Math.sin((i * Math.PI) / 6)}
              stroke="#000080"
              strokeWidth="1"
            />
          ))}
        </g>
        {/* Gloss highlight */}
        <ellipse cx="32" cy="20" rx="18" ry="10" fill="#FFFFFF" opacity="0.18" />
      </svg>
    </div>
  );
}

// 3. Turnitin / Originality Shield Logo
export function TurnitinShieldLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>
          <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0" />
            <stop offset="50%" stopColor="#A7F3D0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Outer Shield with metallic border */}
        <path
          d="M32 4 L54 13 C54 36 32 58 32 60 C32 58 10 36 10 13 Z"
          fill="url(#shieldGrad)"
          stroke="#F5A623"
          strokeWidth="2.5"
        />
        {/* Inner glow lines */}
        <path
          d="M32 10 L48 18 C48 35 32 51 32 53 C32 51 16 35 16 18 Z"
          fill="#064E3B"
          opacity="0.6"
        />
        {/* Checkmark */}
        <path
          d="M24 30 L29 36 L40 23"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Scanner ray line */}
        <line x1="14" y1="28" x2="50" y2="28" stroke="url(#laserGrad)" strokeWidth="3" />
      </svg>
    </div>
  );
}

// 4. Research Paper Real Icon
export function ResearchPaperRealIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>
        {/* Base Sheet */}
        <rect x="14" y="6" width="36" height="52" rx="4" fill="url(#docGrad)" stroke="#CBD5E1" strokeWidth="2" />
        {/* Folded Corner */}
        <path d="M40 6 L50 16 L40 16 Z" fill="#94A3B8" />
        {/* Text Lines */}
        <rect x="20" y="16" width="16" height="3" rx="1.5" fill="#FF6B00" />
        <rect x="20" y="24" width="24" height="2" rx="1" fill="#64748B" />
        <rect x="20" y="29" width="24" height="2" rx="1" fill="#64748B" />
        <rect x="20" y="34" width="20" height="2" rx="1" fill="#64748B" />
        {/* Mini chart graph on paper */}
        <rect x="20" y="40" width="24" height="12" rx="2" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M23 48 L28 43 L34 46 L40 42" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="40" cy="42" r="2" fill="#FF6B00" />
      </svg>
    </div>
  );
}

// 5. Thesis / Dissertation Real Icon
export function ThesisRealIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="thesisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0A1128" />
          </linearGradient>
          <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        {/* Hardbound Cover */}
        <rect x="12" y="8" width="40" height="48" rx="3" fill="url(#thesisGrad)" stroke="#F5A623" strokeWidth="2" />
        {/* Book Spine Emboss */}
        <rect x="12" y="8" width="6" height="48" rx="2" fill="#334155" />
        {/* Gold Emblem Crest on Cover */}
        <circle cx="35" cy="24" r="7" stroke="url(#goldRibbon)" strokeWidth="1.5" fill="none" />
        <path d="M35 19 L32 26 H38 Z" fill="url(#goldRibbon)" />
        {/* Gold Inscription Lines */}
        <rect x="24" y="35" width="22" height="2" rx="1" fill="#F5A623" />
        <rect x="27" y="40" width="16" height="1.5" rx="1" fill="#F5A623" opacity="0.8" />
        {/* Red/Gold Bookmark Ribbon hanging out */}
        <path d="M33 56 V62 L36 59 L39 62 V56 Z" fill="#DC2626" stroke="#B91C1C" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

// 6. Book Writing Real Icon
export function BookRealIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        {/* Open Book Wings */}
        <path d="M32 46 C24 43 14 43 8 45 V17 C14 15 24 15 32 18 C40 15 50 15 56 17 V45 C50 43 40 43 32 46 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
        {/* Pages texture */}
        <path d="M12 24 C18 22 26 22 30 24" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 29 C18 27 26 27 30 29" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 34 C18 32 26 32 30 34" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M34 24 C38 22 46 22 52 24" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M34 29 C38 27 46 27 52 29" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M34 34 C38 32 46 32 52 34" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        {/* Spine */}
        <line x1="32" y1="18" x2="32" y2="47" stroke="#FF6B00" strokeWidth="2.5" />
      </svg>
    </div>
  );
}

// 7. Presentation & Slides Real Icon
export function PresentationRealIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="pptGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
        </defs>
        {/* Stand Tripod */}
        <path d="M32 48 L22 60 M32 48 L42 60 M32 44 V52" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
        {/* Projector Screen */}
        <rect x="8" y="10" width="48" height="34" rx="4" fill="#0A1128" stroke="#38BDF8" strokeWidth="2" />
        {/* Presentation Pie & Bar Chart */}
        <circle cx="22" cy="26" r="7" fill="#38BDF8" opacity="0.8" />
        <path d="M22 26 L22 19 A7 7 0 0 1 29 26 Z" fill="#F59E0B" />
        <rect x="34" y="28" width="4" height="8" rx="1" fill="#34D399" />
        <rect x="40" y="23" width="4" height="13" rx="1" fill="#F59E0B" />
        <rect x="46" y="18" width="4" height="18" rx="1" fill="#38BDF8" />
      </svg>
    </div>
  );
}

// 8. AI / ML Code & Model Real Icon
export function CodeModelRealIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        {/* Laptop / Terminal Monitor */}
        <rect x="8" y="12" width="48" height="34" rx="4" fill="url(#screenGrad)" stroke="#818CF8" strokeWidth="2" />
        {/* Header Dots */}
        <circle cx="14" cy="18" r="2" fill="#EF4444" />
        <circle cx="20" cy="18" r="2" fill="#F59E0B" />
        <circle cx="26" cy="18" r="2" fill="#10B981" />
        {/* Neural Network Nodes */}
        <circle cx="20" cy="30" r="3" fill="#38BDF8" />
        <circle cx="20" cy="38" r="3" fill="#38BDF8" />
        <circle cx="32" cy="27" r="3" fill="#A855F7" />
        <circle cx="32" cy="34" r="3" fill="#A855F7" />
        <circle cx="32" cy="41" r="3" fill="#A855F7" />
        <circle cx="44" cy="34" r="3" fill="#F43F5E" />
        {/* Connections */}
        <line x1="20" y1="30" x2="32" y2="27" stroke="#64748B" strokeWidth="1" />
        <line x1="20" y1="30" x2="32" y2="34" stroke="#64748B" strokeWidth="1" />
        <line x1="20" y1="38" x2="32" y2="34" stroke="#64748B" strokeWidth="1" />
        <line x1="20" y1="38" x2="32" y2="41" stroke="#64748B" strokeWidth="1" />
        <line x1="32" y1="27" x2="44" y2="34" stroke="#64748B" strokeWidth="1" />
        <line x1="32" y1="34" x2="44" y2="34" stroke="#64748B" strokeWidth="1" />
        <line x1="32" y1="41" x2="44" y2="34" stroke="#64748B" strokeWidth="1" />
        {/* Base */}
        <path d="M4 48 H60 L54 52 H10 Z" fill="#334155" />
      </svg>
    </div>
  );
}

// 9. Synopsis & Proposal Real Icon
export function SynopsisRealIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="synopsisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
        </defs>
        <rect x="14" y="6" width="36" height="52" rx="4" fill="url(#synopsisGrad)" stroke="#CBD5E1" strokeWidth="2" />
        <circle cx="32" cy="20" r="6" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
        <path d="M30 18 L32 23 L35 17" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="20" y="30" width="24" height="2" rx="1" fill="#334155" />
        <rect x="20" y="35" width="24" height="2" rx="1" fill="#64748B" />
        <rect x="20" y="40" width="18" height="2" rx="1" fill="#64748B" />
        {/* Verified Red Wax Seal */}
        <circle cx="40" cy="46" r="6" fill="#DC2626" />
        <circle cx="40" cy="46" r="4.5" stroke="#FDE047" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}

// 10. WhatsApp 3D Realistic Icon
export function WhatsAppRealIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="waGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#29B35A" />
            <stop offset="100%" stopColor="#1E9648" />
          </linearGradient>
        </defs>
        {/* Circle with 3D gradient */}
        <circle cx="32" cy="32" r="28" fill="url(#waGrad)" stroke="#A7F3D0" strokeWidth="1.5" />
        {/* Telephone Handset Path */}
        <path
          d="M44.5 37.8c-.7-.4-4.2-2.1-4.9-2.3-.7-.2-1.1-.3-1.6.4-.5.7-1.8 2.3-2.3 2.8-.4.5-.8.5-1.5.2-.7-.4-3-1.1-5.7-3.5-2.1-1.9-3.5-4.2-3.9-4.9-.4-.7 0-1.1.4-1.4.3-.3.7-.8 1.1-1.2.4-.4.5-.7.7-1.2.2-.5.1-.9-.1-1.2-.2-.4-1.6-3.8-2.2-5.3-.6-1.4-1.2-1.2-1.6-1.2h-1.4c-.5 0-1.2.2-1.9.9-.7.7-2.5 2.4-2.5 5.9s2.6 6.9 2.9 7.3c.4.5 5 7.6 12.1 10.7 1.7.7 3 1.2 4.1 1.5 1.7.5 3.3.5 4.5.3 1.4-.2 4.2-1.7 4.8-3.4.6-1.7.6-3.1.4-3.4-.2-.3-.6-.5-1.3-.8z"
          fill="#FFFFFF"
        />
        {/* Speech tail */}
        <path d="M19 45 L13 51 L17 41 Z" fill="url(#waGrad)" />
      </svg>
    </div>
  );
}

// 11. Location Pin Real Icon
export function LocationRealIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="pinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="50%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#7C2D12" />
          </linearGradient>
        </defs>
        {/* Ground Shadow Ripple */}
        <ellipse cx="32" cy="56" rx="14" ry="4" fill="#0A1128" opacity="0.25" />
        <ellipse cx="32" cy="56" rx="8" ry="2" fill="#0A1128" opacity="0.4" />
        {/* 3D Pin Head */}
        <path
          d="M32 6 C20 6 12 15 12 26 C12 39 32 54 32 54 C32 54 52 39 52 26 C52 15 44 6 32 6 Z"
          fill="url(#pinGrad)"
          stroke="#FED7AA"
          strokeWidth="1.5"
        />
        {/* Center White Core */}
        <circle cx="32" cy="24" r="8" fill="#FFFFFF" />
        <circle cx="32" cy="24" r="4" fill="#EA580C" />
      </svg>
    </div>
  );
}

// 12. Email Real Icon
export function EmailRealIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="mailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
        <rect x="8" y="16" width="48" height="34" rx="4" fill="url(#mailGrad)" stroke="#93C5FD" strokeWidth="1.5" />
        <path d="M8 18 L32 35 L56 18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 48 L24 33 M56 48 L40 33" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 13. Step 01 to 05 3D Icons
export function Step1Icon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="8" y="8" width="32" height="32" rx="10" fill="url(#s1g)" />
        <defs>
          <linearGradient id="s1g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        <path d="M16 24 H32 M24 16 V32" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function Step2Icon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="8" y="8" width="32" height="32" rx="10" fill="url(#s2g)" />
        <defs>
          <linearGradient id="s2g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
        </defs>
        <path d="M24 16 L34 22 L24 28 L14 22 Z M24 28 V34 M31 24 V31" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function Step3Icon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="8" y="8" width="32" height="32" rx="10" fill="url(#s3g)" />
        <defs>
          <linearGradient id="s3g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <path d="M18 30 L30 18 M28 16 L32 20" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function Step4Icon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="8" y="8" width="32" height="32" rx="10" fill="url(#s4g)" />
        <defs>
          <linearGradient id="s4g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        <path d="M18 24 L22 28 L30 19" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
