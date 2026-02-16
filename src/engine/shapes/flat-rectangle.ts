import type { Round, StitchType } from '../../types';
import { heightToRounds } from '../gauge';

export function generateFlatRectangle(
  widthCm: number,
  heightCm: number,
  stitchesPerCm: number,
  rowsPerCm: number,
  stitchType: StitchType
): Round[] {
  const stitchesPerRow = Math.max(1, Math.round(widthCm * stitchesPerCm));
  const totalRows = heightToRounds(heightCm, rowsPerCm);
  const rounds: Round[] = [];

  // Row 1: foundation chain + first row of stitches
  rounds.push({
    number: 1,
    instructions: [{ kind: 'stitch', type: stitchType, count: stitchesPerRow }],
    totalStitches: stitchesPerRow,
    notes: 'foundation chain',
  });

  // Remaining rows: plain rows worked back and forth
  for (let i = 2; i <= totalRows; i++) {
    rounds.push({
      number: i,
      instructions: [{ kind: 'stitch', type: stitchType, count: stitchesPerRow }],
      totalStitches: stitchesPerRow,
      notes: i === 2 ? 'turn work each row' : undefined,
    });
  }

  return rounds;
}
