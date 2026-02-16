import { describe, it, expect } from 'vitest';
import { generateFlatCircle } from '../shapes/flat-circle';
import { generateFlatRectangle } from '../shapes/flat-rectangle';

describe('generateFlatCircle', () => {
  const rounds = generateFlatCircle(10, 4, 'sc');

  it('starts with magic ring of 6', () => {
    expect(rounds[0].totalStitches).toBe(6);
    expect(rounds[0].notes).toBe('magic ring');
  });

  it('only increases, never decreases', () => {
    for (let i = 1; i < rounds.length; i++) {
      expect(rounds[i].totalStitches).toBeGreaterThan(rounds[i - 1].totalStitches);
    }
  });

  it('reaches target stitch count', () => {
    const last = rounds[rounds.length - 1];
    // pi * 10 * 4 = 125.66 -> round to 126
    expect(last.totalStitches).toBe(126);
  });
});

describe('generateFlatRectangle', () => {
  const rounds = generateFlatRectangle(10, 5, 4, 4, 'sc');

  it('all rows have the same stitch count', () => {
    const stitches = rounds[0].totalStitches;
    for (const r of rounds) {
      expect(r.totalStitches).toBe(stitches);
    }
  });

  it('has correct number of rows', () => {
    // 5cm * 4 rows/cm = 20 rows
    expect(rounds.length).toBe(20);
  });

  it('has correct stitches per row', () => {
    // 10cm * 4 st/cm = 40 stitches
    expect(rounds[0].totalStitches).toBe(40);
  });

  it('first row has foundation chain note', () => {
    expect(rounds[0].notes).toBe('foundation chain');
  });
});
