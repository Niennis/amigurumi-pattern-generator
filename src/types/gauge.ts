export type YarnWeight = 'lace' | 'fingering' | 'sport' | 'dk' | 'worsted' | 'bulky';
export type CrochetMethod = 'spiral' | 'joined';

export const GAUGE_SWATCH_CM = 5;

export interface GaugeData {
  stitchesPer5cm: number;  // Total stitches in 5cm swatch
  rowsPer5cm: number;      // Total rows in 5cm swatch
  yarnWeight: YarnWeight;
  hookSizeMm: number;
  method: CrochetMethod;
}

export function stitchesPerCm(gauge: GaugeData): number {
  return gauge.stitchesPer5cm / GAUGE_SWATCH_CM;
}

export function rowsPerCm(gauge: GaugeData): number {
  return gauge.rowsPer5cm / GAUGE_SWATCH_CM;
}
