import type { Round, StitchType, RoundInstruction } from '../../types';
import { circumferenceStitches, heightToRounds } from '../gauge';

export function generateCylinder(
  diameterCm: number,
  heightCm: number,
  stitchesPerCm: number,
  rowsPerCm: number,
  stitchType: StitchType
): Round[] {
  const maxStitches = circumferenceStitches(diameterCm, stitchesPerCm);
  const rounds: Round[] = [];
  let roundNum = 1;

  // Base: increase rounds (same as sphere top hemisphere)
  rounds.push({
    number: roundNum++,
    instructions: [{ kind: 'stitch', type: stitchType, count: 6 }],
    totalStitches: 6,
    notes: 'magic ring',
  });

  let currentStitches = 6;
  while (currentStitches < maxStitches) {
    const sections = 6;
    const stitchesBefore = (currentStitches / sections) - 1;
    const newTotal = currentStitches + sections;

    const instructions: RoundInstruction[] = stitchesBefore <= 0
      ? [{ kind: 'increase', type: stitchType, inSameStitch: 2 }]
      : [
          { kind: 'stitch', type: stitchType, count: stitchesBefore },
          { kind: 'increase', type: stitchType, inSameStitch: 2 },
        ];

    rounds.push({
      number: roundNum++,
      instructions: [],
      repeatGroup: { instructions, times: sections },
      totalStitches: newTotal,
    });
    currentStitches = newTotal;
  }

  // Body: plain rounds
  const bodyRounds = heightToRounds(heightCm, rowsPerCm);
  for (let i = 0; i < bodyRounds; i++) {
    rounds.push({
      number: roundNum++,
      instructions: [{ kind: 'stitch', type: stitchType, count: currentStitches }],
      totalStitches: currentStitches,
    });
  }

  return rounds;
}
