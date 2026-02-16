import type { Round, StitchType, RoundInstruction } from '../../types';
import { circumferenceStitches } from '../gauge';

function makeIncreaseRound(
  roundNum: number,
  prevStitches: number,
  stitchType: StitchType
): Round {
  const sections = 6;
  const stitchesBefore = (prevStitches / sections) - 1;
  const newTotal = prevStitches + sections;

  if (stitchesBefore <= 0) {
    return {
      number: roundNum,
      instructions: [],
      repeatGroup: {
        instructions: [
          { kind: 'increase', type: stitchType, inSameStitch: 2 },
        ],
        times: sections,
      },
      totalStitches: newTotal,
    };
  }

  return {
    number: roundNum,
    instructions: [],
    repeatGroup: {
      instructions: [
        { kind: 'stitch', type: stitchType, count: stitchesBefore },
        { kind: 'increase', type: stitchType, inSameStitch: 2 },
      ],
      times: sections,
    },
    totalStitches: newTotal,
  };
}

function makeDecreaseRound(
  roundNum: number,
  prevStitches: number,
  stitchType: StitchType
): Round {
  const sections = 6;
  const newTotal = prevStitches - sections;
  const stitchesBefore = (newTotal / sections) - 1;

  if (stitchesBefore <= 0) {
    return {
      number: roundNum,
      instructions: [],
      repeatGroup: {
        instructions: [
          { kind: 'decrease', type: stitchType, stitchesTogether: 2 },
        ],
        times: sections,
      },
      totalStitches: newTotal,
    };
  }

  return {
    number: roundNum,
    instructions: [],
    repeatGroup: {
      instructions: [
        { kind: 'stitch', type: stitchType, count: stitchesBefore },
        { kind: 'decrease', type: stitchType, stitchesTogether: 2 },
      ],
      times: sections,
    },
    totalStitches: newTotal,
  };
}

function makePlainRound(
  roundNum: number,
  totalStitches: number,
  stitchType: StitchType
): Round {
  return {
    number: roundNum,
    instructions: [
      { kind: 'stitch', type: stitchType, count: totalStitches } as RoundInstruction,
    ],
    totalStitches,
  };
}

/**
 * Generate sphere rounds.
 *
 * @param diameterCm        - target diameter
 * @param stitchesPerCm     - horizontal gauge (stitches per cm)
 * @param plainRowsPerCm    - corrected rows/cm for plain rounds in the round
 * @param shapingRowsPerCm  - corrected rows/cm for shaping (inc/dec) rounds
 *                            (these are more compressed vertically)
 * @param stitchType        - stitch to use
 */
export function generateSphere(
  diameterCm: number,
  stitchesPerCm: number,
  plainRowsPerCm: number,
  shapingRowsPerCm: number,
  stitchType: StitchType
): Round[] {
  const maxStitches = circumferenceStitches(diameterCm, stitchesPerCm);
  const rounds: Round[] = [];
  let roundNum = 1;

  // Round 1: Magic ring with 6 stitches
  rounds.push({
    number: roundNum++,
    instructions: [
      { kind: 'stitch', type: stitchType, count: 6 },
    ],
    totalStitches: 6,
    notes: 'magic ring',
  });

  // Increase rounds (hemisphere top)
  let currentStitches = 6;
  while (currentStitches < maxStitches) {
    rounds.push(makeIncreaseRound(roundNum++, currentStitches, stitchType));
    currentStitches += 6;
  }

  // Calculate how many plain rounds we need in the middle.
  // The target total height is the diameter.
  // Shaping rounds (inc + dec + magic ring) each contribute less height
  // than plain rounds because stitches deform during shaping.
  const increaseRoundCount = (maxStitches - 6) / 6;
  const decreaseRoundCount = increaseRoundCount;
  const shapingRoundCount = 1 + increaseRoundCount + decreaseRoundCount; // +1 for magic ring

  const heightFromShaping = shapingRoundCount / shapingRowsPerCm;
  const remainingHeight = diameterCm - heightFromShaping;
  const plainRounds = Math.max(0, Math.round(remainingHeight * plainRowsPerCm));

  for (let i = 0; i < plainRounds; i++) {
    rounds.push(makePlainRound(roundNum++, currentStitches, stitchType));
  }

  // Decrease rounds (hemisphere bottom) — mirror of increases
  while (currentStitches > 6) {
    rounds.push(makeDecreaseRound(roundNum++, currentStitches, stitchType));
    currentStitches -= 6;
  }

  return rounds;
}
