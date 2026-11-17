'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SplitRevealIntro from '@/components/SplitRevealIntro';
import { CyberEcosystem3D } from '@/components/CyberEcosystemVisuals';
import {
  ScrollProgressLaser,
  CyberCircuitSpine,
  Interactive3DCard,
  CyberParticleField,
} from '@/components/FuturisticScrollExperience';

import {
  UkFlagLogo,
  IndiaFlagLogo,
  TurnitinShieldLogo,
  AcademicLabCrestLogo,
  UpiShieldIcon,
  GoogleScholarRealIcon,
  IeeeXploreRealIcon,
  GitHubRealIcon,
  NdaShieldIcon,
  TerminalLogIcon,
  AuditTrailIcon,
  CalendarScheduleIcon,
  Step1Icon,
  Step2Icon,
  Step3Icon,
  Step4Icon,
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
  HindiThesisRealWork,
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
    visual: <ResearchPaperRealWork className="w-full h-44 mb-4" />,
    title: 'Research Paper Writing',
    desc: 'IEEE, Springer, Elsevier standard manuscripts with structured methodology, empirical experiments, and citations in English & Hindi.',
    href: '/quote?service=RESEARCH_PAPER',
    badge: 'IEEE / Springer / Elsevier',
    glowColor: 'cyan' as const,
  },
  {
    visual: <ThesisRealWork className="w-full h-44 mb-4" />,
    title: 'Thesis & Dissertation',
    desc: 'Master and Doctoral thesis drafting from literature review to conclusion, with optional computational model implementation.',
    href: '/quote?service=THESIS',
    badge: 'Milestone Escrow',
    glowColor: 'cyan' as const,
  },
  {
    visual: <BookRealWork className="w-full h-44 mb-4" />,
    title: 'Book Writing (100–300 Pages)',
    desc: 'Full-length scholarly book manuscripts, edited volumes, monographs, and book chapters formatted for ISBN publication.',
    href: '/quote?service=BOOK',
    badge: 'ISBN Standard',
    glowColor: 'indigo' as const,
  },
  {
    visual: <ReviewPaperRealWork className="w-full h-44 mb-4" />,
    title: 'Review Papers',
    desc: 'Systematic literature reviews and bibliometric surveys mapping state-of-the-art developments across your discipline.',
    href: '/quote?service=REVIEW_PAPER',
    badge: 'PRISMA Guidelines',
    glowColor: 'cyan' as const,
  },
  {
    visual: <ArticleRealWork className="w-full h-44 mb-4" />,
    title: 'Article Writing',
    desc: 'Expertly researched academic, journal, and thought leadership articles with verified word counts and full citation rigor.',
    href: '/quote?service=ARTICLE',
    badge: 'Standardized Rates in Quote',
    glowColor: 'cyan' as const,
  },
  {
    visual: <PresentationRealWork className="w-full h-44 mb-4" />,
    title: 'Academic PPT & Defense',
    desc: 'Engaging, professional thesis defense and conference presentation slide decks formatted for university evaluation panels.',
    href: '/quote?service=PPT',
    badge: 'Defense Ready',
    glowColor: 'cyan' as const,
  },
  {
    visual: <ModelCodeRealWork className="w-full h-44 mb-4" />,
    title: 'Model & Code Implementation',
    desc: 'Machine learning, deep learning (PyTorch, TensorFlow), Python, and MATLAB code implementation with reproducible benchmarks.',
    href: '/quote?service=MODEL',
    badge: 'Docker & Git Handoff',
    glowColor: 'emerald' as const,
    isCode: true,
  },
  {
    visual: <SynopsisRealWork className="w-full h-44 mb-4" />,
    title: 'Synopsis & Research Proposals',
    desc: 'Crisp, defensible research synopses for PhD registrations, grant applications, and institutional doctoral committees.',
    href: '/quote?service=SYNOPSIS',
    badge: 'DRC Committee Ready',
    glowColor: 'cyan' as const,
  },
  {
    visual: <TurnitinReportRealWork className="w-full h-44 mb-4" />,
    title: 'Turnitin AI & Plagiarism Reports',
    price: '₹200 per file flat',
    desc: 'Instructor-tier Turnitin verification audits checking similarity index and AI writing percentages without saving to repository.',
    href: '/quote?type=TURNITIN',
    badge: 'Safe Non-Repository',
    glowColor: 'emerald' as const,
    isTurnitin: true,
  },
];

const WORKFLOW_STEPS = [
  {
    num: '01',
    icon: <Step1Icon className="w-7 h-7" />,
    title: 'Project Consultation & Scope',
    desc: 'Share your discipline, word count, rubric, and timeline. Pre-signed mutual NDA guarantees your data remains 100% private.',
  },
  {
    num: '02',
    icon: <Step2Icon className="w-7 h-7" />,
    title: 'Deterministic Quotation & Escrow',
    desc: 'Receive an immediate transparent estimate with a 4-stage chapter milestone payment plan. Zero 100% upfront lock-in.',
  },
  {
    num: '03',
    icon: <Step3Icon className="w-7 h-7" />,
    title: 'Doctoral Expert Drafting',
    desc: 'Assigned PhD domain researchers draft your chapters or develop containerized code strictly aligned to university rubrics.',
  },
  {
    num: '04',
    icon: <Step4Icon className="w-7 h-7" />,
    title: 'Turnitin Audit & Git Handoff',
    desc: 'Non-repository originality check (<10% Plagiarism, 0% AI) and private Git repository handoff delivered directly to your portal.',
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
    <div className="min-h-screen text-center bg-[#030712] text-[#F8FAFC] relative selection:bg-cyan-500 selection:text-black" style={{ fontFamily: '"Cavolini", "Cavolini Condensed", sans-serif' }}>

      {/* ─── 1. Jitter "The Edit: Split Reveal" Entrance Animation ─────────── */}
      <SplitRevealIntro />

      {/* ─── 2. Fixed Top Laser Scroll Progress Scanner & HUD ─────────────── */}
      <ScrollProgressLaser />

      {/* ─── Hero Section with 3D Cyber Ecosystem & Kinetic Motion ────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 text-white text-center bg-midnight border-b border-cyan-500/20">
        {/* Futuristic Cyber-Grid Background Layer */}
        <div className="absolute inset-0 cyber-grid-bg opacity-35 pointer-events-none" />

        {/* Ambient Holographic Glow Orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-600/20 via-teal-500/15 to-emerald-600/20 rounded-full blur-3xl pointer-events-none animate-holo-glow" />

        {/* Floating Cyber Particle Field */}
        <CyberParticleField />

        {/* Tactical HUD Coordinates Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 relative z-10">
          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-cyan-300/80 bg-[#060B18]/80 border border-cyan-500/30 px-4 py-2 rounded-2xl backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <strong className="text-white">LAB TELEMETRY:</strong> PROCEDURAL ECOSYSTEM ONLINE
            </span>
            <span className="hidden sm:inline text-slate-400">COPE ETHICS COMPLIANT • ZERO REPOSITORY DEPOSIT</span>
            <span className="text-emerald-400 font-bold">SALT LAKE SECTOR 2 • KOLKATA</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Split-Reveal Headline, Assurances, CTAs (Centered) */}
            <div className="lg:col-span-7 flex flex-col items-center text-center">

              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 bg-cyan-950/70 border border-cyan-400/40 px-4 py-1.5 rounded-full backdrop-blur-md mb-5 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
                  Autonomous Scholarly Ecosystem
                </span>
              </div>

              {/* Jitter-Style "Split Reveal" Kinetic Headline */}
              <div className="relative mb-3 overflow-hidden">
                <div className="animate-split-top">
                  <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-center">
                    InkMonk <span className="gradient-saffron-text">Research</span>
                  </h1>
                </div>

                {/* Laser Split Seam Beam */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-1 animate-laser-seam shadow-[0_0_20px_#00F2FE]" />

                <div className="animate-split-bottom">
                  <p className="text-xl sm:text-2xl font-serif italic text-cyan-100/90 font-bold text-center">
                    &ldquo;Research with care. Writing with clarity.&rdquo;
                  </p>
                </div>
              </div>

              {/* Assurance Ribbon with Real Shield Logo */}
              <div className="inline-flex items-center gap-2.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold px-4 py-2 rounded-full mb-6 shadow-[0_0_20px_rgba(16,185,129,0.25)] backdrop-blur-sm">
                <TurnitinShieldLogo className="w-5 h-5" />
                <span>Strict 0% AI Assured • Plagiarism &lt; 10% • Safe Non-Repository Protocol</span>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-6 text-center font-bold">
                Premier academic research, doctoral dissertation structuring, book writing, and Turnitin audits in <strong className="text-white font-extrabold">English</strong> and <strong className="text-white font-extrabold">Hindi</strong>. Supervised directly by qualified subject-matter doctoral directors.
              </p>

              {/* Primary Call to Actions & Instant Modals */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 mb-6 w-full">
                <Link
                  href="/quote"
                  className="btn-primary-glow text-sm font-bold shadow-xl w-full sm:w-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Calculate Your Free Quote →
                </Link>

                <button
                  onClick={() => setTurnitinModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-3 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
                >
                  <TurnitinShieldLogo className="w-4 h-4" />
                  <span>Instant Turnitin Scan (₹200)</span>
                </button>

                <button
                  onClick={() => setSchedulerModalOpen(true)}
                  className="btn-secondary-dark text-sm font-bold w-full sm:w-auto cursor-pointer"
                >
                  <CalendarScheduleIcon className="w-4 h-4 text-cyan-400" />
                  <span>Book 1-on-1 Consultation</span>
                </button>
              </div>

              {/* Quick Trust Badges with Real Emblems */}
              <div className="grid grid-cols-3 gap-3.5 max-w-lg mx-auto w-full">
                <div className="bg-[#080E1E]/80 border border-cyan-500/25 p-3 rounded-2xl backdrop-blur-md text-center flex flex-col items-center shadow-lg">
                  <UkFlagLogo className="w-7 h-7 mb-1" />
                  <div className="text-cyan-300 font-bold text-sm">English</div>
                  <div className="text-[10px] text-slate-300 font-bold">Tech &amp; Non-Tech</div>
                </div>
                <div className="bg-[#080E1E]/80 border border-emerald-500/25 p-3 rounded-2xl backdrop-blur-md text-center flex flex-col items-center shadow-lg">
                  <IndiaFlagLogo className="w-7 h-7 mb-1" />
                  <div className="text-emerald-300 font-bold text-sm">Hindi</div>
                  <div className="text-[10px] text-slate-300 font-bold">Devanagari Specialists</div>
                </div>
                <div className="bg-[#080E1E]/80 border border-teal-500/25 p-3 rounded-2xl backdrop-blur-md text-center flex flex-col items-center shadow-lg">
                  <UpiShieldIcon className="w-7 h-7 mb-1" />
                  <div className="text-teal-300 font-bold text-sm">Instant UPI</div>
                  <div className="text-[10px] text-slate-300 font-bold">Direct Payments</div>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Procedural Cyber Ecosystem (Michael Skripin / Zajno) */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center gap-4">
              <div className="w-full">
                <CyberEcosystem3D />
              </div>

              {/* Interactive Badges */}
              <div className="flex items-center gap-3 w-full justify-center">
                <button
                  onClick={() => setNdaModalOpen(true)}
                  className="bg-[#060B18] text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 text-xs font-bold px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 hover:bg-cyan-950/40 transition-colors cursor-pointer"
                >
                  <NdaShieldIcon className="w-4 h-4" />
                  <span>Mutual NDA Protected</span>
                </button>

                <button
                  onClick={() => setSampleModalOpen(true)}
                  className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 hover:border-emerald-400 text-xs font-bold px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 hover:bg-emerald-900/60 transition-colors cursor-pointer"
                >
                  <TurnitinShieldLogo className="w-4 h-4" />
                  <span>Watermarked Sample →</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── 3 Primary Pillars (English, Hindi & Turnitin) with Real Work Images ─── */}
      <section className="py-20 px-4 bg-[#030712] text-center relative" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-pill-gold mb-3">Core Disciplines</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
              Comprehensive Scholarly Solutions
            </h2>
            <p className="text-slate-400 text-base sm:text-lg text-center font-medium">
              Tailored specifically to international publishing guidelines, doctoral requirements, and institutional rubrics. No public price lists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* English Card (Real Journal Paper Preview) */}
            <Interactive3DCard glowColor="cyan">
              <div className="card-futuristic-3d p-6 flex flex-col justify-between border-t-4 border-t-cyan-500 text-center relative h-full">
                <span className="absolute top-4 right-4 bg-cyan-950 text-cyan-300 border border-cyan-400/40 text-[11px] font-bold px-3 py-1 rounded-full uppercase shadow">
                  English Specialists
                </span>
                <div>
                  <ResearchPaperRealWork className="w-full h-44 mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-white mb-1 text-center">English Services</h3>
                  <p className="text-slate-400 text-xs mb-4 text-center">
                    Technical and non-technical manuscripts formatted to IEEE, Springer, Elsevier, APA, Harvard, and UGC standards.
                  </p>
                  <div className="max-w-xs mx-auto mb-6">
                    <ul className="space-y-2 text-xs text-slate-300 text-left">
                      <li className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">✓</span> Research &amp; Review Papers
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">✓</span> Master &amp; Doctoral Theses (with/without model)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">✓</span> Scholarly Books (100–300 pages)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">✓</span> Journal Articles &amp; Conference Slides
                      </li>
                    </ul>
                  </div>
                </div>
                <Link href="/quote?lang=EN" className="btn-primary-glow text-xs w-full text-center">
                  Configure English Quote →
                </Link>
              </div>
            </Interactive3DCard>

            {/* Hindi Card (Real Hindi Research Paper Preview) */}
            <Interactive3DCard glowColor="emerald">
              <div className="card-futuristic-3d p-6 flex flex-col justify-between border-t-4 border-t-emerald-500 text-center relative h-full">
                <span className="absolute top-4 right-4 bg-emerald-950 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold px-3 py-1 rounded-full uppercase shadow">
                  Hindi Specialists
                </span>
                <div>
                  <HindiPaperRealWork className="w-full h-44 mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-white mb-1 text-center">Hindi Services</h3>
                  <p className="text-slate-400 text-xs mb-4 text-center">
                    Supervised by Sampreeti Mukherjee with standardized academic vocabulary, Shodhganga compliance, and zero automated translation shortcuts.
                  </p>
                  <div className="max-w-xs mx-auto mb-4">
                    <ul className="space-y-2 text-xs text-slate-300 text-left">
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">✓</span> शोध पत्र / Research Papers
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">✓</span> शोध प्रबंध / Complete Thesis
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">✓</span> पुस्तक लेखन (100–300 पृष्ठ)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">✓</span> देवनागरी व्याख्यान एवं प्रस्तुतियाँ
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setAuditModalOpen(true)}
                    className="text-xs text-emerald-400 font-bold hover:underline mb-4 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <AuditTrailIcon className="w-4 h-4" />
                    <span>View Vernacular Translation Audit Trail →</span>
                  </button>
                </div>
                <Link href="/quote?lang=HI" className="btn-primary-glow text-xs w-full text-center">
                  Configure Hindi Quote →
                </Link>
              </div>
            </Interactive3DCard>

            {/* Turnitin Card (Real Turnitin Report Preview) */}
            <Interactive3DCard glowColor="cyan">
              <div className="card-futuristic-3d p-6 flex flex-col justify-between border-t-4 border-t-teal-400 text-center relative h-full">
                <span className="absolute top-4 right-4 bg-teal-950 text-teal-300 border border-teal-400/40 text-[11px] font-bold px-3 py-1 rounded-full uppercase shadow">
                  Verified Originality
                </span>
                <div>
                  <TurnitinReportRealWork className="w-full h-44 mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-white mb-1 text-center">Turnitin Reports</h3>
                  <p className="text-slate-400 text-xs mb-3 text-center">
                    Instructor-grade originality and AI writing detection report without saving your file to public repositories.
                  </p>
                  <div className="p-3 bg-[#060B18] rounded-xl border border-cyan-500/30 mb-3 text-center">
                    <div className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">Fixed Flat Fee</div>
                    <div className="font-serif text-2xl font-extrabold text-white">₹200</div>
                    <div className="text-[10px] text-slate-400">per file scanned • 15–30 min delivery</div>
                  </div>

                  <button
                    onClick={() => setSampleModalOpen(true)}
                    className="text-xs text-cyan-300 hover:text-white font-bold underline mb-3 block cursor-pointer"
                  >
                    View Watermarked Sample Deliverable →
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setTurnitinModalOpen(true)}
                    className="btn-primary-glow text-xs w-full text-center cursor-pointer"
                  >
                    Upload &amp; Pay ₹200 via UPI →
                  </button>
                </div>
              </div>
            </Interactive3DCard>
          </div>
        </div>
      </section>

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── Milestone Payment Timeline Section ───────────────────────────── */}
      <section className="py-16 px-4 bg-[#060B18] text-center border-y border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <MilestonePaymentTimeline />
        </div>
      </section>

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── 9-Service Grid with REAL IMAGES OF THE WORKS ─────────────────── */}
      <section className="py-20 px-4 bg-[#030712] text-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-pill-gold mb-3">Genuine Deliverable Previews</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
              Explore Our Specific Capabilities
            </h2>
            <p className="text-slate-400 text-base text-center">
              Real sample previews of our manuscripts, models, presentations, and reports.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Interactive3DCard key={s.title} glowColor={s.glowColor}>
                <div className="card-futuristic-3d p-6 flex flex-col justify-between text-center items-center group relative h-full">
                  <span className="text-[10px] font-bold font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full mb-3">
                    {s.badge}
                  </span>

                  {/* Real Image of the Work */}
                  <div className="w-full transform group-hover:scale-[1.02] transition-transform duration-300">
                    {s.visual}
                  </div>

                  <div className="flex flex-col items-center text-center w-full">
                    <h3 className="font-serif font-bold text-lg text-white group-hover:text-cyan-300 transition-colors mb-1 text-center">
                      {s.title}
                    </h3>
                    {s.price && (
                      <div className="text-xs font-bold text-emerald-400 mb-1">
                        {s.price}
                      </div>
                    )}
                    <p className="text-slate-400 text-xs leading-relaxed mb-4 text-center">
                      {s.desc}
                    </p>
                  </div>

                  <div className="w-full pt-3 border-t border-slate-800 flex items-center justify-between">
                    {s.isCode ? (
                      <button
                        onClick={() => setScopeBuilderOpen(true)}
                        className="text-xs font-bold text-cyan-400 hover:text-cyan-200 flex items-center gap-1 cursor-pointer"
                      >
                        <TerminalLogIcon className="w-3.5 h-3.5" />
                        <span>Scope Builder →</span>
                      </button>
                    ) : s.isTurnitin ? (
                      <button
                        onClick={() => setTurnitinModalOpen(true)}
                        className="text-xs font-bold text-emerald-400 hover:text-emerald-200 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Instant Scan →</span>
                      </button>
                    ) : (
                      <Link
                        href={s.href}
                        className="text-xs font-bold text-cyan-400 hover:text-cyan-200 flex items-center gap-1"
                      >
                        <span>Calculate Instant Quote →</span>
                      </Link>
                    )}
                    <span className="text-[10px] text-slate-500 font-mono">Server Calculated</span>
                  </div>
                </div>
              </Interactive3DCard>
            ))}
          </div>
        </div>
      </section>

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── Redesigned 3D Futuristic 1, 2, 3, 4 Steps Section ─────────────── */}
      <section className="py-20 px-4 bg-[#060B18] text-center border-y border-cyan-500/20" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-pill-gold mb-3">Transparent Journey</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
              How InkMonk Delivers Excellence
            </h2>
            <p className="text-slate-400 text-base text-center">
              A transparent, 4-stage pipeline that ensures scholarly rigor, NDA protection, and zero guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((w) => (
              <Interactive3DCard key={w.num} glowColor="cyan">
                <div className="card-futuristic-3d p-7 flex flex-col items-center text-center group h-full">
                  {/* 3D Holographic Step Badge */}
                  <div className="relative mb-5">
                    <div className="step-number-futuristic">
                      {w.num}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#030712] rounded-full p-1 shadow-md border border-cyan-500/40">
                      {w.icon}
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white mb-2 text-center group-hover:text-cyan-300 transition-colors">
                    {w.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed text-center">
                    {w.desc}
                  </p>
                </div>
              </Interactive3DCard>
            ))}
          </div>

          <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/how-it-works" className="btn-primary-glow">
              Explore Complete Methodology →
            </Link>
            <button
              onClick={() => setNdaModalOpen(true)}
              className="btn-secondary-dark cursor-pointer"
            >
              <NdaShieldIcon className="w-4 h-4 text-cyan-400" />
              <span>Preview Mutual NDA →</span>
            </button>
          </div>
        </div>
      </section>

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── Founders & Verifiable Doctoral Leadership Section ─────────────── */}
      <section className="py-20 px-4 bg-[#030712] text-center" id="about">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge-pill-gold mb-3">Academic Directorate</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
              Led by Dedicated Scholars
            </h2>
            <p className="text-slate-400 text-base text-center">
              Every project is directly overseen by our directors with verifiable academic publishing records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tuhit Roy */}
            <Interactive3DCard glowColor="cyan">
              <div className="card-futuristic-3d p-8 text-center flex flex-col items-center justify-between h-full">
                <div>
                  <div className="w-20 h-20 rounded-full bg-[#060B18] text-cyan-300 font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    TR
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white text-center">Tuhit Roy</h3>
                  <p className="text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-3 text-center">
                    Founder &amp; Research Director
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed text-center mb-6">
                    Directs technical research methodologies, AI/ML computational architectures (PyTorch/CUDA), and IEEE/Scopus manuscript structuring.
                  </p>
                </div>

                {/* Verifiable Scholar Badges */}
                <div className="w-full pt-4 border-t border-slate-800 flex items-center justify-center gap-4">
                  <a
                    href="https://scholar.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    <GoogleScholarRealIcon className="w-4 h-4" />
                    <span>Scholar</span>
                  </a>
                  <a
                    href="https://ieeexplore.ieee.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    <IeeeXploreRealIcon className="w-4 h-4" />
                    <span>IEEE</span>
                  </a>
                  <a
                    href="https://github.com/tuhitroy02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    <GitHubRealIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </Interactive3DCard>

            {/* Sampreeti Mukherjee */}
            <Interactive3DCard glowColor="emerald">
              <div className="card-futuristic-3d p-8 text-center flex flex-col items-center justify-between h-full">
                <div>
                  <div className="w-20 h-20 rounded-full bg-[#060B18] text-emerald-300 font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    SM
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white text-center">Sampreeti Mukherjee</h3>
                  <p className="text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-3 text-center">
                    Co-Founder &amp; Editorial Director
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed text-center mb-6">
                    Leads qualitative editorial refinement, humanities peer-review consultations, and our specialized Hindi research and dissertation division.
                  </p>
                </div>

                {/* Editorial Badges */}
                <div className="w-full pt-4 border-t border-slate-800 flex items-center justify-center gap-4 text-xs text-slate-300 font-semibold">
                  <span className="flex items-center gap-1">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>UGC-CARE Standards</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Comparative Literature</span>
                  </span>
                </div>
              </div>
            </Interactive3DCard>
          </div>
        </div>
      </section>

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── Office & Contact Section ────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#060B18] text-white text-center relative overflow-hidden border-t border-cyan-500/20">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-cyan-950/70 border border-cyan-400/30 px-4 py-1.5 rounded-full backdrop-blur-md mb-4 shadow">
              <LocationRealIcon className="w-4 h-4" />
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">
                Physical Presence in Kolkata
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-3 text-center">
              Karunamoyee, Salt Lake Sector 2
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto text-center font-medium">
              Serving researchers across all Indian universities and international institutions. In-person visits by appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
            <div className="bg-[#030712]/80 border border-cyan-500/25 p-6 rounded-2xl backdrop-blur-md flex flex-col items-center text-center shadow-lg">
              <LocationRealIcon className="w-10 h-10 mb-3" />
              <div className="text-sm font-bold text-white mb-1">Our Location</div>
              <div className="text-xs text-slate-300">Sector 2, Salt Lake City, Kolkata 700091</div>
            </div>
            <div className="bg-[#030712]/80 border border-emerald-500/25 p-6 rounded-2xl backdrop-blur-md flex flex-col items-center text-center shadow-lg">
              <WhatsAppRealIcon className="w-10 h-10 mb-3" />
              <div className="text-sm font-bold text-white mb-1">WhatsApp Chat</div>
              <div className="text-xs text-emerald-300 font-bold">+91 7980470880</div>
            </div>
            <div className="bg-[#030712]/80 border border-cyan-500/25 p-6 rounded-2xl backdrop-blur-md flex flex-col items-center text-center shadow-lg">
              <EmailRealIcon className="w-10 h-10 mb-3" />
              <div className="text-sm font-bold text-white mb-1">Email Support</div>
              <div className="text-xs text-cyan-300 font-bold">inkmonkresearch@gmail.com</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <a
              href="https://wa.me/917980470880"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-pill"
            >
              <WhatsAppRealIcon className="w-5 h-5" />
              <span>Direct WhatsApp: +91 7980470880</span>
            </a>
            <Link href="/contact" className="btn-secondary-dark">
              Send an Academic Inquiry →
            </Link>
          </div>
        </div>
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
