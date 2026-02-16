import type { ShapeType, ShapeDimensions, GaugeData, StitchType, Round, CalibrationData } from '../types';
import { stitchesPerCm, rowsPerCm, DEFAULT_STITCH_FACTOR, DEFAULT_ROW_FACTOR, SHAPING_TO_PLAIN_RATIO } from '../types';
import { stitchProperties } from './stitches';
import { generateSphere } from './shapes/sphere';
import { generateCylinder } from './shapes/cylinder';
import { generateCone } from './shapes/cone';
import { generateFlatCircle } from './shapes/flat-circle';
import { generateFlatRectangle } from './shapes/flat-rectangle';

export function generatePattern(
  shape: ShapeType,
  dimensions: ShapeDimensions,
  gauge: GaugeData,
  stitchType: StitchType,
  calibration?: CalibrationData | null,
): Round[] {
  const flatStPerCm = stitchesPerCm(gauge);
  const heightMult = stitchProperties[stitchType].heightMultiplier;
  const flatRowsPerCm = rowsPerCm(gauge) / heightMult;

  const isInTheRound = shape !== 'flat-rectangle';

  // Use calibration factors if available, otherwise defaults
  const stFactor = calibration ? calibration.stitchFactor : DEFAULT_STITCH_FACTOR;
  const rowFactor = calibration ? calibration.rowFactor : DEFAULT_ROW_FACTOR;

  const roundStPerCm = isInTheRound ? flatStPerCm * stFactor : flatStPerCm;
  const roundRowsPerCm = isInTheRound ? flatRowsPerCm * rowFactor : flatRowsPerCm;
  const shapingRowsPerCm = roundRowsPerCm * SHAPING_TO_PLAIN_RATIO;

  switch (shape) {
    case 'sphere': {
      const d = dimensions as { shape: 'sphere'; diameter: number };
      return generateSphere(d.diameter, roundStPerCm, roundRowsPerCm, shapingRowsPerCm, stitchType);
    }
    case 'cylinder': {
      const d = dimensions as { shape: 'cylinder'; diameter: number; height: number };
      return generateCylinder(d.diameter, d.height, roundStPerCm, roundRowsPerCm, stitchType);
    }
    case 'cone': {
      const d = dimensions as { shape: 'cone'; topDiameter: number; bottomDiameter: number; height: number };
      return generateCone(d.topDiameter, d.bottomDiameter, d.height, roundStPerCm, roundRowsPerCm, stitchType);
    }
    case 'flat-circle': {
      const d = dimensions as { shape: 'flat-circle'; diameter: number };
      return generateFlatCircle(d.diameter, roundStPerCm, stitchType);
    }
    case 'flat-rectangle': {
      const d = dimensions as { shape: 'flat-rectangle'; width: number; height: number };
      return generateFlatRectangle(d.width, d.height, flatStPerCm, flatRowsPerCm, stitchType);
    }
  }
}
