import { describe, it, expect } from 'vitest';
import { formatRound, formatPattern } from '../formatter';
import { es } from '../languages/es';
import { en } from '../languages/en';
import { symbols } from '../languages/symbols';
import type { Round } from '../../types';

const sampleIncreaseRound: Round = {
  number: 3,
  instructions: [],
  repeatGroup: {
    instructions: [
      { kind: 'stitch', type: 'sc', count: 1 },
      { kind: 'increase', type: 'sc', inSameStitch: 2 },
    ],
    times: 6,
  },
  totalStitches: 18,
};

const samplePlainRound: Round = {
  number: 5,
  instructions: [
    { kind: 'stitch', type: 'sc', count: 30 },
  ],
  totalStitches: 30,
};

const magicRingRound: Round = {
  number: 1,
  instructions: [{ kind: 'stitch', type: 'sc', count: 6 }],
  totalStitches: 6,
  notes: 'magic ring',
};

describe('formatRound - Spanish', () => {
  it('formats increase round', () => {
    const result = formatRound(sampleIncreaseRound, es);
    expect(result).toContain('Vuelta 3:');
    expect(result).toContain('1 pb');
    expect(result).toContain('aum');
    expect(result).toContain('repetir 6 veces');
    expect(result).toContain('(18 puntos)');
  });

  it('formats plain round', () => {
    const result = formatRound(samplePlainRound, es);
    expect(result).toContain('Vuelta 5:');
    expect(result).toContain('30 pb');
    expect(result).toContain('(30 puntos)');
  });

  it('formats magic ring', () => {
    const result = formatRound(magicRingRound, es);
    expect(result).toContain('anillo mágico');
  });
});

describe('formatRound - English', () => {
  it('formats increase round', () => {
    const result = formatRound(sampleIncreaseRound, en);
    expect(result).toContain('Round 3:');
    expect(result).toContain('1 sc');
    expect(result).toContain('inc');
    expect(result).toContain('repeat 6 times');
    expect(result).toContain('(18 sts)');
  });
});

describe('formatRound - Symbols', () => {
  it('formats increase round with symbols', () => {
    const result = formatRound(sampleIncreaseRound, symbols);
    expect(result).toContain('R3:');
    expect(result).toContain('×');
    expect(result).toContain('V');
    expect(result).toContain('↻6');
    expect(result).toContain('[18]');
  });
});

describe('formatPattern', () => {
  it('formats multiple rounds', () => {
    const result = formatPattern([magicRingRound, sampleIncreaseRound], es);
    const lines = result.split('\n');
    expect(lines.length).toBe(2);
    expect(lines[0]).toContain('Vuelta 1:');
    expect(lines[1]).toContain('Vuelta 3:');
  });
});
