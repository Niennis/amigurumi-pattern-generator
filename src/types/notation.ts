import type { StitchType } from './pattern';

export type NotationLang = 'es' | 'en' | 'symbol';

export interface NotationDictionary {
  stitches: Record<StitchType, string>;
  actions: {
    increase: string;
    decrease: string;
    chain: string;
    slipStitch: string;
    magicRing: string;
    repeat: string;
    turnWork: string;
  };
  templates: {
    roundHeader: (n: number) => string;
    stitchCount: (n: number) => string;
    repeatGroup: (times: number) => string;
  };
}
