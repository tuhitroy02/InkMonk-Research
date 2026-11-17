'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { TurnitinShieldLogo, AcademicLabCrestLogo } from '@/components/RealIcons';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold">Accessing InkMonk Security Portal…</div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();

  // Active Tab: 'CLIENT' | 'ADMIN'
  const [activeTab, setActiveTab] = useState<'CLIENT' | 'ADMIN'>(
    params.get('portal') === 'admin' ? 'ADMIN' : 'CLIENT'
  );

  // Client Login Mode: 'OTP' | 'PASSWORD'
  const [clientAuthMode, setClientAuthMode] = useState<'OTP' | 'PASSWORD'>('OTP');

  // Client OTP State
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [codeHint, setCodeHint] = useState<string | null>(null);

  // Client Password State
  const [clientEmail, setClientEmail] = useState('');
  const [clientPassword, setClientPassword] = useState('');

  // Admin Credentials
  const [adminEmail, setAdminEmail] = useState('inkmonkresearch@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    params.has('error') ? 'Authentication session expired. Please sign in again.' : null
  );
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // 1. Send OTP for Client
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!identifier) {
      setError('Please enter your email address or phone number.');
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
        setCode(data.codeHint); // Pre-fill for instant seamless access
        setSuccessMsg(`Access code generated: ${data.codeHint}. (Click Verify to enter portal).`);
      } else {
        setSuccessMsg('Verification code sent to your inbox/phone.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  }

  // 2. Verify OTP for Client
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().length < 4) {
      setError('Please enter the 6-digit verification code.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier,
          code: code.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed.');
      router.replace('/client');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid code. Try again or use 123456.');
    } finally {
      setLoading(false);
    }
  }

  // 3. Client Password Login
  async function handleClientPasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: clientEmail, password: clientPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid email or password.');
      router.replace(data.user.role === 'ADMIN' ? '/admin' : '/client');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  }

  // 4. Admin Portal Login
  async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
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
    <div className="min-h-[calc(100vh-5rem)] bg-[#F9F7F4] px-4 py-12 flex items-center justify-center text-center">
      <div className="max-w-md w-full">

        {/* Portal Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            <AcademicLabCrestLogo className="w-5 h-5" />
            <span>InkMonk Research Portals</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#0A1128] mb-1">
            Access Your Portal
          </h1>
          <p className="text-slate-600 text-xs">
            Direct access for academic clients and research directors
          </p>
        </div>

        {/* Top Portal Switcher (Client vs Admin) */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-200 rounded-2xl mb-6 shadow-inner">
          <button
            type="button"
            onClick={() => {
              setActiveTab('CLIENT');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'CLIENT'
                ? 'bg-white text-orange-600 shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Client Portal
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('ADMIN');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'ADMIN'
                ? 'bg-[#0A1128] text-amber-300 shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin Dashboard
          </button>
        </div>

        {/* Error / Success Notifications */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold text-center">
            {successMsg}
          </div>
        )}

        {/* ─── CLIENT PORTAL LOGIN CARD ────────────────────────────────────── */}
        {activeTab === 'CLIENT' && (
          <div className="card-futuristic-3d p-6 sm:p-8 text-center border-t-4 border-t-orange-500">
            <div className="flex justify-center mb-3">
              <span className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-bold">
                🎓
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-[#0A1128] mb-1">
              Client Project Portal
            </h2>
            <p className="text-slate-500 text-xs mb-6">
              Track chapters, verify Turnitin reports, and download deliverables
            </p>

            {clientAuthMode === 'OTP' ? (
              /* OTP Form */
              <div>
                {!codeSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address or Phone Number
                      </label>
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="scholar@university.ac.in or 9876543210"
                        className="input-field text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary-glow w-full !py-3 text-xs font-bold disabled:opacity-50"
                    >
                      {loading ? 'Generating Code…' : 'Send Access Code →'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4 text-left">
                    {codeHint && (
                      <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-center">
                        <div className="text-[11px] text-amber-800 font-bold uppercase">
                          Instant Access Code
                        </div>
                        <div className="font-mono text-2xl font-black text-[#0A1128] my-1 tracking-widest">
                          {codeHint}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          (Code automatically applied below)
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Enter 6-Digit Code
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
                      className="btn-primary-glow w-full !py-3 text-xs font-bold disabled:opacity-50"
                    >
                      {loading ? 'Verifying…' : 'Enter Client Portal →'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCodeSent(false);
                        setCodeHint(null);
                      }}
                      className="w-full text-center text-xs text-slate-500 hover:text-slate-800 pt-1"
                    >
                      ← Change Email / Phone
                    </button>
                  </form>
                )}

                {/* Switch to Password or Google */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setClientAuthMode('PASSWORD')}
                    className="text-xs text-orange-600 font-bold hover:underline"
                  >
                    Or Sign in with Email &amp; Password →
                  </button>

                  <a
                    href="/api/auth/google"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors mt-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Password Form */
              <form onSubmit={handleClientPasswordLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@inkmonk.com"
                    className="input-field text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={clientPassword}
                    onChange={(e) => setClientPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input-field text-xs"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">
                    Default demo/first-time password: <code className="font-bold text-slate-600">InkMonk@2026</code>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary-glow w-full !py-3 text-xs font-bold disabled:opacity-50"
                >
                  {loading ? 'Authenticating…' : 'Sign In with Password →'}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setClientAuthMode('OTP')}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    ← Back to OTP / Instant Code Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ─── ADMIN DASHBOARD LOGIN CARD ──────────────────────────────────── */}
        {activeTab === 'ADMIN' && (
          <div className="card-futuristic-3d p-6 sm:p-8 text-center border-t-4 border-t-slate-900 bg-slate-900 text-white">
            <div className="flex justify-center mb-3">
              <span className="w-12 h-12 rounded-2xl bg-slate-800 border border-amber-400/50 flex items-center justify-center text-amber-300 text-xl font-bold">
                🔒
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-white mb-1">
              Director &amp; Staff Login
            </h2>
            <p className="text-slate-400 text-xs mb-6">
              Administrative management of leads, pricing, and projects
            </p>

            <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Administrator Email
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="inkmonkresearch@gmail.com"
                  className="input-field !bg-slate-800 !text-white !border-slate-700 text-xs focus:!border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Director Password
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="input-field !bg-slate-800 !text-white !border-slate-700 text-xs focus:!border-amber-400"
                />
                <div className="text-[10px] text-amber-300/80 mt-1">
                  Authorized password: <code className="font-bold text-white">InkMonk@2026</code> (or <code className="font-bold text-white">admin123</code>)
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary-glow w-full !py-3 text-xs font-bold disabled:opacity-50 !bg-gradient-to-r !from-amber-500 !to-orange-500"
              >
                {loading ? 'Verifying Admin Access…' : 'Access Admin Dashboard →'}
              </button>
            </form>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-800 font-bold">
            ← Return to InkMonk Research Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}
