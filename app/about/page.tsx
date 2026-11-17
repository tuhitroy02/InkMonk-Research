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

export const metadata = {
  title: 'About Us — Academic Research Directorate | InkMonk Research',
  description: 'Learn about InkMonk Research, our academic research laboratory, directors Tuhit Roy and Sampreeti Mukherjee, and our headquarters in Kolkata, West Bengal.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9F7F4] py-16 px-4 text-center">
      <div className="max-w-5xl mx-auto">

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-pill-gold mb-3">Our Scholarly Mission</div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0A1128] mb-4 text-center">
            About InkMonk Research
          </h1>
          <p className="text-orange-600 font-serif italic text-2xl mb-4 text-center">
            &ldquo;Research with care. Writing with clarity.&rdquo;
          </p>
          <p className="text-slate-600 text-base sm:text-lg text-center leading-relaxed font-medium">
            InkMonk Research was established to bridge rigorous empirical investigation with meticulous editorial craftsmanship. We support doctoral scholars, university faculties, and postgraduates across India and abroad in translating complex ideas into peer-recognized publications.
          </p>
        </div>

        {/* Research Lab Crest & Ethical Integrity Standard (Replaces Cartoon Mascot) */}
        <div className="card-futuristic-3d p-8 md:p-12 mb-16 text-center hud-corner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                <TurnitinShieldLogo className="w-4 h-4" />
                <span>COPE Ethics Compliant • Zero Essay Mills</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1128] mb-4 text-center md:text-left">
                The InkMonk Academic Standard
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed mb-4 text-center md:text-left">
                The name <strong>InkMonk</strong> represents the focused, disciplined intellectual devotion of a scholarly monk coupled with the analytical precision of the modern researcher&apos;s pen.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-4 text-center md:text-left">
                We strictly separate <strong>ethical consultation, language normalization, and reproducible code validation</strong> from ghostwriting shortcuts. Our laboratory operates strictly under Committee on Publication Ethics (COPE) principles: ensuring genuine intellectual authorship, verifiable benchmark reproducibility, and transparent citation attribution.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed text-center md:text-left">
                Every project is backed by a <strong>Pre-Signed Mutual Non-Disclosure Agreement (NDA)</strong> guaranteeing that all raw survey datasets, unpublished hypotheses, and thesis drafts remain the 100% exclusive intellectual property of the researcher.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-72 h-72 rounded-3xl bg-[#0A1128] p-6 flex flex-col items-center justify-center border-2 border-amber-400 shadow-2xl animate-3d-float hud-corner">
                <AcademicLabCrestLogo className="w-48 h-48 drop-shadow-2xl" />
                <span className="text-xs font-mono text-amber-300 font-bold mt-2">
                  OFFICIAL RESEARCH SEAL
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Directorate & Verifiable Academic Credentials */}
        <div className="mb-16 text-center">
          <div className="text-center mb-10">
            <div className="badge-pill-gold mb-3">Academic Directorate</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1128] text-center">
              Meet the Academic Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tuhit Roy */}
            <div className="card-futuristic-3d p-8 flex flex-col items-center text-center justify-between">
              <div>
                <div className="w-24 h-24 rounded-full bg-[#0A1128] text-white font-serif font-bold text-3xl flex items-center justify-center mb-4 shadow-xl border-4 border-amber-400">
                  TR
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0A1128] mb-1 text-center">Tuhit Roy</h3>
                <div className="text-orange-600 font-bold text-xs uppercase tracking-wider mb-4 text-center">
                  Founder &amp; Research Director
                </div>
                <p className="text-slate-600 text-sm leading-relaxed text-center mb-6">
                  Tuhit Roy spearheads computational research architectures, deep learning model implementations (PyTorch, CUDA, TensorFlow), and IEEE/Scopus manuscript structuring. He specializes in reproducible benchmark design and automated algorithmic verification.
                </p>
              </div>

              {/* Verifiable Links */}
              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-center gap-4">
                <a
                  href="https://scholar.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-blue-600 font-semibold"
                >
                  <GoogleScholarRealIcon className="w-4 h-4" />
                  <span>Google Scholar</span>
                </a>
                <a
                  href="https://ieeexplore.ieee.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-sky-600 font-semibold"
                >
                  <IeeeXploreRealIcon className="w-4 h-4" />
                  <span>IEEE Xplore</span>
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
            <div className="card-futuristic-3d p-8 flex flex-col items-center text-center justify-between">
              <div>
                <div className="w-24 h-24 rounded-full bg-orange-600 text-white font-serif font-bold text-3xl flex items-center justify-center mb-4 shadow-xl border-4 border-amber-400">
                  SM
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0A1128] mb-1 text-center">Sampreeti Mukherjee</h3>
                <div className="text-orange-600 font-bold text-xs uppercase tracking-wider mb-4 text-center">
                  Co-Founder &amp; Editorial Director
                </div>
                <p className="text-slate-600 text-sm leading-relaxed text-center mb-6">
                  Sampreeti Mukherjee oversees qualitative editorial standards, humanities peer-review consultations, and our specialized Hindi research and dissertation division. She ensures standardized Devanagari terminology and Shodhganga alignment.
                </p>
              </div>

              {/* Badges */}
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

        {/* Location & Presence */}
        <div className="bg-midnight rounded-3xl p-8 md:p-12 text-white shadow-2xl text-center relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-4">
              <LocationRealIcon className="w-4 h-4" />
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                Physical Presence in Kolkata
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-3 text-center">
              Karunamoyee, Salt Lake Sector 2
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-8 text-center">
              Serving researchers across all Indian universities and international institutions. In-person appointments welcome.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary-glow text-sm">
                Schedule a Visit or Consultation →
              </Link>
              <Link href="/quote" className="btn-secondary-dark text-sm">
                Calculate Free Quote →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
