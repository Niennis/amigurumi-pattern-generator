import type { StitchType } from '../../types';
import { stitchProperties } from '../../engine/stitches';

interface StitchSelectorProps {
  selected: StitchType;
  onChange: (stitch: StitchType) => void;
}

const stitchTypes: StitchType[] = ['sc', 'hdc', 'dc', 'tr'];

export function StitchSelector({ selected, onChange }: StitchSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de punto</label>
      <div className="flex gap-2">
        {stitchTypes.map(st => {
          const props = stitchProperties[st];
          return (
            <button
              key={st}
              onClick={() => onChange(st)}
              className={`
                flex-1 rounded-lg border-2 px-3 py-2 text-center transition-all
                ${selected === st
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 bg-white hover:border-teal-300'}
              `}
            >
              <div className="text-sm font-medium text-gray-800">{st.toUpperCase()}</div>
              <div className="text-xs text-gray-500">{props.labelEs}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
