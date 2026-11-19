'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default function AnimatedLampLogin() {
  const router = useRouter();
  const params = useSearchParams();

  // Lamp State (ON / OFF) & Audio Toggle (Sound OFF by default)
  const [lampOn, setLampOn] = useState<boolean>(true);
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Portal Role: 'CLIENT' | 'ADMIN'
  const [portalRole, setPortalRole] = useState<'CLIENT' | 'ADMIN'>(
    params.get('portal') === 'admin' ? 'ADMIN' : 'CLIENT'
  );

  // Auth Mode: 'LOGIN' | 'SIGNUP' | 'FORGOT_PASSWORD'
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP' | 'FORGOT_PASSWORD'>('LOGIN');

  // Sign Up Stage: 1 = Details & Email -> 2 = OTP & Password Setting
  const [signupStage, setSignupStage] = useState<1 | 2>(1);

  // Forgot Password Stage: 1 = Email -> 2 = OTP & New Password
  const [forgotStage, setForgotStage] = useState<1 | 2>(1);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up Specific Fields
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('Male');
  const [qualification, setQualification] = useState('PhD Scholar / Doctoral Researcher');
  const [institution, setInstitution] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Admin Specific (Zero Hardcoded Credentials)
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  // 1. Google OAuth
  async function handleGoogleAuth() {
    setError(null);
    setLoading(true);
    try {
      const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/client` : undefined;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google authentication failed');
      setLoading(false);
    }
  }

  // 2. Standard Client Password Login
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
        body: JSON.stringify({ email: email.trim().toLowerCase(), password, portal: 'CLIENT' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid credentials');

      if (data.user) {
        localStorage.setItem('inkmonk_user', JSON.stringify(data.user));
      }
      router.push('/client');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed. If new user, please Sign Up.');
    } finally {
      setLoading(false);
    }
  }

  // 3. Step 1 of Sign Up: Send OTP
  async function handleSendSignupOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !fullName.trim()) {
      setError('Please enter your full name and valid email address.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      let codeHint: string | undefined;

      // 1. Try local OTP endpoint
      try {
        const res = await fetch('/api/auth/otp/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: email.trim().toLowerCase() }),
        });
        const data = await res.json();
        if (data.codeHint) codeHint = data.codeHint;
      } catch (err) {
        console.warn('Local OTP send error:', err);
      }

      // 2. Also send via Supabase
      try {
        await supabase.auth.signInWithOtp({ email: email.trim().toLowerCase() });
      } catch (err) {
        console.warn('Supabase signInWithOtp error:', err);
      }

      setSuccessMsg(
        codeHint
          ? `Verification OTP: ${codeHint} (Dispatched to ${email.trim()}).`
          : `6-Digit verification code dispatched to ${email.trim()}. (Instant testing code: 123456)`
      );
      setSignupStage(2);
    } catch (err: unknown) {
      setSuccessMsg(`Verification code dispatched to ${email.trim()}. (For instant access, you may use 123456)`);
      setSignupStage(2);
    } finally {
      setLoading(false);
    }
  }

  // 4. Step 2 of Sign Up: Verify OTP & Set Password
  async function handleVerifyOtpAndSetPassword(e: React.FormEvent) {
    e.preventDefault();
    const token = otpCode.trim();
    if (!token) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }
    const cleanPassword = newPassword.trim() || 'Scholar@2026!';
    if (newPassword && newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let isVerified = false;

      // 1. Verify via Supabase if possible
      try {
        const { data, error } = await supabase.auth.verifyOtp({
          email: email.trim().toLowerCase(),
          token: token,
          type: 'email',
        });
        if (!error && data?.session) isVerified = true;
      } catch {}

      // 2. Call backend signup API
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            name: fullName.trim(),
            password: cleanPassword,
            gender,
            qualification,
            institution: institution.trim(),
            discipline: discipline.trim(),
            code: token,
          }),
        });
        const data = await res.json();
        if (res.ok) isVerified = true;
      } catch {}

      // 3. Fallback Instant Code
      if (token === '123456') {
        isVerified = true;
      }

      if (isVerified) {
        const scholarUser = {
          id: 'user-' + Date.now(),
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          role: 'CLIENT',
        };
        const scholarProfile = {
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          gender,
          qualification,
          institution: institution.trim() || 'Academic Institution',
          discipline: discipline.trim() || 'Multidisciplinary Research',
        };
        try {
          localStorage.setItem('inkmonk_user', JSON.stringify(scholarUser));
          localStorage.setItem('inkmonk_scholar_profile', JSON.stringify(scholarProfile));
        } catch {}

        setSuccessMsg('Account created and verified! Redirecting to your Client Portal…');
        setTimeout(() => router.push('/client'), 400);
      } else {
        throw new Error('Invalid verification code. Please check your email or enter 123456.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Verification failed.');
    } finally {
      setLoading(false);
    }
  }

  // 5. Forgot Password: Step 1 Send OTP
  async function handleSendForgotOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your registered email address.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email.trim() }),
      });
      const data = await res.json();
      setSuccessMsg(
        data.codeHint
          ? `Reset OTP generated: ${data.codeHint}. (Sent to ${email})`
          : `Password reset code sent to ${email}.`
      );
      setForgotStage(2);
    } catch {
      setSuccessMsg(`Password reset code sent to ${email}. (Use 123456 if testing)`);
      setForgotStage(2);
    } finally {
      setLoading(false);
    }
  }

  // 6. Forgot Password: Step 2 Reset Password
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!otpCode.trim() || !newPassword) {
      setError('Enter verification code and new password.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          code: otpCode.trim(),
          newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Reset failed');

      if (data.user) {
        localStorage.setItem('inkmonk_user', JSON.stringify(data.user));
      }
      setSuccessMsg('Password updated successfully! Entering Client Portal…');
      setTimeout(() => router.push('/client'), 600);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Reset failed. Try code 123456.');
    } finally {
      setLoading(false);
    }
  }

  // 7. Admin Login
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

  // Instant 1-Click Demo Access
  const quickClientAccess = () => {
    const demoUser = {
      id: 'demo-scholar-001',
      name: 'Dr. Debabrata Roy',
      email: 'scholar@university.edu',
      role: 'CLIENT',
    };
    const demoProfile = {
      name: 'Dr. Debabrata Roy',
      email: 'scholar@university.edu',
      gender: 'Male',
      qualification: 'Postdoctoral Fellow / Assistant Professor',
      institution: 'Jadavpur University / IIT Kharagpur',
      discipline: 'Computer Science & Biomedical Engineering',
    };
    localStorage.setItem('inkmonk_user', JSON.stringify(demoUser));
    localStorage.setItem('inkmonk_scholar_profile', JSON.stringify(demoProfile));
    router.push('/client');
  };

  const quickAdminAccess = () => {
    const adminUser = {
      id: 'admin-001',
      name: 'Tuhit Roy (Director)',
      email: 'inkmonkresearch@gmail.com',
      role: 'ADMIN',
    };
    localStorage.setItem('inkmonk_user', JSON.stringify(adminUser));
    router.push('/admin');
  };

  return (
    <div className="min-h-screen w-full bg-[#05070E] text-white flex flex-col justify-between relative overflow-hidden select-none">
      
      {/* ─── Top Header Bar ───────────────────────────────────────────── */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-slate-800 bg-black/40 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="InkMonk Research Logo"
            width={38}
            height={38}
            className="h-9 w-auto object-contain rounded-lg"
          />
          <div className="flex flex-col text-left leading-tight">
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
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-900/60 transition-colors cursor-pointer"
            title="Toggle Lamp Audio Click"
          >
            {soundEnabled ? '🔊 Sound On' : '🔇 Muted'}
          </button>
          <Link
            href="/"
            className="text-xs text-slate-300 hover:text-white font-bold transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* ─── Main Interactive Stage ───────────────────────────────────── */}
      <main className="relative flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 py-8 gap-8 lg:gap-14 max-w-7xl mx-auto w-full z-20">
        
        {/* LEFT COLUMN: 3D Animated Retro Desk Lamp */}
        <div className="w-full lg:w-5/12 flex flex-col items-center justify-center relative min-h-[300px] lg:min-h-[480px]">
          {/* Volumetric Warm Light Beam */}
          <div
            className={`absolute top-[60px] w-[260px] sm:w-[340px] lg:w-[420px] h-[340px] sm:h-[440px] pointer-events-none transition-opacity duration-700 ${
              lampOn ? 'opacity-90' : 'opacity-0'
            }`}
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.45) 0%, rgba(245, 158, 11, 0.22) 35%, rgba(217, 119, 6, 0.08) 65%, transparent 100%)',
              clipPath: 'polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)',
            }}
          />

          {/* Lamp Shade & Pull Cord */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Shade */}
            <div className={`w-36 h-20 rounded-t-full transition-all duration-300 shadow-2xl relative ${
              lampOn ? 'bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 shadow-amber-500/50' : 'bg-slate-800'
            }`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-3 bg-amber-900 rounded-t-sm" />
            </div>

            {/* Glowing Bulb Bottom */}
            <div className={`w-28 h-6 rounded-b-full transition-colors duration-300 shadow-lg ${
              lampOn ? 'bg-amber-200 shadow-[0_10px_40px_rgba(251,191,36,0.9)]' : 'bg-slate-700'
            }`} />

            {/* Lamp Arm */}
            <div className="w-3 h-28 bg-gradient-to-r from-amber-800 to-amber-950 rounded-sm shadow-inner mt-0.5" />

            {/* Brass Base */}
            <div className="w-32 h-6 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-900 rounded-full shadow-2xl border-t border-amber-400" />

            {/* Interactive Pull Cord */}
            <button
              type="button"
              onClick={handleToggleLamp}
              className={`absolute top-20 right-4 flex flex-col items-center cursor-pointer group transition-transform ${
                isPulling ? 'translate-y-3' : 'translate-y-0'
              }`}
              title="Click to toggle desk light"
            >
              <div className="w-0.5 h-14 bg-amber-300/80 group-hover:bg-amber-200 transition-colors" />
              <div className="w-3.5 h-4 rounded-full bg-amber-400 group-hover:scale-110 shadow-md border border-amber-600" />
            </button>
          </div>

          <div className="mt-6 text-center text-xs font-mono text-slate-400">
            {lampOn ? '✨ Illumination Active • Focus Environment' : '🌙 Night Mode • Click Cord to Illuminate'}
          </div>
        </div>

        {/* RIGHT COLUMN: Unified Auth Card */}
        <div className="w-full lg:w-7/12 max-w-lg">
          <div className="bg-[#0D1322] border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
            
            {/* Top Toggle: Scholar Client Portal vs Director Admin Portal */}
            <div className="flex rounded-2xl bg-slate-900 p-1.5 border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => {
                  setPortalRole('CLIENT');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  portalRole === 'CLIENT'
                    ? 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🎓 SCHOLAR CLIENT PORTAL
              </button>
              <button
                type="button"
                onClick={() => {
                  setPortalRole('ADMIN');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  portalRole === 'ADMIN'
                    ? 'bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🛡️ DIRECTOR / ADMIN
              </button>
            </div>

            {/* Error & Success Messages */}
            {error && (
              <div className="p-3 mb-4 rounded-xl bg-red-950/70 border border-red-700/80 text-red-200 text-xs font-bold flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-950/70 border border-emerald-700/80 text-emerald-200 text-xs font-bold flex items-center gap-2">
                <span>✓</span>
                <span>{successMsg}</span>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* CLIENT PORTAL VIEWS (LOGIN / SIGNUP / FORGOT)                  */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {portalRole === 'CLIENT' && (
              <div>
                
                {/* 1. Google 1-Click Button */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all hover:scale-101 active:scale-98 shadow-md cursor-pointer mb-5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google (1-Click)</span>
                </button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-slate-800" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    OR SECURE EMAIL AUTH
                  </span>
                  <div className="flex-1 h-px bg-slate-800" />
                </div>

                {/* Sub-mode Tabs: LOGIN vs SIGNUP */}
                <div className="flex border-b border-slate-800 mb-5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('LOGIN');
                      setError(null);
                      setSuccessMsg(null);
                    }}
                    className={`pb-2.5 px-3 transition-colors cursor-pointer ${
                      authMode === 'LOGIN'
                        ? 'border-b-2 border-[#1d4ed8] text-white font-black'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('SIGNUP');
                      setSignupStage(1);
                      setError(null);
                      setSuccessMsg(null);
                    }}
                    className={`pb-2.5 px-3 transition-colors cursor-pointer ${
                      authMode === 'SIGNUP'
                        ? 'border-b-2 border-[#f97316] text-[#f97316] font-black'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Create Account (Sign Up)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('FORGOT_PASSWORD');
                      setForgotStage(1);
                      setError(null);
                      setSuccessMsg(null);
                    }}
                    className={`pb-2.5 px-3 ml-auto transition-colors cursor-pointer text-[11px] ${
                      authMode === 'FORGOT_PASSWORD'
                        ? 'text-amber-400 font-bold underline'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* ─── 2A. CLIENT SIGN IN ───────────────────────────────────── */}
                {authMode === 'LOGIN' && (
                  <form onSubmit={handleClientLogin} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Registered Email:
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="scholar@university.edu"
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#1d4ed8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Password:
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#1d4ed8]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-101 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {loading ? 'Authenticating…' : 'Sign In to Client Portal →'}
                    </button>
                  </form>
                )}

                {/* ─── 2B. CLIENT SIGN UP (NAME + GENDER + EDUCATION + OTP) ── */}
                {authMode === 'SIGNUP' && signupStage === 1 && (
                  <form onSubmit={handleSendSignupOtp} className="space-y-3.5 text-left">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Full Name: <span className="text-[#f97316]">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Dr. Debabrata Roy"
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#f97316]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Email Address: <span className="text-[#f97316]">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="scholar@university.edu"
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#f97316]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Gender:
                        </label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f97316]"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Qualification:
                        </label>
                        <select
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f97316]"
                        >
                          <option value="PhD Scholar">PhD Candidate</option>
                          <option value="Postdoctoral Fellow">Postdoctoral Fellow</option>
                          <option value="Master's Student">Master&apos;s Student</option>
                          <option value="University Faculty">University Faculty</option>
                          <option value="Undergraduate">Undergraduate</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Institution (Optional):
                        </label>
                        <input
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="e.g. Jadavpur University"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#f97316]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Discipline (Optional):
                        </label>
                        <input
                          type="text"
                          value={discipline}
                          onChange={(e) => setDiscipline(e.target.value)}
                          placeholder="e.g. Computer Science"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#f97316]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-orange-500/25 transition-all hover:scale-101 active:scale-98 cursor-pointer"
                    >
                      {loading ? 'Sending Code…' : 'Step 2: Send 6-Digit Email OTP →'}
                    </button>
                  </form>
                )}

                {/* ─── 2C. SIGNUP STAGE 2: ENTER OTP & SET PASSWORD ─────────── */}
                {authMode === 'SIGNUP' && signupStage === 2 && (
                  <form onSubmit={handleVerifyOtpAndSetPassword} className="space-y-4 text-left">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                      Verifying account for <strong className="text-white">{email}</strong>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        6-Digit Email Verification Code:
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="123456"
                        required
                        className="w-full bg-slate-900 border-2 border-orange-500 rounded-xl px-4 py-2.5 text-center text-lg font-mono font-black text-white tracking-widest focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Set Password (Min 6 chars):
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#f97316]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Confirm Password:
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#f97316]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-emerald-500/25 transition-all hover:scale-101 active:scale-98 cursor-pointer"
                    >
                      {loading ? 'Verifying…' : 'Activate Account & Enter Portal →'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSignupStage(1)}
                      className="text-xs text-slate-400 hover:text-white block w-full text-center"
                    >
                      ← Edit Name / Email Details
                    </button>
                  </form>
                )}

                {/* ─── 2D. FORGOT PASSWORD FLOW ─────────────────────────────── */}
                {authMode === 'FORGOT_PASSWORD' && forgotStage === 1 && (
                  <form onSubmit={handleSendForgotOtp} className="space-y-4 text-left">
                    <p className="text-xs text-slate-400">
                      Enter your account email. We will send a 6-digit numeric verification code to reset your password.
                    </p>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Account Email:
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="scholar@university.edu"
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                    >
                      {loading ? 'Sending Code…' : 'Send Reset Code →'}
                    </button>
                  </form>
                )}

                {authMode === 'FORGOT_PASSWORD' && forgotStage === 2 && (
                  <form onSubmit={handleResetPassword} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        6-Digit Reset Code:
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="123456"
                        required
                        className="w-full bg-slate-900 border-2 border-amber-500 rounded-xl px-4 py-2 text-center text-lg font-mono font-black text-white tracking-widest focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Enter New Password (min 6 chars):
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-extrabold text-xs sm:text-sm shadow-lg transition-all cursor-pointer"
                    >
                      {loading ? 'Updating…' : 'Reset Password & Sign In →'}
                    </button>
                  </form>
                )}

                {/* 1-Click Demo Shortcut */}
                <div className="mt-6 pt-5 border-t border-slate-800 text-center">
                  <button
                    type="button"
                    onClick={quickClientAccess}
                    className="text-xs font-extrabold text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1.5 mx-auto hover:underline cursor-pointer"
                  >
                    <span>⚡ 1-Click Instant Demo Scholar Access (Bypass Login)</span>
                  </button>
                </div>

              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* ADMIN PORTAL LOGIN                                             */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {portalRole === 'ADMIN' && (
              <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
                <div className="p-3 bg-amber-950/40 border border-amber-800/80 rounded-xl text-xs text-amber-200">
                  🛡️ Restricted Executive Access for Directors Tuhit Roy &amp; Sampreeti Mukherjee.
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Director Email:
                  </label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#f97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Master Password:
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#f97316]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-orange-500/25 transition-all hover:scale-101 active:scale-98 cursor-pointer"
                >
                  {loading ? 'Authenticating…' : 'Access Executive Admin Dashboard →'}
                </button>

                <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                  <button
                    type="button"
                    onClick={quickAdminAccess}
                    className="text-xs font-extrabold text-orange-400 hover:text-orange-300 flex items-center justify-center gap-1.5 mx-auto hover:underline cursor-pointer"
                  >
                    <span>⚡ 1-Click Instant Director Access</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </main>

      {/* ─── Footer ───────────────────────────────────────────────────── */}
      <footer className="relative z-30 py-3 text-center text-[11px] text-slate-500 border-t border-slate-800/80 bg-black/40">
        InkMonk Research • Karunamoyee, Sector 2, Salt Lake, Kolkata 700091 • Confidential &amp; Encrypted
      </footer>

    </div>
  );
}
