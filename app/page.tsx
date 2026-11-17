'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  },
  {
    visual: <ThesisRealWork className="w-full h-44 mb-4" />,
    title: 'Thesis & Dissertation',
    desc: 'Master and Doctoral thesis drafting from literature review to conclusion, with optional computational model implementation.',
    href: '/quote?service=THESIS',
    badge: 'Milestone Escrow',
  },
  {
    visual: <BookRealWork className="w-full h-44 mb-4" />,
    title: 'Book Writing (100–300 Pages)',
    desc: 'Full-length scholarly book manuscripts, edited volumes, monographs, and book chapters formatted for ISBN publication.',
    href: '/quote?service=BOOK',
    badge: 'ISBN Standard',
  },
  {
    visual: <ReviewPaperRealWork className="w-full h-44 mb-4" />,
    title: 'Review Papers',
    desc: 'Systematic literature reviews and bibliometric surveys mapping state-of-the-art developments across your discipline.',
    href: '/quote?service=REVIEW_PAPER',
    badge: 'PRISMA Guidelines',
  },
  {
    visual: <ArticleRealWork className="w-full h-44 mb-4" />,
    title: 'Article Writing',
    desc: 'Expertly researched academic, journal, and thought leadership articles with verified word counts and full citation rigor.',
    href: '/quote?service=ARTICLE',
    badge: 'Standardized Rates in Quote',
  },
  {
    visual: <PresentationRealWork className="w-full h-44 mb-4" />,
    title: 'Academic PPT & Defense',
    desc: 'Engaging, professional thesis defense and conference presentation slide decks formatted for university evaluation panels.',
    href: '/quote?service=PPT',
    badge: 'Defense Ready',
  },
  {
    visual: <ModelCodeRealWork className="w-full h-44 mb-4" />,
    title: 'Model & Code Implementation',
    desc: 'Machine learning, deep learning (PyTorch, TensorFlow), Python, and MATLAB code implementation with reproducible benchmarks.',
    href: '/quote?service=MODEL',
    badge: 'Docker & Git Handoff',
    isCode: true,
  },
  {
    visual: <SynopsisRealWork className="w-full h-44 mb-4" />,
    title: 'Synopsis & Research Proposals',
    desc: 'Crisp, defensible research synopses for PhD registrations, grant applications, and institutional doctoral committees.',
    href: '/quote?service=SYNOPSIS',
    badge: 'DRC Committee Ready',
  },
  {
    visual: <TurnitinReportRealWork className="w-full h-44 mb-4" />,
    title: 'Turnitin AI & Plagiarism Reports',
    price: '₹200 per file flat',
    desc: 'Instructor-tier Turnitin verification audits checking similarity index and AI writing percentages without saving to repository.',
    href: '/quote?type=TURNITIN',
    badge: 'Safe Non-Repository',
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
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen text-center" style={{ fontFamily: '"Cavolini", "Cavolini Condensed", sans-serif' }}>

      {/* ─── Hero Section with Jitter "Split Reveal" Motion & Cyber HUD ───── */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 text-white text-center bg-midnight">
        {/* Futuristic Cyber-Grid Background Layer */}
        <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

        {/* Ambient Holographic Glow Orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-orange-600/25 via-amber-500/15 to-blue-600/20 rounded-full blur-3xl pointer-events-none animate-holo-glow" />

        {/* Tactical HUD Coordinates Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 relative z-10">
          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <strong className="text-white">LAB TELEMETRY:</strong> ALL SYSTEMS VERIFIED
            </span>
            <span className="hidden sm:inline">COPE ETHICS COMPLIANT • ZERO ESSAY MILLS</span>
            <span className="text-amber-300 font-bold">SALT LAKE SECTOR 2 • KOLKATA</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Split-Reveal Headline, Assurances, CTAs (Centered) */}
            <div className="lg:col-span-7 flex flex-col items-center text-center">

              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md mb-5 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-300 font-mono">
                  Academic Research &amp; Writing Hub
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
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-1 animate-laser-seam shadow-[0_0_15px_#38BDF8]" />

                <div className="animate-split-bottom">
                  <p className="text-xl sm:text-2xl font-serif italic text-amber-200/90 font-bold text-center">
                    &ldquo;Research with care. Writing with clarity.&rdquo;
                  </p>
                </div>
              </div>

              {/* Assurance Ribbon with Real Shield Logo */}
              <div className="inline-flex items-center gap-2.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold px-4 py-2 rounded-full mb-6 shadow-md backdrop-blur-sm">
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
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-3 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
                >
                  <TurnitinShieldLogo className="w-4 h-4" />
                  <span>Instant Turnitin Scan (₹200)</span>
                </button>

                <button
                  onClick={() => setSchedulerModalOpen(true)}
                  className="btn-secondary-dark text-sm font-bold w-full sm:w-auto cursor-pointer"
                >
                  <CalendarScheduleIcon className="w-4 h-4 text-orange-400" />
                  <span>Book 1-on-1 Consultation</span>
                </button>
              </div>

              {/* Quick Trust Badges with Real Emblems */}
              <div className="grid grid-cols-3 gap-3.5 max-w-lg mx-auto w-full">
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md text-center flex flex-col items-center">
                  <UkFlagLogo className="w-7 h-7 mb-1" />
                  <div className="text-orange-300 font-bold text-sm">English</div>
                  <div className="text-[10px] text-slate-300 font-bold">Tech &amp; Non-Tech</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md text-center flex flex-col items-center">
                  <IndiaFlagLogo className="w-7 h-7 mb-1" />
                  <div className="text-orange-300 font-bold text-sm">Hindi</div>
                  <div className="text-[10px] text-slate-300 font-bold">Devanagari Specialists</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md text-center flex flex-col items-center">
                  <UpiShieldIcon className="w-7 h-7 mb-1" />
                  <div className="text-amber-300 font-bold text-sm">Instant UPI</div>
                  <div className="text-[10px] text-slate-300 font-bold">Direct Payments</div>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Academic Research Lab Crest */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative animate-3d-float">
                {/* Ambient Glow */}
                <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-orange-500/30 to-amber-500/30 blur-2xl animate-holo-glow" />

                {/* Hexagonal Research Lab Seal Container */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl bg-slate-950/90 border-2 border-amber-400/80 shadow-2xl p-6 flex flex-col items-center justify-center hud-corner">
                  <AcademicLabCrestLogo className="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-2xl" />

                  <div className="mt-2 text-center">
                    <div className="font-serif font-bold text-lg text-amber-300 tracking-wide">
                      InkMonk Research Lab
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Salt Lake Sector 2 • Kolkata • Est. 2024
                    </div>
                  </div>
                </div>

                {/* 3D Floating Credential Badges */}
                <button
                  onClick={() => setNdaModalOpen(true)}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0A1128] text-white border border-amber-400/60 text-xs font-bold px-4 py-1.5 rounded-xl shadow-2xl flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <NdaShieldIcon className="w-4 h-4" />
                  <span>100% IP &amp; NDA Protected</span>
                </button>

                <button
                  onClick={() => setSampleModalOpen(true)}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-800 text-white border border-emerald-400/60 text-xs font-bold px-4 py-1.5 rounded-xl shadow-2xl flex items-center gap-2 hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  <TurnitinShieldLogo className="w-4 h-4" />
                  <span>View Watermarked Report →</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3 Primary Pillars (English, Hindi & Turnitin) with Real Work Images ─── */}
      <section className="py-20 px-4 bg-white text-center" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-pill-gold mb-3">Core Disciplines</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1128] mb-4 text-center">
              Comprehensive Scholarly Solutions
            </h2>
            <p className="text-slate-600 text-base sm:text-lg text-center">
              Tailored specifically to international publishing guidelines, doctoral requirements, and institutional rubrics. No public price lists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* English Card (Real Journal Paper Preview) */}
            <div className="card-futuristic-3d p-6 flex flex-col justify-between border-t-4 border-t-[#1A2B6D] text-center relative">
              <span className="absolute top-4 right-4 bg-[#1A2B6D] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase shadow">
                English Specialists
              </span>
              <div>
                <ResearchPaperRealWork className="w-full h-44 mb-4" />
                <h3 className="font-serif text-2xl font-bold text-[#0A1128] mb-1 text-center">English Services</h3>
                <p className="text-slate-600 text-xs mb-4 text-center">
                  Technical and non-technical manuscripts formatted to IEEE, Springer, Elsevier, APA, Harvard, and UGC standards.
                </p>
                <div className="max-w-xs mx-auto mb-6">
                  <ul className="space-y-2 text-xs text-slate-700 text-left">
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Research &amp; Review Papers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Master &amp; Doctoral Theses (with/without model)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Scholarly Books (100–300 pages)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Journal Articles &amp; Conference Slides
                    </li>
                  </ul>
                </div>
              </div>
              <Link href="/quote?lang=EN" className="btn-primary-glow text-xs w-full text-center">
                Configure English Quote →
              </Link>
            </div>

            {/* Hindi Card (Real Hindi Research Paper Preview) */}
            <div className="card-futuristic-3d p-6 flex flex-col justify-between border-t-4 border-t-orange-500 text-center relative">
              <span className="absolute top-4 right-4 bg-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase shadow">
                Hindi Specialists
              </span>
              <div>
                <HindiPaperRealWork className="w-full h-44 mb-4" />
                <h3 className="font-serif text-2xl font-bold text-[#0A1128] mb-1 text-center">Hindi Services</h3>
                <p className="text-slate-600 text-xs mb-4 text-center">
                  Supervised by Sampreeti Mukherjee with standardized academic vocabulary, Shodhganga compliance, and zero automated translation shortcuts.
                </p>
                <div className="max-w-xs mx-auto mb-4">
                  <ul className="space-y-2 text-xs text-slate-700 text-left">
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> शोध पत्र / Research Papers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> शोध प्रबंध / Complete Thesis
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> पुस्तक लेखन (100–300 पृष्ठ)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> देवनागरी व्याख्यान एवं प्रस्तुतियाँ
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setAuditModalOpen(true)}
                  className="text-xs text-orange-600 font-bold hover:underline mb-4 inline-flex items-center gap-1 cursor-pointer"
                >
                  <AuditTrailIcon className="w-4 h-4" />
                  <span>View Vernacular Translation Audit Trail →</span>
                </button>
              </div>
              <Link href="/quote?lang=HI" className="btn-primary-glow text-xs w-full text-center">
                Configure Hindi Quote →
              </Link>
            </div>

            {/* Turnitin Card (Real Turnitin Report Preview) */}
            <div className="card-futuristic-3d p-6 flex flex-col justify-between border-t-4 border-t-slate-800 text-center relative">
              <span className="absolute top-4 right-4 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase shadow">
                Verified Originality
              </span>
              <div>
                <TurnitinReportRealWork className="w-full h-44 mb-4" />
                <h3 className="font-serif text-2xl font-bold text-[#0A1128] mb-1 text-center">Turnitin Reports</h3>
                <p className="text-slate-600 text-xs mb-3 text-center">
                  Instructor-grade originality and AI writing detection report without saving your file to public repositories.
                </p>
                <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-200 mb-3 text-center">
                  <div className="text-[10px] text-orange-700 font-bold uppercase tracking-wider">Fixed Flat Fee</div>
                  <div className="font-serif text-2xl font-extrabold text-[#0A1128]">₹200</div>
                  <div className="text-[10px] text-slate-500">per file scanned • 15–30 min delivery</div>
                </div>

                <button
                  onClick={() => setSampleModalOpen(true)}
                  className="text-xs text-slate-600 hover:text-orange-600 font-bold underline mb-3 block cursor-pointer"
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
          </div>
        </div>
      </section>

      {/* ─── Milestone Payment Timeline Section ───────────────────────────── */}
      <section className="py-16 px-4 bg-[#F5F2EC] text-center">
        <div className="max-w-6xl mx-auto">
          <MilestonePaymentTimeline />
        </div>
      </section>

      {/* ─── 9-Service Grid with REAL IMAGES OF THE WORKS ─────────────────── */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-pill-gold mb-3">Genuine Deliverable Previews</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1128] mb-4 text-center">
              Explore Our Specific Capabilities
            </h2>
            <p className="text-slate-600 text-base text-center">
              Real sample previews of our manuscripts, models, presentations, and reports.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="card-futuristic-3d p-6 flex flex-col justify-between text-center items-center group relative"
              >
                <span className="text-[10px] font-bold font-mono text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full mb-3">
                  {s.badge}
                </span>

                {/* Real Image of the Work */}
                <div className="w-full transform group-hover:scale-[1.02] transition-transform duration-300">
                  {s.visual}
                </div>

                <div className="flex flex-col items-center text-center w-full">
                  <h3 className="font-serif font-bold text-lg text-[#0A1128] group-hover:text-orange-600 transition-colors mb-1 text-center">
                    {s.title}
                  </h3>
                  {s.price && (
                    <div className="text-xs font-bold text-emerald-700 mb-1">
                      {s.price}
                    </div>
                  )}
                  <p className="text-slate-600 text-xs leading-relaxed mb-4 text-center">
                    {s.desc}
                  </p>
                </div>

                <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-between">
                  {s.isCode ? (
                    <button
                      onClick={() => setScopeBuilderOpen(true)}
                      className="text-xs font-bold text-cyan-600 hover:text-cyan-800 flex items-center gap-1 cursor-pointer"
                    >
                      <TerminalLogIcon className="w-3.5 h-3.5" />
                      <span>Scope Builder →</span>
                    </button>
                  ) : s.isTurnitin ? (
                    <button
                      onClick={() => setTurnitinModalOpen(true)}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Instant Scan →</span>
                    </button>
                  ) : (
                    <Link
                      href={s.href}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                    >
                      <span>Calculate Instant Quote →</span>
                    </Link>
                  )}
                  <span className="text-[10px] text-slate-400 font-mono">Server Calculated</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Redesigned 3D Futuristic 1, 2, 3, 4 Steps Section ─────────────── */}
      <section className="py-20 px-4 bg-[#F5F2EC] text-center" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-pill-gold mb-3">Transparent Journey</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1128] mb-4 text-center">
              How InkMonk Delivers Excellence
            </h2>
            <p className="text-slate-600 text-base text-center">
              A transparent, 4-stage pipeline that ensures scholarly rigor, NDA protection, and zero guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((w) => (
              <div
                key={w.num}
                className="card-futuristic-3d p-7 flex flex-col items-center text-center group"
              >
                {/* 3D Holographic Step Badge */}
                <div className="relative mb-5">
                  <div className="step-number-futuristic">
                    {w.num}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md border border-slate-200">
                    {w.icon}
                  </div>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#0A1128] mb-2 text-center group-hover:text-orange-600 transition-colors">
                  {w.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-center">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/how-it-works" className="btn-primary-glow">
              Explore Complete Methodology →
            </Link>
            <button
              onClick={() => setNdaModalOpen(true)}
              className="btn-secondary-dark !text-slate-800 !border-slate-300 hover:!bg-slate-100 cursor-pointer"
            >
              <NdaShieldIcon className="w-4 h-4" />
              <span>Preview Mutual NDA →</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Founders & Verifiable Doctoral Leadership Section ─────────────── */}
      <section className="py-20 px-4 bg-white text-center" id="about">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge-pill-gold mb-3">Academic Directorate</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1128] mb-4 text-center">
              Led by Dedicated Scholars
            </h2>
            <p className="text-slate-600 text-base text-center">
              Every project is directly overseen by our directors with verifiable academic publishing records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tuhit Roy */}
            <div className="card-futuristic-3d p-8 text-center flex flex-col items-center justify-between">
              <div>
                <div className="w-20 h-20 rounded-full bg-[#0A1128] text-white font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 border-4 border-amber-400 shadow-xl">
                  TR
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0A1128] text-center">Tuhit Roy</h3>
                <p className="text-orange-600 font-semibold text-xs uppercase tracking-wider mb-3 text-center">
                  Founder &amp; Research Director
                </p>
                <p className="text-slate-600 text-sm leading-relaxed text-center mb-6">
                  Directs technical research methodologies, AI/ML computational architectures (PyTorch/CUDA), and IEEE/Scopus manuscript structuring.
                </p>
              </div>

              {/* Verifiable Scholar Badges */}
              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-center gap-4">
                <a
                  href="https://scholar.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-blue-600 font-semibold"
                >
                  <GoogleScholarRealIcon className="w-4 h-4" />
                  <span>Scholar</span>
                </a>
                <a
                  href="https://ieeexplore.ieee.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-sky-600 font-semibold"
                >
                  <IeeeXploreRealIcon className="w-4 h-4" />
                  <span>IEEE</span>
                </a>
                <a
                  href="https://github.com/tuhitroy02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 font-semibold"
                >
                  <GitHubRealIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Sampreeti Mukherjee */}
            <div className="card-futuristic-3d p-8 text-center flex flex-col items-center justify-between">
              <div>
                <div className="w-20 h-20 rounded-full bg-orange-600 text-white font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 border-4 border-amber-400 shadow-xl">
                  SM
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0A1128] text-center">Sampreeti Mukherjee</h3>
                <p className="text-orange-600 font-semibold text-xs uppercase tracking-wider mb-3 text-center">
                  Co-Founder &amp; Editorial Director
                </p>
                <p className="text-slate-600 text-sm leading-relaxed text-center mb-6">
                  Leads qualitative editorial refinement, humanities peer-review consultations, and our specialized Hindi research and dissertation division.
                </p>
              </div>

              {/* Editorial Badges */}
              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-700 font-semibold">
                <span className="flex items-center gap-1">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>UGC-CARE Standards</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Comparative Literature</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Office & Contact Section ────────────────────────────────────── */}
      <section className="py-20 px-4 bg-midnight text-white text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md mb-4 shadow">
              <LocationRealIcon className="w-4 h-4" />
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                Physical Presence in Kolkata
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-3 text-center">
              Karunamoyee, Salt Lake Sector 2
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto text-center">
              Serving researchers across all Indian universities and international institutions. In-person visits by appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
            <div className="bg-white/5 border border-white/15 p-6 rounded-2xl backdrop-blur-md flex flex-col items-center text-center">
              <LocationRealIcon className="w-10 h-10 mb-3" />
              <div className="text-sm font-bold text-white mb-1">Our Location</div>
              <div className="text-xs text-slate-300">Sector 2, Salt Lake City, Kolkata 700091</div>
            </div>
            <div className="bg-white/5 border border-white/15 p-6 rounded-2xl backdrop-blur-md flex flex-col items-center text-center">
              <WhatsAppRealIcon className="w-10 h-10 mb-3" />
              <div className="text-sm font-bold text-white mb-1">WhatsApp Chat</div>
              <div className="text-xs text-emerald-300 font-bold">+91 7980470880</div>
            </div>
            <div className="bg-white/5 border border-white/15 p-6 rounded-2xl backdrop-blur-md flex flex-col items-center text-center">
              <EmailRealIcon className="w-10 h-10 mb-3" />
              <div className="text-sm font-bold text-white mb-1">Email Support</div>
              <div className="text-xs text-sky-300 font-bold">inkmonkresearch@gmail.com</div>
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
