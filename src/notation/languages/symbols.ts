import type { NotationDictionary } from '../../types';

export const symbols: NotationDictionary = {
  stitches: {
    sc: '×',
    hdc: 'T',
    dc: '⊤',
    tr: '⫠',
  },
  actions: {
    increase: 'V',
    decrease: 'A',
    chain: '○',
    slipStitch: '●',
    magicRing: 'MR',
    repeat: '↻',
    turnWork: '↩',
  },
  templates: {
    roundHeader: (n: number) => `R${n}:`,
    stitchCount: (n: number) => `[${n}]`,
    repeatGroup: (times: number) => `↻${times}`,
  },
};
