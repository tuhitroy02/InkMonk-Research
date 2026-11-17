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

// 14. Academic Research Lab Crest / Seal (Replaces Cartoon Mascot)
export function AcademicLabCrestLogo({ className = "w-36 h-36" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="30%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="crestBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* Outer Hexagonal Shield */}
        <polygon
          points="60,6 108,30 108,90 60,114 12,90 12,30"
          fill="url(#crestGold)"
          stroke="#FDE68A"
          strokeWidth="1.5"
        />
        {/* Inner Shield */}
        <polygon
          points="60,12 102,33 102,87 60,108 18,87 18,33"
          fill="url(#crestBlue)"
        />

        {/* Laurels Wreath (Scholarly Excellence) */}
        <g stroke="#F59E0B" strokeWidth="1.2" opacity="0.85" fill="none">
          <path d="M30 40 C22 55, 24 75, 36 86 M30 44 L25 40 M28 54 L22 52 M28 65 L22 66 M32 76 L27 80" />
          <path d="M90 40 C98 55, 96 75, 84 86 M90 44 L95 40 M92 54 L98 52 M92 65 L98 66 M88 76 L93 80" />
        </g>

        {/* Atom / Neural Computational Orbit (Model & Science) */}
        <ellipse cx="60" cy="58" rx="26" ry="11" stroke="url(#orbitGlow)" strokeWidth="1.2" transform="rotate(-25 60 58)" opacity="0.75" />
        <ellipse cx="60" cy="58" rx="26" ry="11" stroke="url(#orbitGlow)" strokeWidth="1.2" transform="rotate(25 60 58)" opacity="0.75" />

        {/* Open Folio / Scholarly Manuscript */}
        <path
          d="M44 64 C50 61, 56 61, 60 63 C64 61, 70 61, 76 64 V78 C70 75, 64 75, 60 77 C56 75, 50 75, 44 78 Z"
          fill="#FFFBEB"
          stroke="#D97706"
          strokeWidth="1"
        />
        <line x1="60" y1="63" x2="60" y2="77" stroke="#92400E" strokeWidth="1" />

        {/* Quill Pen with Ink Drop */}
        <path
          d="M60 30 C64 36, 68 46, 60 56 C57 52, 56 42, 60 30 Z"
          fill="url(#crestGold)"
          stroke="#FFFBEB"
          strokeWidth="0.8"
        />
        <circle cx="60" cy="57" r="1.5" fill="#38BDF8" />

        {/* Academic Stars */}
        <circle cx="60" cy="20" r="2" fill="#FDE68A" />
        <circle cx="50" cy="23" r="1.5" fill="#FDE68A" />
        <circle cx="70" cy="23" r="1.5" fill="#FDE68A" />

        {/* Latin Scroll Inscription Banner */}
        <rect x="28" y="93" width="64" height="13" rx="3" fill="#D97706" stroke="#FEF3C7" strokeWidth="1" />
        <text
          x="60"
          y="102"
          textAnchor="middle"
          fill="#FFFBEB"
          fontSize="6.5"
          fontWeight="bold"
          fontFamily="serif"
          letterSpacing="1"
        >
          INKMONK LAB
        </text>
      </svg>
    </div>
  );
}

// 15. UPI / BHIM Payment Shield
export function UpiShieldIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#0A1128" />
        {/* UPI Arrows in Tricolor */}
        <path d="M14 30 L22 14 L28 26 L23 26 L22 24 L18 24 L16 28 Z" fill="#FF9933" />
        <path d="M26 30 L34 14 L40 26 L35 26 L34 24 L30 24 L28 28 Z" fill="#138808" />
        <circle cx="27" cy="27" r="2" fill="#38BDF8" />
      </svg>
    </div>
  );
}

// 16. Google Scholar Icon
export function GoogleScholarRealIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M24 6 L4 18 L24 30 L44 18 Z" fill="#4285F4" />
        <path d="M40 21 V33 C40 33, 37 36, 32 36 C27 36, 24 33, 24 33" stroke="#4285F4" strokeWidth="2.5" fill="none" />
        <path d="M12 23 V34 C12 38, 17 42, 24 42 C31 42, 36 38, 36 34 V23" fill="#3367D6" opacity="0.9" />
        <line x1="42" y1="20" x2="42" y2="35" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
        <circle cx="42" cy="36" r="2" fill="#EA4335" />
      </svg>
    </div>
  );
}

// 17. IEEE Xplore Icon
export function IeeeXploreRealIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <polygon points="24,4 44,24 24,44 4,24" fill="#00629B" stroke="#00B5E2" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="8" fill="#FFFFFF" />
        <circle cx="24" cy="24" r="4" fill="#00629B" />
        <line x1="14" y1="24" x2="34" y2="24" stroke="#00B5E2" strokeWidth="2" />
      </svg>
    </div>
  );
}

// 18. GitHub Icon
export function GitHubRealIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="24" r="22" fill="#181717" />
        <path
          d="M24 10 C16.27 10 10 16.27 10 24 C10 30.19 14.02 35.43 19.59 37.28 C20.29 37.41 20.55 36.98 20.55 36.61 C20.55 36.28 20.54 35.22 20.53 34.06 C17 34.71 16.14 33.15 15.86 32.37 C15.71 31.98 15.06 30.79 14.49 30.48 C14.02 30.22 13.35 29.59 14.48 29.57 C15.53 29.56 16.28 30.54 16.53 30.94 C17.73 32.96 19.64 32.39 20.41 32.04 C20.53 31.17 20.88 30.58 21.27 30.24 C18.15 29.89 14.88 28.69 14.88 23.33 C14.88 21.8 15.43 20.55 16.33 19.57 C16.18 19.22 15.7 17.78 16.48 15.84 C16.48 15.84 17.65 15.47 20.31 17.27 C21.42 16.96 22.61 16.81 23.8 16.8 C24.99 16.81 26.18 16.96 27.29 17.27 C29.95 15.46 31.12 15.84 31.12 15.84 C31.9 17.78 31.42 19.22 31.27 19.57 C32.17 20.55 32.72 21.79 32.72 23.33 C32.72 28.71 29.44 29.88 26.31 30.23 C26.79 30.64 27.21 31.44 27.21 32.7 C27.21 34.51 27.19 35.97 27.19 36.61 C27.19 36.98 27.45 37.42 28.16 37.28 C33.72 35.43 37.74 30.18 37.74 24 C37.74 16.27 31.47 10 23.74 10 Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}

// 19. NDA Shield / Legal Non-Disclosure Guarantee
export function NdaShieldIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M24 4 L40 10 V22 C40 32 33 41 24 44 C15 41 8 32 8 22 V10 L24 4 Z" fill="#0A1128" stroke="#F59E0B" strokeWidth="2" />
        <path d="M20 23 V19 C20 16.8 21.8 15 24 15 C26.2 15 28 16.8 28 19 V23 M17 23 H31 V33 H17 Z" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="28" r="1.5" fill="#38BDF8" />
      </svg>
    </div>
  );
}

// 20. Docker / Terminal Code Execution Log Icon
export function TerminalLogIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="4" y="8" width="40" height="32" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="10" cy="14" r="1.5" fill="#EF4444" />
        <circle cx="15" cy="14" r="1.5" fill="#F59E0B" />
        <circle cx="20" cy="14" r="1.5" fill="#10B981" />
        <path d="M12 24 L18 28 L12 32 M22 32 H32" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// 21. Academic Translation Audit Trail Icon
export function AuditTrailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="24" r="20" fill="#0A1128" stroke="#FF6B00" strokeWidth="1.5" />
        <path d="M14 20 L20 14 M20 14 L26 20 M20 14 V34 M34 28 L28 34 M28 34 L22 28 M28 34 V14" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// 22. Calendar Consultation Icon
export function CalendarScheduleIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="8" y="10" width="32" height="30" rx="6" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
        <path d="M8 18 H40 M16 6 V12 M32 6 V12" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="16" cy="26" r="2" fill="#FF6B00" />
        <circle cx="24" cy="26" r="2" fill="#FF6B00" />
        <circle cx="32" cy="26" r="2" fill="#FF6B00" />
        <circle cx="24" cy="33" r="2" fill="#10B981" />
      </svg>
    </div>
  );
}
