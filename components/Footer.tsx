'use client';

import React from 'react';
import Link from 'next/link';
import InkMonkNibLogo from '@/components/InkMonkNibLogo';
import {
  LocationRealIcon,
  EmailRealIcon,
  WhatsAppRealIcon,
} from '@/components/RealIcons';

const FOOTER_LINKS = {
  Services: [
    { label: 'Research Paper Writing', href: '/services#research-paper' },
    { label: 'Thesis & Dissertation', href: '/services#thesis' },
    { label: 'Scholarly Book Writing', href: '/services#books' },
    { label: 'Review Papers (PRISMA)', href: '/services#reviews' },
    { label: 'Turnitin Originality Reports', href: '/services#turnitin' },
    { label: 'Hindi Academic Services', href: '/services#hindi' },
  ],
  Company: [
    { label: 'Who We Help', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Redacted Samples', href: '/samples' },
    { label: 'Academic FAQ', href: '/contact#faq' },
    { label: 'Kolkata Lab Office', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Client Portal Login', href: '/login' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-2 border-slate-200 text-center font-sans relative overflow-hidden select-none">

      {/* Top Academic Callout Banner */}
      <div className="bg-gradient-to-b from-blue-50/50 to-white py-14 px-4 text-center border-b border-slate-200 relative overflow-hidden">
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-full mb-3 text-xs font-bold text-[#F95721] uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F95721] animate-ping" />
            <span>CONFIDENTIAL SCHOLARLY ONBOARDING // VERIFIED PROTOCOL</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 mb-3 text-center tracking-tight">
            Ready to Begin Your Research Project?
          </h2>
          
          <p className="text-slate-600 text-base max-w-xl mx-auto mb-6 text-center font-medium leading-relaxed">
            &ldquo;Research with care. Writing with clarity.&rdquo; Let our qualified doctoral team assist your academic journey with zero stress.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="btn-clay-orange text-xs sm:text-sm uppercase font-extrabold"
            >
              Get Free Estimate →
            </Link>

            <a
              href="https://wa.me/917980470880"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-clay-white text-xs sm:text-sm uppercase font-extrabold flex items-center gap-2"
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
            <Link href="/" className="inline-block">
              <InkMonkNibLogo className="h-10" />
            </Link>

            <p className="text-slate-600 text-sm leading-relaxed max-w-sm text-center md:text-left font-medium">
              Professional research paper drafting, doctoral thesis structuring, book writing, and Turnitin audits in English and Hindi.
            </p>

            <div className="text-xs text-slate-700 space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5">
                <LocationRealIcon className="w-5 h-5 shrink-0 text-slate-500" />
                <span>Karunamoyee, Sector 2, Salt Lake, Kolkata 700091, West Bengal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <EmailRealIcon className="w-5 h-5 shrink-0 text-slate-500" />
                <a href="mailto:inkmonkresearch@gmail.com" className="hover:text-[#F95721] font-semibold transition-colors">
                  inkmonkresearch@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppRealIcon className="w-5 h-5 shrink-0 text-slate-500" />
                <a href="tel:+917980470880" className="hover:text-[#F95721] font-semibold transition-colors">
                  +91 7980470880
                </a>
              </div>
            </div>
          </div>

          {/* Footer Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <div className="font-extrabold text-xs text-slate-900 uppercase tracking-widest flex items-center gap-2 justify-center md:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F95721]" />
                <span>{title}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-[#F95721] hover:translate-x-1 inline-block transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 text-center">
          <div>
            &copy; {year} INKMONK RESEARCH. DIRECTED BY <strong className="text-slate-800">TUHIT ROY</strong> &amp; <strong className="text-slate-800">SAMPREETI MUKHERJEE</strong>.
          </div>
          <div className="flex items-center gap-2 text-slate-700 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>KOLKATA • COPE &amp; IEEE COMPLIANT • MUTUAL NDA VERIFIED</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
