'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

interface SupabaseAuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (onSuccessAction?: () => void) => void;
  closeAuthModal: () => void;
  signOut: () => Promise<void>;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  signOut: async () => {},
});

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const pendingActionRef = useRef<(() => void) | null>(null);

  // Sync session state from Supabase
  useEffect(() => {
    // 1. Initial getSession check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        // Sync local storage for existing dashboard components
        try {
          localStorage.setItem(
            'inkmonk_user',
            JSON.stringify({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
              role: 'CLIENT',
            })
          );
        } catch {}
      }
      setLoading(false);
    });

    // 2. Real-time auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === 'SIGNED_IN' && session?.user) {
        try {
          localStorage.setItem(
            'inkmonk_user',
            JSON.stringify({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
              role: 'CLIENT',
            })
          );
        } catch {}

        // Execute any queued action (e.g. redirect to quote or open client portal)
        if (pendingActionRef.current) {
          const action = pendingActionRef.current;
          pendingActionRef.current = null;
          action();
        }
        setIsAuthModalOpen(false);
      }

      if (event === 'SIGNED_OUT') {
        try {
          localStorage.removeItem('inkmonk_user');
        } catch {}
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = (onSuccessAction?: () => void) => {
    if (onSuccessAction) {
      pendingActionRef.current = onSuccessAction;
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    pendingActionRef.current = null;
    setIsAuthModalOpen(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    try {
      localStorage.removeItem('inkmonk_user');
    } catch {}
    setUser(null);
    setSession(null);
  };

  return (
    <SupabaseAuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        signOut,
      }}
    >
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  return useContext(SupabaseAuthContext);
}
