import Link from 'next/link';
import {
  LocationRealIcon,
  EmailRealIcon,
  WhatsAppRealIcon,
  AcademicLabCrestLogo,
} from '@/components/RealIcons';

const FOOTER_LINKS = {
  Services: [
    { label: 'English Research Papers', href: '/services#english-research' },
    { label: 'Hindi Research Papers', href: '/services#hindi-research' },
    { label: 'Thesis & Dissertation', href: '/services#thesis' },
    { label: 'Book Writing (100–300 pp)', href: '/services#books' },
    { label: 'Academic Presentations', href: '/services#ppt' },
    { label: 'Turnitin Verification', href: '/services#turnitin' },
  ],
  Company: [
    { label: 'About Founders', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Redacted Samples', href: '/samples' },
    { label: 'Academic FAQ', href: '/faq' },
    { label: 'Kolkata Office', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Client Portal', href: '/login' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#030712] text-white border-t border-cyan-500/20 text-center font-sans">

      {/* Top Cyber Callout Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-950 to-teal-950 py-12 px-4 text-center border-b border-cyan-500/20 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-cyan-900/40 border border-cyan-400/40 px-3.5 py-1 rounded-full mb-3 text-[11px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
            ● CONFIDENTIAL SCHOLARLY ONBOARDING
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3 text-center">
            Ready to Begin Your Research Project?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-6 text-center font-medium">
            &ldquo;Research with care. Writing with clarity.&rdquo; Let our specialized doctoral team assist your academic journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="btn-primary-glow font-mono text-xs uppercase"
            >
              Get an Instant Quote →
            </Link>
            <a
              href="https://wa.me/917980470880"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-pill font-mono text-xs uppercase"
            >
              <WhatsAppRealIcon className="w-5 h-5" />
              <span>WhatsApp Us (+91 7980470880)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-center md:text-left">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl bg-[#060B18] border border-cyan-400/50 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <AcademicLabCrestLogo className="w-10 h-10" />
              </div>
              <div className="text-left">
                <div className="font-serif font-bold text-xl leading-none text-white">InkMonk Research</div>
                <div className="text-xs text-cyan-300 font-medium mt-1">Research with care. Writing with clarity.</div>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm text-center md:text-left">
              Professional research paper drafting, doctoral thesis structuring, book writing, and Turnitin audits in English and Hindi.
            </p>

            <div className="text-xs text-slate-300 space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5">
                <LocationRealIcon className="w-5 h-5 shrink-0" />
                <span>Karunamoyee, Sector 2, Salt Lake, Kolkata 700091, West Bengal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <EmailRealIcon className="w-5 h-5 shrink-0" />
                <a href="mailto:inkmonkresearch@gmail.com" className="hover:text-cyan-300 transition-colors">
                  inkmonkresearch@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppRealIcon className="w-5 h-5 shrink-0" />
                <a href="tel:+917980470880" className="hover:text-cyan-300 transition-colors">
                  +91 7980470880
                </a>
              </div>
            </div>
          </div>

          {/* Footer Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <div className="font-mono font-bold text-xs text-cyan-400 uppercase tracking-widest">{title}</div>
              <ul className="space-y-2 text-xs text-slate-400">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-cyan-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 text-center font-mono">
          <div>
            &copy; {year} INKMONK RESEARCH. DIRECTED BY <strong className="text-slate-300">TUHIT ROY</strong> &amp; <strong className="text-slate-300">SAMPREETI MUKHERJEE</strong>.
          </div>
          <div className="text-cyan-400/80">
            KOLKATA, WEST BENGAL • ACADEMIC MUTUAL NDA PROTOCOL VERIFIED
          </div>
        </div>
      </div>

    </footer>
  );
}
