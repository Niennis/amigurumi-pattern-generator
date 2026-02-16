import type { Round, StitchType } from '../../types';
import { circumferenceStitches } from '../gauge';

export function generateFlatCircle(
  diameterCm: number,
  stitchesPerCm: number,
  stitchType: StitchType
): Round[] {
  const targetStitches = circumferenceStitches(diameterCm, stitchesPerCm);
  const rounds: Round[] = [];
  let roundNum = 1;

  // Round 1: magic ring with 6 stitches
  rounds.push({
    number: roundNum++,
    instructions: [{ kind: 'stitch', type: stitchType, count: 6 }],
    totalStitches: 6,
    notes: 'magic ring',
  });

  // Increase rounds until we reach target circumference
  let currentStitches = 6;
  while (currentStitches < targetStitches) {
    const sections = 6;
    const stitchesBefore = (currentStitches / sections) - 1;
    const newTotal = currentStitches + sections;

    const instructions = stitchesBefore <= 0
      ? [{ kind: 'increase' as const, type: stitchType, inSameStitch: 2 }]
      : [
          { kind: 'stitch' as const, type: stitchType, count: stitchesBefore },
          { kind: 'increase' as const, type: stitchType, inSameStitch: 2 },
        ];

    rounds.push({
      number: roundNum++,
      instructions: [],
      repeatGroup: { instructions, times: sections },
      totalStitches: newTotal,
    });
    currentStitches = newTotal;
  }

  return rounds;
}
