import type { NotationDictionary } from '../../types';

export const en: NotationDictionary = {
  stitches: {
    sc: 'sc',
    hdc: 'hdc',
    dc: 'dc',
    tr: 'tr',
  },
  actions: {
    increase: 'inc',
    decrease: 'dec',
    chain: 'ch',
    slipStitch: 'sl st',
    magicRing: 'magic ring',
    repeat: 'repeat',
    turnWork: 'turn',
  },
  templates: {
    roundHeader: (n: number) => `Round ${n}:`,
    stitchCount: (n: number) => `(${n} sts)`,
    repeatGroup: (times: number) => `repeat ${times} times`,
  },
};
