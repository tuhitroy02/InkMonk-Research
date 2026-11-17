import Image from 'next/image';
import Link from 'next/link';
import { LocationRealIcon, TurnitinShieldLogo } from '@/components/RealIcons';

export const metadata = {
  title: 'About Us — InkMonk Research',
  description: 'Learn about InkMonk Research, our academic philosophy, founders Tuhit Roy and Sampreeti Mukherjee, and our headquarters in Kolkata, West Bengal.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9F7F4] py-16 px-4 text-center">
      <div className="max-w-5xl mx-auto">

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-pill-gold mb-3">Our Story &amp; Philosophy</div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0A1128] mb-4 text-center">
            About InkMonk Research
          </h1>
          <p className="text-orange-600 font-serif italic text-2xl mb-4 text-center">
            &ldquo;Research with care. Writing with clarity.&rdquo;
          </p>
          <p className="text-slate-600 text-base sm:text-lg text-center leading-relaxed">
            InkMonk Research was established to bridge academic rigor with meticulous editorial craftsmanship. We support researchers, scholars, and professionals across India and abroad in translating complex ideas into peer-recognized publications.
          </p>
        </div>

        {/* Brand Meaning & Mascot */}
        <div className="card-futuristic-3d p-8 md:p-12 mb-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1128] mb-4 text-center md:text-left">
                The InkMonk Philosophy
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed mb-4 text-center md:text-left">
                The name <strong>InkMonk</strong> embodies two eternal qualities: the focused, disciplined contemplation of a monk and the precision of the scholar&apos;s pen.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-4 text-center md:text-left">
                Our emblem—a scholar monk adorned with an academic cap holding a classic fountain pen—reflects our commitment to scholarly enlightenment, deliberate patience, and unyielding intellectual honesty.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed text-center md:text-left">
                Whether structuring an IEEE machine learning investigation or composing a doctoral thesis in standard Devanagari Hindi, our methodology remains grounded in authentic scholarship.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64 rounded-full bg-[#0A1128] p-6 flex items-center justify-center border-4 border-amber-400 shadow-2xl animate-3d-float">
                <Image
                  src="/logo.png"
                  alt="InkMonk Research Official Mascot"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Founders */}
        <div className="mb-16 text-center">
          <div className="text-center mb-10">
            <div className="badge-pill-gold mb-3">Academic Leadership</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1128] text-center">
              Meet the Founders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-futuristic-3d p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-[#0A1128] text-white font-serif font-bold text-3xl flex items-center justify-center mb-6 shadow-xl border-4 border-amber-400">
                TR
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0A1128] mb-1 text-center">Tuhit Roy</h3>
              <div className="text-orange-600 font-bold text-xs uppercase tracking-wider mb-4 text-center">
                Founder &amp; Research Director
              </div>
              <p className="text-slate-600 text-sm leading-relaxed text-center">
                Tuhit Roy spearheads academic methodologies, computational research initiatives, and technical paper structuring at InkMonk Research. With deep insight into contemporary peer-review expectations, he ensures every project meets high publishing standards.
              </p>
            </div>

            <div className="card-futuristic-3d p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-orange-600 text-white font-serif font-bold text-3xl flex items-center justify-center mb-6 shadow-xl border-4 border-amber-400">
                SM
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0A1128] mb-1 text-center">Sampreeti Mukherjee</h3>
              <div className="text-orange-600 font-bold text-xs uppercase tracking-wider mb-4 text-center">
                Co-Founder &amp; Editorial Director
              </div>
              <p className="text-slate-600 text-sm leading-relaxed text-center">
                Sampreeti Mukherjee oversees editorial standards, linguistic accuracy, client consultations, and the specialized Hindi research and publication division. She is dedicated to authentic academic expression and nuanced prose.
              </p>
            </div>
          </div>
        </div>

        {/* Location & Presence */}
        <div className="bg-midnight rounded-3xl p-8 md:p-12 text-white shadow-2xl text-center relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center">
            <LocationRealIcon className="w-12 h-12 mb-3" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-3 text-center">
              Based in the Intellectual Capital of Kolkata
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm leading-relaxed mb-6 text-center">
              Our physical operations are situated in Karunamoyee, Salt Lake Sector 2, Kolkata—a premier academic and technological hub. We serve clients across all Indian states and overseas universities.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs text-white/90 border border-white/20 mb-8">
              <span>Karunamoyee, Sector 2, Salt Lake, Kolkata 700091, West Bengal</span>
            </div>
            <div>
              <Link href="/contact" className="btn-primary-glow">
                Get in Touch with our Directors →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
