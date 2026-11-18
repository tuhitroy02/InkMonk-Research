import Link from 'next/link';
import HorizontalHowItWorks from '@/components/HorizontalHowItWorks';
import {
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
    <div className="min-h-screen bg-notebook-grid text-slate-900 py-16 px-4 text-center">
      
      {/* ─── Page Title (Accessible H1) ─────────────────────────────────── */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <div className="inline-block bg-orange-100 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-orange-200">
          METHODOLOGY &amp; DELIVERY ROADMAP
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 mb-3 text-center">
          How InkMonk Research Works
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-medium">
          Our verified 5-stage academic pipeline with 4-installment milestone escrow (25% each), doctoral drafting, and safe non-repository Turnitin audits.
        </p>
      </div>

      {/* ─── Main Horizontal Pipeline Section ──────────────────────────────── */}
      <HorizontalHowItWorks />

      {/* ─── Confidentiality & Academic Guarantee Section ─────────────────── */}
      <div className="max-w-6xl mx-auto px-4 mt-16 text-center">
        <div className="card-clay-white p-8 md:p-12 mb-12 text-center shadow-lg">
          <div className="inline-block bg-orange-100 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-orange-200">
            INSTITUTIONAL QUALITY ASSURANCE
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-black text-slate-900 mb-4 text-center">
            Our Confidentiality &amp; Academic Guarantee
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 text-center font-medium">
            Every manuscript, code repository, and survey dataset is guarded by legal NDAs, COPE ethics compliance, and non-repository Turnitin scans.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 flex flex-col items-center text-center shadow-sm">
              <NdaShieldIcon className="w-10 h-10 mb-3 text-[#2563EB]" />
              <h4 className="font-serif font-black text-slate-900 text-base mb-1 text-center">Pre-Signed Mutual NDA</h4>
              <p className="text-slate-600 text-xs font-medium leading-relaxed text-center">
                Your research topics, client data, and raw findings are protected under confidentiality agreements and never repurposed or shared.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 flex flex-col items-center text-center shadow-sm">
              <OfficialTurnitinLogo className="w-10 h-10 mb-3" />
              <h4 className="font-serif font-black text-slate-900 text-base mb-1 text-center">Safe Turnitin Audit</h4>
              <p className="text-slate-600 text-xs font-medium leading-relaxed text-center">
                Verified instructor-grade Turnitin check with complete AI writing detection without saving your file to any public or institutional repository.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 flex flex-col items-center text-center shadow-sm">
              <ThesisRealIcon className="w-10 h-10 mb-3 text-[#F95721]" />
              <h4 className="font-serif font-black text-slate-900 text-base mb-1 text-center">100% Human Peer-Reviewed</h4>
              <p className="text-slate-600 text-xs font-medium leading-relaxed text-center">
                Researched and drafted by qualified subject-matter doctoral researchers with verifiable Scopus/IEEE publishing records. Zero generic essay mills.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/quote" className="btn-clay-orange text-sm px-8 py-3.5 shadow-xl uppercase font-extrabold">
            Configure Your Project Quote →
          </Link>
        </div>
      </div>
    </div>
  );
}
