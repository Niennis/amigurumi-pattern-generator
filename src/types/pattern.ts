import type { GaugeData } from './gauge';

export type StitchType = 'sc' | 'hdc' | 'dc' | 'tr';
export type ShapeType = 'sphere' | 'cylinder' | 'cone' | 'flat-circle' | 'flat-rectangle';

export interface StitchInstruction {
  kind: 'stitch';
  type: StitchType;
  count: number;
}

export interface Increase {
  kind: 'increase';
  type: StitchType;
  inSameStitch: number;
}

export interface Decrease {
  kind: 'decrease';
  type: StitchType;
  stitchesTogether: number;
}

export type RoundInstruction = StitchInstruction | Increase | Decrease;

export interface Round {
  number: number;
  instructions: RoundInstruction[];
  repeatGroup?: {
    instructions: RoundInstruction[];
    times: number;
  };
  totalStitches: number;
  notes?: string;
}

export interface Pattern {
  id: string;
  name: string;
  shape: ShapeType;
  gauge: GaugeData;
  stitchType: StitchType;
  dimensions: ShapeDimensions;
  rounds: Round[];
  createdAt: number;
  updatedAt: number;
}

export type ShapeDimensions =
  | { shape: 'sphere'; diameter: number }
  | { shape: 'cylinder'; diameter: number; height: number }
  | { shape: 'cone'; topDiameter: number; bottomDiameter: number; height: number }
  | { shape: 'flat-circle'; diameter: number }
  | { shape: 'flat-rectangle'; width: number; height: number };
