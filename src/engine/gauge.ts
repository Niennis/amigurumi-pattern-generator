import type { GaugeData } from '../types';
import { stitchesPerCm as stPerCm, rowsPerCm as rPerCm } from '../types';

export function roundToMultipleOf6(n: number): number {
  return Math.round(n / 6) * 6;
}

export function circumferenceStitches(diameterCm: number, stitchesPerCm: number): number {
  const raw = Math.PI * diameterCm * stitchesPerCm;
  return Math.max(6, roundToMultipleOf6(raw));
}

export function heightToRounds(heightCm: number, rowsPerCm: number): number {
  return Math.max(1, Math.round(heightCm * rowsPerCm));
}

export function getGaugeSummary(gauge: GaugeData): string {
  return `${stPerCm(gauge).toFixed(1)} st/cm × ${rPerCm(gauge).toFixed(1)} rows/cm, hook ${gauge.hookSizeMm}mm`;
}
