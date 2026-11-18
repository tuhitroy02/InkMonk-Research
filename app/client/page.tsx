'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  TurnitinShieldLogo,
  ResearchPaperRealIcon,
  ThesisRealIcon,
  WhatsAppRealIcon,
} from '@/components/RealIcons';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

interface ScholarProfile {
  name?: string;
  gender?: string;
  qualification?: string;
  institution?: string;
  discipline?: string;
}

interface Project {
  id: string;
  title: string;
  service: string;
  language: string;
  status: 'DRAFT' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';
  progress: number;
  deadline: string;
  totalAmount: string;
  updatedAt: string;
}

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ScholarProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [projects] = useState<Project[]>([
    {
      id: 'PRJ-1082',
      title: 'Deep Learning Model & Paper on Medical Image Segmentation',
      service: 'Research Paper Writing (English Technical)',
      language: 'English',
      status: 'IN_PROGRESS',
      progress: 65,
      deadline: '15 Oct 2026',
      totalAmount: '₹34,000',
      updatedAt: 'Yesterday',
    },
    {
      id: 'PRJ-1045',
      title: 'Turnitin AI & Originality Verification Scan',
      service: 'Turnitin Plagiarism Report',
      language: 'Bilingual',
      status: 'COMPLETED',
      progress: 100,
      deadline: 'Delivered',
      totalAmount: '₹200',
      updatedAt: '2 days ago',
    },
  ]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        setUser(data.user);

        try {
          const stored = localStorage.getItem('inkmonk_scholar_profile');
          if (stored) setProfile(JSON.parse(stored));
        } catch {}
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-notebook-grid flex items-center justify-center text-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#F95721] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm font-black text-slate-800">Accessing Verified Client Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-notebook-grid py-12 px-4 text-center">
      <div className="max-w-6xl mx-auto">

        {/* 3D Holographic Portal Header */}
        <div className="card-clay-white p-6 md:p-8 mb-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-[#F95721] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-orange-200">
              <TurnitinShieldLogo className="w-4 h-4" />
              <span>Verified Scholar Portal</span>
            </div>
            <h1 className="font-serif text-3xl font-black text-slate-900">
              Welcome, {profile?.name || user?.name || 'Academic Scholar'}
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">
              Account: <strong className="text-slate-900">{user?.email}</strong>
              {user?.phone ? ` • Verified Phone: ${user.phone}` : ''}
              {profile?.institution ? ` • ${profile.institution}` : ''}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/quote" className="btn-clay-orange text-xs py-2.5 px-5 font-bold">
              + New Project Quote
            </Link>
            <button
              onClick={handleLogout}
              className="btn-clay-white text-xs font-bold text-red-600 px-4 py-2.5 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Scholar Profile Summary Banner */}
        {(profile?.qualification || profile?.discipline || user?.phone) && (
          <div className="card-clay-white p-5 mb-8 flex flex-wrap justify-around items-center gap-4 text-center">
            {profile?.qualification && (
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Degree / Qualification</div>
                <div className="text-sm font-black text-slate-900">{profile.qualification.replace('_', ' ')}</div>
              </div>
            )}
            {profile?.discipline && (
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Research Domain</div>
                <div className="text-sm font-black text-slate-900">{profile.discipline}</div>
              </div>
            )}
            {user?.phone && (
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Registered Mobile</div>
                <div className="text-sm font-black text-[#2563EB]">✓ {user.phone}</div>
              </div>
            )}
            <div className="text-center">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Authentication Status</div>
              <div className="text-sm font-black text-emerald-600">Active &amp; Confidential</div>
            </div>
          </div>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-center">
          <div className="card-clay-white p-6 flex flex-col items-center text-center">
            <ResearchPaperRealIcon className="w-10 h-10 mb-2" />
            <div className="text-xs font-bold text-slate-500 uppercase">Active Research Projects</div>
            <div className="font-serif text-3xl font-black text-slate-900 mt-1">1</div>
            <div className="text-xs text-[#2563EB] font-bold mt-1">✓ In Progress on Schedule</div>
          </div>

          <div className="card-clay-white p-6 flex flex-col items-center text-center">
            <TurnitinShieldLogo className="w-10 h-10 mb-2" />
            <div className="text-xs font-bold text-slate-500 uppercase">Turnitin Audited Files</div>
            <div className="font-serif text-3xl font-black text-slate-900 mt-1">1</div>
            <div className="text-xs text-slate-500 font-bold mt-1">Originality Report Archived</div>
          </div>

          <div className="card-clay-white p-6 flex flex-col items-center text-center">
            <ThesisRealIcon className="w-10 h-10 mb-2" />
            <div className="text-xs font-bold text-slate-500 uppercase">Academic Supervisors</div>
            <div className="font-serif text-xl font-black text-slate-900 mt-1">Tuhit Roy / Sampreeti M.</div>
            <div className="text-xs text-[#F95721] font-bold mt-1">Direct Advisory Channel Open</div>
          </div>
        </div>

        {/* Projects List */}
        <div className="card-clay-white p-6 md:p-8 mb-8 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-slate-100 gap-2">
            <h2 className="font-serif text-2xl font-black text-slate-900 text-center sm:text-left">
              Your Research Deliverables &amp; Milestones
            </h2>
            <span className="text-xs text-slate-500 font-bold">{projects.length} Active Records</span>
          </div>

          <div className="space-y-6">
            {projects.map((p) => (
              <div
                key={p.id}
                className="p-6 rounded-2xl border-2 border-slate-200 bg-white hover:border-[#F95721] transition-all text-center sm:text-left shadow-sm"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                      <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-300">
                        {p.id}
                      </span>
                      <span
                        className={`text-xs px-3 py-0.5 rounded-full font-black ${
                          p.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-orange-100 text-[#F95721]'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                    <h3 className="font-serif font-black text-lg text-slate-900 text-center sm:text-left">
                      {p.title}
                    </h3>
                    <div className="text-xs text-slate-500 font-bold mt-1">{p.service}</div>
                  </div>

                  <div className="text-center md:text-right">
                    <div className="text-xs text-slate-500 font-semibold">Agreed Project Total</div>
                    <div className="font-serif font-black text-xl text-slate-900">{p.totalAmount}</div>
                    <div className="text-[11px] text-slate-400 font-medium">Target Delivery: {p.deadline}</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>Drafting, Coding &amp; Turnitin Audit Progress</span>
                    <span className="font-black text-[#F95721]">{p.progress}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-[#F95721] to-[#FF8C38] transition-all duration-700"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
                  <span className="text-slate-400 font-medium">Last activity updated: {p.updatedAt}</span>
                  <a
                    href="https://wa.me/917980470880"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F95721] font-bold hover:underline flex items-center gap-1.5"
                  >
                    <WhatsAppRealIcon className="w-4 h-4" />
                    <span>Contact Academic Director on WhatsApp →</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
