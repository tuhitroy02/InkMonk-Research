'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type User = { id: string; email: string; name: string };
const AuthContext = createContext({
  user: null as User | null,
  openAuthModal: (_onSuccess?: () => void) => {},
  signOut: async () => {},
});

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/auth/me', { signal: controller.signal, cache: 'no-store' })
      .then((response) => response.ok ? response.json() : { user: null })
      .then((data) => setUser(data.user ?? null))
      .catch(() => {});
    return () => controller.abort();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{
      user,
      openAuthModal: () => window.location.assign('/login'),
      signOut: async () => {
        const response = await fetch('/api/auth/logout', { method: 'POST' });
        if (response.ok) setUser(null);
      },
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  return useContext(AuthContext);
}
