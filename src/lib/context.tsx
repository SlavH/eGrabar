'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, Translation } from '@/lib/translations';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  authLoading: boolean;
  getLocalizedText: (item: { [key: string]: any }, field: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('egrabar-lang') as Language;
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('egrabar-lang', language);
  }, [language, mounted]);

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || '' });
      }
      setAuthLoading(false);
    }
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || '' });
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        setUser({ id: data.user.id, email: data.user.email || '' });
        return { success: true };
      }

      return { success: false, error: 'Login failed' };
    } catch (err) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const getLocalizedText = (item: { [key: string]: any }, field: string): string => {
    const langField = `${field}_${language}`;
    if (item[langField] && item[langField] !== '') {
      return item[langField] as string;
    }
    return '';
  };

  const t = translations[language];

  return (
    <AppContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      user, 
      login, 
      logout,
      isAuthenticated: !!user,
      authLoading,
      getLocalizedText,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
