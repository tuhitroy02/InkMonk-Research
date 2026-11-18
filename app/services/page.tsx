'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UkFlagLogo,
  IndiaFlagLogo,
  TurnitinShieldLogo,
  OfficialTurnitinLogo,
  AuditTrailIcon,
  CalendarScheduleIcon,
  NdaShieldIcon,
  UpiShieldIcon,
  TerminalLogIcon,
} from '@/components/RealIcons';

import {
  InstantTurnitinModal,
  TurnitinSampleModal,
  FormalNdaModal,
  ConsultationSchedulerModal,
  ModelCodeScopeBuilderModal,
  TranslationAuditModal,
} from '@/components/FuturisticInteractions';

import FloatingLiveHelp from '@/components/FloatingLiveHelp';

export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  badge: string;
  image: string;
  desc: string;
  features: string[];
  href: string;
  isCode?: boolean;
  isTurnitin?: boolean;
  isHindi?: boolean;
  priceTag?: string;
}

const SERVICE_CATALOG: ServiceItem[] = [
  // Category 1: Papers & Manuscripts
  {
    id: 'research-paper',
    category: 'Manuscripts & Publications',
    title: 'Research Paper Writing',
    badge: 'IEEE / Springer / Elsevier',
    image: '/services/research-paper.jpg',
    desc: 'High-impact empirical and theoretical research manuscripts structured to international publication standards. Formatted to IEEE, Springer, Elsevier, or target UGC-CARE guidelines.',
    features: [
      'Original hypothesis formulation & literature synthesis',
      'Accurate mathematical modeling & statistical data analysis',
      'Full BibTeX / Mendeley / EndNote citation management',
      'Target journal formatting (LaTeX template or Word)',
    ],
    href: '/quote?service=RESEARCH_PAPER',
  },
  {
    id: 'review-paper',
    category: 'Manuscripts & Publications',
    title: 'Systematic Review Papers',
    badge: 'PRISMA / Bibliometric',
    image: '/services/review-paper.jpg',
    desc: 'Comprehensive systematic literature reviews, state-of-the-art meta-analyses, and VOSviewer/Biblioshiny bibliometric mapping across your discipline.',
    features: [
      'PRISMA-compliant search strategy & inclusion flowchart',
      'Systematic taxonomy matrices & comparative synthesis',
      '100+ peer-reviewed primary study critical evaluation',
      'Identification of research gaps and future directions',
    ],
    href: '/quote?service=REVIEW_PAPER',
  },
  {
    id: 'academic-article',
    category: 'Manuscripts & Publications',
    title: 'Academic Articles & Chapters',
    badge: 'Scopus / UGC-CARE',
    image: '/services/article-writing.jpg',
    desc: 'Scholarly articles, edited book chapters, policy whitepapers, and conference proceedings with verified word count tiers and rigorous citation apparatus.',
    features: [
      'Available across 1,000 to 5,000+ word tiers',
      'Standardized per-word rate schedule in quote calculator',
      'Peer-reviewed standard APA, Harvard, MLA, or Chicago styling',
      'Zero AI hallucinations and verified fact-checking',
    ],
    href: '/quote?service=ARTICLE',
  },

  // Category 2: Dissertations & Proposals
  {
    id: 'thesis-dissertation',
    category: 'Dissertations & Proposals',
    title: 'Ph.D. Thesis & Master Dissertation',
    badge: 'Chapter Milestone Escrow',
    image: '/services/thesis-dissertation.jpg',
    desc: 'End-to-end doctoral thesis drafting from Chapter 1 (Introduction) through literature review, methodology, results, and conclusion. Available with or without computational models.',
    features: [
      'Comprehensive 5-chapter or 6-chapter university structure',
      'Chapter-by-chapter milestone review and payment schedule',
      'Strict adherence to university thesis handbook and DRC rubric',
      'Direct communication channel with your assigned Ph.D. director',
    ],
    href: '/quote?service=THESIS',
  },
  {
    id: 'research-synopsis',
    category: 'Dissertations & Proposals',
    title: 'Synopsis & Ph.D. Proposals',
    badge: 'DRC / Grant Ready',
    image: '/services/synopsis-proposal.jpg',
    desc: 'Crisp, defensible research synopses, doctoral registration proposals, and academic grant applications formulated to pass university screening committees.',
    features: [
      'Problem statement, research questions, and tentative hypotheses',
      'Proposed methodology, sampling frame & data collection tools',
      'Tentative chapter outline & chronological work-plan (Gantt)',
      'Preliminary bibliography conforming to institutional norms',
    ],
    href: '/quote?service=SYNOPSIS',
  },

  // Category 3: Code & Computational Models
  {
    id: 'model-code',
    category: 'Computational & Code Implementation',
    title: 'Model & Code Implementation',
    badge: 'PyTorch / MATLAB / Docker',
    image: '/services/computational-model.jpg',
    desc: 'Machine learning, deep neural network (PyTorch, TensorFlow, CUDA), Python, and MATLAB simulation development with reproducible benchmarks and Git handoff.',
    features: [
      'Custom algorithm implementation & hyperparameter tuning',
      'Clean, commented source code with README and Docker container',
      'Validation curves, confusion matrices & AUC-ROC metrics',
      'Private Git repository handoff directly to your client portal',
    ],
    href: '/quote?service=MODEL',
    isCode: true,
  },

  // Category 4: Scholarly Books
  {
    id: 'book-writing',
    category: 'Books & Monographs',
    title: 'Scholarly Book Writing (100–300 pp)',
    badge: 'ISBN Standard',
    image: '/services/book-monograph.jpg',
    desc: 'Full-length scholarly monographs, edited volumes, and reference textbooks prepared for academic publishers with ISBN registration support.',
    features: [
      'Structured 100-page, 200-page, and 300-page packages',
      'Rigorous chapter-wise pedagogical or research structure',
      'Front matter, preface, detailed index, and consolidated bibliography',
      'Available in both English and Hindi',
    ],
    href: '/quote?service=BOOK',
  },

  // Category 5: Presentations & Defense
  {
    id: 'presentation-defense',
    category: 'Presentations & Defense',
    title: 'Academic PPT & Thesis Defense',
    badge: 'Defense Ready',
    image: '/services/academic-presentation.jpg',
    desc: 'Professional thesis defense slide decks, conference presentations, and seminar slides formatted to withstand tough academic committee inquiries.',
    features: [
      'Clean, widescreen 16:9 visual hierarchy with high-contrast figures',
      'Concise bullet summaries paired with speaker notes',
      'Custom methodology workflow diagrams and architecture schematics',
      'Per-slide standardized rate in quote engine',
    ],
    href: '/quote?service=PPT',
  },

  // Category 6: Turnitin Reports
  {
    id: 'turnitin-audit',
    category: 'Originality & Audits',
    title: 'Turnitin AI & Plagiarism Reports',
    badge: 'Safe Non-Repository',
    image: '/services/turnitin-report.jpg',
    desc: 'Instructor-tier Turnitin verification audits checking similarity index and AI writing percentages without saving your manuscript to public databases.',
    features: [
      'Flat fee of ₹200 per file scanned (15–30 min delivery)',
      '100% Non-Repository deposit (Zero database retention guaranteed)',
      'Full PDF report with color-coded passage citations and matching sources',
      'Instant UPI payment and instant upload modal',
    ],
    href: '/quote?type=TURNITIN',
    isTurnitin: true,
    priceTag: '₹200 per file flat',
  },

  // Category 7: Hindi Specialists
  {
    id: 'hindi-research',
    category: 'Hindi Academic Division (हिंदी शोध)',
    title: 'Hindi Research & Thesis (हिंदी शोध पत्र एवं प्रबंध)',
    badge: 'Devanagari Specialists',
    image: '/research-areas/hindi-sahitya.jpg',
    desc: 'Specialized academic research in Hindi supervised by Sampreeti Mukherjee with standard Devanagari terminology, Shodhganga compliance, and zero automated translation shortcuts.',
    features: [
      'शोध पत्र (Research Papers) & शोध प्रबंध (Complete Theses)',
      'मानक पारिभाषिक शब्दावली (Standardized Academic Terminology)',
      'यूजीसी-केयर (UGC-CARE) एवं शोधगंगा (Shodhganga) अनुरूप प्रारूप',
      'तुलनात्मक साहित्य, मानविकी, भाषाविज्ञान एवं समाजशास्त्र',
    ],
    href: '/quote?lang=HI',
    isHindi: true,
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('ENGLISH SERVICES');

  // Modals
  const [turnitinModalOpen, setTurnitinModalOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [ndaModalOpen, setNdaModalOpen] = useState(false);
  const [schedulerModalOpen, setSchedulerModalOpen] = useState(false);
  const [scopeBuilderOpen, setScopeBuilderOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  // Read URL Hash on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#english') setActiveCategory('ENGLISH SERVICES');
      else if (hash === '#hindi') setActiveCategory('HINDI SERVICES');
      else if (hash === '#turnitin') setActiveCategory('TURNITIN REPORTS');
    }
  }, []);

  // 1stly the 3 primary options in the top, followed by specific catalog categories
  const categories = [
    'ENGLISH SERVICES',
    'HINDI SERVICES',
    'TURNITIN REPORTS',
    'ALL SERVICES',
    'DISSERTATIONS & PROPOSALS',
    'COMPUTATIONAL & CODE IMPLEMENTATION',
    'BOOKS & MONOGRAPHS',
    'PRESENTATIONS & DEFENSE',
  ];

  const filteredServices = SERVICE_CATALOG.filter((s) => {
    if (activeCategory === 'ALL SERVICES') return true;
    if (activeCategory === 'ENGLISH SERVICES') return !s.isHindi && !s.isTurnitin;
    if (activeCategory === 'HINDI SERVICES') return s.isHindi === true;
    if (activeCategory === 'TURNITIN REPORTS') return s.isTurnitin === true;
    if (activeCategory === 'DISSERTATIONS & PROPOSALS') return s.category === 'Dissertations & Proposals';
    if (activeCategory === 'COMPUTATIONAL & CODE IMPLEMENTATION') return s.category === 'Computational & Code Implementation';
    if (activeCategory === 'BOOKS & MONOGRAPHS') return s.category === 'Books & Monographs';
    if (activeCategory === 'PRESENTATIONS & DEFENSE') return s.category === 'Presentations & Defense';
    return true;
  });

  return (
    <div className="min-h-screen bg-notebook-grid text-slate-900 py-16 px-4 text-center">
      <div className="max-w-7xl mx-auto">

        {/* ─── Hero Header ─────────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block bg-orange-100 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-orange-200">
            ACADEMIC CATALOGUE // RIGOROUS &amp; CONFIDENTIAL
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-black text-slate-900 mb-4 text-center">
            Scholarly Services Catalogue
          </h1>
          <p className="text-slate-600 text-base sm:text-lg text-center font-medium leading-relaxed">
            Rigorously formatted, 0% AI, and plagiarism-free academic scholarship in both <strong className="text-slate-900 font-bold">English</strong> and <strong className="text-slate-900 font-bold">Hindi</strong>. Evaluated transparently through our central server-side pricing engine.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-5 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              <UpiShieldIcon className="w-4 h-4 text-[#F95721]" />
              <span>Instant UPI Accepted</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              <NdaShieldIcon className="w-4 h-4 text-[#2563EB]" />
              <span>100% IP &amp; Mutual NDA</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              <span className="text-blue-600 font-bold">◆</span>
              <span>Chapter-by-Chapter Escrow</span>
            </span>
          </div>
        </div>

        {/* ─── Category Filter Tabs ────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 font-sans">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#F95721] text-white shadow-[0_4px_0_#C43B00,0_8px_16px_rgba(249,87,33,0.3)] scale-105'
                  : 'bg-white text-slate-700 hover:text-[#F95721] border-2 border-slate-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ─── Redesigned Services Grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredServices.map((service) => (
            <div key={service.id} className="card-clay-white p-6 flex flex-col justify-between text-center items-center h-full group relative">
              
              {/* Badge & Category */}
              <div className="w-full flex flex-col items-center">
                <div className="flex items-center justify-between w-full gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase text-[#2563EB] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                    {service.badge}
                  </span>
                  {service.priceTag && (
                    <span className="text-xs font-black text-[#F95721] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                      {service.priceTag}
                    </span>
                  )}
                </div>

                {/* Real High-Resolution Deliverable Photograph */}
                <div className="w-full my-2 transform group-hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={200}
                    className="w-full h-44 object-cover rounded-2xl mb-4 border-2 border-slate-200/80 shadow-sm"
                  />
                </div>

                {/* Title & Desc */}
                <h3 className="font-serif text-xl font-black text-slate-900 mb-2 group-hover:text-[#F95721] transition-colors text-center">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-xs font-medium leading-relaxed mb-4 text-center">
                  {service.desc}
                </p>

                {/* Features Bullet List (Centered) */}
                <div className="w-full pt-3 border-t border-slate-100 mb-6 text-center">
                  <div className="text-[10px] text-slate-800 font-bold uppercase mb-2 tracking-wider text-center">
                    Key Deliverables &amp; Standards:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium flex flex-col items-center">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center justify-center gap-2 text-center">
                        <span className="text-[#F95721] font-black text-[11px]">◆</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 mt-auto">
                {service.isCode ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setScopeBuilderOpen(true)}
                      className="btn-clay-orange text-xs w-full py-2.5 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <TerminalLogIcon className="w-3.5 h-3.5" />
                      <span>Interactive Code Scope Builder →</span>
                    </button>
                  </div>
                ) : service.isTurnitin ? (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setTurnitinModalOpen(true)}
                      className="btn-clay-orange text-xs w-full py-2.5 cursor-pointer"
                    >
                      Upload &amp; Pay ₹200 via UPI →
                    </button>
                    <button
                      onClick={() => setSampleModalOpen(true)}
                      className="text-xs text-[#2563EB] hover:underline font-bold text-center cursor-pointer"
                    >
                      View Watermarked Sample Report
                    </button>
                  </div>
                ) : service.isHindi ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href={service.href}
                      className="btn-clay-orange text-xs w-full text-center py-2.5"
                    >
                      Configure Hindi Quote →
                    </Link>
                    <button
                      onClick={() => setAuditModalOpen(true)}
                      className="text-xs text-[#2563EB] hover:underline inline-flex items-center justify-center gap-1 cursor-pointer font-bold"
                    >
                      <AuditTrailIcon className="w-3.5 h-3.5" />
                      <span>View Vernacular Translation Audit</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={service.href}
                      className="btn-clay-orange text-xs w-full text-center py-2.5"
                    >
                      Configure Instant Quote →
                    </Link>
                  </div>
                )}

                <div className="text-[10px] text-slate-400 font-medium text-center">
                  Protected under Pre-Signed Mutual NDA
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ─── Bottom CTA & Video Consultation Banner ──────────────────────── */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl card-clay-white text-slate-900 text-center shadow-lg relative overflow-hidden">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-4xl font-black mb-3 text-center text-slate-900">
              Uncertain About Your Specific Requirements?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 text-center font-medium">
              Schedule a 1-on-1 preliminary consultation with assigned doctoral directors Tuhit Roy and Sampreeti Mukherjee to evaluate rubrics and data reproducibility.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSchedulerModalOpen(true)}
                className="btn-clay-orange text-xs uppercase cursor-pointer"
              >
                <CalendarScheduleIcon className="w-4 h-4" />
                <span>Book 1-on-1 Consultation</span>
              </button>
              <button
                onClick={() => setNdaModalOpen(true)}
                className="btn-clay-white text-xs uppercase cursor-pointer"
              >
                <NdaShieldIcon className="w-4 h-4" />
                <span>Preview Mutual NDA</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      <FloatingLiveHelp />

      {/* ─── Interactive Modals ───────────────────────────────────────────── */}
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
