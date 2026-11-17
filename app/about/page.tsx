import Link from 'next/link';
import {
  LocationRealIcon,
  TurnitinShieldLogo,
  AcademicLabCrestLogo,
  GoogleScholarRealIcon,
  IeeeXploreRealIcon,
  GitHubRealIcon,
  NdaShieldIcon,
  AuditTrailIcon,
} from '@/components/RealIcons';
import { Interactive3DCard } from '@/components/FuturisticScrollExperience';

export const metadata = {
  title: 'About Us — Academic Research Directorate | InkMonk Research',
  description: 'Learn about InkMonk Research, our academic research laboratory, directors Tuhit Roy and Sampreeti Mukherjee, and our headquarters in Kolkata, West Bengal.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] text-slate-900 dark:text-[#F8FAFC] py-20 px-4 text-center transition-colors duration-300 selection:bg-sky-500 selection:text-white">
      <div className="max-w-5xl mx-auto">

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-pill-gold mb-3 font-mono">OUR SCHOLARLY MISSION</div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 text-center">
            About InkMonk Research
          </h1>
          <p className="text-sky-700 dark:text-cyan-400 font-serif italic text-2xl mb-4 text-center font-bold">
            &ldquo;Research with care. Writing with clarity.&rdquo;
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg text-center leading-relaxed font-normal">
            InkMonk Research was established to bridge rigorous empirical investigation with meticulous editorial craftsmanship. We support doctoral scholars, university faculties, and postgraduates across India and abroad in translating complex ideas into peer-recognized publications.
          </p>
        </div>

        {/* Research Lab Crest & Ethical Integrity Standard */}
        <div className="card-futuristic-3d p-8 md:p-12 mb-16 text-center border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#080E1E] shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 text-xs font-mono font-bold px-3 py-1 rounded-full mb-3">
                <TurnitinShieldLogo className="w-4 h-4" />
                <span>COPE Ethics Compliant • Zero Essay Mills</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 text-center md:text-left">
                The InkMonk Academic Standard
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 text-center md:text-left">
                The name <strong>InkMonk</strong> represents the focused, disciplined intellectual devotion of a scholarly monk coupled with the analytical precision of the modern researcher&apos;s pen.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 text-center md:text-left">
                We strictly separate <strong>ethical consultation, language normalization, and reproducible code validation</strong> from ghostwriting shortcuts. Our laboratory operates strictly under Committee on Publication Ethics (COPE) principles: ensuring genuine intellectual authorship, verifiable benchmark reproducibility, and transparent citation attribution.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed text-center md:text-left">
                Every project is backed by a <strong>Pre-Signed Mutual Non-Disclosure Agreement (NDA)</strong> guaranteeing that all raw survey datasets, unpublished hypotheses, and thesis drafts remain the 100% exclusive intellectual property of the researcher.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-72 h-72 rounded-3xl bg-slate-50 dark:bg-[#060B18] p-6 flex flex-col items-center justify-center border-2 border-sky-400 dark:border-cyan-400 shadow-md dark:shadow-[0_0_35px_rgba(6,182,212,0.35)] animate-3d-float">
                <AcademicLabCrestLogo className="w-48 h-48 drop-shadow-xl" />
                <span className="text-xs font-mono text-sky-800 dark:text-cyan-300 font-bold mt-2">
                  OFFICIAL RESEARCH SEAL
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Directorate & Verifiable Academic Credentials */}
        <div className="mb-16 text-center">
          <div className="text-center mb-10">
            <div className="badge-pill-gold mb-3 font-mono">ACADEMIC DIRECTORATE</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center">
              Meet the Academic Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tuhit Roy */}
            <Interactive3DCard glowColor="cyan">
              <div className="card-futuristic-3d p-8 flex flex-col items-center text-center justify-between h-full">
                <div>
                  <div className="w-24 h-24 rounded-full bg-[#060B18] text-cyan-300 font-serif font-bold text-3xl flex items-center justify-center mb-4 shadow-xl border-2 border-cyan-400">
                    TR
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-1 text-center">Tuhit Roy</h3>
                  <div className="text-cyan-400 font-mono font-bold text-xs uppercase tracking-wider mb-4 text-center">
                    Founder &amp; Research Director
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed text-center mb-6">
                    Tuhit Roy spearheads computational research architectures, deep learning model implementations (PyTorch, CUDA, TensorFlow), and IEEE/Scopus manuscript structuring. He specializes in reproducible benchmark design and automated algorithmic verification.
                  </p>
                </div>

                {/* Verifiable Links */}
                <div className="w-full pt-4 border-t border-slate-800 flex items-center justify-center gap-4">
                  <a
                    href="https://scholar.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    <GoogleScholarRealIcon className="w-4 h-4" />
                    <span>Google Scholar</span>
                  </a>
                  <a
                    href="https://ieeexplore.ieee.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    <IeeeXploreRealIcon className="w-4 h-4" />
                    <span>IEEE Xplore</span>
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
              <div className="card-futuristic-3d p-8 flex flex-col items-center text-center justify-between h-full">
                <div>
                  <div className="w-24 h-24 rounded-full bg-[#060B18] text-emerald-300 font-serif font-bold text-3xl flex items-center justify-center mb-4 shadow-xl border-2 border-emerald-400">
                    SM
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-1 text-center">Sampreeti Mukherjee</h3>
                  <div className="text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider mb-4 text-center">
                    Co-Founder &amp; Editorial Director
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed text-center mb-6">
                    Sampreeti Mukherjee oversees qualitative editorial standards, humanities peer-review consultations, and our specialized Hindi research and dissertation division. She ensures standardized Devanagari terminology and Shodhganga alignment.
                  </p>
                </div>

                {/* Badges */}
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

        {/* Location & Presence */}
        <div className="bg-[#060B18] border border-cyan-500/30 rounded-3xl p-8 md:p-12 text-white shadow-2xl text-center relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-cyan-950/70 border border-cyan-400/40 px-4 py-1.5 rounded-full mb-4">
              <LocationRealIcon className="w-4 h-4" />
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                Physical Presence in Kolkata
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-3 text-center">
              Karunamoyee, Salt Lake Sector 2
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-8 text-center font-medium">
              Serving researchers across all Indian universities and international institutions. In-person appointments welcome.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary-glow text-sm font-mono">
                Schedule a Visit or Consultation →
              </Link>
              <Link href="/quote" className="btn-secondary-dark text-sm font-mono">
                Calculate Free Quote →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
