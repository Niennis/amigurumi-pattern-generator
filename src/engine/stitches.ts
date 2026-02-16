import type { StitchType } from '../types';

export interface StitchProperties {
  type: StitchType;
  heightMultiplier: number;
  labelEn: string;
  labelEs: string;
}

export const stitchProperties: Record<StitchType, StitchProperties> = {
  sc:  { type: 'sc',  heightMultiplier: 1,   labelEn: 'Single Crochet',      labelEs: 'Punto Bajo' },
  hdc: { type: 'hdc', heightMultiplier: 1.5, labelEn: 'Half Double Crochet', labelEs: 'Media Vareta' },
  dc:  { type: 'dc',  heightMultiplier: 2,   labelEn: 'Double Crochet',      labelEs: 'Vareta' },
  tr:  { type: 'tr',  heightMultiplier: 2.5, labelEn: 'Treble Crochet',      labelEs: 'Doble Vareta' },
};

export function getEffectiveRowsPerCm(
  baseRowsPerCm: number,
  baseStitch: StitchType,
  targetStitch: StitchType
): number {
  const baseHeight = stitchProperties[baseStitch].heightMultiplier;
  const targetHeight = stitchProperties[targetStitch].heightMultiplier;
  return baseRowsPerCm * (baseHeight / targetHeight);
}
