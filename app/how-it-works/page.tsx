import Link from 'next/link';
import HorizontalHowItWorks from '@/components/HorizontalHowItWorks';
import {
  TurnitinShieldLogo,
  ResearchPaperRealIcon,
  ThesisRealIcon,
  NdaShieldIcon,
  OfficialTurnitinLogo,
} from '@/components/RealIcons';

export const metadata = {
  title: 'How It Works — Horizontal Academic Pipeline | InkMonk Research',
  description: 'Explore the horizontal step-by-step academic research and writing process at InkMonk Research: from consultation and NDA to drafting, Turnitin audits, and final delivery.',
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] text-black dark:text-white py-16 px-4 text-center transition-colors duration-300 selection:bg-purple-600 selection:text-white">
      
      {/* ─── Main Horizontal Pipeline Section ──────────────────────────────── */}
      <HorizontalHowItWorks />

      {/* ─── Confidentiality & Academic Guarantee Section ─────────────────── */}
      <div className="max-w-6xl mx-auto px-4 mt-16 text-center">
        <div className="card-futuristic-3d p-8 md:p-12 mb-12 text-center bg-purple-50/20 dark:bg-[#0A0414] border border-purple-200 dark:border-purple-500/30 shadow-sm">
          <div className="badge-pill-purple mb-3 font-mono">
            INSTITUTIONAL QUALITY ASSURANCE
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 text-center">
            Our Confidentiality &amp; Academic Guarantee
          </h3>
          <p className="text-slate-600 dark:text-purple-200/80 text-sm max-w-2xl mx-auto mb-8 text-center font-normal">
            Every manuscript, code repository, and survey dataset is guarded by legal NDAs, COPE ethics compliance, and non-repository Turnitin scans.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#05020A] border border-purple-100 dark:border-purple-500/20 flex flex-col items-center text-center shadow-sm">
              <NdaShieldIcon className="w-10 h-10 mb-3" />
              <h4 className="font-bold text-black dark:text-white text-base mb-1 text-center">Pre-Signed Mutual NDA</h4>
              <p className="text-slate-600 dark:text-purple-200/70 text-xs leading-relaxed text-center">
                Your research topics, client data, and raw findings are protected under confidentiality agreements and never repurposed or shared.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#05020A] border border-purple-100 dark:border-purple-500/20 flex flex-col items-center text-center shadow-sm">
              <OfficialTurnitinLogo className="w-10 h-10 mb-3" />
              <h4 className="font-bold text-black dark:text-white text-base mb-1 text-center">Safe Turnitin Audit</h4>
              <p className="text-slate-600 dark:text-purple-200/70 text-xs leading-relaxed text-center">
                Verified instructor-grade Turnitin check with complete AI writing detection without saving your file to any public or institutional repository.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#05020A] border border-purple-100 dark:border-purple-500/20 flex flex-col items-center text-center shadow-sm">
              <ThesisRealIcon className="w-10 h-10 mb-3" />
              <h4 className="font-bold text-black dark:text-white text-base mb-1 text-center">100% Human Peer-Reviewed</h4>
              <p className="text-slate-600 dark:text-purple-200/70 text-xs leading-relaxed text-center">
                Researched and drafted by qualified subject-matter doctoral researchers with verifiable Scopus/IEEE publishing records. Zero generic essay mills.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/quote" className="btn-primary-glow text-sm px-8 py-3.5 shadow-xl font-mono uppercase">
            Configure Your Project Quote →
          </Link>
        </div>
      </div>

    </div>
  );
}
