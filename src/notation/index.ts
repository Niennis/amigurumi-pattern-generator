import type { NotationLang, NotationDictionary } from '../types';
import { es } from './languages/es';
import { en } from './languages/en';
import { symbols } from './languages/symbols';

export const dictionaries: Record<NotationLang, NotationDictionary> = {
  es,
  en,
  symbol: symbols,
};

export function getDictionary(lang: NotationLang): NotationDictionary {
  return dictionaries[lang];
}

export { formatRound, formatPattern } from './formatter';
