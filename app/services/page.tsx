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

import FloatingLiveHelp from '@/components/FloatingLiveHelp';

export interface ServiceItem {
  id: string;
  division: 'ENGLISH' | 'HINDI' | 'TURNITIN';
  title: string;
  badge: string;
  priceTag: string;
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
    priceTag: 'Non-Tech: ₹19,999 | Tech: ₹28,998',
    image: '/services/thesis-dissertation.jpg',
    desc: 'End-to-end doctoral thesis drafting from Chapter 1 (Introduction) through literature review, methodology, results, and conclusion. Available with or without computational models.',
    features: [
      'Comprehensive 5-chapter or 6-chapter university structure',
      'Chapter-by-chapter milestone review and payment schedule (25% per milestone)',
      'Strict adherence to university thesis handbook and DRC rubric',
      'Direct communication channel with your assigned Ph.D. director',
    ],
    href: '/quote?service=THESIS&lang=EN',
  },
  {
    id: 'en-research-paper',
    division: 'ENGLISH',
    title: 'Research Paper Writing',
    badge: 'IEEE / SPRINGER / SCOPUS',
    priceTag: 'Non-Tech: ₹4,999 | Tech: ₹8,998',
    image: '/services/research-paper.jpg',
    desc: 'High-impact empirical and theoretical research manuscripts structured to international publication standards. Formatted to IEEE, Springer, Elsevier, or target UGC-CARE guidelines.',
    features: [
      'Original hypothesis formulation & literature synthesis',
      'Accurate mathematical modeling & statistical data analysis',
      'Full BibTeX / Mendeley / EndNote citation management',
      'Target journal formatting (LaTeX template or Word)',
    ],
    href: '/quote?service=RESEARCH_PAPER&lang=EN',
  },
  {
    id: 'en-review-paper',
    division: 'ENGLISH',
    title: 'Systematic Review Papers',
    badge: 'PRISMA / BIBLIOMETRIC',
    priceTag: 'Non-Tech: ₹3,999 | Tech: ₹4,499',
    image: '/services/review-paper.jpg',
    desc: 'Comprehensive systematic literature reviews, state-of-the-art meta-analyses, and VOSviewer/Biblioshiny bibliometric network mapping across your discipline.',
    features: [
      'PRISMA-compliant search strategy & inclusion flowchart',
      'Systematic taxonomy matrices & comparative synthesis',
      '100+ peer-reviewed primary study critical evaluation',
      'Identification of research gaps and future directions',
    ],
    href: '/quote?service=REVIEW_PAPER&lang=EN',
  },
  {
    id: 'en-synopsis',
    division: 'ENGLISH',
    title: 'Synopsis & Ph.D. Proposals',
    badge: 'DRC / GRANT READY',
    priceTag: 'Non-Tech: ₹3,999 | Tech: ₹4,499',
    image: '/services/synopsis-proposal.jpg',
    desc: 'Crisp, defensible research synopses, doctoral registration proposals, and academic grant applications formulated to pass university screening committees.',
    features: [
      'Problem statement, research questions, and tentative hypotheses',
      'Proposed methodology, sampling frame & data collection tools',
      'Tentative chapter outline & chronological work-plan (Gantt chart)',
      'Preliminary bibliography conforming to institutional norms',
    ],
    href: '/quote?service=SYNOPSIS&lang=EN',
  },
  {
    id: 'en-book',
    division: 'ENGLISH',
    title: 'Scholarly Book Writing (100–300 pp)',
    badge: 'ISBN STANDARD',
    priceTag: '₹3,999 – ₹11,999 (by page tier)',
    image: '/services/book-monograph.jpg',
    desc: 'Full-length scholarly monographs, edited volumes, and reference textbooks prepared for academic publishers with ISBN registration support.',
    features: [
      'Structured 100-page, 200-page, and 300-page volume packages',
      'Rigorous chapter-wise pedagogical or research structure',
      'Front matter, preface, detailed index, and consolidated bibliography',
      'Print and digital publishing formatting support',
    ],
    href: '/quote?service=BOOK&lang=EN',
  },
  {
    id: 'en-model',
    division: 'ENGLISH',
    title: 'Model & Code Implementation',
    badge: 'PYTORCH / MATLAB / DOCKER',
    priceTag: '₹5,999 – ₹12,999 (by complexity)',
    image: '/services/computational-model.jpg',
    desc: 'Machine learning, deep neural network (PyTorch, TensorFlow, CUDA), Python, and MATLAB simulation development with reproducible benchmarks and Git handoff.',
    features: [
      'Custom algorithm implementation & hyperparameter tuning',
      'Clean, commented source code with README and Docker container',
      'Validation curves, confusion matrices & AUC-ROC metrics',
      'Private Git repository handoff directly to your client portal',
    ],
    href: '/quote?service=MODEL&lang=EN',
    isCode: true,
  },
  {
    id: 'en-article',
    division: 'ENGLISH',
    title: 'Academic Articles & Chapters',
    badge: 'SCOPUS / UGC-CARE',
    priceTag: 'Non-Tech: ₹0.60/word | Tech: ₹0.70/word',
    image: '/services/article-writing.jpg',
    desc: 'Scholarly articles, edited book chapters, policy whitepapers, and conference proceedings with verified word count tiers and rigorous citation apparatus.',
    features: [
      'Available across 1,000 to 5,000+ word tiers',
      'Standardized per-word rate schedule in quote calculator',
      'Peer-reviewed standard APA, Harvard, MLA, or Chicago styling',
      'Zero AI hallucinations and verified fact-checking',
    ],
    href: '/quote?service=ARTICLE&lang=EN',
  },
  {
    id: 'en-presentation',
    division: 'ENGLISH',
    title: 'Academic PPT & Thesis Defense',
    badge: 'DEFENSE READY',
    priceTag: 'Non-Tech: ₹120/slide | Tech: ₹150/slide',
    image: '/services/academic-presentation.jpg',
    desc: 'Professional thesis defense slide decks, conference presentations, and seminar slides formatted to withstand tough academic committee inquiries.',
    features: [
      'Clean, widescreen 16:9 visual hierarchy with high-contrast figures',
      'Concise bullet summaries paired with speaker notes',
      'Custom methodology workflow diagrams and architecture schematics',
      'Per-slide standardized rate in quote engine',
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
    priceTag: 'Non-Tech: ₹25,999 | Tech: ₹33,998',
    image: '/research-areas/hindi-sahitya.jpg',
    desc: 'सम्प्रीति मुखर्जी मैम के प्रत्यक्ष पर्यवेक्षण में संपूर्ण 5-अध्यायी हिंदी शोध प्रबंध लेखन। शोधगंगा, यूजीसी-केयर एवं विश्वविद्यालय नियमावली के अनुरूप।',
    features: [
      '5-अध्यायी संपूर्ण शोध प्रबंध संरचना (प्रस्तावना, साहित्य समीक्षा, प्रविधि, विश्लेषण, निष्कर्ष)',
      '4-चरणीय माइलस्टोन समीक्षा एवं एस्क्रो भुगतान व्यवस्था (25% प्रति चरण)',
      'मानक पारिभाषिक शब्दावली (भारत सरकार वैज्ञानिक एवं तकनीकी शब्दावली आयोग अनुरूप)',
      'मौखिक परीक्षा (Viva Voce) एवं शोध समिति प्रस्तुति हेतु संपूर्ण तैयारी',
    ],
    href: '/quote?service=THESIS&lang=HI',
    isHindi: true,
  },
  {
    id: 'hi-research-paper',
    division: 'HINDI',
    title: 'शोध पत्र / Research Paper Writing',
    badge: 'यूजीसी-केयर सूचीबद्ध',
    priceTag: 'Non-Tech: ₹6,999 | Tech: ₹10,998',
    image: '/services/research-paper.jpg',
    desc: 'यूजीसी-केयर (UGC-CARE) एवं समकक्ष प्रतिष्ठित शोध पत्रिकाओं हेतु उच्च स्तरीय मौलिक शोध पत्र लेखन, संदर्भ ग्रंथ सूची एवं शोध प्रविधि सहित।',
    features: [
      'प्रामाणिक परिकल्पना निर्माण एवं प्राथमिक/द्वितीयक स्रोतों का अध्ययन',
      'मानकीकृत देवनागरी संदर्भ प्रणाली (MLA / APA / शिकागो प्रारूप)',
      '0% AI लेखन एवं शत-प्रतिशत मौलिक बौद्धिक शोध',
      'संपादकीय समीक्षा एवं पत्रिका संशोधन (Revision) में पूर्ण सहयोग',
    ],
    href: '/quote?service=RESEARCH_PAPER&lang=HI',
    isHindi: true,
  },
  {
    id: 'hi-review-paper',
    division: 'HINDI',
    title: 'समीक्षात्मक शोध / Systematic Review Papers',
    badge: 'समालोचनात्मक सर्वेक्षण',
    priceTag: 'Non-Tech: ₹5,499 | Tech: ₹5,999',
    image: '/services/review-paper.jpg',
    desc: 'हिंदी साहित्य, भाषाविज्ञान, इतिहास, समाजशास्त्र एवं दर्शनशास्त्र में समकालीन शोध प्रवृत्तियों का व्यापक समालोचनात्मक एवं ग्रंथपरक सर्वेक्षण।',
    features: [
      'समकालीन शोध प्रवृत्तियों का व्यापक समालोचनात्मक सर्वेक्षण',
      'प्राथमिक एवं द्वितीयक स्रोतों का तुलनात्मक सैद्धांतिक विश्लेषण',
      'शोध अंतराल (Research Gaps) एवं भावी शोध दिशाओं का स्पष्ट निरूपण',
      'मानक देवनागरी पारिभाषिक शब्दावली का शुद्ध प्रयोग',
    ],
    href: '/quote?service=REVIEW_PAPER&lang=HI',
    isHindi: true,
  },
  {
    id: 'hi-synopsis',
    division: 'HINDI',
    title: 'शोध प्रस्ताव / Synopsis & Ph.D. Proposals',
    badge: 'डीआरसी समिति स्वीकृत',
    priceTag: 'Non-Tech: ₹5,499 | Tech: ₹5,999',
    image: '/services/synopsis-proposal.jpg',
    desc: 'पीएच.डी. पंजीकरण एवं विभागीय शोध समिति (DRC/RAC) हेतु तर्कसंगत, सुस्पष्ट एवं प्रामाणिक शोध प्रस्ताव (Synopsis) निर्माण।',
    features: [
      'सुस्पष्ट समस्या कथन, शोध प्रश्न, उद्देश्य एवं प्राक्कल्पनाएं',
      'शोध क्षेत्र, प्रतिचयन (Sampling) एवं अध्ययन प्रविधि का प्रारूप',
      'अध्यायीकरण की रूपरेखा एवं समयबद्ध कार्ययोजना (Gantt Chart)',
      'प्रारंभिक संदर्भ ग्रंथ सूची एवं शोध समिति प्रस्तुति तैयारी',
    ],
    href: '/quote?service=SYNOPSIS&lang=HI',
    isHindi: true,
  },
  {
    id: 'hi-book',
    division: 'HINDI',
    title: 'पुस्तक लेखन / Scholarly Book Writing (100–300 पृष्ठ)',
    badge: 'आईएसबीएन (ISBN) मानक',
    priceTag: '₹4,999 – ₹15,999 (पृष्ठों के अनुसार)',
    image: '/services/book-monograph.jpg',
    desc: 'अकादमिक संदर्भ ग्रंथ, संपादित पुस्तकें, शोध मोनोग्राफ एवं पाठ्य-सामग्री का उच्च स्तरीय देवनागरी लेखन, आईएसबीएन प्रारूप सहित।',
    features: [
      '100, 200 एवं 300 पृष्ठों के सुव्यवस्थित अकादमिक ग्रंथ पैकेज',
      'प्रस्तावना, भूमिका, विषय-विभाजन एवं विस्तृत अनुक्रमणिका',
      'राष्ट्रीय एवं अंतरराष्ट्रीय प्रकाशकों हेतु मुद्रण-योग्य स्वरूप',
      'शुद्ध देवनागरी वर्तनी एवं मानकीकृत व्याकरण',
    ],
    href: '/quote?service=BOOK&lang=HI',
    isHindi: true,
  },
  {
    id: 'hi-article',
    division: 'HINDI',
    title: 'देवनागरी लेख एवं अध्याय / Academic Articles & Chapters',
    badge: 'प्रति-शब्द मानक दर',
    priceTag: 'Non-Tech: ₹0.75/शब्द | Tech: ₹0.80/शब्द',
    image: '/services/article-writing.jpg',
    desc: 'विद्वत्तापूर्ण आलेख, संपादित पुस्तकों के अध्याय एवं शोध निबंध। शून्य मशीनी अनुवाद—पूर्णतः मानवीय एवं बौद्धिक लेखन।',
    features: [
      '1,000 से 5,000+ शब्दों के मानकीकृत प्रति-शब्द दर पर आधारित',
      'शुद्ध वर्तनी, व्याकरण एवं उच्च स्तरीय बौद्धिक भाषा शैली',
      'शून्य मशीनी अनुवाद (No Machine Translation Shortcuts)',
      'संपादित पुस्तकों (Edited Books) हेतु विशेष शोध अध्याय',
    ],
    href: '/quote?service=ARTICLE&lang=HI',
    isHindi: true,
  },
  {
    id: 'hi-presentation',
    division: 'HINDI',
    title: 'देवनागरी प्रस्तुति एवं व्याख्यान / Academic PPT & Defense',
    badge: 'मौखिक परीक्षा (VIVA) तैयार',
    priceTag: 'Non-Tech: ₹150/स्लाइड | Tech: ₹170/स्लाइड',
    image: '/services/academic-presentation.jpg',
    desc: 'पीएच.डी. मौखिक परीक्षा, शोध संगोष्ठी (Seminar) एवं राष्ट्रीय सम्मेलनों हेतु आकर्षक 16:9 देवनागरी स्लाइड एवं वक्ता नोट्स।',
    features: [
      '16:9 उच्च-विभेदन देवनागरी स्लाइड प्रारूप (Devanagari Unicode)',
      'प्रमुख शोध निष्कर्षों के बिंदुवार संक्षिप्त विवरण एवं वक्ता नोट्स',
      'शोध प्रविधि एवं कार्यप्रणाली के स्पष्ट चार्ट एवं आरेख',
      'मौखिक परीक्षा (Viva Voce) एवं राष्ट्रीय संगोष्ठियों हेतु तैयार',
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
    priceTag: '₹200 per file flat',
    image: '/services/turnitin-report.jpg',
    desc: 'Instructor-tier Turnitin verification audits checking similarity index and AI writing percentages without saving your manuscript to public databases.',
    features: [
      'Flat fee of ₹200 per file scanned (15–30 min express delivery)',
      '100% Non-Repository deposit (Zero database retention guaranteed)',
      'Full PDF report with color-coded passage citations and matching sources',
      'Dedicated AI Writing detection percentage breakdown (0% AI guaranteed)',
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

  // Read URL Hash on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#english') setActiveCategory('ENGLISH SERVICES');
      else if (hash === '#hindi') setActiveCategory('HINDI SERVICES');
      else if (hash === '#turnitin') setActiveCategory('TURNITIN REPORTS');
    }
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
            CENTRAL PRICING &amp; SCHOLARLY CATALOGUE
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-black text-slate-900 mb-4 text-center">
            Services &amp; Pricing Catalogue
          </h1>
          <p className="text-slate-600 text-base sm:text-lg text-center font-medium leading-relaxed">
            Transparent deterministic rates, 0% AI writing guarantee, and pre-signed mutual NDA protection across English, Hindi, and Turnitin audits.
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
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border-2 border-slate-200 shadow-md gap-1 sm:gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap uppercase tracking-wider ${
                    isActive
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
        <div className="mb-10 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-4xl mx-auto text-center">
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
          {filteredServices.map((service) => (
            <div key={service.id} className="card-clay-white p-6 flex flex-col justify-between text-center items-center h-full group relative">
              
              {/* Badge & Price Tag */}
              <div className="w-full flex flex-col items-center">
                <div className="flex items-center justify-between w-full gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase text-[#2563EB] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                    {service.badge}
                  </span>
                  <span className="text-xs font-black text-[#F95721] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                    {service.priceTag}
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
                <h3 className={`font-serif text-xl font-black text-slate-900 mb-2 group-hover:text-[#F95721] transition-colors text-center ${service.isHindi ? 'font-hindi' : ''}`}>
                  {service.title}
                </h3>
                <p className={`text-slate-600 text-xs font-medium leading-relaxed mb-4 text-center ${service.isHindi ? 'font-hindi' : ''}`}>
                  {service.desc}
                </p>

                {/* Features Bullet List (Centered) */}
                <div className="w-full pt-3 border-t border-slate-100 mb-6 text-center">
                  <div className="text-[10px] text-slate-800 font-bold uppercase mb-2 tracking-wider text-center">
                    {service.isHindi ? 'प्रमुख मानक एवं विशेषताएं:' : 'Key Deliverables & Standards:'}
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium flex flex-col items-center">
                    {service.features.map((feat, i) => (
                      <li key={i} className={`flex items-center justify-center gap-2 text-center ${service.isHindi ? 'font-hindi' : ''}`}>
                        <span className="text-[#F95721] font-black text-[11px]">◆</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 mt-auto w-full">
                {service.isCode ? (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setScopeBuilderOpen(true)}
                      className="btn-clay-orange text-xs w-full py-2.5 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <TerminalLogIcon className="w-3.5 h-3.5" />
                      <span>Interactive Code Scope Builder →</span>
                    </button>
                    <Link
                      href={service.href}
                      className="text-xs font-bold text-[#2563EB] hover:underline text-center"
                    >
                      Calculate Custom Code Quote
                    </Link>
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
                      कोटेशन कॉन्फ़िगर करें / Calculate Quote →
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
                  <div className="flex flex-col gap-2">
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
