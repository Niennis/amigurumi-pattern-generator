import { describe, it, expect } from 'vitest';
import { roundToMultipleOf6, circumferenceStitches, heightToRounds } from '../gauge';

describe('roundToMultipleOf6', () => {
  it('rounds 10 to 12', () => {
    expect(roundToMultipleOf6(10)).toBe(12);
  });

  it('keeps 18 as 18', () => {
    expect(roundToMultipleOf6(18)).toBe(18);
  });

  it('rounds 7 to 6', () => {
    expect(roundToMultipleOf6(7)).toBe(6);
  });

  it('rounds 0 to 0', () => {
    expect(roundToMultipleOf6(0)).toBe(0);
  });
});

describe('circumferenceStitches', () => {
  it('calculates sphere 6cm diameter with 5 st/cm', () => {
    // pi * 6 * 5 = 94.25 -> round to multiple of 6 = 96
    expect(circumferenceStitches(6, 5)).toBe(96);
  });

  it('returns at least 6', () => {
    expect(circumferenceStitches(0.1, 1)).toBe(6);
  });

  it('calculates small circle correctly', () => {
    // pi * 2 * 3 = 18.85 -> 18
    expect(circumferenceStitches(2, 3)).toBe(18);
  });
});

describe('heightToRounds', () => {
  it('calculates basic height', () => {
    expect(heightToRounds(10, 5)).toBe(50);
  });

  it('returns at least 1', () => {
    expect(heightToRounds(0.01, 1)).toBe(1);
  });

  it('rounds correctly', () => {
    expect(heightToRounds(3, 2.5)).toBe(8);
  });
});
