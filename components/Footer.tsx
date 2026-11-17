import Link from 'next/link';
import Image from 'next/image';
import {
  LocationRealIcon,
  EmailRealIcon,
  WhatsAppRealIcon,
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
    <footer className="bg-[#050814] text-white border-t border-slate-800 text-center">

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3 text-center">
            Ready to Begin Your Research Project?
          </h2>
          <p className="text-white/95 text-base max-w-xl mx-auto mb-6 text-center">
            &ldquo;Research with care. Writing with clarity.&rdquo; Let our specialized team assist your academic journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="bg-white text-[#0A1128] hover:bg-slate-100 font-bold px-7 py-3 rounded-full text-sm shadow-xl transition-all"
            >
              Get an Instant Quote →
            </Link>
            <a
              href="https://wa.me/917980470880"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/30 hover:bg-black/40 text-white border border-white/30 font-bold px-7 py-3 rounded-full text-sm transition-all flex items-center gap-2"
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
              <div className="relative w-11 h-11 rounded-2xl bg-white p-1">
                <Image src="/logo.png" alt="InkMonk Logo" fill sizes="44px" className="object-contain" />
              </div>
              <div className="text-left">
                <div className="font-serif font-bold text-xl leading-none">InkMonk Research</div>
                <div className="text-xs text-orange-400 font-medium mt-1">Research with care. Writing with clarity.</div>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm text-center md:text-left">
              Professional research paper drafting, doctoral thesis structuring, book writing, and Turnitin audits in English and Hindi.
            </p>

            <div className="text-xs text-slate-400 space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5">
                <LocationRealIcon className="w-5 h-5 shrink-0" />
                <span>Karunamoyee, Sector 2, Salt Lake, Kolkata 700091, West Bengal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <EmailRealIcon className="w-5 h-5 shrink-0" />
                <a href="mailto:inkmonkresearch@gmail.com" className="hover:text-white transition-colors">
                  inkmonkresearch@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppRealIcon className="w-5 h-5 shrink-0" />
                <a href="tel:+917980470880" className="hover:text-white transition-colors">
                  +91 7980470880
                </a>
              </div>
            </div>
          </div>

          {/* Footer Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <div className="font-serif font-bold text-sm text-white uppercase tracking-wider">{title}</div>
              <ul className="space-y-2 text-xs text-slate-400">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-orange-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 text-center">
          <div>
            &copy; {year} InkMonk Research. All rights reserved. Directed by <strong>Tuhit Roy</strong> &amp; <strong>Sampreeti Mukherjee</strong>.
          </div>
          <div className="text-slate-500">
            Kolkata, West Bengal • Academic Non-Disclosure Guaranteed
          </div>
        </div>
      </div>

    </footer>
  );
}
