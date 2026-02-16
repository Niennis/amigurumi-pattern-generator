import { describe, it, expect } from 'vitest';
import { generateCylinder } from '../shapes/cylinder';

describe('generateCylinder', () => {
  const rounds = generateCylinder(4, 10, 5, 5, 'sc');

  it('starts with magic ring', () => {
    expect(rounds[0].totalStitches).toBe(6);
    expect(rounds[0].notes).toBe('magic ring');
  });

  it('increases to target circumference', () => {
    // pi * 4 * 5 = 62.83 -> round to 60
    const maxStitches = Math.max(...rounds.map(r => r.totalStitches));
    expect(maxStitches).toBe(60);
  });

  it('has body rounds that are all the same stitch count', () => {
    const bodyStitches = 60;
    const bodyRounds = rounds.filter(r => r.totalStitches === bodyStitches && !r.repeatGroup);
    // height 10cm * 5 rows/cm = 50 rows
    expect(bodyRounds.length).toBe(50);
  });

  it('never decreases (no closing top)', () => {
    for (let i = 1; i < rounds.length; i++) {
      expect(rounds[i].totalStitches).toBeGreaterThanOrEqual(rounds[i - 1].totalStitches);
    }
  });
});
