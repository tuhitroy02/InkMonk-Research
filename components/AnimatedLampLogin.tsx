'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AcademicLabCrestLogo } from '@/components/RealIcons';

export default function AnimatedLampLogin() {
  const router = useRouter();
  const params = useSearchParams();

  // Lamp State (ON / OFF) & Audio Toggle
  const [lampOn, setLampOn] = useState<boolean>(true);
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Auth Mode: 'SIGN_IN' | 'CREATE_ACCOUNT'
  const [authMode, setAuthMode] = useState<'SIGN_IN' | 'CREATE_ACCOUNT'>('SIGN_IN');

  // Portal Role: 'CLIENT' | 'ADMIN'
  const [portalRole, setPortalRole] = useState<'CLIENT' | 'ADMIN'>(
    params.get('portal') === 'admin' ? 'ADMIN' : 'CLIENT'
  );

  // Client Login Method: 'OTP' | 'PASSWORD'
  const [clientMethod, setClientMethod] = useState<'OTP' | 'PASSWORD'>('OTP');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [codeHint, setCodeHint] = useState<string | null>(null);

  // Admin Specific
  const [adminEmail, setAdminEmail] = useState('inkmonkresearch@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    params.has('error') ? 'Session expired or invalid. Please sign in again.' : null
  );
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Web Audio Click Synthesizer for Lamp Pull Cord
  const playClick = (turnOn: boolean) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = turnOn ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(turnOn ? 950 : 380, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.085);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Toggle Lamp with physical pull cord spring
  const toggleLamp = () => {
    setIsPulling(true);
    const nextState = !lampOn;
    playClick(nextState);
    setTimeout(() => {
      setLampOn(nextState);
      setIsPulling(false);
    }, 120);
  };

  // 1. Send OTP
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    const identifier = phone.trim() || email.trim();
    if (!identifier) {
      setError('Please provide your email address or phone number.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to dispatch verification code.');
      setCodeSent(true);
      if (data.codeHint) {
        setCodeHint(data.codeHint);
        setCode(data.codeHint);
        setSuccessMsg(`Access Code: ${data.codeHint} (Pre-filled below for instant verification)`);
      } else {
        setSuccessMsg('Verification code sent to your inbox/phone.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send verification code.');
    } finally {
      setLoading(false);
    }
  }

  // 2. Verify OTP
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().length < 4) {
      setError('Please enter the 6-digit access code.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: phone.trim() || email.trim(),
          code: code.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed.');
      router.replace(data.user.role === 'ADMIN' ? '/admin' : '/client');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  }

  // 3. Password Login (Client)
  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid email or password.');
      router.replace(data.user.role === 'ADMIN' ? '/admin' : '/client');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  }

  // 4. Admin Login
  async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail.trim(), password: adminPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid administrator credentials.');
      router.replace('/admin');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Admin sign-in failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div 
      className={`min-h-screen relative overflow-hidden transition-colors duration-700 select-none flex flex-col justify-between ${
        lampOn ? 'bg-[#090b10]' : 'bg-[#030408]'
      }`}
      style={{ fontFamily: '"Cavolini", "Cavolini Condensed", sans-serif' }}
    >
      {/* Background Room Ambient Grid & Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 35%, rgba(245, 158, 11, ${lampOn ? 0.15 : 0.02}) 0%, transparent 60%),
                              linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 48px 48px, 48px 48px',
          }}
        />
      </div>

      {/* Floating Fireflies / Dust Motes when Lamp is ON */}
      <AnimatePresence>
        {lampOn && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {[
              { id: 1, top: '22%', left: '38%', size: 4, delay: 0 },
              { id: 2, top: '35%', left: '46%', size: 3, delay: 1.2 },
              { id: 3, top: '48%', left: '52%', size: 5, delay: 0.6 },
              { id: 4, top: '28%', left: '60%', size: 3, delay: 1.8 },
              { id: 5, top: '65%', left: '44%', size: 4, delay: 2.2 },
              { id: 6, top: '55%', left: '68%', size: 3, delay: 0.9 },
              { id: 7, top: '40%', left: '75%', size: 4, delay: 1.5 },
            ].map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 15, x: -10 }}
                animate={{
                  opacity: [0.2, 0.9, 0.3],
                  y: [-15, 15, -15],
                  x: [-10, 15, -10],
                }}
                transition={{
                  duration: 4 + p.id * 0.7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: p.delay,
                }}
                style={{
                  top: p.top,
                  left: p.left,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                }}
                className="absolute rounded-full bg-amber-300 shadow-[0_0_12px_#F59E0B]"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Top Header Controls: Crest Logo + Sound FX Toggle + Return Link */}
      <header className="relative z-30 px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-black/20">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <AcademicLabCrestLogo className="w-7 h-7 text-amber-400 group-hover:scale-105 transition-transform" />
          <div className="text-left">
            <div className="text-sm font-bold tracking-wider text-white">INKMONK RESEARCH</div>
            <div className="text-[10px] text-amber-400/80 font-mono">SECURE SCHOLARLY GATEWAY</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
            title="Toggle Sound Effects"
          >
            <span>{soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF'}</span>
          </button>

          {/* Lamp Status Pill */}
          <button
            type="button"
            onClick={toggleLamp}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer ${
              lampOn
                ? 'bg-amber-500/10 border-amber-400/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-slate-800/50 border-slate-700 text-slate-400'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${lampOn ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'}`} />
            <span>{lampOn ? 'Lamp: ACTIVE' : 'Lamp: OFF (Click to Pull)'}</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Stage: Lamp on Left, Auth Card on Right */}
      <main className="relative z-20 flex-1 flex flex-col lg:flex-row items-center justify-center px-4 lg:px-12 py-8 max-w-7xl mx-auto w-full gap-8 lg:gap-16">

        {/* ─── LEFT: 3D ARTICULATED FLOOR LAMP & VOLUMETRIC BEAM ────────────── */}
        <div className="relative w-full lg:w-5/12 flex flex-col items-center justify-center min-h-[460px] lg:min-h-[620px]">
          
          {/* Volumetric Light Beam (Projected from the lamp across the screen) */}
          <AnimatePresence>
            {lampOn && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0.8 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute left-1/2 -top-10 lg:-top-6 w-[120vw] lg:w-[950px] h-[550px] lg:h-[700px] z-10 origin-left"
                style={{
                  background: 'conic-gradient(from 105deg at 16% 24%, rgba(254, 240, 138, 0.55) 0deg, rgba(245, 158, 11, 0.35) 28deg, rgba(217, 119, 6, 0.12) 55deg, transparent 75deg)',
                  clipPath: 'polygon(15% 22%, 100% 0%, 100% 100%, 0% 95%)',
                  filter: 'blur(18px)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Secondary Volumetric Ray Core */}
          <AnimatePresence>
            {lampOn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute left-1/2 top-4 lg:top-8 w-[90vw] lg:w-[750px] h-[450px] lg:h-[550px] z-10 origin-left"
                style={{
                  background: 'linear-gradient(125deg, rgba(254, 249, 195, 0.8) 0%, rgba(251, 191, 36, 0.35) 30%, transparent 75%)',
                  clipPath: 'polygon(14% 20%, 98% 10%, 100% 85%, 5% 90%)',
                  filter: 'blur(8px)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Lamp Structure (SVG & Vector Mechanics) */}
          <div className="relative z-30 flex flex-col items-center">
            
            {/* Lamp Shade / Domed Reflector */}
            <div className="relative flex flex-col items-center">
              
              {/* Finial / Brass Top Cap */}
              <div className="w-5 h-3 rounded-t-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 shadow-md" />
              
              {/* Main Matte Obsidian Dome Shade */}
              <div className="relative w-44 sm:w-56 h-24 sm:h-28 rounded-t-[120px] bg-gradient-to-b from-[#181a20] via-[#101216] to-[#0a0c10] border-t-2 border-x-2 border-amber-400/40 shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Metallic Highlight Ribbon */}
                <div className="absolute top-2 w-32 h-1 rounded-full bg-white/20 blur-[1px]" />
                
                {/* Inside Reflector Rim */}
                <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-r from-amber-700 via-amber-300 to-amber-700 shadow-inner" />
              </div>

              {/* Glowing Bulb / Socket */}
              <div 
                className={`relative -mt-1 w-16 sm:w-20 h-7 sm:h-8 rounded-b-full transition-all duration-500 flex items-center justify-center ${
                  lampOn
                    ? 'bg-gradient-to-b from-amber-100 to-amber-400 shadow-[0_0_50px_20px_rgba(251,191,36,0.9)]'
                    : 'bg-[#1e2330] shadow-inner'
                }`}
              >
                {lampOn ? (
                  <div className="w-8 h-2 rounded-full bg-white blur-[2px]" />
                ) : (
                  <div className="w-6 h-1 rounded-full bg-amber-900/60" />
                )}
              </div>

              {/* Interactive Pull String / Beaded Chain (Click to turn lamp on/off!) */}
              <div className="absolute right-8 top-20 sm:top-24 z-40 flex flex-col items-center">
                <motion.div
                  onClick={toggleLamp}
                  animate={isPulling ? { y: [0, 22, -4, 0] } : { y: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="cursor-pointer group flex flex-col items-center"
                  title="Pull string to toggle lamp!"
                >
                  {/* Cord */}
                  <div className={`w-[2px] transition-all ${
                    lampOn ? 'h-16 sm:h-20 bg-amber-300/80 shadow-[0_0_8px_#F59E0B]' : 'h-16 sm:h-20 bg-slate-500'
                  }`} />
                  
                  {/* Golden Beaded Tassel */}
                  <div className={`w-4 h-7 rounded-full border flex items-center justify-center transition-all ${
                    lampOn 
                      ? 'bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 border-amber-200 shadow-[0_0_15px_#F59E0B] scale-110' 
                      : 'bg-slate-700 border-slate-500'
                  }`}>
                    <div className="w-1 h-3 rounded-full bg-white/70" />
                  </div>

                  {/* Micro Tooltip */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-[10px] text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-400/40 whitespace-nowrap shadow-lg">
                    {lampOn ? 'PULL TO DIM' : 'PULL TO LIGHT'}
                  </div>
                </motion.div>
              </div>

            </div>

            {/* Lamp Stem / Rod */}
            <div className="w-3 sm:w-3.5 h-64 sm:h-80 bg-gradient-to-r from-[#181a20] via-slate-700 to-[#101216] border-x border-black shadow-lg relative flex flex-col justify-between items-center py-6">
              {/* Gold Accent Joints */}
              <div className="w-5 h-2 rounded-sm bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700" />
              <div className="w-5 h-2 rounded-sm bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700" />
              <div className="w-5 h-2 rounded-sm bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700" />
            </div>

            {/* Lamp Base Stand */}
            <div className="relative flex flex-col items-center -mt-1">
              {/* Collar */}
              <div className="w-8 h-2 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 rounded-t" />
              {/* Main Base Disk */}
              <div className="w-40 sm:w-52 h-6 sm:h-8 rounded-full bg-gradient-to-b from-[#252830] via-[#15171e] to-[#0a0b0e] border-t border-amber-400/40 shadow-2xl flex items-center justify-center">
                <div className="w-32 sm:w-44 h-1.5 rounded-full bg-amber-400/30 blur-[1px]" />
              </div>
            </div>

            {/* Floor Pool Glow under the Lamp */}
            <div className={`w-64 sm:w-80 h-12 rounded-full transition-all duration-700 blur-[25px] ${
              lampOn ? 'bg-amber-500/30' : 'bg-transparent'
            }`} />

          </div>

          {/* Educational / Interactive Hint */}
          <div className="mt-4 text-center font-mono text-xs text-slate-400">
            <span className="text-amber-400 font-bold">💡 Interactive 3D Lighting:</span>{' '}
            Click the golden pull-cord to illuminate the portal
          </div>

        </div>

        {/* ─── RIGHT: AUTHENTICATION CARD (ILLUMINATED BY THE LAMP) ───────── */}
        <div className="relative w-full lg:w-7/12 max-w-md z-30">
          
          <motion.div
            animate={{
              boxShadow: lampOn
                ? '0 25px 60px -12px rgba(245, 158, 11, 0.25), 0 0 30px rgba(251, 191, 36, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.15)'
                : '0 20px 40px -15px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
              borderColor: lampOn ? 'rgba(251, 191, 36, 0.4)' : 'rgba(51, 65, 85, 0.4)',
            }}
            transition={{ duration: 0.5 }}
            className={`rounded-3xl p-6 sm:p-8 backdrop-blur-2xl transition-all duration-500 border ${
              lampOn ? 'bg-[#0f131c]/90' : 'bg-[#06080e]/95'
            }`}
          >

            {/* Top Switcher: Sign In vs Create Account */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/40 border border-white/10 rounded-2xl mb-6 font-mono text-xs">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('SIGN_IN');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  authMode === 'SIGN_IN'
                    ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('CREATE_ACCOUNT');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  authMode === 'CREATE_ACCOUNT'
                    ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Role Switcher Pill: Client vs Admin */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 text-xs font-mono">
              <span className="text-slate-400">Portal Target:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPortalRole('CLIENT');
                    setError(null);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    portalRole === 'CLIENT'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-400/50'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Client Portal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPortalRole('ADMIN');
                    setError(null);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    portalRole === 'ADMIN'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-400/50'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Admin Portal
                </button>
              </div>
            </div>

            {/* Heading & Subtitle */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 tracking-tight">
                {portalRole === 'ADMIN'
                  ? 'Director Security Access'
                  : authMode === 'SIGN_IN'
                  ? 'Welcome Back'
                  : 'Create Your Account'}
              </h1>
              <p className="text-slate-400 text-xs font-medium">
                {portalRole === 'ADMIN'
                  ? 'Executive management for leads, projects & pricing'
                  : authMode === 'SIGN_IN'
                  ? 'Enter credentials to track milestones & Turnitin reports'
                  : 'Join thousands of researchers building the future'}
              </p>
            </div>

            {/* Error & Success Alerts */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold text-center"
              >
                {error}
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center"
              >
                {successMsg}
              </motion.div>
            )}

            {/* ── ADMIN LOGIN FORM ── */}
            {portalRole === 'ADMIN' ? (
              <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                    Administrator Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">✉</span>
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="inkmonkresearch@gmail.com"
                      className="input-field !pl-9 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                    Director Master Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Enter administrator password"
                      className="input-field !pl-9 !pr-10 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                    >
                      {showPassword ? '👁' : '🙈'}
                    </button>
                  </div>
                  <div className="text-[11px] text-emerald-300/80 mt-1 font-mono">
                    Authorized password: <code className="font-bold text-white">InkMonk@2026</code>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-bold font-mono text-xs uppercase tracking-wider hover:opacity-95 shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Verifying Admin Privileges…' : 'Unlock Director Portal →'}
                </button>
              </form>
            ) : clientMethod === 'OTP' ? (
              /* ── CLIENT OTP AUTH FORM ── */
              <div className="space-y-4">
                {!codeSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4 text-left">
                    {authMode === 'CREATE_ACCOUNT' && (
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">👤</span>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Dr. A. K. Banerjee"
                            className="input-field !pl-9 text-xs"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                        Email Address or Mobile Number
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">✉</span>
                        <input
                          type="text"
                          required
                          value={phone || email}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val.includes('@')) {
                              setEmail(val);
                              setPhone('');
                            } else {
                              setPhone(val);
                            }
                          }}
                          placeholder="scholar@university.edu or 9876543210"
                          className="input-field !pl-9 text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? 'Generating Code…' : 'Send Verification OTP →'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4 text-left">
                    {codeHint && (
                      <div className="p-3 bg-amber-500/10 border border-amber-400/40 rounded-xl text-center">
                        <div className="text-[11px] text-amber-300 font-mono font-bold uppercase">
                          Instant Verification Code
                        </div>
                        <div className="font-mono text-2xl font-black text-white my-1 tracking-widest">
                          {codeHint}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          (Code automatically applied below for instant entry)
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                        Enter 6-Digit Access Code
                      </label>
                      <input
                        type="text"
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="e.g. 123456"
                        className="input-field text-center font-mono text-lg tracking-widest"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? 'Verifying…' : 'Enter Client Portal →'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCodeSent(false);
                        setCodeHint(null);
                      }}
                      className="w-full text-center text-xs text-slate-400 hover:text-amber-300 pt-1 font-mono cursor-pointer"
                    >
                      ← Change Email / Mobile
                    </button>
                  </form>
                )}

                {/* Switch to Password or Google */}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setClientMethod('PASSWORD')}
                    className="text-xs text-amber-400 font-mono font-bold hover:underline cursor-pointer"
                  >
                    Or Sign in with Email &amp; Password →
                  </button>
                </div>
              </div>
            ) : (
              /* ── CLIENT PASSWORD FORM ── */
              <form onSubmit={handlePasswordLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">✉</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@inkmonk.com"
                      className="input-field !pl-9 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="input-field !pl-9 !pr-10 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                    >
                      {showPassword ? '👁' : '🙈'}
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    Master client demo password: <code className="font-bold text-amber-400">InkMonk@2026</code>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Authenticating…' : 'Sign In with Password →'}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setClientMethod('OTP')}
                    className="text-xs text-slate-400 hover:text-amber-300 font-mono cursor-pointer"
                  >
                    ← Back to OTP Instant Code Sign In
                  </button>
                </div>
              </form>
            )}

            {/* Social Divider & Google Auth */}
            {portalRole === 'CLIENT' && (
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="text-[11px] text-slate-500 font-mono uppercase tracking-wider mb-3">
                  Or Continue With
                </div>
                <a
                  href="/api/auth/google"
                  className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono font-bold text-slate-200 transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google Account</span>
                </a>
              </div>
            )}

            {/* Bottom Security Note */}
            <div className="mt-5 text-[10px] text-slate-500 font-mono flex items-center justify-center gap-1.5">
              <span>🔒 256-bit Encrypted Scholar Authentication</span>
            </div>

          </motion.div>

        </div>

      </main>

      {/* Footer Navigation */}
      <footer className="relative z-30 px-6 py-4 text-center border-t border-white/5 bg-black/20 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-amber-400 transition-colors">
          ← Return to InkMonk Research Homepage
        </Link>
        <span className="mx-2">•</span>
        <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
          Privacy Policy
        </Link>
        <span className="mx-2">•</span>
        <Link href="/terms" className="hover:text-slate-300 transition-colors">
          Terms of Service
        </Link>
      </footer>
    </div>
  );
}
