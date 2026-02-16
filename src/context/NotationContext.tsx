import { createContext, useContext, useState, type ReactNode } from 'react';
import type { NotationLang, NotationDictionary } from '../types';
import { getDictionary } from '../notation';

interface NotationContextValue {
  lang: NotationLang;
  setLang: (lang: NotationLang) => void;
  dictionary: NotationDictionary;
}

const NotationContext = createContext<NotationContextValue | null>(null);

export function NotationProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<NotationLang>('es');

  return (
    <NotationContext.Provider value={{ lang, setLang, dictionary: getDictionary(lang) }}>
      {children}
    </NotationContext.Provider>
  );
}

export function useNotation(): NotationContextValue {
  const ctx = useContext(NotationContext);
  if (!ctx) throw new Error('useNotation must be used within NotationProvider');
  return ctx;
}
