import type { ShapeType, ShapeDimensions } from '../../types';

interface DimensionsFormProps {
  shape: ShapeType;
  dimensions: ShapeDimensions;
  onChange: (dims: ShapeDimensions) => void;
}

export function DimensionsForm({ shape, dimensions, onChange }: DimensionsFormProps) {
  const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none";

  switch (shape) {
    case 'sphere': {
      const d = dimensions as { shape: 'sphere'; diameter: number };
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diámetro (cm)</label>
          <input
            type="number" min={1} max={50} step={0.5}
            value={d.diameter || ''}
            onChange={e => onChange({ shape: 'sphere', diameter: parseFloat(e.target.value) || 0 })}
            className={inputClass}
            placeholder="ej. 6"
          />
        </div>
      );
    }
    case 'cylinder': {
      const d = dimensions as { shape: 'cylinder'; diameter: number; height: number };
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diámetro (cm)</label>
            <input
              type="number" min={1} max={50} step={0.5}
              value={d.diameter || ''}
              onChange={e => onChange({ shape: 'cylinder', diameter: parseFloat(e.target.value) || 0, height: d.height })}
              className={inputClass}
              placeholder="ej. 4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
            <input
              type="number" min={1} max={100} step={0.5}
              value={d.height || ''}
              onChange={e => onChange({ shape: 'cylinder', diameter: d.diameter, height: parseFloat(e.target.value) || 0 })}
              className={inputClass}
              placeholder="ej. 10"
            />
          </div>
        </div>
      );
    }
    case 'cone': {
      const d = dimensions as { shape: 'cone'; topDiameter: number; bottomDiameter: number; height: number };
      return (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diámetro base (cm)</label>
            <input
              type="number" min={1} max={50} step={0.5}
              value={d.bottomDiameter || ''}
              onChange={e => onChange({ shape: 'cone', topDiameter: d.topDiameter, bottomDiameter: parseFloat(e.target.value) || 0, height: d.height })}
              className={inputClass}
              placeholder="ej. 6"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diámetro punta (cm)</label>
            <input
              type="number" min={0} max={50} step={0.5}
              value={d.topDiameter || ''}
              onChange={e => onChange({ shape: 'cone', topDiameter: parseFloat(e.target.value) || 0, bottomDiameter: d.bottomDiameter, height: d.height })}
              className={inputClass}
              placeholder="ej. 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
            <input
              type="number" min={1} max={100} step={0.5}
              value={d.height || ''}
              onChange={e => onChange({ shape: 'cone', topDiameter: d.topDiameter, bottomDiameter: d.bottomDiameter, height: parseFloat(e.target.value) || 0 })}
              className={inputClass}
              placeholder="ej. 8"
            />
          </div>
        </div>
      );
    }
    case 'flat-circle': {
      const d = dimensions as { shape: 'flat-circle'; diameter: number };
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diámetro (cm)</label>
          <input
            type="number" min={1} max={100} step={0.5}
            value={d.diameter || ''}
            onChange={e => onChange({ shape: 'flat-circle', diameter: parseFloat(e.target.value) || 0 })}
            className={inputClass}
            placeholder="ej. 10"
          />
        </div>
      );
    }
    case 'flat-rectangle': {
      const d = dimensions as { shape: 'flat-rectangle'; width: number; height: number };
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ancho (cm)</label>
            <input
              type="number" min={1} max={200} step={0.5}
              value={d.width || ''}
              onChange={e => onChange({ shape: 'flat-rectangle', width: parseFloat(e.target.value) || 0, height: d.height })}
              className={inputClass}
              placeholder="ej. 15"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alto (cm)</label>
            <input
              type="number" min={1} max={200} step={0.5}
              value={d.height || ''}
              onChange={e => onChange({ shape: 'flat-rectangle', width: d.width, height: parseFloat(e.target.value) || 0 })}
              className={inputClass}
              placeholder="ej. 20"
            />
          </div>
        </div>
      );
    }
  }
}
