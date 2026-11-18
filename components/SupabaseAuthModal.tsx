'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { supabase } from '@/lib/supabaseClient';
import { NdaShieldIcon } from '@/components/RealIcons';

export default function SupabaseAuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useSupabaseAuth();

  // Modal Step: 'EMAIL' | 'OTP'
  const [step, setStep] = useState<'EMAIL' | 'OTP'>('EMAIL');
  const [email, setEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isAuthModalOpen) {
      setError(null);
      setSuccessMsg(null);
      setLoading(false);
      setOauthLoading(false);
    } else {
      setStep('EMAIL');
      setOtpDigits(['', '', '', '', '', '']);
    }
  }, [isAuthModalOpen]);

  // Resend countdown timer
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  // Focus first OTP box when transitioning to OTP step
  useEffect(() => {
    if (step === 'OTP' && inputRefs.current[0]) {
      setTimeout(() => inputRefs.current[0]?.focus(), 150);
    }
  }, [step]);

  // 1. Google OAuth Login Flow
  const handleGoogleLogin = async () => {
    setError(null);
    setOauthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google authentication failed.');
      setOauthLoading(false);
    }
  };

  // 2. Step 1: Send 6-Digit Email OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid university or personal email address.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
      });

      if (error) throw error;

      setSuccessMsg(`We sent a 6-digit verification code to ${email.trim()}.`);
      setStep('OTP');
      setResendCountdown(30);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Step 2: Verify 6-Digit Email OTP
  const handleVerifyOtp = async (codeToVerify?: string) => {
    const token = codeToVerify || otpDigits.join('');
    if (token.length !== 6) {
      setError('Please enter all 6 digits of the code.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // MUST use type: 'email' for 6-digit numeric OTP verification
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: token.trim(),
        type: 'email',
      });

      if (error) throw error;

      if (data.session) {
        setSuccessMsg('Verification successful! Unlocking portal…');
        setTimeout(() => {
          closeAuthModal();
        }, 300);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid or expired 6-digit code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP digit changes & auto-tab
  const handleDigitChange = (index: number, value: string) => {
    // Handle pasted 6-digit string
    if (value.length > 1) {
      const sanitized = value.replace(/\D/g, '').slice(0, 6);
      if (sanitized.length > 0) {
        const nextDigits = [...otpDigits];
        for (let i = 0; i < 6; i++) {
          nextDigits[i] = sanitized[i] || '';
        }
        setOtpDigits(nextDigits);
        if (sanitized.length === 6) {
          handleVerifyOtp(sanitized);
        } else {
          inputRefs.current[sanitized.length]?.focus();
        }
      }
      return;
    }

    // Single digit input
    const char = value.replace(/\D/g, '');
    const nextDigits = [...otpDigits];
    nextDigits[index] = char;
    setOtpDigits(nextDigits);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all 6 digits entered
    const fullCode = nextDigits.join('');
    if (fullCode.length === 6 && !nextDigits.includes('')) {
      handleVerifyOtp(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Resend 6-digit OTP code
  const handleResend = async () => {
    if (resendCountdown > 0) return;
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
      });
      if (error) throw error;
      setSuccessMsg('A fresh 6-digit verification code has been dispatched.');
      setResendCountdown(30);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
        {/* Backdrop click to dismiss */}
        <div
          className="absolute inset-0"
          onClick={closeAuthModal}
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#0B1120] border-2 border-slate-200 dark:border-slate-700 shadow-2xl p-6 sm:p-8 text-center overflow-hidden z-10"
        >
          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center text-lg font-black transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ×
          </button>

          {/* Header Brand */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-slate-800 border-2 border-orange-200 dark:border-slate-700 p-1 flex items-center justify-center mb-3 shadow-sm">
              <Image
                src="/logo.png"
                alt="InkMonk Research"
                width={50}
                height={50}
                className="w-full h-full object-contain"
                unoptimized
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </div>
            <div className="inline-block bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-300 font-mono font-black text-[10px] uppercase px-3 py-1 rounded-full mb-1 border border-blue-200 dark:border-blue-800">
              SECURE SCHOLAR GATEWAY
            </div>
            <h2 className="font-serif text-2xl font-black text-slate-900 dark:text-white">
              {step === 'EMAIL' ? 'Sign In to InkMonk' : 'Verify Your Email'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-xs mt-1">
              {step === 'EMAIL'
                ? 'Access your thesis drafts, Turnitin audits, and live estimates.'
                : `Enter the 6-digit code sent to ${email}`}
            </p>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold text-center">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold text-center">
              {successMsg}
            </div>
          )}

          {step === 'EMAIL' ? (
            /* ════════════ STEP 1: GOOGLE & EMAIL INPUT ════════════ */
            <div className="space-y-4">
              {/* Method 1: Continue with Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={oauthLoading || loading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white font-extrabold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow cursor-pointer disabled:opacity-60"
              >
                {/* Multicolored Official Google "G" Vector */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{oauthLoading ? 'Connecting to Google…' : 'Continue with Google'}</span>
              </button>

              {/* Divider */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                </div>
                <div className="relative px-3 bg-white dark:bg-[#0B1120] text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Or 6-Digit Email OTP
                </div>
              </div>

              {/* Method 2: 6-Digit Email OTP Request */}
              <form onSubmit={handleSendOtp} className="space-y-3.5 text-center">
                <div className="text-left">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Scholar Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. scholar@university.edu"
                    className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB]"
                    disabled={loading || oauthLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || oauthLoading}
                  className="btn-clay-orange w-full !py-3 text-xs sm:text-sm font-extrabold cursor-pointer"
                >
                  {loading ? 'Dispatching Verification Code…' : 'Send 6-Digit Code →'}
                </button>
              </form>
            </div>
          ) : (
            /* ════════════ STEP 2: 6-DIGIT OTP VERIFICATION ════════════ */
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1 text-xs">
                <span className="font-bold text-slate-600 dark:text-slate-300">
                  Enter 6-digit code:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setStep('EMAIL');
                    setError(null);
                  }}
                  className="text-[#2563EB] dark:text-[#60A5FA] font-bold hover:underline cursor-pointer"
                >
                  Change email
                </button>
              </div>

              {/* 6 Segmented Input Boxes */}
              <div className="flex items-center justify-center gap-2 sm:gap-2.5 my-2">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-black rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 focus:border-[#F95721] focus:ring-2 focus:ring-[#F95721]/30 text-slate-900 dark:text-white focus:outline-none transition-all shadow-inner"
                    disabled={loading}
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                type="button"
                onClick={() => handleVerifyOtp()}
                disabled={loading || otpDigits.join('').length !== 6}
                className="btn-clay-orange w-full !py-3 text-xs sm:text-sm font-extrabold cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Verifying 6-Digit Code…' : 'Verify & Enter Portal →'}
              </button>

              {/* Resend Code Section */}
              <div className="text-center pt-2">
                {resendCountdown > 0 ? (
                  <span className="text-xs text-slate-400 font-medium">
                    Resend code in {resendCountdown}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={loading}
                    className="text-xs text-[#2563EB] dark:text-[#60A5FA] font-bold hover:underline cursor-pointer"
                  >
                    Didn&apos;t receive code? Resend 6-Digit OTP
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Footer Security Badges */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
            <NdaShieldIcon className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Pre-Signed Mutual NDA • Zero-Knowledge Encryption</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
