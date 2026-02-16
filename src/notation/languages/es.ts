import type { NotationDictionary } from '../../types';

export const es: NotationDictionary = {
  stitches: {
    sc: 'pb',
    hdc: 'mv',
    dc: 'v',
    tr: 'dv',
  },
  actions: {
    increase: 'aum',
    decrease: 'dism',
    chain: 'cad',
    slipStitch: 'pd',
    magicRing: 'anillo mágico',
    repeat: 'repetir',
    turnWork: 'girar',
  },
  templates: {
    roundHeader: (n: number) => `Vuelta ${n}:`,
    stitchCount: (n: number) => `(${n} puntos)`,
    repeatGroup: (times: number) => `repetir ${times} veces`,
  },
};
