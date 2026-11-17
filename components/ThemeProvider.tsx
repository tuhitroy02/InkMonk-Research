'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check saved theme or default to LIGHT
    const saved = localStorage.getItem('inkmonk_theme') as Theme | null;
    if (saved === 'dark' || saved === 'light') {
      setThemeState(saved);
      applyTheme(saved);
    } else {
      setThemeState('light');
      applyTheme('light');
    }
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', newTheme);
    if (newTheme === 'light') {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    } else {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('inkmonk_theme', newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Clean, compact Icon-only Theme Toggle (No text labels)
 * Sits right beside HOME button in the navigation bar.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Light / Dark Mode"
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 cursor-pointer border ${
        theme === 'light'
          ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-900 shadow-sm'
          : 'bg-[#060B18] text-amber-300 border-slate-700 hover:bg-slate-800 shadow-sm'
      } ${className}`}
    >
      {theme === 'light' ? (
        // Moon Icon (Clean SVG)
        <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        // Sun Icon (Clean SVG)
        <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
}
