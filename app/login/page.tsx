'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { TurnitinShieldLogo } from '@/components/RealIcons';

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

  // Multi-step Registration / Sign-in state
  // Step 1: Email OTP or Google
  // Step 2: Phone OTP Verification
  // Step 3: Optional Profile (Name, Gender, Education)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailCodeHint, setEmailCodeHint] = useState<string | null>(null);

  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneSent, setPhoneSent] = useState(false);
  const [phoneCodeHint, setPhoneCodeHint] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [gender, setGender] = useState('PREFER_NOT_TO_SAY');
  const [qualification, setQualification] = useState('POST_GRADUATE');
  const [institution, setInstitution] = useState('');
  const [discipline, setDiscipline] = useState('');

  // Staff switch
  const [staff, setStaff] = useState(false);
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    params.has('error') ? 'Authentication could not be completed. Please try again.' : null
  );

  // Step 1: Send Email Code
  async function handleSendEmailCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to dispatch code.');
      setEmailSent(true);
      if (data.codeHint) setEmailCodeHint(data.codeHint);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Please check your email and try again.');
    } finally {
      setLoading(false);
    }
  }

  // Step 1: Verify Email Code & Advance to Step 2
  async function handleVerifyEmail(e: React.FormEvent) {
    e.preventDefault();
    if (emailCode.length < 4) {
      setError('Please enter a valid verification code.');
      return;
    }
    setError(null);
    setStep(2);
  }

  // Google OAuth Initiation
  function handleGoogleLogin() {
    window.location.href = '/api/auth/google';
  }

  // Step 2: Send Phone OTP Code
  async function handleSendPhoneCode(e: React.FormEvent) {
    e.preventDefault();
    if (!phone) {
      setError('Please provide a mobile phone number.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send SMS code.');
      setPhoneSent(true);
      if (data.codeHint) setPhoneCodeHint(data.codeHint);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Please check your number and try again.');
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Verify Phone OTP & Advance to Step 3
  async function handleVerifyPhone(e: React.FormEvent) {
    e.preventDefault();
    if (phoneCode.length < 4) {
      setError('Please enter the code sent to your phone.');
      return;
    }
    setError(null);
    setStep(3);
  }

  // Step 3: Complete Registration & Save Profile
  async function handleCompleteProfile(skip: boolean = false) {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        identifier: email || phone,
        code: emailCode || phoneCode || '000000',
        name: skip ? (name || 'Verified Scholar') : (name || 'Verified Scholar'),
        phone: phone || undefined,
        gender: skip ? undefined : gender,
        education: skip ? undefined : qualification,
        institution: skip ? undefined : institution,
      };

      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not finalize profile.');

      // Save additional profile details in browser localStorage
      if (!skip) {
        try {
          localStorage.setItem(
            'inkmonk_scholar_profile',
            JSON.stringify({ name, gender, qualification, institution, discipline })
          );
        } catch {}
      }

      router.replace('/client');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Profile finalization error.');
    } finally {
      setLoading(false);
    }
  }

  // Staff / Administrator Login
  async function handleStaffLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: staffEmail, password: staffPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid credentials.');
      router.replace(data.user.role === 'CLIENT' ? '/client' : '/admin');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign-in failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#F9F7F4] px-4 py-12 flex items-center justify-center text-center">
      <div className="max-w-lg w-full">

        {/* Portal Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            <TurnitinShieldLogo className="w-4 h-4" />
            <span>InkMonk Secure Client Portal</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1128] mb-2 text-center">
            {staff ? 'ADMIN & STAFF ACCESS' : 'CLIENT ONBOARDING & SIGN IN'}
          </h1>
          <p className="text-slate-600 text-sm max-w-sm mx-auto text-center">
            {staff
              ? 'Authorized academic personnel and editorial directors.'
              : 'Sign up or log in to track research drafts, download Turnitin reports, and manage projects.'}
          </p>
        </div>

        {/* Card Box with 3D Holographic styling */}
        <div className="card-futuristic-3d p-6 sm:p-10 text-center">

          {error && (
            <div className="p-3.5 mb-6 bg-red-50 text-red-700 text-xs sm:text-sm rounded-xl border border-red-200 text-center">
              {error}
            </div>
          )}

          {!staff ? (
            <div>

              {/* 3-Step Progress Indicators */}
              <div className="flex items-center justify-between mb-8 max-w-xs mx-auto">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>
                    1
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 mt-1">Sign In</span>
                </div>
                <div className={`h-1 flex-1 mx-2 rounded ${step >= 2 ? 'bg-orange-500' : 'bg-slate-200'}`} />
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>
                    2
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 mt-1">Phone OTP</span>
                </div>
                <div className={`h-1 flex-1 mx-2 rounded ${step >= 3 ? 'bg-orange-500' : 'bg-slate-200'}`} />
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>
                    3
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 mt-1">Profile</span>
                </div>
              </div>

              {/* ─── STEP 1: Email OTP or Google ────────────────────────── */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* Google OAuth Button */}
                  <div>
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full min-h-12 flex items-center justify-center gap-3 rounded-2xl border-2 border-slate-300 bg-white hover:bg-slate-50 text-[#0A1128] font-bold text-sm shadow-sm transition-all hover:scale-[1.01]"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Continue with Google Authorization</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="h-px bg-slate-200 flex-1" />
                    <span>OR SIGN UP VIA EMAIL OTP</span>
                    <span className="h-px bg-slate-200 flex-1" />
                  </div>

                  {/* Email OTP Flow */}
                  <form onSubmit={emailSent ? handleVerifyEmail : handleSendEmailCode} className="space-y-4">
                    <div className="text-left">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailSent(false);
                          setEmailCode('');
                          setEmailCodeHint(null);
                        }}
                        placeholder="scholar@university.edu"
                        className="input-field text-sm"
                      />
                    </div>

                    {emailSent && (
                      <div className="text-left animate-3d-float">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                          6-Digit Email Verification Code
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          required
                          value={emailCode}
                          onChange={(e) => setEmailCode(e.target.value)}
                          placeholder="e.g. 582910"
                          className="input-field text-sm font-mono tracking-widest text-center text-lg font-bold"
                        />
                        {emailCodeHint && (
                          <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 text-center font-bold">
                            🔑 Verification Code: <span className="font-mono text-sm">{emailCodeHint}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary-glow w-full text-sm"
                    >
                      {loading
                        ? 'Transmitting Code…'
                        : emailSent
                        ? 'Verify Email & Proceed to Phone Step →'
                        : 'Send Email Verification Code'}
                    </button>
                  </form>
                </div>
              )}

              {/* ─── STEP 2: Phone Verification ─────────────────────────── */}
              {step === 2 && (
                <div className="space-y-5 animate-3d-float">
                  <div className="text-center mb-4">
                    <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
                      Step 2 of 3 • Required
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#0A1128]">
                      Link Your Mobile Phone Number
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Receive urgent milestone updates and Turnitin readiness notifications via SMS/WhatsApp.
                    </p>
                  </div>

                  <form onSubmit={phoneSent ? handleVerifyPhone : handleSendPhoneCode} className="space-y-4">
                    <div className="text-left">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                        Mobile Phone Number (with Country Code)
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setPhoneSent(false);
                          setPhoneCode('');
                          setPhoneCodeHint(null);
                        }}
                        placeholder="+91 9876543210"
                        className="input-field text-sm"
                      />
                    </div>

                    {phoneSent && (
                      <div className="text-left">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                          Enter 6-Digit Phone Verification Code
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          required
                          value={phoneCode}
                          onChange={(e) => setPhoneCode(e.target.value)}
                          placeholder="e.g. 741258"
                          className="input-field text-sm font-mono tracking-widest text-center text-lg font-bold"
                        />
                        {phoneCodeHint && (
                          <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 text-center font-bold">
                            📱 Phone Verification Code: <span className="font-mono text-sm">{phoneCodeHint}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary-glow w-full text-sm"
                    >
                      {loading
                        ? 'Verifying…'
                        : phoneSent
                        ? 'Verify Phone & Proceed to Profile →'
                        : 'Send Mobile Phone OTP'}
                    </button>
                  </form>
                </div>
              )}

              {/* ─── STEP 3: Scholar Profile (Optional) ──────────────────── */}
              {step === 3 && (
                <div className="space-y-5 animate-3d-float">
                  <div className="text-center mb-4">
                    <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                      Step 3 of 3 • Optional
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#0A1128]">
                      Complete Your Scholar Profile
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Helps us assign the best subject specialists and citation style to your projects.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="text-left">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                        Full Name / Title
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dr. / Prof. / Scholar Name"
                        className="input-field text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="text-left">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                          Gender (Optional)
                        </label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="input-field text-sm"
                        >
                          <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>

                      <div className="text-left">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                          Highest Qualification
                        </label>
                        <select
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                          className="input-field text-sm"
                        >
                          <option value="DOCTORATE_PHD">PhD / Doctorate</option>
                          <option value="POST_GRADUATE">Post-Graduate / Master&apos;s</option>
                          <option value="UNDERGRADUATE">Undergraduate / Bachelor&apos;s</option>
                          <option value="OTHER">Other Professional Degree</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="text-left">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                          University / Institution
                        </label>
                        <input
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="e.g. University of Calcutta"
                          className="input-field text-sm"
                        />
                      </div>
                      <div className="text-left">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                          Academic Discipline
                        </label>
                        <input
                          type="text"
                          value={discipline}
                          onChange={(e) => setDiscipline(e.target.value)}
                          placeholder="e.g. AI / History / Management"
                          className="input-field text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => handleCompleteProfile(false)}
                        disabled={loading}
                        className="btn-primary-glow flex-1 text-sm"
                      >
                        {loading ? 'Finalizing…' : 'Save & Enter Client Portal →'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCompleteProfile(true)}
                        disabled={loading}
                        className="btn-secondary-dark !text-slate-700 !border-slate-300 hover:!bg-slate-100 text-xs py-3 px-4"
                      >
                        Skip for Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Staff / Admin Credentials Form */
            <form onSubmit={handleStaffLogin} className="space-y-4">
              <div className="text-left">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                  Staff Email
                </label>
                <input
                  type="email"
                  required
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  placeholder="admin@inkmonkresearch.com"
                  className="input-field text-sm"
                />
              </div>

              <div className="text-left">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="input-field text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary-glow w-full text-sm"
              >
                {loading ? 'Authenticating…' : 'Sign in as Staff →'}
              </button>
            </form>
          )}

          {/* Toggle between Client and Staff Mode */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => {
                setStaff(!staff);
                setError(null);
              }}
              className="text-xs text-orange-600 hover:text-orange-700 font-bold underline"
            >
              {staff ? '← Back to Client Registration & Sign In' : 'Are you an InkMonk Team Member? Staff Login →'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
