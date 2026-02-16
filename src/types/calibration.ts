export interface CalibrationData {
  // What the user knitted for calibration
  tubeStitchesPerRound: number;  // stitches in each round of the tube
  tubeRounds: number;            // how many plain rounds were knitted
  measuredCircumferenceCm: number;
  measuredHeightCm: number;

  // Derived correction factors (flat gauge → in-the-round)
  stitchFactor: number;  // roundStPerCm / flatStPerCm
  rowFactor: number;     // roundRowsPerCm / flatRowsPerCm
}

export const DEFAULT_STITCH_FACTOR = 1.0;
export const DEFAULT_ROW_FACTOR = 1.30;
export const SHAPING_TO_PLAIN_RATIO = 1.15; // shaping rows are ~15% more compressed than plain

/**
 * Calculate calibration factors from tube measurements.
 *
 * The user knits a small tube: magic ring → increase to N stitches → K plain rounds.
 * They measure the circumference and the height of the plain section.
 *
 * We compare the in-the-round gauge to the flat swatch gauge to derive factors.
 */
export function calculateCalibration(
  tubeStitchesPerRound: number,
  tubeRounds: number,
  measuredCircumferenceCm: number,
  measuredHeightCm: number,
  flatStitchesPerCm: number,
  flatRowsPerCm: number,
): CalibrationData {
  // Actual in-the-round gauges
  const roundStPerCm = tubeStitchesPerRound / measuredCircumferenceCm;
  const roundRowsPerCm = tubeRounds / measuredHeightCm;

  return {
    tubeStitchesPerRound,
    tubeRounds,
    measuredCircumferenceCm,
    measuredHeightCm,
    stitchFactor: roundStPerCm / flatStitchesPerCm,
    rowFactor: roundRowsPerCm / flatRowsPerCm,
  };
}
