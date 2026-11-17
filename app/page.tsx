'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import InkMonkCinematicCore from '@/components/InkMonkCinematicCore';
import {
  ScrollProgressLaser,
  CyberCircuitSpine,
  Interactive3DCard,
  CyberParticleField,
  ScrollReveal3D,
  Scroll3DParallaxSection,
  FloatingScrollBadge,
} from '@/components/FuturisticScrollExperience';
import {
  ResearchPaper3DVisual,
  Thesis3DVisual,
  ModelCode3DVisual,
  Turnitin3DVisual,
  Book3DVisual,
  Presentation3DVisual,
} from '@/components/Service3DVisuals';

import HorizontalHowItWorks from '@/components/HorizontalHowItWorks';
import ResearchAreasSection from '@/components/ResearchAreasSection';
import FaqSection from '@/components/FaqSection';

import {
  UkFlagLogo,
  IndiaFlagLogo,
  TurnitinShieldLogo,
  OfficialTurnitinLogo,
  AcademicLabCrestLogo,
  UpiShieldIcon,
  GoogleScholarRealIcon,
  IeeeXploreRealIcon,
  GitHubRealIcon,
  NdaShieldIcon,
  TerminalLogIcon,
  AuditTrailIcon,
  CalendarScheduleIcon,
  LocationRealIcon,
  WhatsAppRealIcon,
  EmailRealIcon,
} from '@/components/RealIcons';

import {
  ResearchPaperRealWork,
  ThesisRealWork,
  BookRealWork,
  ReviewPaperRealWork,
  ArticleRealWork,
  PresentationRealWork,
  ModelCodeRealWork,
  SynopsisRealWork,
  TurnitinReportRealWork,
  HindiPaperRealWork,
} from '@/components/RealWorkImages';

import {
  InstantTurnitinModal,
  TurnitinSampleModal,
  FormalNdaModal,
  ConsultationSchedulerModal,
  ModelCodeScopeBuilderModal,
  TranslationAuditModal,
  MilestonePaymentTimeline,
} from '@/components/FuturisticInteractions';

const SERVICES = [
  {
    visual: <ResearchPaper3DVisual className="w-full h-44 mb-4" />,
    title: 'Research Paper Writing',
    desc: 'IEEE, Springer, Elsevier standard manuscripts with structured methodology, empirical experiments, and citations in English & Hindi.',
    href: '/quote?service=RESEARCH_PAPER',
    badge: 'IEEE / Springer / Elsevier',
    glowColor: 'purple' as const,
  },
  {
    visual: <Thesis3DVisual className="w-full h-44 mb-4" />,
    title: 'Thesis & Dissertation',
    desc: 'Master and Doctoral thesis drafting from literature review to conclusion, with optional computational model implementation.',
    href: '/quote?service=THESIS',
    badge: 'Milestone Escrow',
    glowColor: 'purple' as const,
  },
  {
    visual: <Book3DVisual className="w-full h-44 mb-4" />,
    title: 'Book Writing (100–300 Pages)',
    desc: 'Full-length scholarly book manuscripts, edited volumes, monographs, and book chapters formatted for ISBN publication.',
    href: '/quote?service=BOOK',
    badge: 'ISBN Standard',
    glowColor: 'purple' as const,
  },
  {
    visual: <ReviewPaperRealWork className="w-full h-44 mb-4" />,
    title: 'Review Papers',
    desc: 'Systematic literature reviews and bibliometric surveys mapping state-of-the-art developments across your discipline.',
    href: '/quote?service=REVIEW_PAPER',
    badge: 'PRISMA Guidelines',
    glowColor: 'purple' as const,
  },
  {
    visual: <ArticleRealWork className="w-full h-44 mb-4" />,
    title: 'Article Writing',
    desc: 'Expertly researched academic, journal, and thought leadership articles with verified word counts and full citation rigor.',
    href: '/quote?service=ARTICLE',
    badge: 'Standardized Rates in Quote',
    glowColor: 'purple' as const,
  },
  {
    visual: <Presentation3DVisual className="w-full h-44 mb-4" />,
    title: 'Academic PPT & Defense',
    desc: 'Engaging, professional thesis defense and conference presentation slide decks formatted for university evaluation panels.',
    href: '/quote?service=PPT',
    badge: 'Defense Ready',
    glowColor: 'purple' as const,
  },
  {
    visual: <ModelCode3DVisual className="w-full h-44 mb-4" />,
    title: 'Model & Code Implementation',
    desc: 'Machine learning, deep learning (PyTorch, TensorFlow), Python, and MATLAB code implementation with reproducible benchmarks.',
    href: '/quote?service=MODEL',
    badge: 'Docker & Git Handoff',
    glowColor: 'purple' as const,
    isCode: true,
  },
  {
    visual: <SynopsisRealWork className="w-full h-44 mb-4" />,
    title: 'Synopsis & Research Proposals',
    desc: 'Crisp, defensible research synopses for PhD registrations, grant applications, and institutional doctoral committees.',
    href: '/quote?service=SYNOPSIS',
    badge: 'DRC Committee Ready',
    glowColor: 'purple' as const,
  },
  {
    visual: <Turnitin3DVisual className="w-full h-44 mb-4" />,
    title: 'Turnitin AI & Plagiarism Reports',
    price: '₹200 per file flat',
    desc: 'Instructor-tier Turnitin verification audits checking similarity index and AI writing percentages without saving to repository.',
    href: '/quote?type=TURNITIN',
    badge: 'Safe Non-Repository',
    glowColor: 'purple' as const,
    isTurnitin: true,
  },
];

export default function HomePage() {
  const [turnitinModalOpen, setTurnitinModalOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [ndaModalOpen, setNdaModalOpen] = useState(false);
  const [schedulerModalOpen, setSchedulerModalOpen] = useState(false);
  const [scopeBuilderOpen, setScopeBuilderOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  return (
    <div className="min-h-screen text-center bg-white dark:bg-[#000000] text-black dark:text-white relative transition-colors duration-300 selection:bg-purple-600 selection:text-white">

      {/* ─── Fixed Top Laser Scroll Progress Scanner & HUD ─────────────── */}
      <ScrollProgressLaser />

      {/* ─── Hero Section with 3D Cyber Ecosystem & Kinetic Motion ────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 text-center bg-white dark:bg-midnight border-b border-purple-100 dark:border-purple-500/20">
        {/* Subtle Geometric Background Layer */}
        <div className="absolute inset-0 cyber-grid-bg opacity-15 dark:opacity-35 pointer-events-none" />

        {/* Ambient Soft Purple Glow Orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-500/10 via-purple-400/5 to-purple-600/10 dark:from-purple-900/30 dark:via-purple-800/20 dark:to-purple-950/30 rounded-full blur-3xl pointer-events-none animate-holo-glow" />

        {/* Floating Subtle Particle Field */}
        <CyberParticleField />

        {/* Tactical Coordinates Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 relative z-10">
          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-purple-950 dark:text-purple-200 bg-white/95 dark:bg-[#0A0414]/90 border border-purple-200 dark:border-purple-500/30 px-4 py-2 rounded-2xl backdrop-blur-xl shadow-sm dark:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 animate-ping"></span>
              <strong className="text-black dark:text-white">LAB TELEMETRY:</strong> PROCEDURAL ECOSYSTEM ONLINE
            </span>
            <span className="hidden sm:inline text-purple-900/60 dark:text-purple-300/60">COPE ETHICS COMPLIANT • ZERO REPOSITORY DEPOSIT</span>
            <span className="text-purple-700 dark:text-purple-300 font-bold">SALT LAKE SECTOR 2 • KOLKATA</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Split-Reveal Headline, Assurances, CTAs (Centered) */}
            <div className="lg:col-span-7 flex flex-col items-center text-center">

              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-400/40 px-4 py-1.5 rounded-full backdrop-blur-md mb-5 shadow-sm dark:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-200 font-mono">
                  Autonomous Scholarly Ecosystem
                </span>
              </div>

              {/* Jitter-Style "Split Reveal" Kinetic Headline */}
              <div className="relative mb-3 overflow-hidden">
                <div className="animate-split-top">
                  <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-black dark:text-white text-center">
                    InkMonk <span className="gradient-purple-text">Research</span>
                  </h1>
                </div>

                {/* Laser Split Seam Beam */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent my-1 animate-laser-seam shadow-[0_0_15px_rgba(168,85,247,0.5)]" />

                <div className="animate-split-bottom">
                  <p className="text-xl sm:text-2xl font-serif italic text-purple-950 dark:text-purple-100 font-bold text-center">
                    &ldquo;Research with care. Writing with clarity.&rdquo;
                  </p>
                </div>
              </div>

              {/* Assurance Ribbon with Real Shield Logo */}
              <div className="inline-flex items-center gap-2.5 bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/40 text-purple-900 dark:text-purple-200 text-xs sm:text-sm font-bold px-4 py-2 rounded-full mb-6 shadow-sm dark:shadow-[0_0_20px_rgba(168,85,247,0.25)] backdrop-blur-sm">
                <OfficialTurnitinLogo className="w-5 h-5" />
                <span>Strict 0% AI Assured • Plagiarism &lt; 10% • Safe Non-Repository Protocol</span>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-700 dark:text-purple-100/90 max-w-xl mx-auto leading-relaxed mb-6 text-center font-normal">
                Premier academic research, doctoral dissertation structuring, book writing, and Turnitin audits in <strong className="text-black dark:text-white font-bold">English</strong> and <strong className="text-black dark:text-white font-bold">Hindi</strong>. Supervised directly by qualified subject-matter doctoral directors.
              </p>

              {/* Primary Call to Actions & Instant Modals */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 mb-6 w-full">
                <Link
                  href="/quote"
                  className="btn-primary-glow text-sm font-bold shadow-xl w-full sm:w-auto font-mono"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Calculate Your Free Quote →
                </Link>

                <button
                  onClick={() => setTurnitinModalOpen(true)}
                  className="bg-purple-700 hover:bg-purple-600 text-white font-bold text-sm px-5 py-3 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer font-mono"
                >
                  <OfficialTurnitinLogo className="w-4 h-4" />
                  <span>Instant Turnitin Scan (₹200)</span>
                </button>

                <button
                  onClick={() => setSchedulerModalOpen(true)}
                  className="btn-secondary-dark text-sm font-bold w-full sm:w-auto cursor-pointer font-mono"
                >
                  <CalendarScheduleIcon className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                  <span>Book Consultation</span>
                </button>
              </div>

              {/* Quick Trust Badges with Real Emblems */}
              <div className="grid grid-cols-3 gap-3.5 max-w-lg mx-auto w-full">
                <div className="bg-white dark:bg-[#0A0414]/90 border border-purple-200 dark:border-purple-500/25 p-3 rounded-2xl backdrop-blur-md text-center flex flex-col items-center shadow-sm dark:shadow-lg">
                  <UkFlagLogo className="w-7 h-7 mb-1" />
                  <div className="text-purple-800 dark:text-purple-200 font-bold text-sm">English</div>
                  <div className="text-[10px] text-purple-900/60 dark:text-purple-300/70 font-medium">Tech &amp; Non-Tech</div>
                </div>
                <div className="bg-white dark:bg-[#0A0414]/90 border border-purple-200 dark:border-purple-500/25 p-3 rounded-2xl backdrop-blur-md text-center flex flex-col items-center shadow-sm dark:shadow-lg">
                  <IndiaFlagLogo className="w-7 h-7 mb-1" />
                  <div className="text-purple-800 dark:text-purple-200 font-bold text-sm">Hindi</div>
                  <div className="text-[10px] text-purple-900/60 dark:text-purple-300/70 font-medium">Devanagari Specialists</div>
                </div>
                <div className="bg-white dark:bg-[#0A0414]/90 border border-purple-200 dark:border-purple-500/25 p-3 rounded-2xl backdrop-blur-md text-center flex flex-col items-center shadow-sm dark:shadow-lg">
                  <UpiShieldIcon className="w-7 h-7 mb-1" />
                  <div className="text-purple-800 dark:text-purple-200 font-bold text-sm">Instant UPI</div>
                  <div className="text-[10px] text-purple-900/60 dark:text-purple-300/70 font-medium">Direct Payments</div>
                </div>
              </div>

            </div>

            {/* Right Column: 3D InkMonk Research Core with 3D Parallax Motion */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center gap-4">
              <div className="w-full flex justify-center">
                <FloatingScrollBadge speed={0.8} className="w-full flex justify-center">
                  <InkMonkCinematicCore />
                </FloatingScrollBadge>
              </div>

              {/* Interactive Badges */}
              <div className="flex flex-wrap items-center gap-2.5 w-full justify-center">
                <button
                  onClick={() => setNdaModalOpen(true)}
                  className="bg-white dark:bg-[#0A0414] text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-500/40 hover:border-purple-400 text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-sm dark:shadow-xl flex items-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors cursor-pointer font-mono"
                >
                  <NdaShieldIcon className="w-4 h-4" />
                  <span>Mutual NDA Protected</span>
                </button>

                <button
                  onClick={() => setSampleModalOpen(true)}
                  className="bg-purple-50 dark:bg-purple-950/80 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-500/50 hover:border-purple-400 text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-sm dark:shadow-xl flex items-center gap-2 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors cursor-pointer font-mono"
                >
                  <OfficialTurnitinLogo className="w-4 h-4" />
                  <span>Watermarked Sample →</span>
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      sessionStorage.removeItem('inkmonk_cinematic_played');
                      window.location.reload();
                    }
                  }}
                  title="Replay the cinematic 3D entrance animation"
                  className="bg-white dark:bg-white/5 text-purple-800 dark:text-purple-300 hover:text-purple-950 dark:hover:text-white border border-purple-200 dark:border-white/10 text-[11px] font-mono px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <span>↺</span>
                  <span>Replay 3D Sequence</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── 3 Primary Pillars (English, Hindi & Turnitin) with 3D Parallax ─── */}
      <section className="py-20 px-4 bg-white dark:bg-[#000000] text-center relative transition-colors duration-300" id="services">
        <Scroll3DParallaxSection offsetY={40}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="badge-pill-purple mb-3">CORE DISCIPLINES</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4 text-center">
                Comprehensive Scholarly Solutions
              </h2>
              <p className="text-slate-700 dark:text-purple-200/80 text-base sm:text-lg text-center font-normal">
                Tailored specifically to international publishing guidelines, doctoral requirements, and institutional rubrics. No public price lists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* English Card */}
              <Interactive3DCard glowColor="purple">
                <div className="p-6 flex flex-col justify-between border-t-4 border-t-purple-600 dark:border-t-purple-400 text-center relative h-full">
                  <span className="absolute top-4 right-4 bg-purple-50 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-400/40 text-[11px] font-bold px-3 py-1 rounded-full uppercase shadow-sm font-mono">
                    English Specialists
                  </span>
                  <div>
                    <ResearchPaper3DVisual className="w-full h-44 mb-4" />
                    <h3 className="font-serif text-2xl font-bold text-black dark:text-white mb-1 text-center">English Services</h3>
                    <p className="text-slate-600 dark:text-purple-200/70 text-xs mb-4 text-center">
                      Technical and non-technical manuscripts formatted to IEEE, Springer, Elsevier, APA, Harvard, and UGC standards.
                    </p>
                    <div className="max-w-xs mx-auto mb-6">
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-purple-200 text-left">
                        <li className="flex items-center gap-2">
                          <span className="text-purple-600 dark:text-purple-400 font-bold">✓</span> Research &amp; Review Papers
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-purple-600 dark:text-purple-400 font-bold">✓</span> Master &amp; Doctoral Theses (with/without model)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-purple-600 dark:text-purple-400 font-bold">✓</span> Scholarly Books (100–300 pages)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-purple-600 dark:text-purple-400 font-bold">✓</span> Journal Articles &amp; Conference Slides
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Link href="/quote?lang=EN" className="btn-primary-glow text-xs w-full text-center font-mono">
                    Configure English Quote →
                  </Link>
                </div>
              </Interactive3DCard>

              {/* Hindi Card */}
              <Interactive3DCard glowColor="purple">
                <div className="p-6 flex flex-col justify-between border-t-4 border-t-purple-700 dark:border-t-purple-500 text-center relative h-full">
                  <span className="absolute top-4 right-4 bg-purple-50 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-400/40 text-[11px] font-bold px-3 py-1 rounded-full uppercase shadow-sm font-mono">
                    Hindi Specialists
                  </span>
                  <div>
                    <HindiPaperRealWork className="w-full h-44 mb-4" />
                    <h3 className="font-serif text-2xl font-bold text-black dark:text-white mb-1 text-center">Hindi Services</h3>
                    <p className="text-slate-600 dark:text-purple-200/70 text-xs mb-4 text-center">
                      Supervised by Sampreeti Mukherjee with standardized academic vocabulary, Shodhganga compliance, and zero automated translation shortcuts.
                    </p>
                    <div className="max-w-xs mx-auto mb-4">
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-purple-200 text-left">
                        <li className="flex items-center gap-2">
                          <span className="text-purple-600 dark:text-purple-400 font-bold">✓</span> शोध पत्र / Research Papers
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-purple-600 dark:text-purple-400 font-bold">✓</span> शोध प्रबंध / Complete Thesis
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-purple-600 dark:text-purple-400 font-bold">✓</span> पुस्तक लेखन (100–300 पृष्ठ)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-purple-600 dark:text-purple-400 font-bold">✓</span> देवनागरी व्याख्यान एवं प्रस्तुतियाँ
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => setAuditModalOpen(true)}
                      className="text-xs text-purple-700 dark:text-purple-300 font-bold hover:underline mb-4 inline-flex items-center gap-1 cursor-pointer font-mono"
                    >
                      <AuditTrailIcon className="w-4 h-4" />
                      <span>View Vernacular Translation Audit Trail →</span>
                    </button>
                  </div>
                  <Link href="/quote?lang=HI" className="btn-primary-glow text-xs w-full text-center font-mono">
                    Configure Hindi Quote →
                  </Link>
                </div>
              </Interactive3DCard>

              {/* Turnitin Card */}
              <Interactive3DCard glowColor="purple">
                <div className="p-6 flex flex-col justify-between border-t-4 border-t-purple-600 dark:border-t-purple-400 text-center relative h-full">
                  <span className="absolute top-4 right-4 bg-purple-50 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-400/40 text-[11px] font-bold px-3 py-1 rounded-full uppercase shadow-sm font-mono">
                    Verified Originality
                  </span>
                  <div>
                    <Turnitin3DVisual className="w-full h-44 mb-4" />
                    <h3 className="font-serif text-2xl font-bold text-black dark:text-white mb-1 text-center">Turnitin Reports</h3>
                    <p className="text-slate-600 dark:text-purple-200/70 text-xs mb-3 text-center">
                      Instructor-grade originality and AI writing detection report without saving your file to public repositories.
                    </p>
                    <div className="p-3 bg-purple-50/60 dark:bg-[#0A0414] rounded-xl border border-purple-200 dark:border-purple-500/30 mb-3 text-center">
                      <div className="text-[10px] text-purple-700 dark:text-purple-300 font-bold uppercase tracking-wider font-mono">Fixed Flat Fee</div>
                      <div className="font-serif text-2xl font-extrabold text-black dark:text-white">₹200</div>
                      <div className="text-[10px] text-slate-500 dark:text-purple-300/70">per file scanned • 15–30 min delivery • Direct UPI Accepted</div>
                    </div>

                    <button
                      onClick={() => setSampleModalOpen(true)}
                      className="text-xs text-purple-700 dark:text-purple-300 hover:underline font-bold mb-3 block cursor-pointer font-mono"
                    >
                      View Watermarked Sample Deliverable →
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setTurnitinModalOpen(true)}
                      className="btn-primary-glow text-xs w-full text-center cursor-pointer font-mono"
                    >
                      Upload &amp; Pay ₹200 via UPI →
                    </button>
                  </div>
                </div>
              </Interactive3DCard>
            </div>
          </div>
        </Scroll3DParallaxSection>
      </section>

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── Milestone Payment Timeline Section ───────────────────────────── */}
      <section className="py-16 px-4 bg-purple-50/30 dark:bg-[#05020A] text-center border-y border-purple-100 dark:border-purple-500/20 transition-colors duration-300">
        <ScrollReveal3D>
          <div className="max-w-6xl mx-auto">
            <MilestonePaymentTimeline />
          </div>
        </ScrollReveal3D>
      </section>

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── 9-Service Grid with REAL IMAGES & 3D VISUALS ─────────────────── */}
      <section className="py-20 px-4 bg-white dark:bg-[#000000] text-center transition-colors duration-300">
        <Scroll3DParallaxSection offsetY={30}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="badge-pill-purple mb-3">GENUINE DELIVERABLE PREVIEWS</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4 text-center">
                Explore Our Specific Capabilities
              </h2>
              <p className="text-slate-600 dark:text-purple-200/80 text-base text-center">
                Real sample previews of our manuscripts, models, presentations, and reports.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => (
                <Interactive3DCard key={s.title} glowColor={s.glowColor}>
                  <div className="p-6 flex flex-col justify-between text-center items-center group relative h-full">
                    <span className="text-[10px] font-bold font-mono text-purple-800 dark:text-purple-200 bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/40 px-2.5 py-0.5 rounded-full mb-3">
                      {s.badge}
                    </span>

                    {/* Real Image of the Work or 3D Visual */}
                    <div className="w-full transform group-hover:scale-[1.02] transition-transform duration-300">
                      {s.visual}
                    </div>

                    <div className="flex flex-col items-center text-center w-full">
                      <h3 className="font-serif font-bold text-lg text-black dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors mb-1 text-center">
                        {s.title}
                      </h3>
                      {s.price && (
                        <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">
                          {s.price}
                        </div>
                      )}
                      <p className="text-slate-600 dark:text-purple-200/70 text-xs leading-relaxed mb-4 text-center">
                        {s.desc}
                      </p>
                    </div>

                    <div className="w-full pt-3 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between">
                      {s.isCode ? (
                        <button
                          onClick={() => setScopeBuilderOpen(true)}
                          className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer font-mono"
                        >
                          <TerminalLogIcon className="w-3.5 h-3.5" />
                          <span>Scope Builder →</span>
                        </button>
                      ) : s.isTurnitin ? (
                        <button
                          onClick={() => setTurnitinModalOpen(true)}
                          className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer font-mono"
                        >
                          <span>Instant Scan →</span>
                        </button>
                      ) : (
                        <Link
                          href={s.href}
                          className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 font-mono"
                        >
                          <span>Calculate Instant Quote →</span>
                        </Link>
                      )}
                      <span className="text-[10px] text-purple-400 dark:text-purple-500 font-mono">Server Calculated</span>
                    </div>
                  </div>
                </Interactive3DCard>
              ))}
            </div>
          </div>
        </Scroll3DParallaxSection>
      </section>

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── RESEARCH AREAS SUPPORTED (AFTER SERVICES AS REQUESTED) ──────── */}
      <ResearchAreasSection />

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── HORIZONTAL HOW IT WORKS PIPELINE (HORIZONTAL NOT VERTICAL) ─── */}
      <HorizontalHowItWorks />

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── Founders & Verifiable Doctoral Leadership Section ─────────────── */}
      <section className="py-20 px-4 bg-purple-50/20 dark:bg-[#000000] text-center transition-colors duration-300" id="about">
        <Scroll3DParallaxSection offsetY={25}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="badge-pill-purple mb-3">ACADEMIC DIRECTORATE</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4 text-center">
                Led by Dedicated Scholars
              </h2>
              <p className="text-slate-600 dark:text-purple-200/80 text-base text-center font-normal">
                Every project is directly overseen by our directors with verifiable academic publishing records.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tuhit Roy */}
              <Interactive3DCard glowColor="purple">
                <div className="p-8 text-center flex flex-col items-center justify-between h-full">
                  <div>
                    <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-[#0A0414] text-purple-700 dark:text-purple-300 font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 border-2 border-purple-400 dark:border-purple-500 shadow-md">
                      TR
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-black dark:text-white text-center">Tuhit Roy</h3>
                    <p className="text-purple-700 dark:text-purple-400 font-semibold text-xs uppercase tracking-wider mb-3 text-center font-mono">
                      Founder &amp; Research Director
                    </p>
                    <p className="text-slate-600 dark:text-purple-200/70 text-sm leading-relaxed text-center mb-6">
                      Directs technical research methodologies, AI/ML computational architectures (PyTorch/CUDA), and IEEE/Scopus manuscript structuring.
                    </p>
                  </div>

                  {/* Verifiable Scholar Badges */}
                  <div className="w-full pt-4 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-center gap-4">
                    <a
                      href="https://scholar.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-purple-200 hover:text-purple-600 dark:hover:text-white font-semibold transition-colors"
                    >
                      <GoogleScholarRealIcon className="w-4 h-4" />
                      <span>Scholar</span>
                    </a>
                    <a
                      href="https://ieeexplore.ieee.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-purple-200 hover:text-purple-600 dark:hover:text-white font-semibold transition-colors"
                    >
                      <IeeeXploreRealIcon className="w-4 h-4" />
                      <span>IEEE</span>
                    </a>
                    <a
                      href="https://github.com/tuhitroy02"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-purple-200 hover:text-purple-600 dark:hover:text-white font-semibold transition-colors"
                    >
                      <GitHubRealIcon className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </Interactive3DCard>

              {/* Sampreeti Mukherjee */}
              <Interactive3DCard glowColor="purple">
                <div className="p-8 text-center flex flex-col items-center justify-between h-full">
                  <div>
                    <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-[#0A0414] text-purple-700 dark:text-purple-300 font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 border-2 border-purple-400 dark:border-purple-500 shadow-md">
                      SM
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-black dark:text-white text-center">Sampreeti Mukherjee</h3>
                    <p className="text-purple-700 dark:text-purple-400 font-semibold text-xs uppercase tracking-wider mb-3 text-center font-mono">
                      Co-Founder &amp; Editorial Director
                    </p>
                    <p className="text-slate-600 dark:text-purple-200/70 text-sm leading-relaxed text-center mb-6">
                      Leads qualitative editorial refinement, humanities peer-review consultations, and our specialized Hindi research and dissertation division.
                    </p>
                  </div>

                  {/* Editorial Badges */}
                  <div className="w-full pt-4 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-center gap-4 text-xs text-slate-700 dark:text-purple-200 font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">✓</span>
                      <span>UGC-CARE Standards</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">✓</span>
                      <span>Comparative Literature</span>
                    </span>
                  </div>
                </div>
              </Interactive3DCard>
            </div>
          </div>
        </Scroll3DParallaxSection>
      </section>

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── Office & Contact Section ────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white dark:bg-[#05020A] text-black dark:text-white text-center relative overflow-hidden border-t border-purple-100 dark:border-purple-500/20 transition-colors duration-300" id="contact">
        <ScrollReveal3D>
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-400/30 px-4 py-1.5 rounded-full backdrop-blur-md mb-4 shadow-sm">
                <LocationRealIcon className="w-4 h-4" />
                <span className="text-xs font-bold text-purple-800 dark:text-purple-200 uppercase tracking-widest font-mono">
                  Physical Presence in Kolkata
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-3 text-center text-black dark:text-white">
                Karunamoyee, Salt Lake Sector 2
              </h3>
              <p className="text-slate-600 dark:text-purple-200/80 text-sm sm:text-base max-w-lg mx-auto text-center font-normal">
                Serving researchers across all Indian universities and international institutions. In-person visits by appointment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
              <div className="bg-purple-50/50 dark:bg-[#0A0414] border border-purple-100 dark:border-purple-500/25 p-6 rounded-2xl backdrop-blur-md flex flex-col items-center text-center shadow-sm dark:shadow-lg">
                <LocationRealIcon className="w-10 h-10 mb-3" />
                <div className="text-sm font-bold text-black dark:text-white mb-1">Our Location</div>
                <div className="text-xs text-slate-600 dark:text-purple-200/70">Sector 2, Salt Lake City, Kolkata 700091</div>
              </div>
              <div className="bg-purple-50/50 dark:bg-[#0A0414] border border-purple-100 dark:border-purple-500/25 p-6 rounded-2xl backdrop-blur-md flex flex-col items-center text-center shadow-sm dark:shadow-lg">
                <WhatsAppRealIcon className="w-10 h-10 mb-3" />
                <div className="text-sm font-bold text-black dark:text-white mb-1">WhatsApp Chat</div>
                <div className="text-xs text-purple-700 dark:text-purple-300 font-bold">+91 7980470880</div>
              </div>
              <div className="bg-purple-50/50 dark:bg-[#0A0414] border border-purple-100 dark:border-purple-500/25 p-6 rounded-2xl backdrop-blur-md flex flex-col items-center text-center shadow-sm dark:shadow-lg">
                <EmailRealIcon className="w-10 h-10 mb-3" />
                <div className="text-sm font-bold text-black dark:text-white mb-1">Email Support</div>
                <div className="text-xs text-purple-700 dark:text-purple-300 font-bold">inkmonkresearch@gmail.com</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <a
                href="https://wa.me/917980470880"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-pill font-mono text-xs uppercase"
              >
                <WhatsAppRealIcon className="w-5 h-5" />
                <span>Direct WhatsApp: +91 7980470880</span>
              </a>
              <Link href="/contact" className="btn-secondary-dark font-mono text-xs uppercase">
                Send an Academic Inquiry →
              </Link>
            </div>

            {/* ─── Merged FAQ at the end of Contact Section ── */}
            <div className="w-full mt-16 pt-16 border-t border-purple-100 dark:border-purple-900/40">
              <FaqSection />
            </div>

          </div>
        </ScrollReveal3D>
      </section>

      {/* ─── Interactive Modals ─────────────────────────────────────────── */}
      <InstantTurnitinModal
        isOpen={turnitinModalOpen}
        onClose={() => setTurnitinModalOpen(false)}
      />

      <TurnitinSampleModal
        isOpen={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
      />

      <FormalNdaModal
        isOpen={ndaModalOpen}
        onClose={() => setNdaModalOpen(false)}
      />

      <ConsultationSchedulerModal
        isOpen={schedulerModalOpen}
        onClose={() => setSchedulerModalOpen(false)}
      />

      <ModelCodeScopeBuilderModal
        isOpen={scopeBuilderOpen}
        onClose={() => setScopeBuilderOpen(false)}
      />

      <TranslationAuditModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
      />

    </div>
  );
}
