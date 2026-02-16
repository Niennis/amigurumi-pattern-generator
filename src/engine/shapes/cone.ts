import type { Round, StitchType } from '../../types';
import { circumferenceStitches, heightToRounds } from '../gauge';

export function generateCone(
  topDiameterCm: number,
  bottomDiameterCm: number,
  heightCm: number,
  stitchesPerCm: number,
  rowsPerCm: number,
  stitchType: StitchType
): Round[] {
  const topStitches = Math.max(6, circumferenceStitches(topDiameterCm, stitchesPerCm));
  const bottomStitches = circumferenceStitches(bottomDiameterCm, stitchesPerCm);
  const totalBodyRounds = heightToRounds(heightCm, rowsPerCm);

  const rounds: Round[] = [];
  let roundNum = 1;

  // Start from the wider end (bottom) with increase rounds from magic ring
  const startStitches = bottomStitches;

  // Build base circle
  rounds.push({
    number: roundNum++,
    instructions: [{ kind: 'stitch', type: stitchType, count: 6 }],
    totalStitches: 6,
    notes: 'magic ring',
  });

  let currentStitches = 6;
  while (currentStitches < startStitches) {
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

  // Taper: distribute decreases evenly across body rounds
  const stitchesToDecrease = currentStitches - topStitches;

  if (stitchesToDecrease <= 0 || totalBodyRounds <= 0) {
    // No tapering needed, just plain rounds
    for (let i = 0; i < totalBodyRounds; i++) {
      rounds.push({
        number: roundNum++,
        instructions: [{ kind: 'stitch', type: stitchType, count: currentStitches }],
        totalStitches: currentStitches,
      });
    }
  } else {
    // Calculate decrease schedule
    const decreasePerRound = stitchesToDecrease / totalBodyRounds;
    let accumulatedDecrease = 0;

    for (let i = 0; i < totalBodyRounds; i++) {
      accumulatedDecrease += decreasePerRound;
      const decreasesThisRound = Math.round(accumulatedDecrease);
      accumulatedDecrease -= decreasesThisRound;

      // Clamp decreases to multiples that make sense
      const actualDecreases = Math.min(
        decreasesThisRound,
        Math.floor(currentStitches / 2)
      );

      if (actualDecreases > 0 && currentStitches - actualDecreases >= topStitches) {
        const plainBetween = Math.max(0, Math.floor((currentStitches - actualDecreases) / actualDecreases) - 1);
        const newTotal = currentStitches - actualDecreases;

        if (plainBetween > 0) {
          rounds.push({
            number: roundNum++,
            instructions: [],
            repeatGroup: {
              instructions: [
                { kind: 'stitch', type: stitchType, count: plainBetween },
                { kind: 'decrease', type: stitchType, stitchesTogether: 2 },
              ],
              times: actualDecreases,
            },
            totalStitches: newTotal,
          });
        } else {
          rounds.push({
            number: roundNum++,
            instructions: [],
            repeatGroup: {
              instructions: [
                { kind: 'decrease', type: stitchType, stitchesTogether: 2 },
              ],
              times: actualDecreases,
            },
            totalStitches: newTotal,
          });
        }
        currentStitches = newTotal;
      } else {
        // Plain round
        rounds.push({
          number: roundNum++,
          instructions: [{ kind: 'stitch', type: stitchType, count: currentStitches }],
          totalStitches: currentStitches,
        });
      }
    }
  }

  return rounds;
}
