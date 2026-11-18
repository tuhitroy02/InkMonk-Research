import Link from 'next/link';
import Image from 'next/image';
import {
  LocationRealIcon,
  TurnitinShieldLogo,
  AcademicLabCrestLogo,
  GoogleScholarRealIcon,
  IeeeXploreRealIcon,
  GitHubRealIcon,
} from '@/components/RealIcons';

export const metadata = {
  title: 'About Us — Academic Research Directorate | InkMonk Research',
  description: 'Learn about InkMonk Research, our academic research laboratory, directors Tuhit Roy and Sampreeti Mukherjee, and our headquarters in Kolkata, West Bengal.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-notebook-grid text-slate-900 py-20 px-4 text-center">
      <div className="max-w-5xl mx-auto">

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-orange-100 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-orange-200">
            OUR SCHOLARLY MISSION
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-black text-slate-900 mb-4 text-center">
            About InkMonk Research
          </h1>
          <p className="text-[#F95721] font-serif italic text-2xl sm:text-3xl mb-4 text-center font-bold">
            &ldquo;Research with care. Writing with clarity.&rdquo;
          </p>
          <p className="text-slate-600 text-base sm:text-lg text-center leading-relaxed font-medium">
            InkMonk Research was established to bridge rigorous empirical investigation with meticulous editorial craftsmanship. We support doctoral scholars, university faculties, and postgraduates across India and abroad in translating complex ideas into peer-recognized publications.
          </p>
        </div>

        {/* Research Lab Crest & Ethical Integrity Standard */}
        <div className="card-clay-white p-8 md:p-12 mb-16 text-center shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-50 text-[#F95721] border border-orange-200 text-xs font-black px-3 py-1 rounded-full mb-3">
                <TurnitinShieldLogo className="w-4 h-4" />
                <span>COPE Ethics Compliant • Zero Essay Mills</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-black text-slate-900 mb-4 text-center md:text-left">
                The InkMonk Academic Standard
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 text-center md:text-left font-medium">
                The name <strong>InkMonk</strong> represents the focused, disciplined intellectual devotion of a scholarly monk coupled with the analytical precision of the modern researcher&apos;s pen.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 text-center md:text-left font-medium">
                We strictly separate <strong>ethical consultation, language normalization, and reproducible code validation</strong> from ghostwriting shortcuts. Our laboratory operates strictly under Committee on Publication Ethics (COPE) principles: ensuring genuine intellectual authorship, verifiable benchmark reproducibility, and transparent citation attribution.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed text-center md:text-left font-medium">
                Every project is backed by a <strong>Pre-Signed Mutual Non-Disclosure Agreement (NDA)</strong> guaranteeing that all raw survey datasets, unpublished hypotheses, and thesis drafts remain the 100% exclusive intellectual property of the researcher.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-72 h-72 rounded-3xl bg-white p-6 flex flex-col items-center justify-center border-2 border-slate-200 shadow-md">
                <Image
                  src="/logo.png"
                  alt="Official InkMonk Research Logo"
                  width={240}
                  height={240}
                  className="w-48 h-48 object-contain rounded-2xl drop-shadow-md"
                  unoptimized
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
                <span className="text-xs font-black text-[#2563EB] uppercase mt-2 tracking-wider">
                  OFFICIAL RESEARCH SEAL
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Directorate & Verifiable Academic Credentials */}
        <div className="mb-16 text-center">
          <div className="text-center mb-10">
            <div className="inline-block bg-blue-100 text-[#2563EB] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-blue-200">
              ACADEMIC DIRECTORATE
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 text-center">
              Meet the Academic Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tuhit Roy */}
            <div className="card-clay-white p-8 flex flex-col items-center text-center justify-between h-full shadow-md">
              <div>
                <div className="w-24 h-24 rounded-full bg-orange-50 text-[#F95721] font-serif font-black text-3xl flex items-center justify-center mb-4 shadow-md border-2 border-orange-200">
                  TR
                </div>
                <h3 className="font-serif text-2xl font-black text-slate-900 mb-1 text-center">Tuhit Roy</h3>
                <div className="text-[#F95721] font-black text-xs uppercase tracking-wider mb-4 text-center">
                  Founder &amp; Research Director
                </div>
                <p className="text-slate-600 text-sm leading-relaxed text-center mb-6 font-medium">
                  Tuhit Roy spearheads computational research architectures, deep learning model implementations (PyTorch, CUDA, TensorFlow), and IEEE/Scopus manuscript structuring. He specializes in reproducible benchmark design and automated algorithmic verification.
                </p>
              </div>

              {/* Verifiable Links */}
              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-center gap-4">
                <a
                  href="https://github.com/tuhitroy02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-black font-bold transition-colors"
                >
                  <GitHubRealIcon className="w-4 h-4" />
                  <span>GitHub Profile (@tuhitroy02)</span>
                </a>
              </div>
            </div>

            {/* Sampreeti Mukherjee */}
            <div className="card-clay-white p-8 flex flex-col items-center text-center justify-between h-full shadow-md">
              <div>
                <div className="w-24 h-24 rounded-full bg-blue-50 text-[#2563EB] font-serif font-black text-3xl flex items-center justify-center mb-4 shadow-md border-2 border-blue-200">
                  SM
                </div>
                <h3 className="font-serif text-2xl font-black text-slate-900 mb-1 text-center">Sampreeti Mukherjee</h3>
                <div className="text-[#2563EB] font-black text-xs uppercase tracking-wider mb-4 text-center">
                  Co-Founder &amp; Editorial Director
                </div>
                <p className="text-slate-600 text-sm leading-relaxed text-center mb-6 font-medium">
                  Sampreeti Mukherjee oversees qualitative editorial standards, humanities peer-review consultations, and our specialized Hindi research and dissertation division. She ensures standardized Devanagari terminology and Shodhganga alignment.
                </p>
              </div>

              {/* Badges */}
              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-700 font-bold">
                <span className="flex items-center gap-1">
                  <span className="text-[#2563EB] font-bold">◆</span>
                  <span>UGC-CARE Standards</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="text-[#F95721] font-bold">◆</span>
                  <span>Comparative Literature</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Presence */}
        <div className="card-clay-white p-8 md:p-12 text-slate-900 shadow-xl text-center relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-full mb-4">
              <LocationRealIcon className="w-4 h-4 text-[#F95721]" />
              <span className="text-xs font-black text-[#F95721] uppercase tracking-widest">
                Physical Presence in Kolkata
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-black mb-3 text-center">
              Karunamoyee, Salt Lake Sector 2
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-8 text-center font-medium">
              Serving researchers across all Indian universities and international institutions. In-person appointments welcome.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-clay-orange text-xs sm:text-sm font-bold">
                Schedule a Visit or Consultation →
              </Link>
              <Link href="/quote" className="btn-clay-white text-xs sm:text-sm font-bold">
                Calculate Free Quote →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
