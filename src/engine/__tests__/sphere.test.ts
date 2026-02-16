import { describe, it, expect } from 'vitest';
import { generateSphere } from '../shapes/sphere';

describe('generateSphere', () => {
  // plainRowsPerCm=5, shapingRowsPerCm=6 (shaping rounds are shorter)
  const rounds = generateSphere(6, 5, 5, 6, 'sc');

  it('starts with magic ring of 6 stitches', () => {
    expect(rounds[0].totalStitches).toBe(6);
    expect(rounds[0].notes).toBe('magic ring');
  });

  it('second round doubles to 12', () => {
    expect(rounds[1].totalStitches).toBe(12);
  });

  it('increases by 6 each round in the top hemisphere', () => {
    for (let i = 1; i < rounds.length; i++) {
      const prev = rounds[i - 1].totalStitches;
      const curr = rounds[i].totalStitches;
      const diff = curr - prev;
      expect([6, 0, -6]).toContain(diff);
    }
  });

  it('reaches max stitches of 96 (pi * 6 * 5 rounded to multiple of 6)', () => {
    const maxStitches = Math.max(...rounds.map(r => r.totalStitches));
    expect(maxStitches).toBe(96);
  });

  it('ends with 6 stitches (symmetric decrease)', () => {
    const lastRound = rounds[rounds.length - 1];
    expect(lastRound.totalStitches).toBe(6);
  });

  it('has plain rounds in the middle', () => {
    // With shaping correction, there should be plain rounds even for standard gauges
    const plainRounds = rounds.filter((r, i) => {
      if (i === 0) return false;
      return r.totalStitches === rounds[i - 1].totalStitches;
    });
    expect(plainRounds.length).toBeGreaterThan(0);
  });

  it('is symmetric: increase count equals decrease count', () => {
    const increases = rounds.filter((r, i) => i > 0 && r.totalStitches > rounds[i - 1].totalStitches).length;
    const decreases = rounds.filter((r, i) => i > 0 && r.totalStitches < rounds[i - 1].totalStitches).length;
    expect(increases).toBe(decreases);
  });
});

describe('generateSphere with different stitch type', () => {
  it('generates valid rounds with dc stitch', () => {
    const rounds = generateSphere(4, 4, 4, 5, 'dc');
    expect(rounds[0].totalStitches).toBe(6);
    expect(rounds[0].instructions[0]).toMatchObject({ kind: 'stitch', type: 'dc' });
  });
});

describe('generateSphere gauge correction effect', () => {
  it('produces more total rounds with higher shaping correction', () => {
    const lowCorrection = generateSphere(6, 5, 5, 5, 'sc');
    const highCorrection = generateSphere(6, 5, 5, 8, 'sc');
    // Higher shapingRowsPerCm means shaping rounds contribute less height,
    // so more plain rounds are needed → more total rounds
    expect(highCorrection.length).toBeGreaterThan(lowCorrection.length);
  });

  it('user case: 12st/5cm, 12rows/5cm, 3cm sphere has plain rounds', () => {
    // Simulating user's real gauge: 2.4 st/cm, 2.4 rows/cm flat
    // With correction: plainRows = 2.4*1.3=3.12, shaping = 2.4*1.5=3.6
    const rounds = generateSphere(3, 2.4, 3.12, 3.6, 'sc');
    const plainRounds = rounds.filter((r, i) => {
      if (i === 0) return false;
      return r.totalStitches === rounds[i - 1].totalStitches;
    });
    expect(plainRounds.length).toBeGreaterThan(0);
    expect(rounds[0].totalStitches).toBe(6);
  });
});
