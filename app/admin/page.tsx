'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AcademicLabCrestLogo, TurnitinShieldLogo, WhatsAppRealIcon } from '@/components/RealIcons';

interface Lead {
  id: string;
  channel: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  language?: string;
  domain?: string;
  totalPaise?: number;
  breakdown?: string;
  status: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'LOST' | 'SPAM';
  requirements?: string;
  deadline?: string;
  createdAt: string;
}

interface Stats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  convertedLeads: number;
  chatLeads: number;
  manualLeads: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'LEADS' | 'PROJECTS' | 'PRICING' | 'SETTINGS'>('LEADS');
  const [filter, setFilter] = useState<string>('ALL');

  // Inline Admin Login if session missing
  const [authRequired, setAuthRequired] = useState(false);
  const [adminEmail, setAdminEmail] = useState('inkmonkresearch@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  async function fetchLeads() {
    try {
      const res = await fetch('/api/admin/leads');
      if (!res.ok) {
        setAuthRequired(true);
        return;
      }
      const data = await res.json();
      setLeads(data.leads || []);
      setStats(data.stats || null);
      setAuthRequired(false);
    } catch {
      setAuthRequired(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleInlineAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid administrator password.');
      setAuthRequired(false);
      await fetchLeads();
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : 'Sign-in failed.');
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: status as any } : l))
        );
      }
    } catch {
      alert('Could not update status.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setAuthRequired(true);
  };

  const filteredLeads = filter === 'ALL'
    ? leads
    : leads.filter((l) => l.status === filter || l.channel === filter);

  // If Not Authenticated as Admin, show dedicated Admin Sign In Card
  if (authRequired) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center p-4">
        <div className="max-w-md w-full card-futuristic-3d p-8 bg-black text-white border-t-4 border-t-purple-600 text-center shadow-2xl rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/50 flex items-center justify-center mx-auto mb-4">
            <AcademicLabCrestLogo className="w-12 h-12" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white mb-1">
            InkMonk Director Console
          </h1>
          <p className="text-xs text-purple-200/80 mb-6">
            Authorized access for Tuhit Roy and Academic Directors
          </p>

          {loginError && (
            <div className="p-3 bg-red-950/80 border border-red-500 text-red-200 text-xs rounded-xl mb-4 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleInlineAdminLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-white mb-1">Director Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="input-field !bg-zinc-900 !text-white !border-zinc-700 text-xs w-full p-3 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1">Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter password"
                className="input-field !bg-zinc-900 !text-white !border-zinc-700 text-xs w-full p-3 rounded-xl"
              />
              <div className="text-[10px] text-purple-300 mt-1">
                Authorized: <code className="text-white font-bold">InkMonk@2026</code> (or <code className="text-white font-bold">admin123</code>)
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg transition-all"
            >
              {loading ? 'Verifying Admin Session…' : 'Open Management Console →'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
            <Link href="/" className="text-xs text-zinc-400 hover:text-white">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs font-semibold text-black">Loading Management Console...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Console Top Header */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-purple-200 shadow-md mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-black border border-purple-500/50 flex items-center justify-center p-1">
              <AcademicLabCrestLogo className="w-10 h-10" />
            </div>
            <div>
              <div className="text-xs text-purple-600 font-bold uppercase tracking-wider">
                Director Administration Suite
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-black">
                InkMonk Research Command Hub
              </h1>
              <p className="text-xs text-zinc-500">
                Founders: Tuhit Roy &amp; Sampreeti Mukherjee • Salt Lake Sector 2, Kolkata
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="text-xs font-bold text-zinc-700 hover:text-black px-4 py-2 rounded-xl border border-zinc-200 bg-zinc-50"
            >
              Public Website ↗
            </Link>
            <Link
              href="/client"
              className="text-xs font-bold text-purple-600 hover:text-purple-700 px-4 py-2 rounded-xl border border-purple-200 bg-purple-50"
            >
              Client View
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-zinc-600 hover:text-black hover:bg-zinc-100 px-4 py-2 rounded-xl border border-zinc-200"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-purple-100 pb-3">
          {[
            { id: 'LEADS', label: `Inquiries & Leads (${leads.length})` },
            { id: 'PROJECTS', label: 'Active Projects (Milestones)' },
            { id: 'PRICING', label: 'Pricing Engine Catalogue' },
            { id: 'SETTINGS', label: 'Director Settings & Telemetry' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-zinc-700 hover:bg-purple-50 border border-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── TAB 1: LEADS & INQUIRIES ────────────────────────────────────── */}
        {activeTab === 'LEADS' && (
          <div>
            {/* Stats Row */}
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm text-center">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase">Total Enquiries</div>
                  <div className="font-serif text-2xl font-bold text-black mt-1">{stats.totalLeads}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-sm text-center">
                  <div className="text-[10px] font-bold text-purple-600 uppercase">New Inquiries</div>
                  <div className="font-serif text-2xl font-bold text-purple-600 mt-1">{stats.newLeads}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm text-center">
                  <div className="text-[10px] font-bold text-zinc-600 uppercase">Contacted</div>
                  <div className="font-serif text-2xl font-bold text-zinc-900 mt-1">{stats.contactedLeads}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-sm text-center">
                  <div className="text-[10px] font-bold text-purple-600 uppercase">Converted</div>
                  <div className="font-serif text-2xl font-bold text-purple-700 mt-1">{stats.convertedLeads}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm text-center">
                  <div className="text-[10px] font-bold text-zinc-600 uppercase">Chatbot Leads</div>
                  <div className="font-serif text-2xl font-bold text-zinc-900 mt-1">{stats.chatLeads}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-sm text-center">
                  <div className="text-[10px] font-bold text-purple-600 uppercase">Quote Form</div>
                  <div className="font-serif text-2xl font-bold text-purple-700 mt-1">{stats.manualLeads}</div>
                </div>
              </div>
            )}

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['ALL', 'NEW', 'CONTACTED', 'CONVERTED', 'CHAT', 'MANUAL'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    filter === f
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Leads Table / Cards */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              {filteredLeads.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs">
                  No inquiries matching the selected filter.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-4">Client</th>
                        <th className="p-4">Service &amp; Scope</th>
                        <th className="p-4">Estimated Quote</th>
                        <th className="p-4">Deadline</th>
                        <th className="p-4">Channel</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Quick Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {filteredLeads.map((l) => (
                        <tr key={l.id} className="hover:bg-purple-50/50">
                          <td className="p-4">
                            <div className="font-bold text-black">{l.name || 'Anonymous Scholar'}</div>
                            <div className="text-zinc-500 text-[11px]">{l.email}</div>
                            {l.phone && (
                              <div className="text-purple-700 font-mono text-[11px] font-bold">{l.phone}</div>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-zinc-900">{l.service || 'Turnitin Scan'}</div>
                            <div className="text-zinc-500 text-[11px]">
                              {l.language} • {l.domain || 'General Domain'}
                            </div>
                            {l.requirements && (
                              <div className="text-[10px] text-zinc-600 mt-1 line-clamp-1 italic">
                                &ldquo;{l.requirements}&rdquo;
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="font-serif font-black text-sm text-black">
                              {l.totalPaise ? `₹${(l.totalPaise / 100).toLocaleString('en-IN')}` : '₹200 (Turnitin)'}
                            </div>
                          </td>
                          <td className="p-4 text-zinc-600 font-medium">
                            {l.deadline || 'Standard Feasibility'}
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-100 text-purple-900">
                              {l.channel}
                            </span>
                          </td>
                          <td className="p-4">
                            <select
                              value={l.status}
                              onChange={(e) => updateStatus(l.id, e.target.value)}
                              className="bg-white border border-zinc-300 rounded-lg px-2 py-1 text-xs font-bold text-zinc-800 focus:outline-none focus:border-purple-600"
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="CONVERTED">CONVERTED</option>
                              <option value="LOST">LOST</option>
                              <option value="SPAM">SPAM</option>
                            </select>
                          </td>
                          <td className="p-4">
                            {l.phone ? (
                              <a
                                href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${l.name || 'Scholar'}, this is Tuhit Roy from InkMonk Research regarding your academic inquiry.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold px-3 py-1.5 rounded-lg text-[11px]"
                              >
                                <WhatsAppRealIcon className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>
                            ) : (
                              <a
                                href={`mailto:${l.email}?subject=InkMonk%20Research%20Consultation`}
                                className="inline-flex items-center gap-1 bg-black hover:bg-zinc-800 text-white font-bold px-3 py-1.5 rounded-lg text-[11px]"
                              >
                                <span>Email</span>
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── TAB 2: ACTIVE PROJECTS (MILESTONES) ─────────────────────────── */}
        {activeTab === 'PROJECTS' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-black mb-2">
                Active Client Projects &amp; Milestone Escrow
              </h3>
              <p className="text-xs text-zinc-500 mb-6">
                All client projects tracked chapter-by-chapter according to Section 7 guidelines.
              </p>

              <div className="space-y-4">
                {[
                  {
                    id: 'PRJ-1082',
                    client: 'Dr. Rahul Mukherjee (IIT Kharagpur)',
                    title: 'Bi-LSTM Temporal Anomaly Detection in High-Dimensional Industrial Systems',
                    service: 'Research Paper + PyTorch Model (English Technical)',
                    progress: 75,
                    currentMilestone: 'Milestone 3: PyTorch Benchmark Logs Verified',
                    status: 'IN_PROGRESS',
                    amount: '₹34,000',
                  },
                  {
                    id: 'PRJ-1045',
                    client: 'Priya Sen (Calcutta University)',
                    title: 'Turnitin Instructor Plagiarism & AI Originality Audit',
                    service: 'Turnitin Audit Report',
                    progress: 100,
                    currentMilestone: 'Milestone 4: Deliverables Handed Over (<6% Similarity)',
                    status: 'DELIVERED',
                    amount: '₹200',
                  },
                ].map((p) => (
                  <div key={p.id} className="p-5 rounded-2xl border border-zinc-200 bg-purple-50/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                          {p.id}
                        </span>
                        <span className="text-xs font-bold text-zinc-800">{p.client}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                          {p.status}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-black mb-1">{p.title}</h4>
                      <div className="text-xs text-zinc-500">{p.service}</div>
                      <div className="text-xs text-purple-800 font-bold mt-2">
                        • {p.currentMilestone}
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full bg-zinc-200 rounded-full h-2 mt-2 max-w-md">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-serif text-lg font-black text-black">{p.amount}</div>
                      <div className="text-[10px] text-zinc-500">Escrow Allocated</div>
                      <button className="mt-2 text-xs bg-black hover:bg-zinc-800 text-white font-bold px-3 py-1.5 rounded-lg">
                        Manage Chapters →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 3: CENTRAL SERVER PRICING CATALOGUE ──────────────────────── */}
        {activeTab === 'PRICING' && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-black">
                  Central Server-Side Pricing Engine
                </h3>
                <p className="text-xs text-zinc-500">
                  Exact rates from Section 4 of master brief. Calculated in integer paise. Private to server.
                </p>
              </div>
              <span className="text-xs font-mono bg-purple-100 text-purple-900 font-bold px-3 py-1 rounded-full">
                Single Source of Truth Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* English Rates */}
              <div className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50">
                <div className="font-serif font-bold text-sm text-purple-900 mb-3 border-b border-zinc-200 pb-2">
                  English Rates (Non-Tech / Tech)
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Research Paper:</span>
                    <strong className="text-black">₹4,999 (Non-Tech) / ₹8,998 (w/ Model)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Review Paper:</span>
                    <strong className="text-black">₹3,999 (Non-Tech) / ₹4,499 (Tech)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Synopsis:</span>
                    <strong className="text-black">₹3,999 (Non-Tech) / ₹4,499 (Tech)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Thesis Writing:</span>
                    <strong className="text-black">₹19,999 (Non-Tech) / ₹28,998 (w/ Model)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Book (100 / 200 / 300 pp):</span>
                    <strong className="text-black">₹3,999 / ₹7,499 / ₹10,999 (Non-Tech)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Articles (per word):</span>
                    <strong className="text-black">₹0.60 / word (Non-Tech) / ₹0.70 / word (Tech)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>PPT Making (per slide):</span>
                    <strong className="text-black">₹120 / slide (Non-Tech) / ₹150 / slide (Tech)</strong>
                  </div>
                </div>
              </div>

              {/* Hindi & Turnitin Rates */}
              <div className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50">
                <div className="font-serif font-bold text-sm text-purple-900 mb-3 border-b border-zinc-200 pb-2">
                  Hindi &amp; Turnitin Rates
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Hindi Research Paper:</span>
                    <strong className="text-black">₹6,999 (Non-Tech) / ₹10,998 (w/ Model)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Hindi Thesis:</span>
                    <strong className="text-black">₹25,999 (Non-Tech) / ₹33,998 (w/ Model)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Hindi Articles (per word):</span>
                    <strong className="text-black">₹0.75 / word (Non-Tech) / ₹0.80 / word (Tech)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Hindi PPT (per slide):</span>
                    <strong className="text-black">₹150 / slide (Non-Tech) / ₹170 / slide (Tech)</strong>
                  </div>
                  <div className="flex justify-between bg-purple-50 p-2 rounded border border-purple-200 mt-2">
                    <span className="font-bold text-purple-900">Turnitin Plagiarism + AI:</span>
                    <strong className="text-purple-900 font-black">₹200 / file flat</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 4: SETTINGS & DIRECTORS ─────────────────────────────────── */}
        {activeTab === 'SETTINGS' && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto text-left">
            <h3 className="font-serif text-xl font-bold text-[#0A1128] mb-4">
              InkMonk Research Directorate &amp; Contacts
            </h3>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-sm mb-1">Office Location</div>
                <div>Karunamoyee, Sector 2, Salt Lake, Kolkata 700091, West Bengal</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-sm mb-1">Direct Contacts</div>
                <div>WhatsApp / Phone: +91 7980470880</div>
                <div>Email: inkmonkresearch@gmail.com</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-sm mb-1">Directors &amp; Founders</div>
                <div>• <strong>Tuhit Roy:</strong> Founder &amp; Research Director (Computational Architect)</div>
                <div>• <strong>Sampreeti Mukherjee:</strong> Co-Founder &amp; Editorial Director (Hindi Division Lead)</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
