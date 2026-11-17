'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
} from '@/components/FuturisticInteractions';

import { Interactive3DCard } from '@/components/FuturisticScrollExperience';
import ResearchAreasSection from '@/components/ResearchAreasSection';

export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  badge: string;
  visual: React.ReactNode;
  desc: string;
  features: string[];
  href: string;
  glowColor: 'purple';
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
    visual: <ResearchPaperRealWork className="w-full h-44 mb-4" />,
    desc: 'High-impact empirical and theoretical research manuscripts structured to international publication standards. Formatted to IEEE, Springer, Elsevier, or target UGC-CARE guidelines.',
    features: [
      'Original hypothesis formulation & literature synthesis',
      'Accurate mathematical modeling & statistical data analysis',
      'Full BibTeX / Mendeley / EndNote citation management',
      'Target journal formatting (LaTeX template or Word)',
    ],
    href: '/quote?service=RESEARCH_PAPER',
    glowColor: 'purple',
  },
  {
    id: 'review-paper',
    category: 'Manuscripts & Publications',
    title: 'Systematic Review Papers',
    badge: 'PRISMA / Bibliometric',
    visual: <ReviewPaperRealWork className="w-full h-44 mb-4" />,
    desc: 'Comprehensive systematic literature reviews, state-of-the-art meta-analyses, and VOSviewer/Biblioshiny bibliometric mapping across your discipline.',
    features: [
      'PRISMA-compliant search strategy & inclusion flowchart',
      'Systematic taxonomy matrices & comparative synthesis',
      '100+ peer-reviewed primary study critical evaluation',
      'Identification of research gaps and future directions',
    ],
    href: '/quote?service=REVIEW_PAPER',
    glowColor: 'purple',
  },
  {
    id: 'academic-article',
    category: 'Manuscripts & Publications',
    title: 'Academic Articles & Chapters',
    badge: 'Scopus / UGC-CARE',
    visual: <ArticleRealWork className="w-full h-44 mb-4" />,
    desc: 'Scholarly articles, edited book chapters, policy whitepapers, and conference proceedings with verified word count tiers and rigorous citation apparatus.',
    features: [
      'Available across 1,000 to 5,000+ word tiers',
      'Standardized per-word rate schedule in quote calculator',
      'Peer-reviewed standard APA, Harvard, MLA, or Chicago styling',
      'Zero AI hallucinations and verified fact-checking',
    ],
    href: '/quote?service=ARTICLE',
    glowColor: 'purple',
  },

  // Category 2: Dissertations & Proposals
  {
    id: 'thesis-dissertation',
    category: 'Dissertations & Proposals',
    title: 'Ph.D. Thesis & Master Dissertation',
    badge: 'Chapter Milestone Escrow',
    visual: <ThesisRealWork className="w-full h-44 mb-4" />,
    desc: 'End-to-end doctoral thesis drafting from Chapter 1 (Introduction) through literature review, methodology, results, and conclusion. Available with or without computational models.',
    features: [
      'Comprehensive 5-chapter or 6-chapter university structure',
      'Chapter-by-chapter milestone review and payment schedule',
      'Strict adherence to university thesis handbook and DRC rubric',
      'Direct communication channel with your assigned Ph.D. director',
    ],
    href: '/quote?service=THESIS',
    glowColor: 'purple',
  },
  {
    id: 'research-synopsis',
    category: 'Dissertations & Proposals',
    title: 'Synopsis & Ph.D. Proposals',
    badge: 'DRC / Grant Ready',
    visual: <SynopsisRealWork className="w-full h-44 mb-4" />,
    desc: 'Crisp, defensible research synopses, doctoral registration proposals, and academic grant applications formulated to pass university screening committees.',
    features: [
      'Problem statement, research questions, and tentative hypotheses',
      'Proposed methodology, sampling frame & data collection tools',
      'Tentative chapter outline & chronological work-plan (Gantt)',
      'Preliminary bibliography conforming to institutional norms',
    ],
    href: '/quote?service=SYNOPSIS',
    glowColor: 'purple',
  },

  // Category 3: Code & Computational Models
  {
    id: 'model-code',
    category: 'Computational & Code Implementation',
    title: 'Model & Code Implementation',
    badge: 'PyTorch / MATLAB / Docker',
    visual: <ModelCodeRealWork className="w-full h-44 mb-4" />,
    desc: 'Machine learning, deep neural network (PyTorch, TensorFlow, CUDA), Python, and MATLAB simulation development with reproducible benchmarks and Git handoff.',
    features: [
      'Custom algorithm implementation & hyperparameter tuning',
      'Clean, commented source code with README and Docker container',
      'Validation curves, confusion matrices & AUC-ROC metrics',
      'Private Git repository handoff directly to your client portal',
    ],
    href: '/quote?service=MODEL',
    glowColor: 'purple',
    isCode: true,
  },

  // Category 4: Scholarly Books
  {
    id: 'book-writing',
    category: 'Books & Monographs',
    title: 'Scholarly Book Writing (100–300 pp)',
    badge: 'ISBN Standard',
    visual: <BookRealWork className="w-full h-44 mb-4" />,
    desc: 'Full-length scholarly monographs, edited volumes, and reference textbooks prepared for academic publishers with ISBN registration support.',
    features: [
      'Structured 100-page, 200-page, and 300-page packages',
      'Rigorous chapter-wise pedagogical or research structure',
      'Front matter, preface, detailed index, and consolidated bibliography',
      'Available in both English and Hindi',
    ],
    href: '/quote?service=BOOK',
    glowColor: 'purple',
  },

  // Category 5: Presentations & Defense
  {
    id: 'presentation-defense',
    category: 'Presentations & Defense',
    title: 'Academic PPT & Thesis Defense',
    badge: 'Defense Ready',
    visual: <PresentationRealWork className="w-full h-44 mb-4" />,
    desc: 'Professional thesis defense slide decks, conference presentations, and seminar slides formatted to withstand tough academic committee inquiries.',
    features: [
      'Clean, widescreen 16:9 visual hierarchy with high-contrast figures',
      'Concise bullet summaries paired with speaker notes',
      'Custom methodology workflow diagrams and architecture schematics',
      'Per-slide standardized rate in quote engine',
    ],
    href: '/quote?service=PPT',
    glowColor: 'purple',
  },

  // Category 6: Turnitin Reports
  {
    id: 'turnitin-audit',
    category: 'Originality & Audits',
    title: 'Turnitin AI & Plagiarism Reports',
    badge: 'Safe Non-Repository',
    visual: <TurnitinReportRealWork className="w-full h-44 mb-4" />,
    desc: 'Instructor-tier Turnitin verification audits checking similarity index and AI writing percentages without saving your manuscript to public databases.',
    features: [
      'Flat fee of ₹200 per file scanned (15–30 min delivery)',
      '100% Non-Repository deposit (Zero database retention guaranteed)',
      'Full PDF report with color-coded passage citations and matching sources',
      'Instant UPI payment and instant upload modal',
    ],
    href: '/quote?type=TURNITIN',
    glowColor: 'purple',
    isTurnitin: true,
    priceTag: '₹200 per file flat',
  },

  // Category 7: Hindi Specialists
  {
    id: 'hindi-research',
    category: 'Hindi Academic Division (हिंदी शोध)',
    title: 'Hindi Research & Thesis (हिंदी शोध पत्र एवं प्रबंध)',
    badge: 'Devanagari Specialists',
    visual: <HindiPaperRealWork className="w-full h-44 mb-4" />,
    desc: 'Specialized academic research in Hindi supervised by Sampreeti Mukherjee with standard Devanagari terminology, Shodhganga compliance, and zero automated translation shortcuts.',
    features: [
      'शोध पत्र (Research Papers) & शोध प्रबंध (Complete Theses)',
      'मानक पारिभाषिक शब्दावली (Standardized Academic Terminology)',
      'यूजीसी-केयर (UGC-CARE) एवं शोधगंगा (Shodhganga) अनुरूप प्रारूप',
      'तुलनात्मक साहित्य, मानविकी, भाषाविज्ञान एवं समाजशास्त्र',
    ],
    href: '/quote?lang=HI',
    glowColor: 'purple',
    isHindi: true,
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  // Modals
  const [turnitinModalOpen, setTurnitinModalOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [ndaModalOpen, setNdaModalOpen] = useState(false);
  const [schedulerModalOpen, setSchedulerModalOpen] = useState(false);
  const [scopeBuilderOpen, setScopeBuilderOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  const categories = [
    'ALL',
    'Manuscripts & Publications',
    'Dissertations & Proposals',
    'Computational & Code Implementation',
    'Books & Monographs',
    'Presentations & Defense',
    'Originality & Audits',
    'Hindi Academic Division (हिंदी शोध)',
  ];

  const filteredServices = activeCategory === 'ALL'
    ? SERVICE_CATALOG
    : SERVICE_CATALOG.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] text-black dark:text-white py-16 px-4 text-center transition-colors duration-300 selection:bg-purple-600 selection:text-white">
      <div className="max-w-7xl mx-auto">

        {/* ─── Hero Header ─────────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="badge-pill-purple mb-3 font-mono">
            ACADEMIC CATALOGUE // RIGOROUS &amp; CONFIDENTIAL
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-black dark:text-white mb-4 text-center">
            Scholarly Services Catalogue
          </h1>
          <p className="text-slate-600 dark:text-purple-200/80 text-base sm:text-lg text-center font-normal leading-relaxed">
            Rigorously formatted, 0% AI, and plagiarism-free academic scholarship in both <strong className="text-black dark:text-white font-bold">English</strong> and <strong className="text-black dark:text-white font-bold">Hindi</strong>. Evaluated transparently through our central server-side pricing engine.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-5 text-xs font-semibold text-slate-700 dark:text-purple-200 font-mono">
            <span className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/40 px-3 py-1 rounded-full text-purple-800 dark:text-purple-300">
              <UpiShieldIcon className="w-4 h-4" />
              <span>Instant UPI Accepted</span>
            </span>
            <span className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/40 px-3 py-1 rounded-full text-purple-800 dark:text-purple-300">
              <NdaShieldIcon className="w-4 h-4" />
              <span>100% IP &amp; Mutual NDA</span>
            </span>
            <span className="flex items-center gap-1.5 bg-purple-100 dark:bg-purple-900/40 border border-purple-300 dark:border-purple-700 px-3 py-1 rounded-full text-purple-900 dark:text-purple-200">
              <span>Chapter-by-Chapter Escrow</span>
            </span>
          </div>
        </div>

        {/* ─── Category Filter Tabs ────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-400/60 shadow-sm dark:shadow-[0_0_15px_rgba(168,85,247,0.35)] scale-105'
                  : 'bg-white dark:bg-[#0A0414] text-slate-600 dark:text-purple-300/70 hover:text-black dark:hover:text-white border border-purple-200 dark:border-purple-900/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ─── Redesigned Services Grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredServices.map((service) => (
            <Interactive3DCard key={service.id} glowColor={service.glowColor}>
              <div className="card-futuristic-3d p-6 flex flex-col justify-between text-left h-full group relative border-t-4 border-t-purple-600 dark:border-t-purple-400 bg-purple-50/20 dark:bg-[#0A0414]">
                
                {/* Badge & Category */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase text-purple-800 dark:text-purple-200 bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/40 px-2.5 py-1 rounded-full">
                      {service.badge}
                    </span>
                    {service.priceTag && (
                      <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-500/40 px-2.5 py-1 rounded-full">
                        {service.priceTag}
                      </span>
                    )}
                  </div>

                  {/* Real Deliverable Image */}
                  <div className="my-2 transform group-hover:scale-[1.02] transition-transform duration-300">
                    {service.visual}
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-serif text-xl font-bold text-black dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-purple-200/70 text-xs leading-relaxed mb-4">
                    {service.desc}
                  </p>

                  {/* Features Bullet List (Left-Aligned) */}
                  <div className="pt-3 border-t border-purple-100 dark:border-purple-900/40 mb-6">
                    <div className="text-[10px] font-mono text-purple-700 dark:text-purple-400 font-bold uppercase mb-2">
                      Key Deliverables &amp; Standards:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-purple-200">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-purple-600 dark:text-purple-400 font-bold text-[11px] mt-0.5">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-purple-100 dark:border-purple-900/40 flex flex-col gap-2.5 mt-auto">
                  {service.isCode ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setScopeBuilderOpen(true)}
                        className="btn-primary-glow text-xs w-full font-mono py-2.5 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <TerminalLogIcon className="w-3.5 h-3.5" />
                        <span>Interactive Code Scope Builder →</span>
                      </button>
                    </div>
                  ) : service.isTurnitin ? (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setTurnitinModalOpen(true)}
                        className="btn-primary-glow text-xs w-full font-mono py-2.5 cursor-pointer"
                      >
                        Upload &amp; Pay ₹200 via UPI →
                      </button>
                      <button
                        onClick={() => setSampleModalOpen(true)}
                        className="text-xs text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-white font-mono text-center underline cursor-pointer"
                      >
                        View Watermarked Sample Report
                      </button>
                    </div>
                  ) : service.isHindi ? (
                    <div className="flex flex-col gap-2">
                      <Link
                        href={service.href}
                        className="btn-primary-glow text-xs w-full text-center font-mono py-2.5"
                      >
                        Configure Hindi Quote →
                      </Link>
                      <button
                        onClick={() => setAuditModalOpen(true)}
                        className="text-xs text-purple-700 dark:text-purple-300 hover:underline inline-flex items-center justify-center gap-1 cursor-pointer font-mono"
                      >
                        <AuditTrailIcon className="w-3.5 h-3.5" />
                        <span>View Vernacular Translation Audit</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={service.href}
                        className="btn-primary-glow text-xs w-full text-center font-mono py-2.5"
                      >
                        Configure Instant Quote →
                      </Link>
                    </div>
                  )}

                  <div className="text-[10px] font-mono text-purple-400 dark:text-purple-500 text-center">
                    Protected under Pre-Signed Mutual NDA
                  </div>
                </div>

              </div>
            </Interactive3DCard>
          ))}
        </div>

        {/* ─── RESEARCH AREAS SUPPORTED (Immediately After Services as requested) ── */}
        <div className="border-t border-purple-200 dark:border-purple-900/40 pt-16">
          <ResearchAreasSection />
        </div>

        {/* ─── Bottom CTA & Video Consultation Banner ──────────────────────── */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-purple-50/40 dark:bg-[#0A0414] border border-purple-200 dark:border-purple-500/30 text-black dark:text-white text-center shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold mb-3 text-center text-black dark:text-white">
              Uncertain About Your Specific Requirements?
            </h2>
            <p className="text-slate-600 dark:text-purple-200/80 text-sm sm:text-base max-w-xl mx-auto mb-8 text-center font-normal">
              Schedule a 1-on-1 preliminary consultation with assigned doctoral directors Tuhit Roy and Sampreeti Mukherjee to evaluate rubrics and data reproducibility.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSchedulerModalOpen(true)}
                className="btn-primary-glow font-mono text-xs uppercase cursor-pointer"
              >
                <CalendarScheduleIcon className="w-4 h-4" />
                <span>Book 1-on-1 Consultation</span>
              </button>
              <button
                onClick={() => setNdaModalOpen(true)}
                className="btn-secondary-dark font-mono text-xs uppercase cursor-pointer"
              >
                <NdaShieldIcon className="w-4 h-4 text-purple-400" />
                <span>Preview Mutual NDA</span>
              </button>
            </div>
          </div>
        </div>

      </div>

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
