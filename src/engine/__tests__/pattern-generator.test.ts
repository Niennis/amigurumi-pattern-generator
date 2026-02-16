import { describe, it, expect } from 'vitest';
import { generatePattern } from '../pattern-generator';
import type { GaugeData } from '../../types';

const baseGauge: GaugeData = {
  stitchesPer5cm: 25,  // 5 st/cm
  rowsPer5cm: 25,      // 5 rows/cm
  yarnWeight: 'worsted',
  hookSizeMm: 4,
  method: 'spiral',
};

describe('generatePattern', () => {
  it('generates sphere pattern', () => {
    const rounds = generatePattern('sphere', { shape: 'sphere', diameter: 6 }, baseGauge, 'sc');
    expect(rounds.length).toBeGreaterThan(0);
    expect(rounds[0].totalStitches).toBe(6);
  });

  it('generates cylinder pattern', () => {
    const rounds = generatePattern('cylinder', { shape: 'cylinder', diameter: 4, height: 10 }, baseGauge, 'sc');
    expect(rounds.length).toBeGreaterThan(0);
  });

  it('generates cone pattern', () => {
    const rounds = generatePattern('cone', { shape: 'cone', topDiameter: 1, bottomDiameter: 6, height: 8 }, baseGauge, 'sc');
    expect(rounds.length).toBeGreaterThan(0);
  });

  it('generates flat circle pattern', () => {
    const rounds = generatePattern('flat-circle', { shape: 'flat-circle', diameter: 10 }, baseGauge, 'sc');
    expect(rounds.length).toBeGreaterThan(0);
  });

  it('generates flat rectangle pattern', () => {
    const rounds = generatePattern('flat-rectangle', { shape: 'flat-rectangle', width: 15, height: 20 }, baseGauge, 'sc');
    expect(rounds.length).toBeGreaterThan(0);
  });

  it('adjusts rows for taller stitches (dc)', () => {
    const scRounds = generatePattern('cylinder', { shape: 'cylinder', diameter: 4, height: 10 }, baseGauge, 'sc');
    const dcRounds = generatePattern('cylinder', { shape: 'cylinder', diameter: 4, height: 10 }, baseGauge, 'dc');
    // dc is 2x height of sc, so should have fewer body rounds
    const scBody = scRounds.filter(r => !r.repeatGroup).length;
    const dcBody = dcRounds.filter(r => !r.repeatGroup).length;
    expect(dcBody).toBeLessThan(scBody);
  });
});
