import type { Round, RoundInstruction, NotationDictionary } from '../types';

function formatInstruction(inst: RoundInstruction, dict: NotationDictionary): string {
  switch (inst.kind) {
    case 'stitch':
      return `${inst.count} ${dict.stitches[inst.type]}`;
    case 'increase':
      return dict.actions.increase;
    case 'decrease':
      return dict.actions.decrease;
  }
}

function formatInstructionList(instructions: RoundInstruction[], dict: NotationDictionary): string {
  return instructions.map(i => formatInstruction(i, dict)).join(', ');
}

export function formatRound(round: Round, dict: NotationDictionary): string {
  const header = dict.templates.roundHeader(round.number);
  const count = dict.templates.stitchCount(round.totalStitches);

  let body: string;

  if (round.repeatGroup) {
    const groupText = formatInstructionList(round.repeatGroup.instructions, dict);
    const repeatText = dict.templates.repeatGroup(round.repeatGroup.times);
    body = `*${groupText}* ${repeatText}`;
  } else {
    body = formatInstructionList(round.instructions, dict);
  }

  // Add magic ring note
  const magicRingNote = round.notes === 'magic ring'
    ? `${dict.actions.magicRing}: `
    : '';

  return `${header} ${magicRingNote}${body} ${count}`;
}

export function formatPattern(rounds: Round[], dict: NotationDictionary): string {
  return rounds.map(r => formatRound(r, dict)).join('\n');
}
