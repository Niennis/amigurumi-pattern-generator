import type { ShapeType } from '../../types';

interface ShapeSelectorProps {
  selected: ShapeType;
  onChange: (shape: ShapeType) => void;
}

const shapes: { type: ShapeType; label: string; icon: string; desc: string }[] = [
  { type: 'sphere', label: 'Esfera', icon: '⬤', desc: 'Bola redonda' },
  { type: 'cylinder', label: 'Cilindro', icon: '⬜', desc: 'Tubo con base circular' },
  { type: 'cone', label: 'Cono', icon: '△', desc: 'Forma cónica' },
  { type: 'flat-circle', label: 'Circular plano', icon: '◎', desc: 'Disco / posavasos' },
  { type: 'flat-rectangle', label: 'Rectángulo', icon: '▭', desc: 'Plano cuadrado o rectangular' },
];

export function ShapeSelector({ selected, onChange }: ShapeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Forma</label>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {shapes.map(s => (
          <button
            key={s.type}
            onClick={() => onChange(s.type)}
            className={`
              flex flex-col items-center gap-1 rounded-xl border-2 p-4 transition-all
              ${selected === s.type
                ? 'border-teal-500 bg-teal-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-teal-300'}
            `}
          >
            <span className="text-3xl">{s.icon}</span>
            <span className="text-sm font-medium text-gray-800">{s.label}</span>
            <span className="text-xs text-gray-500">{s.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
