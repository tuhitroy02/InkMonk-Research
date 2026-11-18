import type { Metadata } from 'next';
import Link from 'next/link';
import ResearchAreasSection from '@/components/ResearchAreasSection';
import FloatingLiveHelp from '@/components/FloatingLiveHelp';

export const metadata: Metadata = {
  title: 'Academic Research Areas & Disciplinary Taxonomy | InkMonk Research',
  description:
    'Explore comprehensive research areas and academic disciplines supported by InkMonk Research: STEM, Engineering, Computer Science & AI, Medicine, Natural Sciences, Social Sciences, Management, and Hindi Vernacular Studies.',
  alternates: {
    canonical: 'https://inkmonkresearch.com/research-areas',
  },
  openGraph: {
    title: 'Academic Research Areas & Disciplinary Taxonomy | InkMonk Research',
    description:
      'Subject-matter doctoral directors and researchers across every major scholarly discipline. Adhering strictly to your field’s publication ethics and citation norms.',
    url: 'https://inkmonkresearch.com/research-areas',
    siteName: 'InkMonk Research',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InkMonk Research Areas',
      },
    ],
  },
};

export default function ResearchAreasPage() {
  return (
    <main className="min-h-screen bg-notebook-grid text-slate-900 pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 rounded-full shadow-sm">
            <Link href="/" className="hover:text-[#F95721] transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-[#F95721]">RESEARCH AREAS</span>
          </div>
        </div>

        {/* Dedicated Research Areas Taxonomy & Filter Matrix */}
        <ResearchAreasSection />
      </div>

      <FloatingLiveHelp />
    </main>
  );
}
