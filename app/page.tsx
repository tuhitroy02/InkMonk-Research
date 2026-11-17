import Link from 'next/link';
import Image from 'next/image';
import {
  UkFlagLogo,
  IndiaFlagLogo,
  TurnitinShieldLogo,
  ResearchPaperRealIcon,
  ThesisRealIcon,
  BookRealIcon,
  PresentationRealIcon,
  CodeModelRealIcon,
  SynopsisRealIcon,
  LocationRealIcon,
  WhatsAppRealIcon,
  EmailRealIcon,
  Step1Icon,
  Step2Icon,
  Step3Icon,
  Step4Icon,
} from '@/components/RealIcons';

export const metadata = {
  title: 'InkMonk Research — Research with care. Writing with clarity.',
  description:
    'Premier academic and research writing consultancy in English and Hindi. Research papers, doctoral dissertations, books, articles, and Turnitin reports. Founded in Kolkata.',
};

const SERVICES = [
  {
    icon: <ResearchPaperRealIcon className="w-12 h-12" />,
    title: 'Research Paper Writing',
    desc: 'IEEE, Springer, Elsevier standard manuscripts with structured methodology, experiments, and citations in English & Hindi.',
    href: '/quote?service=RESEARCH_PAPER',
  },
  {
    icon: <ThesisRealIcon className="w-12 h-12" />,
    title: 'Thesis & Dissertation',
    desc: 'Master and Doctoral thesis drafting from literature review to conclusion, with optional computational model implementation.',
    href: '/quote?service=THESIS',
  },
  {
    icon: <BookRealIcon className="w-12 h-12" />,
    title: 'Book Writing (100–300 Pages)',
    desc: 'Full-length scholarly book manuscripts, edited volumes, monographs, and book chapters formatted for ISBN publication.',
    href: '/quote?service=BOOK',
  },
  {
    icon: <ResearchPaperRealIcon className="w-12 h-12" />,
    title: 'Review Papers',
    desc: 'Systematic literature reviews and bibliometric surveys mapping state-of-the-art developments across your discipline.',
    href: '/quote?service=REVIEW_PAPER',
  },
  {
    icon: <SynopsisRealIcon className="w-12 h-12" />,
    title: 'Article Writing',
    desc: 'Expertly researched academic, journal, and thought leadership articles at verified per-word rates (₹0.60–0.80/word).',
    href: '/quote?service=ARTICLE',
  },
  {
    icon: <PresentationRealIcon className="w-12 h-12" />,
    title: 'Academic PPT & Defense',
    desc: 'Engaging, professional thesis defense and conference presentation slide decks (₹120–170 per slide).',
    href: '/quote?service=PPT',
  },
  {
    icon: <CodeModelRealIcon className="w-12 h-12" />,
    title: 'Model & Code Implementation',
    desc: 'Machine learning, deep learning (PyTorch, TensorFlow), Python, and MATLAB code implementation with reproducible benchmarks.',
    href: '/quote?service=MODEL',
  },
  {
    icon: <SynopsisRealIcon className="w-12 h-12" />,
    title: 'Synopsis & Research Proposals',
    desc: 'Crisp, defensible research synopses for PhD registrations, grant applications, and institutional committees.',
    href: '/quote?service=SYNOPSIS',
  },
  {
    icon: <TurnitinShieldLogo className="w-12 h-12" />,
    title: 'Turnitin AI & Plagiarism Reports',
    desc: 'Instructor-tier Turnitin verification audits checking similarity index and AI writing percentages at fixed ₹200/file.',
    href: '/quote?type=TURNITIN',
  },
];

const WORKFLOW_STEPS = [
  {
    num: '01',
    icon: <Step1Icon className="w-7 h-7" />,
    title: 'Project Consultation',
    desc: 'Share your discipline, word count, rubric, and timeline via our instant quotation engine or our local AI assistant.',
  },
  {
    num: '02',
    icon: <Step2Icon className="w-7 h-7" />,
    title: 'Deterministic Quotation',
    desc: 'Receive an immediate, transparent estimate calculated on our verified internal schedule. Zero surprise costs.',
  },
  {
    num: '03',
    icon: <Step3Icon className="w-7 h-7" />,
    title: 'Expert Drafting',
    desc: 'Domain researchers draft your manuscript or develop code with strict adherence to IEEE, APA, or university guidelines.',
  },
  {
    num: '04',
    icon: <Step4Icon className="w-7 h-7" />,
    title: 'Turnitin Audit & Handover',
    desc: 'Full originality and AI verification audit completed. Download your deliverables directly from your client portal.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen text-center">

      {/* ─── Hero Section with 3D Holographic Aura ───────────────────────── */}
      <section
        className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 text-white text-center"
        style={{
          background: 'radial-gradient(circle at 50% 20%, #172A66 0%, #0A1128 60%, #050814 100%)',
        }}
      >
        {/* Futuristic 3D Lighting Orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-orange-600/20 via-amber-500/15 to-blue-600/15 rounded-full blur-3xl pointer-events-none animate-holo-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Heading, Assurances, CTAs, Trust Pills (Centered) */}
            <div className="lg:col-span-7 flex flex-col items-center text-center">

              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md mb-5 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
                  Academic Research &amp; Writing Hub • Kolkata
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-3 text-center">
                InkMonk <span className="gradient-saffron-text">Research</span>
              </h1>

              {/* Distinctive Subtitle */}
              <p className="text-xl sm:text-2xl font-serif italic text-amber-200/90 font-bold mb-4 text-center">
                &ldquo;Research with care. Writing with clarity.&rdquo;
              </p>

              {/* Assurance Ribbon with Real Shield Logo */}
              <div className="inline-flex items-center gap-2.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-6 shadow-md backdrop-blur-sm">
                <TurnitinShieldLogo className="w-5 h-5" />
                <span>We assure AI to be 0% and Plagiarism less than 10%</span>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 text-center font-bold">
                Premier academic research and publication services in <strong className="text-white font-extrabold">English</strong> and <strong className="text-white font-extrabold">Hindi</strong>. High-impact research papers, doctoral theses, books, and Turnitin audits delivered by qualified domain specialists.
              </p>

              {/* Primary Call to Actions */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 w-full">
                <Link
                  href="/quote"
                  className="btn-primary-glow text-base font-bold shadow-xl w-full sm:w-auto"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Calculate Your Free Quote →
                </Link>

                <Link
                  href="/chat"
                  className="btn-secondary-dark text-base font-bold w-full sm:w-auto"
                >
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Consult AI Assistant (Local)
                </Link>
              </div>

              {/* Trust Indicators with Real Badges */}
              <div className="grid grid-cols-3 gap-3.5 max-w-lg mx-auto w-full">
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md text-center flex flex-col items-center">
                  <UkFlagLogo className="w-7 h-7 mb-1" />
                  <div className="text-orange-300 font-bold text-sm">English</div>
                  <div className="text-[10px] text-slate-300 font-bold">Tech &amp; Non-Tech</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md text-center flex flex-col items-center">
                  <IndiaFlagLogo className="w-7 h-7 mb-1" />
                  <div className="text-orange-300 font-bold text-sm">Hindi</div>
                  <div className="text-[10px] text-slate-300 font-bold">Tech &amp; Non-Tech</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md text-center flex flex-col items-center">
                  <TurnitinShieldLogo className="w-7 h-7 mb-1" />
                  <div className="text-amber-300 font-bold text-sm">Turnitin</div>
                  <div className="text-[10px] text-slate-300 font-bold">AI &amp; Plag Check</div>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Holographic Circular Logo */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative animate-3d-float">
                {/* Ambient Glow */}
                <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-orange-500/30 to-amber-500/30 blur-2xl animate-holo-glow" />

                {/* Circular Logo Container with 3D Bevel */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-white border-4 border-amber-400 shadow-2xl overflow-hidden flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="InkMonk Research Official Circular Logo"
                    fill
                    sizes="(max-width: 768px) 288px, 384px"
                    className="object-contain !p-10 sm:!p-12 lg:!p-14"
                    priority
                  />
                </div>

                {/* 3D Floating Badges */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0A1128] text-white border border-amber-400/50 text-xs font-bold px-4 py-1.5 rounded-xl shadow-2xl flex items-center gap-2">
                  <ResearchPaperRealIcon className="w-4 h-4" />
                  <span>Pure Scholarship</span>
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-700 text-white border border-emerald-400/50 text-xs font-bold px-4 py-1.5 rounded-xl shadow-2xl flex items-center gap-2">
                  <TurnitinShieldLogo className="w-4 h-4" />
                  <span>0% AI • Plag &lt; 10%</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3 Primary Pillars (English & Hindi Specialists) ─────────────── */}
      <section className="py-20 px-4 bg-white text-center" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-pill-gold mb-3">Academic Scope</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1128] mb-4 text-center">
              Comprehensive Scholarly Solutions
            </h2>
            <p className="text-slate-600 text-base sm:text-lg text-center">
              Tailored specifically to international publishing guidelines, doctoral requirements, and institutional rubrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* English Card (English Specialists) */}
            <div className="card-futuristic-3d p-8 flex flex-col justify-between border-t-4 border-t-[#1A2B6D] text-center relative">
              <span className="absolute top-4 right-4 bg-[#1A2B6D] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase shadow">
                English Specialists
              </span>
              <div>
                <div className="flex justify-center mb-4">
                  <UkFlagLogo className="w-16 h-16" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0A1128] mb-2 text-center">English Services</h3>
                <p className="text-slate-600 text-sm mb-6 text-center">
                  Technical and non-technical manuscripts formatted to IEEE, Springer, Elsevier, APA, Harvard, and UGC standards.
                </p>
                {/* BULLETS: Left-aligned inside centered card container */}
                <div className="max-w-xs mx-auto mb-8">
                  <ul className="space-y-2.5 text-sm text-slate-700 text-left">
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Research &amp; Review Papers (Up to 10k words)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Full Thesis (with or without Model)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Book Writing (100, 200, 300 pages)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Articles (₹0.60–0.70/word)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Academic Presentations (₹120–150/slide)
                    </li>
                  </ul>
                </div>
              </div>
              <Link href="/quote?lang=EN" className="btn-primary-glow text-sm w-full text-center">
                Configure English Quote →
              </Link>
            </div>

            {/* Hindi Card (Hindi Specialists) */}
            <div className="card-futuristic-3d p-8 flex flex-col justify-between border-t-4 border-t-orange-500 text-center relative">
              <span className="absolute top-4 right-4 bg-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase shadow">
                Hindi Specialists
              </span>
              <div>
                <div className="flex justify-center mb-4">
                  <IndiaFlagLogo className="w-16 h-16" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0A1128] mb-2 text-center">Hindi Services</h3>
                <p className="text-slate-600 text-sm mb-6 text-center">
                  Authentic scholarly Hindi led by Sampreeti Mukherjee with standardized Devanagari vocabulary and grammatical precision.
                </p>
                {/* BULLETS: Left-aligned inside centered container */}
                <div className="max-w-xs mx-auto mb-8">
                  <ul className="space-y-2.5 text-sm text-slate-700 text-left">
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Shodh Patra / Research Papers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Shodh Prabandh / Complete Thesis
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Book Manuscripts (100–300 pages)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Articles (₹0.75–0.80/word)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Devanagari Slides (₹150–170/slide)
                    </li>
                  </ul>
                </div>
              </div>
              <Link href="/quote?lang=HI" className="btn-primary-glow text-sm w-full text-center">
                Configure Hindi Quote →
              </Link>
            </div>

            {/* Turnitin Card */}
            <div className="card-futuristic-3d p-8 flex flex-col justify-between border-t-4 border-t-slate-800 text-center relative">
              <span className="absolute top-4 right-4 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase shadow">
                Verified Originality
              </span>
              <div>
                <div className="flex justify-center mb-4">
                  <TurnitinShieldLogo className="w-16 h-16" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0A1128] mb-2 text-center">Turnitin Reports</h3>
                <p className="text-slate-600 text-sm mb-6 text-center">
                  Instructor-grade originality and AI writing detection report without saving your file to public repositories.
                </p>
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 mb-6 text-center">
                  <div className="text-xs text-orange-700 font-bold uppercase tracking-wider">Fixed Flat Fee</div>
                  <div className="font-serif text-3xl font-extrabold text-[#0A1128]">₹200</div>
                  <div className="text-xs text-slate-500">per file scanned • rapid delivery</div>
                </div>
                {/* BULLETS: Left-aligned inside centered container */}
                <div className="max-w-xs mx-auto mb-8">
                  <ul className="space-y-2.5 text-sm text-slate-700 text-left">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span> Assured 0% AI Writing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span> Assured Plagiarism &lt; 10%
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Clickable Web &amp; Journal Matches
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span> Safe Non-Repository Protocol
                    </li>
                  </ul>
                </div>
              </div>
              <Link href="/quote?type=TURNITIN" className="btn-primary-glow text-sm w-full text-center">
                Order Turnitin Scan →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9-Service Grid with Real High-Def Visual Icons ───────────────── */}
      <section className="py-20 px-4 bg-[#F5F2EC] text-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-pill-gold mb-3">Service Catalogue</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1128] mb-4 text-center">
              Explore Our Specific Capabilities
            </h2>
            <p className="text-slate-600 text-base text-center">
              From an academic synopsis to complete machine learning architectures and multi-volume books.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="card-futuristic-3d p-7 flex flex-col justify-between text-center items-center group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#0A1128] group-hover:text-orange-600 transition-colors mb-2 text-center">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 text-center">
                    {s.desc}
                  </p>
                </div>
                <div className="text-xs font-bold text-orange-600 flex items-center justify-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Get Quote</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Redesigned 3D Futuristic 1, 2, 3, 4 Steps Section ─────────────── */}
      <section className="py-20 px-4 bg-white text-center" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-pill-gold mb-3">Clear Process</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1128] mb-4 text-center">
              How InkMonk Delivers Excellence
            </h2>
            <p className="text-slate-600 text-base text-center">
              A transparent, 4-stage pipeline that ensures scholarly rigor and zero guesswork.
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

          <div className="text-center mt-12">
            <Link href="/how-it-works" className="btn-primary-glow">
              Explore Complete Methodology →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Founders Section ────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#F5F2EC] text-center" id="about">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge-pill-gold mb-3">Academic Leadership</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1128] mb-4 text-center">
              Led by Dedicated Scholars
            </h2>
            <p className="text-slate-600 text-base text-center">
              Every project is directly overseen by our directors to ensure rigorous standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-futuristic-3d p-8 text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#0A1128] text-white font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 border-4 border-amber-400 shadow-xl">
                TR
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0A1128] text-center">Tuhit Roy</h3>
              <p className="text-orange-600 font-semibold text-xs uppercase tracking-wider mb-4 text-center">
                Founder &amp; Research Director
              </p>
              <p className="text-slate-600 text-sm leading-relaxed text-center">
                Directs technical research architectures, AI/ML computational implementations, and IEEE/Scopus manuscript structuring.
              </p>
            </div>

            <div className="card-futuristic-3d p-8 text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-orange-600 text-white font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 border-4 border-amber-400 shadow-xl">
                SM
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0A1128] text-center">Sampreeti Mukherjee</h3>
              <p className="text-orange-600 font-semibold text-xs uppercase tracking-wider mb-4 text-center">
                Co-Founder &amp; Editorial Director
              </p>
              <p className="text-slate-600 text-sm leading-relaxed text-center">
                Leads academic editorial refinement, client consultations, and our specialized Hindi research and dissertation division.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Redesigned 3D Futuristic Office & Contact Section ────────────── */}
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
              Serving researchers across all Indian universities and international institutions. Visits by appointment.
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

    </div>
  );
}
