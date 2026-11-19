'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import ResearchToolkitContainer from '@/components/toolkit/ResearchToolkitContainer';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

interface ScholarProfile {
  name?: string;
  email?: string;
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
  status: 'IN_PROGRESS' | 'UNDER_REVIEW' | 'COMPLETED';
  progress: number;
  deadline: string;
  amount: string;
  turnitinScore?: string;
  aiScore?: string;
  deliverables: { name: string; type: 'doc' | 'pdf' | 'code'; url: string }[];
}

interface QueryRecord {
  id: string;
  projectId?: string;
  projectTitle?: string;
  queryType: string;
  subject: string;
  message: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'RESOLVED';
  assignedDirector: string;
  createdAt: string;
  responses?: { author: string; text: string; time: string }[];
}

export default function ClientPortalPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ScholarProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Exactly Three Top-Level Client Portal Sections: Dashboard, Works, Queries
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'WORKS' | 'QUERIES'>('DASHBOARD');

  // Sub-section inside Works: 'DELIVERABLES' | 'TOOLKIT'
  const [worksSubSection, setWorksSubSection] = useState<'DELIVERABLES' | 'TOOLKIT'>('DELIVERABLES');

  // Filter for Works: 'ALL' | 'IN_PROGRESS' | 'COMPLETED'
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'IN_PROGRESS' | 'COMPLETED'>('ALL');

  // Query Form State
  const [queryProject, setQueryProject] = useState('PRJ-1082');
  const [queryType, setQueryType] = useState('Methodology Clarification');
  const [querySubject, setQuerySubject] = useState('');
  const [queryMessage, setQueryMessage] = useState('');
  const [querySubmitting, setQuerySubmitting] = useState(false);
  const [querySuccessMsg, setQuerySuccessMsg] = useState<string | null>(null);

  // Queries List
  const [queries, setQueries] = useState<QueryRecord[]>([
    {
      id: 'QRY-8921',
      projectId: 'PRJ-1082',
      projectTitle: 'Deep Learning Model & Paper on Medical Image Segmentation',
      queryType: 'Methodology Clarification',
      subject: 'Confirmation of U-Net vs Attention U-Net ablation test baseline',
      message: 'Could you please confirm if the ablation study includes both Dice coefficient and Hausdorff distance metrics as requested by the IEEE journal guidelines?',
      status: 'UNDER_REVIEW',
      assignedDirector: 'Tuhit Roy (Founder & Director)',
      createdAt: 'Today, 11:30 AM',
      responses: [
        {
          author: 'Tuhit Roy (Director)',
          text: 'Yes! Both 95% Hausdorff Distance and Dice metric are calculated across the 5-fold cross-validation dataset. Section 4.3 has been updated accordingly.',
          time: 'Today, 01:15 PM',
        },
      ],
    },
  ]);

  // Projects / Works List
  const [projects] = useState<Project[]>([
    {
      id: 'PRJ-1082',
      title: 'Deep Learning Model & Paper on Medical Image Segmentation',
      service: 'Research Paper Writing (English Technical with Model)',
      language: 'English',
      status: 'IN_PROGRESS',
      progress: 68,
      deadline: '28 Nov 2026',
      amount: '₹8,998',
      turnitinScore: '4% (Safe)',
      aiScore: '0% AI',
      deliverables: [
        { name: 'Chapter 1–3 Draft Manuscript.docx', type: 'doc', url: '#' },
        { name: 'Turnitin Originality Report.pdf', type: 'pdf', url: '#' },
        { name: 'PyTorch Architecture Repo.zip', type: 'code', url: '#' },
      ],
    },
    {
      id: 'PRJ-1045',
      title: 'PRISMA 2020 Systematic Literature Review on Renewable Energy Microgrids',
      service: 'Systematic Review Paper Writing',
      language: 'English',
      status: 'UNDER_REVIEW',
      progress: 85,
      deadline: '05 Dec 2026',
      amount: '₹3,999',
      turnitinScore: '6% (Safe)',
      aiScore: '0% AI',
      deliverables: [
        { name: 'PRISMA 2020 Flowchart & Review.docx', type: 'doc', url: '#' },
        { name: 'Turnitin Originality Verification.pdf', type: 'pdf', url: '#' },
      ],
    },
    {
      id: 'PRJ-1019',
      title: 'Doctoral Dissertation Chapter 4 & 5 Empirical Findings',
      service: 'Doctoral Thesis Writing',
      language: 'English',
      status: 'COMPLETED',
      progress: 100,
      deadline: 'Delivered',
      amount: '₹19,999',
      turnitinScore: '5% (Safe)',
      aiScore: '0% AI',
      deliverables: [
        { name: 'Complete 5-Chapter Thesis Final.docx', type: 'doc', url: '#' },
        { name: 'Turnitin Digital Certificate.pdf', type: 'pdf', url: '#' },
        { name: 'Thesis Defense Slide Deck.pptx', type: 'doc', url: '#' },
      ],
    },
  ]);

  // URL Query Parameters support (e.g. ?tab=works&section=toolkit)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab')?.toUpperCase();
      const sectionParam = params.get('section')?.toUpperCase();

      if (tabParam === 'WORKS') {
        setActiveTab('WORKS');
        if (sectionParam === 'TOOLKIT') {
          setWorksSubSection('TOOLKIT');
        }
      } else if (tabParam === 'QUERIES') {
        setActiveTab('QUERIES');
      } else if (tabParam === 'DASHBOARD') {
        setActiveTab('DASHBOARD');
      }
    }
  }, []);

  // Auth Checking & Real-time OAuth Listener
  useEffect(() => {
    let isMounted = true;

    const applyUser = (userData: User, profileData?: Partial<ScholarProfile>) => {
      if (!isMounted) return;
      setUser(userData);
      try {
        localStorage.setItem('inkmonk_user', JSON.stringify(userData));
      } catch {}

      const storedProfile = localStorage.getItem('inkmonk_scholar_profile');
      if (storedProfile) {
        try {
          setProfile(JSON.parse(storedProfile));
        } catch {
          setProfile({
            name: userData.name,
            email: userData.email,
            gender: 'Not Specified',
            qualification: 'PhD Scholar / Researcher',
            institution: 'Academic Institution',
            discipline: 'Multidisciplinary Research',
          });
        }
      } else {
        const defaultProfile: ScholarProfile = {
          name: userData.name,
          email: userData.email,
          gender: profileData?.gender || 'Not Specified',
          qualification: profileData?.qualification || 'PhD Scholar / Researcher',
          institution: profileData?.institution || 'Academic Institution',
          discipline: profileData?.discipline || 'Multidisciplinary Research',
        };
        setProfile(defaultProfile);
        try {
          localStorage.setItem('inkmonk_scholar_profile', JSON.stringify(defaultProfile));
        } catch {}
      }
      setLoading(false);

      // Clean up URL if OAuth callback hash/code parameters are present
      if (typeof window !== 'undefined' && (window.location.hash || window.location.search.includes('code='))) {
        window.history.replaceState({}, document.title, '/client');
      }
    };

    async function checkAuth() {
      // 0. If OAuth code is in URL, exchange it first
      if (typeof window !== 'undefined' && window.location.search.includes('code=')) {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
          try {
            await supabase.auth.exchangeCodeForSession(code);
          } catch (e) {
            console.warn('OAuth code exchange:', e);
          }
        }
      }

      // 1. Check Supabase session first
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && isMounted) {
          applyUser({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Scholar',
            email: session.user.email || '',
            role: 'CLIENT',
          }, {
            gender: session.user.user_metadata?.gender,
          });
          return;
        }

        const { data: { user: sbUser } } = await supabase.auth.getUser();
        if (sbUser && isMounted) {
          applyUser({
            id: sbUser.id,
            name: sbUser.user_metadata?.full_name || sbUser.user_metadata?.name || sbUser.email?.split('@')[0] || 'Scholar',
            email: sbUser.email || '',
            role: 'CLIENT',
          }, {
            gender: sbUser.user_metadata?.gender,
          });
          return;
        }
      } catch {}

      // 2. Check local cookie / session
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.user) {
            applyUser(data.user);
            return;
          }
        }
      } catch {}

      // 3. Check localStorage
      try {
        const storedUser = localStorage.getItem('inkmonk_user');
        if (storedUser && isMounted) {
          const parsed = JSON.parse(storedUser);
          applyUser(parsed);
          return;
        }
      } catch {}

      if (isMounted) {
        setUser(null);
        setLoading(false);
      }
    }

    // 4. Real-time Supabase Auth state listener (Crucial for OAuth redirects & OTP login)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user && isMounted) {
        applyUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Scholar',
          email: session.user.email || '',
          role: 'CLIENT',
        }, {
          gender: session.user.user_metadata?.gender,
        });
      }
      if (event === 'SIGNED_OUT' && isMounted) {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    checkAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Fetch queries
  useEffect(() => {
    if (user?.email) {
      fetch(`/api/client/query?email=${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.queries && data.queries.length > 0) {
            setQueries(data.queries);
          }
        })
        .catch(() => {});
    }
  }, [user]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    localStorage.removeItem('inkmonk_user');
    localStorage.removeItem('inkmonk_scholar_profile');
    setUser(null);
    setProfile(null);
  };

  // Submit Query
  const handleSubmitQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!querySubject.trim() || !queryMessage.trim()) return;

    setQuerySubmitting(true);
    setQuerySuccessMsg(null);

    const targetProject = projects.find((p) => p.id === queryProject);

    try {
      const res = await fetch('/api/client/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: queryProject,
          projectTitle: targetProject?.title || 'General Consultation',
          queryType,
          subject: querySubject,
          message: queryMessage,
          userName: user?.name || profile?.name || 'Scholar',
          userEmail: user?.email || profile?.email || 'scholar@university.edu',
        }),
      });

      const data = await res.json();
      if (data.success && data.query) {
        setQueries((prev) => [data.query, ...prev]);
        setQuerySuccessMsg(`Your query (${data.ticketId}) was successfully submitted to Directors Tuhit Roy and Sampreeti Mukherjee!`);
        setQuerySubject('');
        setQueryMessage('');
      } else {
        throw new Error(data.error || 'Failed to submit query');
      }
    } catch {
      // Local fallback in case of network issue
      const ticketId = `QRY-${Math.floor(1000 + Math.random() * 9000)}`;
      const fallbackQuery: QueryRecord = {
        id: ticketId,
        projectId: queryProject,
        projectTitle: targetProject?.title || 'General Consultation',
        queryType,
        subject: querySubject,
        message: queryMessage,
        status: 'UNDER_REVIEW',
        assignedDirector: 'Tuhit Roy & Sampreeti Mukherjee (Directors)',
        createdAt: 'Just now',
        responses: [
          {
            author: 'InkMonk Academic Desk',
            text: `Query (${ticketId}) recorded. Assigned to lead director for review. For urgent priority, WhatsApp +91 7980470880.`,
            time: 'Just now',
          },
        ],
      };
      setQueries((prev) => [fallbackQuery, ...prev]);
      setQuerySuccessMsg(`Your query (${ticketId}) was submitted and recorded in your portal!`);
      setQuerySubject('');
      setQueryMessage('');
    } finally {
      setQuerySubmitting(false);
    }
  };

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'IN_PROGRESS') return p.status === 'IN_PROGRESS' || p.status === 'UNDER_REVIEW';
    if (statusFilter === 'COMPLETED') return p.status === 'COMPLETED';
    return true;
  });

  // If loading session
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#f97316] animate-spin mb-4" />
        <p className="text-slate-600 dark:text-slate-300 font-extrabold text-sm">
          Securing Scholar Session &amp; Loading Client Portal…
        </p>
      </div>
    );
  }

  // If NOT Logged In: Show In-Portal Login / Signup Experience
  if (!user) {
    return (
      <div className="min-h-screen bg-notebook-grid py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-[#0A0F1D] rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-950/60 border-2 border-orange-200 dark:border-orange-800 flex items-center justify-center mx-auto mb-4 p-2 shadow-inner">
            <Image
              src="/logo.png"
              alt="InkMonk Logo"
              width={64}
              height={64}
              className="w-12 h-12 object-contain"
            />
          </div>

          <h2 className="font-serif text-2xl font-black text-slate-900 dark:text-white mb-2">
            Scholar Client Portal
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium mb-6">
            Sign in to track ongoing research papers, access the Research Toolkit, download drafts, inspect Turnitin originality reports, or submit queries.
          </p>

          <div className="space-y-3">
            <Link
              href="/login"
              className="btn-clay-orange w-full py-3 text-sm font-extrabold flex items-center justify-center gap-2"
            >
              <span>Sign In / Create Account</span>
              <span>→</span>
            </Link>

            {/* 1-Click Instant Demo Login */}
            <button
              type="button"
              onClick={() => {
                const demoUser: User = {
                  id: 'demo-scholar-001',
                  name: 'Dr. Debabrata Roy',
                  email: 'scholar@university.edu',
                  role: 'CLIENT',
                };
                const demoProfile: ScholarProfile = {
                  name: 'Dr. Debabrata Roy',
                  email: 'scholar@university.edu',
                  gender: 'Male',
                  qualification: 'Postdoctoral Fellow / Assistant Professor',
                  institution: 'Jadavpur University / IIT Kharagpur',
                  discipline: 'Computer Science & Biomedical Engineering',
                };
                localStorage.setItem('inkmonk_user', JSON.stringify(demoUser));
                localStorage.setItem('inkmonk_scholar_profile', JSON.stringify(demoProfile));
                setUser(demoUser);
                setProfile(demoProfile);
              }}
              className="w-full py-3 px-4 rounded-2xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-[#1d4ed8] dark:text-blue-300 border-2 border-blue-200 dark:border-blue-800 font-extrabold text-xs sm:text-sm transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>⚡ 1-Click Demo Scholar Access</span>
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
            Need urgent assistance? WhatsApp{' '}
            <a href="https://wa.me/917980470880" className="text-[#f97316] font-bold hover:underline">
              +91 7980470880
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Client Portal
  return (
    <div className="min-h-screen bg-notebook-grid py-8 sm:py-12 px-4 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ─── Scholar Welcome Header Bar ───────────────────────────────── */}
        <div className="bg-gradient-to-br from-[#1d4ed8] via-[#1e40af] to-[#1e3a8a] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] border-2 border-blue-400/40 dark:border-blue-600/30 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 sm:gap-5 text-center md:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#f97316] to-[#fb923c] p-2 flex items-center justify-center text-white text-3xl font-black shadow-inner ring-4 ring-white/25 dark:ring-blue-500/30 shrink-0">
              🎓
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-1">
                <h1 className="font-serif text-2xl sm:text-3xl font-black text-white">
                  Welcome, {profile?.name || user.name}
                </h1>
                <span className="bg-emerald-500/95 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs border border-emerald-400/30">
                  ACTIVE SCHOLAR
                </span>
              </div>
              <p className="text-blue-100 text-xs sm:text-sm font-medium">
                {user.email} • {profile?.gender || 'Gender: Not Specified'} • {profile?.qualification || 'PhD Scholar'}
              </p>
              <p className="text-blue-200 text-xs mt-0.5 font-medium">
                {profile?.institution ? `🏛️ ${profile.institution}` : '🏛️ Academic Institution'} {profile?.discipline ? `• ${profile.discipline}` : ''}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setActiveTab('WORKS');
                setWorksSubSection('TOOLKIT');
              }}
              className="bg-white/15 hover:bg-white/25 active:bg-white/30 text-white text-xs font-black py-2.5 px-4 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <span>⚡ Research Toolkit</span>
            </button>
            <Link
              href="/quote"
              className="btn-clay-orange text-xs py-2.5 px-4 shadow-md hover:shadow-lg font-extrabold flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#f97316]/50 transition-all duration-200"
            >
              <span>+ New Project Scope</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-red-500/20 hover:text-red-100 active:bg-white/20 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl border border-white/20 hover:border-red-400/30 transition-all duration-200 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-red-400/40"
            >
              Sign Out ⎋
            </button>
          </div>
        </div>

        {/* ─── Exactly Three Top-Level Client Portal Navigation Tabs ────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            {/* 1. Dashboard Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('DASHBOARD')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'DASHBOARD'
                  ? 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white shadow-md border-2 border-blue-500/50 scale-[1.02]'
                  : 'bg-white/90 dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-2xs'
              }`}
            >
              <span>📊 Dashboard</span>
            </button>

            {/* 2. Works Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('WORKS')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'WORKS'
                  ? 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white shadow-md border-2 border-blue-500/50 scale-[1.02]'
                  : 'bg-white/90 dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-2xs'
              }`}
            >
              <span>📁 Works</span>
              <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-black">
                {projects.length}
              </span>
            </button>

            {/* 3. Queries Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('QUERIES')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'QUERIES'
                  ? 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white shadow-md border-2 border-blue-500/50 scale-[1.02]'
                  : 'bg-white/90 dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-2xs'
              }`}
            >
              <span>💬 Queries</span>
              <span className="bg-[#f97316] text-white text-[10px] px-2 py-0.5 rounded-full font-black shadow-2xs">
                {queries.length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
            <span>Direct Director Helpline:</span>
            <a
              href="https://wa.me/917980470880?text=Hello%20Director%20Tuhit%20Roy,%20inquiring%20from%20InkMonk%20Client%20Portal."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#f97316] font-black hover:underline"
            >
              <span>WhatsApp +91 7980470880</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* SECTION 1: DASHBOARD (Overview, Metrics, Profile & Toolkit Link)   */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-8">
            {/* Primary Research Toolkit Shortcut Banner */}
            <div className="bg-gradient-to-r from-[#1e40af] via-[#1d4ed8] to-[#2563eb] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] border-2 border-blue-400/40 dark:border-blue-600/30 rounded-3xl p-6 sm:p-7 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f97316] to-[#fb923c] flex items-center justify-center text-3xl shadow-inner shrink-0 ring-4 ring-white/20">
                  ⚡
                </div>
                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="font-serif text-lg sm:text-xl font-black text-white">
                      Research Toolkit
                    </h3>
                    <span className="bg-emerald-500/90 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs border border-emerald-400/30">
                      5 Interactive Utilities
                    </span>
                  </div>
                  <p className="text-blue-100 text-xs sm:text-sm mt-1 font-medium max-w-2xl leading-relaxed">
                    Convert references between APA &amp; IEEE, find DOIs from publisher links, generate BibTeX records, build reviewer response letters, and calculate English/Hindi word counts.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('WORKS');
                  setWorksSubSection('TOOLKIT');
                }}
                className="btn-clay-orange text-xs py-3 px-6 font-extrabold shrink-0 cursor-pointer shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f97316]/50 transition-all duration-200"
              >
                <span>Open Research Toolkit →</span>
              </button>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-clay-white p-6 border-2 border-slate-200/90 dark:border-slate-800 rounded-3xl text-center shadow-xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800/80 transition-all duration-200">
                <div className="text-3xl mb-2">📚</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {projects.length} Works
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">2 Active • 1 Delivered</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('WORKS');
                    setWorksSubSection('DELIVERABLES');
                  }}
                  className="mt-3 text-xs font-bold text-[#1d4ed8] dark:text-blue-400 hover:underline cursor-pointer focus:outline-none"
                >
                  View All Works →
                </button>
              </div>

              <div className="card-clay-white p-6 border-2 border-slate-200/90 dark:border-slate-800 rounded-3xl text-center shadow-xs hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800/80 transition-all duration-200">
                <div className="text-3xl mb-2">🛡️</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">100% Non-Repository</div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Turnitin Verified Zero Indexing</p>
                <div className="mt-3 text-xs font-medium text-slate-400 dark:text-slate-500">
                  Safe Instructor-Tier Protocol
                </div>
              </div>

              <div className="card-clay-white p-6 border-2 border-slate-200/90 dark:border-slate-800 rounded-3xl text-center shadow-xs hover:shadow-md hover:border-orange-300 dark:hover:border-orange-800/80 transition-all duration-200">
                <div className="text-3xl mb-2">🤝</div>
                <div className="text-2xl font-black text-[#1d4ed8] dark:text-blue-400">Direct Director Access</div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Tuhit Roy &amp; Sampreeti Mukherjee</p>
                <button
                  type="button"
                  onClick={() => setActiveTab('QUERIES')}
                  className="mt-3 text-xs font-bold text-[#f97316] hover:underline cursor-pointer focus:outline-none"
                >
                  Ask Director a Question →
                </button>
              </div>
            </div>

            {/* Scholar Profile Card */}
            <div className="card-clay-white p-6 sm:p-8 border-2 border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-sm">
              <h3 className="font-serif text-xl font-black text-slate-900 dark:text-white mb-4">
                Verified Scholar Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50/90 dark:bg-slate-900/70 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <span className="text-slate-400 dark:text-slate-500 block font-bold text-[10px] uppercase tracking-wider mb-0.5">Full Name</span>
                  <span className="font-black text-slate-800 dark:text-white text-sm">{profile?.name || user.name}</span>
                </div>
                <div className="p-3.5 bg-slate-50/90 dark:bg-slate-900/70 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <span className="text-slate-400 dark:text-slate-500 block font-bold text-[10px] uppercase tracking-wider mb-0.5">Email Address</span>
                  <span className="font-black text-slate-800 dark:text-white text-sm truncate block">{user.email}</span>
                </div>
                <div className="p-3.5 bg-slate-50/90 dark:bg-slate-900/70 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <span className="text-slate-400 dark:text-slate-500 block font-bold text-[10px] uppercase tracking-wider mb-0.5">Gender</span>
                  <span className="font-black text-slate-800 dark:text-white text-sm">{profile?.gender || 'Not Specified'}</span>
                </div>
                <div className="p-3.5 bg-slate-50/90 dark:bg-slate-900/70 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <span className="text-slate-400 dark:text-slate-500 block font-bold text-[10px] uppercase tracking-wider mb-0.5">Educational Qualification</span>
                  <span className="font-black text-slate-800 dark:text-white text-sm">{profile?.qualification || 'PhD Candidate'}</span>
                </div>
                <div className="p-3.5 bg-slate-50/90 dark:bg-slate-900/70 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <span className="text-slate-400 dark:text-slate-500 block font-bold text-[10px] uppercase tracking-wider mb-0.5">University / Institution</span>
                  <span className="font-black text-slate-800 dark:text-white text-sm">{profile?.institution || 'Academic Institution'}</span>
                </div>
                <div className="p-3.5 bg-slate-50/90 dark:bg-slate-900/70 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <span className="text-slate-400 dark:text-slate-500 block font-bold text-[10px] uppercase tracking-wider mb-0.5">Discipline / Research Area</span>
                  <span className="font-black text-slate-800 dark:text-white text-sm">{profile?.discipline || 'Multidisciplinary'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: WORKS (Deliverables & Research Toolkit Sub-Section)     */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'WORKS' && (
          <div className="space-y-6">
            {/* Works Sub-Navigation (Deliverables vs Research Toolkit) */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-white/95 dark:bg-slate-900/95 rounded-2xl border-2 border-slate-200/90 dark:border-slate-800 shadow-xs backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setWorksSubSection('DELIVERABLES')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    worksSubSection === 'DELIVERABLES'
                      ? 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>📁 Active Deliverables &amp; Drafts</span>
                  <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-black">
                    {projects.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setWorksSubSection('TOOLKIT')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    worksSubSection === 'TOOLKIT'
                      ? 'bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>⚡ Research Toolkit</span>
                  <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-black">
                    5 Tools
                  </span>
                </button>
              </div>

              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 px-2 hidden sm:inline">
                Works Directorate Workspace
              </span>
            </div>

            {/* Sub-view A: Research Toolkit */}
            {worksSubSection === 'TOOLKIT' && (
              <ResearchToolkitContainer
                onBackToWorks={() => setWorksSubSection('DELIVERABLES')}
              />
            )}

            {/* Sub-view B: Active Works & Deliverables */}
            {worksSubSection === 'DELIVERABLES' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-black text-slate-900 dark:text-white">
                      Active &amp; Completed Research Works
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium">
                      Review milestone progress, download camera-ready chapters, inspect verified Turnitin similarity scans, and access code repos.
                    </p>
                  </div>

                  {/* Status Filter Buttons */}
                  <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setStatusFilter('ALL')}
                      className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${statusFilter === 'ALL' ? 'bg-[#f97316] text-white shadow-2xs font-extrabold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                      All ({projects.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('IN_PROGRESS')}
                      className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${statusFilter === 'IN_PROGRESS' ? 'bg-[#f97316] text-white shadow-2xs font-extrabold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                      In Progress (2)
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('COMPLETED')}
                      className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${statusFilter === 'COMPLETED' ? 'bg-[#f97316] text-white shadow-2xs font-extrabold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                      Completed (1)
                    </button>
                  </div>
                </div>

                {/* Project Cards Grid */}
                <div className="grid grid-cols-1 gap-6">
                  {filteredProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="card-clay-white p-6 sm:p-7 flex flex-col justify-between border-2 border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden"
                    >
                      {/* Status Banner */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono text-xs font-black px-2.5 py-1 rounded-lg shadow-2xs">
                            {proj.id}
                          </span>
                          <span className="text-xs font-black text-[#1d4ed8] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                            {proj.service}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                              proj.status === 'COMPLETED'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                : proj.status === 'UNDER_REVIEW'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                            }`}
                          >
                            ● {proj.status.replace('_', ' ')}
                          </span>
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            Deadline: {proj.deadline}
                          </span>
                        </div>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-3">
                        {proj.title}
                      </h3>

                      {/* Milestone Progress Bar */}
                      <div className="mb-5">
                        <div className="flex justify-between items-center text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
                          <span>Milestone Progress</span>
                          <span className="text-[#f97316] font-black">{proj.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-inner h-3 rounded-full overflow-hidden p-0.5">
                          <div
                            className="bg-gradient-to-r from-[#1d4ed8] to-[#f97316] h-full rounded-full transition-all duration-500"
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Badges / Metrics Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50/90 dark:bg-slate-900/80 rounded-2xl border border-slate-200/90 dark:border-slate-800 mb-5 text-center shadow-2xs">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Language</div>
                          <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">{proj.language}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Turnitin Index</div>
                          <div className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400">{proj.turnitinScore || 'Pending'}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">AI Writing Score</div>
                          <div className="text-xs sm:text-sm font-black text-blue-600 dark:text-blue-400">{proj.aiScore || '0% AI'}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Total Fixed Quote</div>
                          <div className="text-xs sm:text-sm font-black text-[#f97316]">{proj.amount}</div>
                        </div>
                      </div>

                      {/* Deliverables Download Links */}
                      <div>
                        <h4 className="text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-2.5">
                          Available Files &amp; Downloads:
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                          {proj.deliverables.map((del, dIdx) => (
                            <button
                              key={dIdx}
                              type="button"
                              onClick={() => alert(`Downloading verified academic deliverable: ${del.name}`)}
                              className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 hover:bg-orange-50/60 dark:hover:bg-orange-950/40 text-slate-800 dark:text-slate-100 border border-slate-300/90 dark:border-slate-700 hover:border-[#f97316] px-3.5 py-2 rounded-xl text-xs font-bold shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f97316]/30"
                            >
                              <span>{del.type === 'doc' ? '📄' : del.type === 'pdf' ? '📑' : '💻'}</span>
                              <span>{del.name}</span>
                              <span className="text-[#f97316] font-black">↓</span>
                            </button>
                          ))}

                          {/* Fast Action: Ask Question regarding this project */}
                          <button
                            type="button"
                            onClick={() => {
                              setQueryProject(proj.id);
                              setQuerySubject(`Inquiry regarding ${proj.id}: ${proj.title}`);
                              setActiveTab('QUERIES');
                            }}
                            className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 text-[#1d4ed8] dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-3 py-2 rounded-xl text-xs font-extrabold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                          >
                            <span>💬 Query Director on this Project</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* SECTION 3: QUERIES (Direct Escalation & Director History)          */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'QUERIES' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Submit New Query Form */}
            <div className="lg:col-span-5">
              <div className="card-clay-white p-6 sm:p-7 border-2 border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f97316] to-[#fb923c] flex items-center justify-center text-white text-lg font-black shadow-inner shrink-0">
                    ✍️
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-black text-slate-900 dark:text-white">
                      Ask Director / Submit Query
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      Direct escalation to Tuhit Roy &amp; Sampreeti Mukherjee
                    </p>
                  </div>
                </div>

                {querySuccessMsg && (
                  <div className="p-3.5 mb-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-bold leading-relaxed shadow-2xs">
                    ✓ {querySuccessMsg}
                  </div>
                )}

                <form onSubmit={handleSubmitQuery} className="space-y-4 text-left">
                  {/* Project Selector */}
                  <div>
                    <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                      Related Project:
                    </label>
                    <select
                      value={queryProject}
                      onChange={(e) => setQueryProject(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700/90 rounded-xl p-2.5 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-[#1d4ed8] focus:ring-3 focus:ring-[#1d4ed8]/20 transition-all duration-200 shadow-2xs"
                    >
                      <option value="General">General Academic Consultation</option>
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.id} — {p.title.substring(0, 45)}…
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Query Type */}
                  <div>
                    <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                      Query Nature / Category:
                    </label>
                    <select
                      value={queryType}
                      onChange={(e) => setQueryType(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700/90 rounded-xl p-2.5 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-[#1d4ed8] focus:ring-3 focus:ring-[#1d4ed8]/20 transition-all duration-200 shadow-2xs"
                    >
                      <option value="Methodology Clarification">Methodology &amp; Formula Clarification</option>
                      <option value="Revision Request">Revision / Feedback Implementation</option>
                      <option value="Turnaround Timeline Inquiry">Milestone &amp; Turnaround Deadline</option>
                      <option value="Turnitin Report Question">Turnitin Originality &amp; Similarity Report</option>
                      <option value="Urgent Director Escalation">Urgent Director Escalation</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                      Subject Line:
                    </label>
                    <input
                      type="text"
                      value={querySubject}
                      onChange={(e) => setQuerySubject(e.target.value)}
                      placeholder="e.g. Chapter 3 Ablation test clarification"
                      required
                      className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700/90 rounded-xl p-2.5 text-xs font-bold text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#1d4ed8] focus:ring-3 focus:ring-[#1d4ed8]/20 transition-all duration-200 shadow-2xs"
                    />
                  </div>

                  {/* Detailed Query Message */}
                  <div>
                    <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                      Detailed Query / Request:
                    </label>
                    <textarea
                      rows={4}
                      value={queryMessage}
                      onChange={(e) => setQueryMessage(e.target.value)}
                      placeholder="Specify your exact question, supervisor comments, or revision requirements…"
                      required
                      className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700/90 rounded-xl p-2.5 text-xs font-medium text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#1d4ed8] focus:ring-3 focus:ring-[#1d4ed8]/20 transition-all duration-200 shadow-2xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={querySubmitting || !querySubject.trim() || !queryMessage.trim()}
                    className="btn-clay-orange w-full py-3 text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f97316]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {querySubmitting ? (
                      <span>Assigning to Director…</span>
                    ) : (
                      <>
                        <span>Submit Query to Director Desk</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Direct Escalation Callout */}
                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Prefer instant conversation?</p>
                  <a
                    href="https://wa.me/917980470880?text=Hello%20Director%20Tuhit%20Roy,%20I%20have%20an%20urgent%20academic%20query."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-102 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40"
                  >
                    <span>💬 WhatsApp Directors (+91 7980470880)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Query History & Director Responses */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-black text-slate-900 dark:text-white">
                  Query History &amp; Official Responses
                </h3>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {queries.length} Total Tickets
                </span>
              </div>

              {queries.length === 0 ? (
                <div className="card-clay-white p-8 text-center text-slate-500 dark:text-slate-400 border-2 border-slate-200/90 dark:border-slate-800 rounded-3xl">
                  No active queries submitted yet. You can submit questions or revision requests anytime using the form on the left.
                </div>
              ) : (
                queries.map((q) => (
                  <div
                    key={q.id}
                    className="card-clay-white p-5 sm:p-6 border-2 border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs hover:shadow-sm transition-all duration-200 text-left space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black bg-blue-100 dark:bg-blue-950 text-[#1d4ed8] dark:text-blue-300 px-2.5 py-1 rounded-lg shadow-2xs">
                          {q.id}
                        </span>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          {q.queryType}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-extrabold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                          ● {q.status.replace('_', ' ')}
                        </span>
                        <span className="text-slate-400 dark:text-slate-500">{q.createdAt}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-black text-slate-900 dark:text-white mb-1">
                        {q.subject}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/90 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
                        {q.message}
                      </p>
                    </div>

                    {/* Official Response if present */}
                    {q.responses && q.responses.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Director &amp; Editorial Desk Response:
                        </span>
                        {q.responses.map((resp, rIdx) => (
                          <div
                            key={rIdx}
                            className="bg-orange-50/80 dark:bg-orange-950/40 border-l-4 border-[#f97316] p-3 rounded-r-xl text-xs shadow-2xs"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-extrabold text-[#f97316]">
                                🛡️ {resp.author}
                              </span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500">{resp.time}</span>
                            </div>
                            <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                              {resp.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
