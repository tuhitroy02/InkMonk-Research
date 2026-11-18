'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default function AnimatedLampLogin() {
  const router = useRouter();
  const params = useSearchParams();

  // Lamp State (ON / OFF) & Audio Toggle
  const [lampOn, setLampOn] = useState<boolean>(true);
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Portal Role: 'CLIENT' | 'ADMIN'
  const [portalRole, setPortalRole] = useState<'CLIENT' | 'ADMIN'>(
    params.get('portal') === 'admin' ? 'ADMIN' : 'CLIENT'
  );

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Admin Specific
  const [adminEmail, setAdminEmail] = useState('inkmonkresearch@gmail.com');
  const [adminPassword, setAdminPassword] = useState('InkMonk@2026');

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    params.has('error') ? 'Session expired or invalid. Please sign in again.' : null
  );
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Web Audio Click Synthesizer for Lamp Pull Cord
  const playClickSound = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(lampOn ? 320 : 640, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {}
  };

  const handleToggleLamp = () => {
    setIsPulling(true);
    playClickSound();
    setTimeout(() => {
      setLampOn((prev) => !prev);
      setIsPulling(false);
    }, 120);
  };

  // Client Password Login
  async function handleClientLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Email address and password are required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, portal: 'CLIENT' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid credentials');

      if (data.user) {
        localStorage.setItem('inkmonk_user', JSON.stringify(data.user));
      }
      router.push('/client');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  }

  // Supabase Google OAuth Login
  async function handleGoogleAuth() {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google authentication failed');
    }
  }

  // Admin Portal Login
  async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPassword) {
      setError('Admin email and master password required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword, portal: 'ADMIN' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unauthorized admin credentials');

      if (data.user) {
        localStorage.setItem('inkmonk_user', JSON.stringify(data.user));
      }
      router.push('/admin');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Admin access denied');
    } finally {
      setLoading(false);
    }
  }

  // Instant 1-Click Access
  const quickClientAccess = async () => {
    setEmail('scholar@university.edu');
    setPassword('InkMonk@2026');
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'scholar@university.edu', password: 'InkMonk@2026', portal: 'CLIENT' }),
      });
      const data = await res.json();
      if (data.user) {
        localStorage.setItem('inkmonk_user', JSON.stringify(data.user));
      }
      router.push('/client');
    } catch {
      router.push('/client');
    } finally {
      setLoading(false);
    }
  };

  const quickAdminAccess = async () => {
    setAdminEmail('inkmonkresearch@gmail.com');
    setAdminPassword('InkMonk@2026');
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'inkmonkresearch@gmail.com', password: 'InkMonk@2026', portal: 'ADMIN' }),
      });
      const data = await res.json();
      if (data.user) {
        localStorage.setItem('inkmonk_user', JSON.stringify(data.user));
      }
      router.push('/admin');
    } catch {
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#05070E] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Top Header Bar */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-slate-800 bg-black/40 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="InkMonk Research Logo"
            width={38}
            height={38}
            className="h-9 w-auto object-contain rounded-lg"
          />
          <div className="flex flex-col text-center leading-tight">
            <span className="font-serif font-black text-sm tracking-tight text-white">
              <span className="text-[#38BDF8]">Ink</span><span className="text-[#F95721]">Monk</span>
            </span>
            <span className="text-[8px] font-black tracking-widest text-slate-400 uppercase">
              RESEARCH GATEWAY
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-900/60 transition-colors"
            title="Toggle Lamp Audio Click"
          >
            {soundEnabled ? '🔊 Sound On' : '🔇 Muted'}
          </button>
          <Link
            href="/"
            className="text-xs text-slate-300 hover:text-white font-bold transition-colors"
          >
            ← Back to Website
          </Link>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="relative flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 py-8 gap-8 lg:gap-16 max-w-7xl mx-auto w-full z-20">
        
        {/* ─── LEFT: 3D ANIMATED RETRO DESK LAMP ────────────────────────── */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative min-h-[380px] lg:min-h-[500px]">
          
          {/* Volumetric Warm Golden Light Beam */}
          <div
            className={`absolute top-[75px] w-[260px] sm:w-[360px] lg:w-[440px] h-[360px] sm:h-[460px] pointer-events-none transition-opacity duration-700 ${
              lampOn ? 'opacity-90' : 'opacity-0'
            }`}
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.45) 0%, rgba(245, 158, 11, 0.22) 35%, rgba(217, 119, 6, 0.08) 65%, transparent 100%)',
              clipPath: 'polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)',
            }}
          />

          {/* Lamp Hardware Model */}
          <div className="relative flex flex-col items-center z-20">
            {/* Lamp Shade Dome */}
            <div className="relative">
              <div
                className="w-36 h-20 rounded-t-full shadow-2xl relative transition-all duration-300"
                style={{
                  background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 70%, #020617 100%)',
                  border: '2px solid rgba(251, 191, 36, 0.3)',
                }}
              >
                {/* Brass Finial Top */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2.5 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-t shadow" />

                {/* Light Diffuser Rim */}
                <div
                  className={`absolute -bottom-1 left-0 right-0 h-3 rounded-full transition-all duration-300 ${
                    lampOn
                      ? 'bg-amber-300 shadow-[0_0_35px_#F59E0B,0_0_70px_#D97706]'
                      : 'bg-slate-700'
                  }`}
                />
              </div>

              {/* Interactive Pull Cord Chain */}
              <button
                onClick={handleToggleLamp}
                className="absolute top-16 right-4 flex flex-col items-center group cursor-pointer focus:outline-none"
                title="Click to pull cord and switch lamp light"
              >
                <div
                  className="w-0.5 bg-amber-400/80 transition-all duration-150"
                  style={{ height: isPulling ? '44px' : '32px' }}
                />
                <div
                  className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-yellow-300 to-amber-600 shadow-md transform group-hover:scale-125 transition-transform"
                />
              </button>
            </div>

            {/* Stand Stem Rod */}
            <div className="w-2.5 h-48 bg-gradient-to-r from-slate-700 via-amber-400/50 to-slate-800 shadow-inner" />

            {/* Heavy Cast Brass Pedestal Base */}
            <div className="w-28 h-5 rounded-full bg-gradient-to-r from-slate-800 via-amber-600/40 to-slate-900 border border-amber-500/40 shadow-2xl" />
          </div>

          {/* Lamp Status Caption */}
          <div className="mt-4 text-center">
            <span className="text-[11px] font-bold text-amber-200/80 uppercase tracking-widest">
              {lampOn ? '● Incandescent Light Active' : '○ Lamp Off — Pull Cord to Illuminate'}
            </span>
          </div>
        </div>

        {/* ─── RIGHT: AUTHENTICATION PORTAL CARD ──────────────────────────── */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0B1120] border-2 border-slate-700 shadow-2xl text-center relative z-20">
            
            {/* Role Switcher (Client Scholar vs Admin Directorate) */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700 mb-6">
              <button
                type="button"
                onClick={() => {
                  setPortalRole('CLIENT');
                  setError(null);
                }}
                className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  portalRole === 'CLIENT'
                    ? 'bg-[#F95721] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🎓 Client Scholar Portal
              </button>
              <button
                type="button"
                onClick={() => {
                  setPortalRole('ADMIN');
                  setError(null);
                }}
                className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  portalRole === 'ADMIN'
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🛡️ Admin Directorate
              </button>
            </div>

            {/* Portal Title & Subtitle */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-1.5">
                {portalRole === 'ADMIN' ? 'Director Directorate Portal' : 'Scholar Client Portal'}
              </h1>
              <p className="text-slate-400 text-xs font-medium">
                {portalRole === 'ADMIN'
                  ? 'Access executive lead management, pricing audits & project records'
                  : 'Track your thesis chapters, Turnitin reports & milestones'}
              </p>
            </div>

            {/* Error & Feedback */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-bold text-center">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-bold text-center">
                {successMsg}
              </div>
            )}

            {/* ── ADMIN LOGIN FORM ── */}
            {portalRole === 'ADMIN' ? (
              <form onSubmit={handleAdminLogin} className="space-y-4 text-center">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Director Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="inkmonkresearch@gmail.com"
                    className="input-field text-xs text-center !bg-slate-900 !text-white !border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Master Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="input-field text-xs text-center !bg-slate-900 !text-white !border-slate-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-clay-orange !py-3 text-xs font-bold cursor-pointer"
                >
                  {loading ? 'Verifying Admin Privileges…' : 'Unlock Director Portal →'}
                </button>

                <button
                  type="button"
                  onClick={quickAdminAccess}
                  className="w-full text-xs font-bold text-blue-400 hover:underline pt-2 cursor-pointer"
                >
                  ⚡ One-Click Instant Admin Access →
                </button>
              </form>
            ) : (
              /* ── CLIENT LOGIN FORM WITH SUPABASE AUTH ── */
              <div className="space-y-4">
                {/* Method 1: Google OAuth */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white text-slate-900 font-extrabold text-xs hover:bg-slate-100 transition-colors shadow-md cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative my-3 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700" />
                  </div>
                  <div className="relative px-3 bg-[#0B1120] text-[9px] font-black uppercase tracking-widest text-slate-500">
                    Or Scholar Credentials
                  </div>
                </div>

                <form onSubmit={handleClientLogin} className="space-y-4 text-center">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Scholar Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. scholar@university.edu"
                      className="input-field text-xs text-center !bg-slate-900 !text-white !border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Account Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password (e.g. InkMonk@2026)"
                      className="input-field text-xs text-center !bg-slate-900 !text-white !border-slate-700"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-clay-orange !py-3 text-xs font-bold cursor-pointer"
                  >
                    {loading ? 'Entering Portal…' : 'Sign In to Client Portal →'}
                  </button>

                  <button
                    type="button"
                    onClick={quickClientAccess}
                    className="w-full text-xs font-bold text-[#F95721] hover:underline pt-2 cursor-pointer"
                  >
                    ⚡ One-Click Instant Scholar Access →
                  </button>
                </form>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-medium">
              Karunamoyee, Salt Lake Sector 2, Kolkata 700091
            </div>

          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="relative z-30 px-6 py-4 text-center border-t border-slate-800 bg-black/40 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">
          ← Return to InkMonk Research Homepage
        </Link>
        <span className="mx-2">•</span>
        <Link href="/privacy-policy" className="hover:text-white transition-colors">
          Privacy Policy
        </Link>
        <span className="mx-2">•</span>
        <Link href="/terms" className="hover:text-white transition-colors">
          Terms of Service
        </Link>
      </footer>
    </div>
  );
}
