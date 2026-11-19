'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TurnitinShieldLogo,
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

export interface ServiceItem {
  id: string;
  division: 'ENGLISH' | 'HINDI' | 'TURNITIN';
  title: string;
  badge: string;
  tier: string;
  image: string;
  desc: string;
  features: string[];
  href: string;
  isCode?: boolean;
  isTurnitin?: boolean;
  isHindi?: boolean;
}

const FULL_SERVICE_CATALOG: ServiceItem[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. ENGLISH SERVICES DIVISION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'en-thesis',
    division: 'ENGLISH',
    title: 'Ph.D. Thesis & Master Dissertation',
    badge: '4-STAGE MILESTONE ESCROW',
    tier: 'GLOBAL DRC COMPLIANT',
    image: '/services/thesis-dissertation.jpg',
    desc: 'End-to-end doctoral thesis drafting tailored to your university guidelines, with optional computational modeling.',
    features: [
      '5-Chapter DRC Architecture',
      '4-Stage Milestone Escrow',
      'Direct Supervisory Defense Prep',
    ],
    href: '/quote?service=THESIS&lang=EN',
  },
  {
    id: 'en-research-paper',
    division: 'ENGLISH',
    title: 'Research Paper Writing',
    badge: 'IEEE / SPRINGER / SCOPUS',
    tier: 'INTERNATIONAL PEER REVIEW',
    image: '/services/research-paper.jpg',
    desc: 'High-impact empirical and theoretical manuscripts engineered for top-tier peer-reviewed journals.',
    features: [
      'Target Journal Formatting',
      'Empirical & Error Analysis',
      '100% Original & Zero AI',
    ],
    href: '/quote?service=RESEARCH_PAPER&lang=EN',
  },
  {
    id: 'en-review-paper',
    division: 'ENGLISH',
    title: 'Systematic Review Papers',
    badge: 'PRISMA 2020 GUIDELINES',
    tier: 'BIBLIOMETRIC SURVEY',
    image: '/services/review-paper.jpg',
    desc: 'PRISMA-compliant systematic reviews, meta-analyses, and bibliometric network mapping across your field.',
    features: [
      'PRISMA 2020 Protocol',
      '100+ Primary Studies Synthesis',
      'VOSviewer Bibliometric Mapping',
    ],
    href: '/quote?service=REVIEW_PAPER&lang=EN',
  },
  {
    id: 'en-synopsis',
    division: 'ENGLISH',
    title: 'Synopsis & Ph.D. Proposals',
    badge: 'DRC & GRANT READY',
    tier: 'INSTITUTIONAL RUBRIC',
    image: '/services/synopsis-proposal.jpg',
    desc: 'Defensible research synopses and doctoral proposals structured for swift institutional committee approval.',
    features: [
      'Defensible Problem Formulation',
      'Methodology & Gantt Roadmap',
      'DRC Committee Alignment',
    ],
    href: '/quote?service=SYNOPSIS&lang=EN',
  },
  {
    id: 'en-book',
    division: 'ENGLISH',
    title: 'Scholarly Book Writing (100–300 pp)',
    badge: 'ISBN ACADEMIC PRESS',
    tier: 'MONOGRAPH STANDARDS',
    image: '/services/book-monograph.jpg',
    desc: 'Full-length academic monographs and edited volumes prepared for international university presses.',
    features: [
      'University Press Architecture',
      'Peer-Reviewed Monograph Prose',
      'Camera-Ready Typesetting & ISBN',
    ],
    href: '/quote?service=BOOK&lang=EN',
  },
  {
    id: 'en-model',
    division: 'ENGLISH',
    title: 'Model & Code Implementation',
    badge: 'PYTORCH / MATLAB / DOCKER',
    tier: 'REPRODUCIBLE CODEBASE',
    image: '/services/computational-model.jpg',
    desc: 'Deep learning, Python, and MATLAB simulations with reproducible benchmarks and private repository handoff.',
    features: [
      'PyTorch & CUDA Architectures',
      'Reproducible Benchmark Metrics',
      'Docker & Git Code Handoff',
    ],
    href: '/quote?service=MODEL&lang=EN',
    isCode: true,
  },
  {
    id: 'en-article',
    division: 'ENGLISH',
    title: 'Academic Articles & Chapters',
    badge: 'SCOPUS / UGC-CARE',
    tier: 'PREMIUM PROSE',
    image: '/services/article-writing.jpg',
    desc: 'Targeted scholarly essays, peer-reviewed chapters, and policy whitepapers with verified citation apparatus.',
    features: [
      '1,000–5,000+ Word Manuscripts',
      'APA, Chicago, Harvard & MLA',
      'Peer-Review Fact Verification',
    ],
    href: '/quote?service=ARTICLE&lang=EN',
  },
  {
    id: 'en-presentation',
    division: 'ENGLISH',
    title: 'Academic PPT & Thesis Defense',
    badge: 'DEFENSE READY',
    tier: '16:9 EXECUTIVE DECKS',
    image: '/services/academic-presentation.jpg',
    desc: 'Widescreen 16:9 defense decks and conference slides crafted for high-stakes academic committee evaluations.',
    features: [
      '16:9 High-Contrast Visuals',
      'Methodology & Flow Architecture',
      'Comprehensive Defense Notes',
    ],
    href: '/quote?service=PPT&lang=EN',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. HINDI SERVICES DIVISION (हिंदी शोध एवं अकादमिक प्रभाग)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'hi-thesis',
    division: 'HINDI',
    title: 'शोध प्रबंध / Ph.D. Thesis & Dissertation',
    badge: 'शोधगंगा एवं यूजीसी मानक',
    tier: '4-चरणीय एस्क्रो',
    image: '/research-areas/hindi-sahitya.jpg',
    desc: 'सम्प्रीति मुखर्जी मैम के प्रत्यक्ष पर्यवेक्षण में संपूर्ण 5-अध्यायी हिंदी शोध प्रबंध लेखन।',
    features: [
      '5-अध्यायी शोध प्रबंध संरचना',
      '4-चरणीय माइलस्टोन सुरक्षा',
      'मानक देवनागरी एवं मौखिक तैयारी',
    ],
    href: '/quote?service=THESIS&lang=HI',
    isHindi: true,
  },
  {
    id: 'hi-research-paper',
    division: 'HINDI',
    title: 'शोध पत्र / Research Paper Writing',
    badge: 'यूजीसी-केयर सूचीबद्ध',
    tier: 'शत-प्रतिशत मौलिक',
    image: '/services/research-paper.jpg',
    desc: 'यूजीसी-केयर एवं समकक्ष प्रतिष्ठित शोध पत्रिकाओं हेतु उच्च स्तरीय मौलिक शोध पत्र लेखन।',
    features: [
      'यूजीसी-केयर मानक प्रारूप',
      'प्रामाणिक प्राथमिक संदर्भ',
      '100% मौलिक एवं शून्य AI',
    ],
    href: '/quote?service=RESEARCH_PAPER&lang=HI',
    isHindi: true,
  },
  {
    id: 'hi-review-paper',
    division: 'HINDI',
    title: 'समीक्षात्मक शोध / Systematic Review Papers',
    badge: 'समालोचनात्मक सर्वेक्षण',
    tier: 'ग्रंथपरक विश्लेषण',
    image: '/services/review-paper.jpg',
    desc: 'हिंदी साहित्य एवं समाजशास्त्र में समकालीन शोध प्रवृत्तियों का समालोचनात्मक एवं ग्रंथपरक सर्वेक्षण।',
    features: [
      'समालोचनात्मक साहित्य सर्वेक्षण',
      'तुलनात्मक सैद्धांतिक विश्लेषण',
      'मानक देवनागरी संदर्भ प्रणाली',
    ],
    href: '/quote?service=REVIEW_PAPER&lang=HI',
    isHindi: true,
  },
  {
    id: 'hi-synopsis',
    division: 'HINDI',
    title: 'शोध प्रस्ताव / Synopsis & Ph.D. Proposals',
    badge: 'डीआरसी समिति स्वीकृत',
    tier: 'पंजीकरण स्वीकृति',
    image: '/services/synopsis-proposal.jpg',
    desc: 'पीएच.डी. पंजीकरण एवं विभागीय शोध समिति (DRC) हेतु प्रामाणिक शोध प्रस्ताव निर्माण।',
    features: [
      'सुस्पष्ट शोध समस्या एवं प्राक्कल्पना',
      'प्रतिचयन प्रविधि एवं कार्ययोजना',
      'विभागीय समिति स्वीकृति मानक',
    ],
    href: '/quote?service=SYNOPSIS&lang=HI',
    isHindi: true,
  },
  {
    id: 'hi-book',
    division: 'HINDI',
    title: 'पुस्तक लेखन / Scholarly Book Writing (100–300 पृष्ठ)',
    badge: 'आईएसबीएन (ISBN) मानक',
    tier: 'अकादमिक ग्रंथ',
    image: '/services/book-monograph.jpg',
    desc: 'अकादमिक संदर्भ ग्रंथ, संपादित पुस्तकें एवं शोध मोनोग्राफ का उच्च स्तरीय देवनागरी लेखन।',
    features: [
      '100–300 पृष्ठ अकादमिक ग्रंथ',
      'प्रस्तावना एवं विस्तृत अनुक्रमणिका',
      'आईएसबीएन मुद्रण प्रारूप',
    ],
    href: '/quote?service=BOOK&lang=HI',
    isHindi: true,
  },
  {
    id: 'hi-article',
    division: 'HINDI',
    title: 'देवनागरी लेख एवं अध्याय / Academic Articles & Chapters',
    badge: 'शुद्ध देवनागरी लेखन',
    tier: 'शून्य मशीनी अनुवाद',
    image: '/services/article-writing.jpg',
    desc: 'विद्वत्तापूर्ण आलेख, पुस्तक अध्याय एवं शोध निबंध (शून्य मशीनी अनुवाद—पूर्णतः मानवीय लेखन)।',
    features: [
      '1,000–5,000+ शब्द मानक आलेख',
      'शुद्ध देवनागरी वर्तनी व व्याकरण',
      '100% मानवीय बौद्धिक शोध',
    ],
    href: '/quote?service=ARTICLE&lang=HI',
    isHindi: true,
  },
  {
    id: 'hi-presentation',
    division: 'HINDI',
    title: 'देवनागरी प्रस्तुति एवं व्याख्यान / Academic PPT & Defense',
    badge: 'मौखिक परीक्षा (VIVA) तैयार',
    tier: '16:9 स्लाइड प्रारूप',
    image: '/services/academic-presentation.jpg',
    desc: 'पीएच.डी. मौखिक परीक्षा (Viva) एवं शोध संगोष्ठियों हेतु 16:9 देवनागरी स्लाइड एवं वक्ता नोट्स।',
    features: [
      '16:9 उच्च-गुणवत्ता देवनागरी स्लाइड',
      'शोध प्रविधि एवं मॉडल आरेख',
      'मौखिक परीक्षा वक्ता नोट्स',
    ],
    href: '/quote?service=PPT&lang=HI',
    isHindi: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. TURNITIN REPORTS DIVISION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'turnitin-scan',
    division: 'TURNITIN',
    title: 'Turnitin AI & Plagiarism Reports',
    badge: 'SAFE NON-REPOSITORY',
    tier: 'EXPRESS 15-30 MIN',
    image: '/services/turnitin-report.jpg',
    desc: 'Official instructor-tier similarity and AI writing audits delivered with zero repository storage.',
    features: [
      'Safe Non-Repository Scan',
      'Official Similarity Index',
      'Express 15–30 Min Delivery',
    ],
    href: '/quote?type=TURNITIN',
    isTurnitin: true,
  },
];

export default function ServicesPage() {
  // Top 3 categories with ENGLISH SERVICES as default
  const [activeCategory, setActiveCategory] = useState<'ENGLISH SERVICES' | 'HINDI SERVICES' | 'TURNITIN REPORTS'>('ENGLISH SERVICES');

  // Modals
  const [turnitinModalOpen, setTurnitinModalOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [ndaModalOpen, setNdaModalOpen] = useState(false);
  const [schedulerModalOpen, setSchedulerModalOpen] = useState(false);
  const [scopeBuilderOpen, setScopeBuilderOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  // Read URL Hash on load & hashchange
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash.toLowerCase();
      if (hash === '#english') {
        setActiveCategory('ENGLISH SERVICES');
        setTimeout(() => document.getElementById('english')?.scrollIntoView({ behavior: 'smooth' }), 80);
      } else if (hash === '#hindi') {
        setActiveCategory('HINDI SERVICES');
        setTimeout(() => document.getElementById('hindi')?.scrollIntoView({ behavior: 'smooth' }), 80);
      } else if (hash === '#turnitin') {
        setActiveCategory('TURNITIN REPORTS');
        setTimeout(() => document.getElementById('turnitin')?.scrollIntoView({ behavior: 'smooth' }), 80);
      } else if (hash === '#research-paper') {
        setActiveCategory('ENGLISH SERVICES');
        setTimeout(() => document.getElementById('research-paper')?.scrollIntoView({ behavior: 'smooth' }), 80);
      } else if (hash === '#thesis') {
        setActiveCategory('ENGLISH SERVICES');
        setTimeout(() => document.getElementById('thesis')?.scrollIntoView({ behavior: 'smooth' }), 80);
      } else if (hash === '#books') {
        setActiveCategory('ENGLISH SERVICES');
        setTimeout(() => document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' }), 80);
      } else if (hash === '#reviews') {
        setActiveCategory('ENGLISH SERVICES');
        setTimeout(() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }), 80);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const CATEGORIES: Array<'ENGLISH SERVICES' | 'HINDI SERVICES' | 'TURNITIN REPORTS'> = [
    'ENGLISH SERVICES',
    'HINDI SERVICES',
    'TURNITIN REPORTS',
  ];

  const filteredServices = FULL_SERVICE_CATALOG.filter((s) => {
    if (activeCategory === 'ENGLISH SERVICES') return s.division === 'ENGLISH';
    if (activeCategory === 'HINDI SERVICES') return s.division === 'HINDI';
    if (activeCategory === 'TURNITIN REPORTS') return s.division === 'TURNITIN';
    return true;
  });

  return (
    <div className="min-h-screen bg-notebook-grid text-slate-900 py-16 px-4 text-center">
      <div className="max-w-7xl mx-auto">

        {/* ─── Hero Header ─────────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-orange-100 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-orange-200">
            CENTRAL SCHOLARLY SERVICES &amp; RESEARCH CATALOGUE
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-black text-slate-900 mb-4 text-center">
            Academic Services &amp; Research Catalogue
          </h1>
          <p className="text-slate-600 text-base sm:text-lg text-center font-medium leading-relaxed">
            Peer-reviewed doctoral rigor, comprehensive manuscript drafting, and pre-signed mutual NDA protection across English, Hindi, and Turnitin audits.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-5 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              <UpiShieldIcon className="w-4 h-4 text-[#F95721]" />
              <span>Instant UPI Accepted</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              <NdaShieldIcon className="w-4 h-4 text-[#2563EB]" />
              <span>100% Pre-Signed Mutual NDA</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              <span className="text-blue-600 font-bold">◆</span>
              <span>4-Stage Milestone Escrow</span>
            </span>
          </div>
        </div>

        {/* ─── Top 3 Primary Category Tabs (Default: ENGLISH SERVICES) ──────── */}
        <div id="english" className="flex justify-center mb-12 scroll-mt-28">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border-2 border-slate-200 shadow-md gap-1 sm:gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const tabAnchor = cat === 'ENGLISH SERVICES' ? 'english' : cat === 'HINDI SERVICES' ? 'hindi' : 'turnitin';
              return (
                <button
                  key={cat}
                  id={`tab-${tabAnchor}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap uppercase tracking-wider ${isActive
                    ? 'bg-[#F95721] text-white shadow-[0_4px_0_#C43B00,0_8px_18px_rgba(249,87,33,0.35)] scale-105'
                    : 'text-slate-700 hover:text-[#F95721] hover:bg-slate-50'
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Overview Banner */}
        <div id={activeCategory === 'HINDI SERVICES' ? 'hindi' : activeCategory === 'TURNITIN REPORTS' ? 'turnitin' : undefined} className="mb-10 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-4xl mx-auto text-center scroll-mt-28">
          {activeCategory === 'ENGLISH SERVICES' && (
            <div>
              <span className="text-[11px] font-black uppercase text-blue-600 tracking-wider">
                ENGLISH RESEARCH DIVISION // GLOBAL PUBLICATION RIGOR
              </span>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                Structured to IEEE, Springer, Elsevier, APA, Harvard, and Scopus standards with milestone payment escrow and containerized code benchmarks.
              </p>
            </div>
          )}
          {activeCategory === 'HINDI SERVICES' && (
            <div>
              <span className="text-[11px] font-black uppercase text-[#F95721] tracking-wider font-hindi">
                हिंदी शोध एवं अकादमिक प्रभाग // सम्प्रीति मुखर्जी (सह-संस्थापक एवं संपादकीय निदेशक)
              </span>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium font-hindi">
                मानक पारिभाषिक शब्दावली, शोधगंगा एवं यूजीसी-केयर अनुरूप संपूर्ण शोध प्रबंध, शोध पत्र, समीक्षा एवं ग्रंथ लेखन। शून्य मशीनी अनुवाद।
              </p>
            </div>
          )}
          {activeCategory === 'TURNITIN REPORTS' && (
            <div>
              <span className="text-[11px] font-black uppercase text-emerald-600 tracking-wider">
                VERIFIED ORIGINALITY AUDITS // SAFE NON-REPOSITORY PROTOCOL
              </span>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                Instructor-tier Turnitin originality and AI probability checks. Files are never stored or indexed in any repository database. Delivery within 15–30 minutes.
              </p>
            </div>
          )}
        </div>

        {/* ─── Services Grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredServices.map((service) => {
            const cardAnchor =
              service.id === 'en-research-paper' ? 'research-paper' :
                service.id === 'en-thesis' ? 'thesis' :
                  service.id === 'en-review-paper' ? 'reviews' :
                    service.id === 'en-book' || service.id === 'hi-book' ? 'books' :
                      service.id === 'turnitin-scan' ? 'turnitin-service' : service.id;

            return (
              <div
                key={service.id}
                id={cardAnchor}
                className="card-clay-white p-6 flex flex-col justify-between text-center items-center h-full group relative scroll-mt-28"
              >

                {/* Academic Badges (Zero Public Prices - Pure Scholarly Standards) */}
                <div className="w-full flex flex-col items-center">
                  <div className="flex items-center justify-center flex-wrap gap-2 w-full mb-3">
                    <span className="text-[10px] font-black uppercase text-[#2563EB] bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full text-center">
                      {service.badge}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#F95721] bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 px-3 py-1 rounded-full text-center">
                      {service.tier}
                    </span>
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
                  <h3 className={`font-serif text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-[#F95721] transition-colors text-center ${service.isHindi ? 'font-hindi' : ''}`}>
                    {service.title}
                  </h3>
                  <p className={`text-slate-600 dark:text-slate-300 text-xs font-medium leading-relaxed mb-4 text-center max-w-sm mx-auto ${service.isHindi ? 'font-hindi' : ''}`}>
                    {service.desc}
                  </p>

                  {/* Key Deliverables (Unique form: Centered Luxury Micro-Pills) */}
                  <div className="w-full pt-3 border-t border-slate-100 dark:border-slate-800 mb-5 flex flex-col items-center text-center">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold uppercase mb-2 tracking-widest text-center">
                      {service.isHindi ? 'प्रमुख मानक' : 'Key Deliverables'}
                    </div>
                    <div className="flex flex-col items-center gap-1.5 w-full">
                      {service.features.map((feat, i) => (
                        <div
                          key={i}
                          className={`inline-flex items-center justify-center gap-1.5 bg-slate-50/90 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 px-3.5 py-1.5 rounded-full text-center text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs hover:border-[#F95721]/50 hover:bg-orange-50/40 transition-all max-w-sm ${service.isHindi ? 'font-hindi' : ''}`}
                        >
                          <span className="text-[#F95721] text-[11px] font-black shrink-0">✦</span>
                          <span className="text-center leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center gap-2.5 mt-auto w-full text-center">
                  {service.isCode ? (
                    <div className="flex flex-col items-center justify-center gap-2 w-full text-center">
                      <button
                        onClick={() => setScopeBuilderOpen(true)}
                        className="btn-clay-orange text-xs w-full py-2.5 flex items-center justify-center gap-1.5 cursor-pointer text-center"
                      >
                        <TerminalLogIcon className="w-3.5 h-3.5" />
                        <span>Interactive Code Scope Builder →</span>
                      </button>
                      <Link
                        href={service.href}
                        className="text-xs font-bold text-[#2563EB] hover:underline text-center"
                      >
                        Configure Custom Code Scope →
                      </Link>
                    </div>
                  ) : service.isTurnitin ? (
                    <div className="flex flex-col items-center justify-center gap-2 w-full text-center">
                      <button
                        onClick={() => setTurnitinModalOpen(true)}
                        className="btn-clay-orange text-xs w-full py-2.5 cursor-pointer text-center"
                      >
                        Upload &amp; Verify Originality →
                      </button>
                      <button
                        onClick={() => setSampleModalOpen(true)}
                        className="text-xs text-[#2563EB] hover:underline font-bold text-center cursor-pointer"
                      >
                        View Watermarked Sample Report
                      </button>
                    </div>
                  ) : service.isHindi ? (
                    <div className="flex flex-col items-center justify-center gap-2 w-full text-center">
                      <Link
                        href={service.href}
                        className="btn-clay-orange text-xs w-full text-center py-2.5 font-hindi flex items-center justify-center"
                      >
                        कोटेशन कॉन्फ़िगर करें / Get Instant Estimate →
                      </Link>
                      <button
                        onClick={() => setAuditModalOpen(true)}
                        className="text-xs text-[#2563EB] hover:underline inline-flex items-center justify-center gap-1 cursor-pointer font-bold text-center"
                      >
                        <AuditTrailIcon className="w-3.5 h-3.5" />
                        <span>View Vernacular Translation Audit</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 w-full text-center">
                      <Link
                        href={service.href}
                        className="btn-clay-orange text-xs w-full text-center py-2.5 flex items-center justify-center"
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
            );
          })}
        </div>

        {/* ─── Bottom CTA & Video Consultation Banner ──────────────────────── */}
        <div className="mt-12 p-8 md:p-12 rounded-3xl card-clay-white text-slate-900 text-center shadow-lg relative overflow-hidden">
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
