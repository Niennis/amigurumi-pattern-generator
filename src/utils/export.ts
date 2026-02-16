import type { Round, NotationDictionary } from '../types';
import { formatPattern } from '../notation';

export function exportAsText(rounds: Round[], dict: NotationDictionary, name: string): string {
  return `=== ${name} ===\n\n${formatPattern(rounds, dict)}`;
}
