import type { YarnWeight } from '../types';

export interface YarnTypeInfo {
  weight: YarnWeight;
  label: string;
  labelEs: string;
  typicalHookMm: [number, number];
  typicalGauge: [number, number]; // stitches per cm range
}

export const yarnTypes: YarnTypeInfo[] = [
  { weight: 'lace', label: 'Lace', labelEs: 'Encaje', typicalHookMm: [1.5, 2.5], typicalGauge: [8, 10] },
  { weight: 'fingering', label: 'Fingering', labelEs: 'Fingering', typicalHookMm: [2.25, 3.5], typicalGauge: [6, 8] },
  { weight: 'sport', label: 'Sport', labelEs: 'Sport', typicalHookMm: [3.5, 4.5], typicalGauge: [5, 6] },
  { weight: 'dk', label: 'DK', labelEs: 'DK', typicalHookMm: [4, 5], typicalGauge: [4, 5] },
  { weight: 'worsted', label: 'Worsted', labelEs: 'Estambre', typicalHookMm: [5, 6], typicalGauge: [3, 4] },
  { weight: 'bulky', label: 'Bulky', labelEs: 'Grueso', typicalHookMm: [6, 9], typicalGauge: [2, 3] },
];
