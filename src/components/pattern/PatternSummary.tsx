import type { PatternSummaryData } from './PatternView';
import { GAUGE_SWATCH_CM } from '../../types';
import { yarnTypes } from '../../data/yarn-types';
import { stitchProperties } from '../../engine/stitches';

const shapeLabels: Record<string, string> = {
  sphere: 'Esfera',
  cylinder: 'Cilindro',
  cone: 'Cono',
  'flat-circle': 'Circular plano',
  'flat-rectangle': 'Rectángulo',
};

function formatDimensions(d: PatternSummaryData['dimensions']): string {
  switch (d.shape) {
    case 'sphere': return `${d.diameter} cm de diámetro`;
    case 'cylinder': return `${d.diameter} cm diámetro × ${d.height} cm alto`;
    case 'cone': return `${d.bottomDiameter} cm base → ${d.topDiameter} cm punta, ${d.height} cm alto`;
    case 'flat-circle': return `${d.diameter} cm de diámetro`;
    case 'flat-rectangle': return `${d.width} cm × ${d.height} cm`;
  }
}

export function PatternSummary({ summary }: { summary: PatternSummaryData }) {
  const { gauge, stitchType, dimensions, calibration } = summary;
  const yarn = yarnTypes.find(y => y.weight === gauge.yarnWeight);
  const stitch = stitchProperties[stitchType];

  const items = [
    { label: 'Figura', value: `${shapeLabels[dimensions.shape]} — ${formatDimensions(dimensions)}` },
    { label: 'Punto', value: stitch.labelEs },
    { label: 'Hilo', value: yarn ? `${yarn.labelEs} (${yarn.label})` : gauge.yarnWeight },
    { label: 'Ganchillo', value: `${gauge.hookSizeMm} mm` },
    { label: 'Muestra', value: `${gauge.stitchesPer5cm} pts × ${gauge.rowsPer5cm} vtas en ${GAUGE_SWATCH_CM} cm` },
    { label: 'Método', value: gauge.method === 'spiral' ? 'Espiral continua' : 'Vueltas cerradas' },
  ];

  if (calibration) {
    items.push({
      label: 'Calibración',
      value: `${calibration.stitchFactor.toFixed(2)}x puntos, ${calibration.rowFactor.toFixed(2)}x vueltas`,
    });
  }

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Resumen</p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
        {items.map(({ label, value }) => (
          <div key={label} className="contents">
            <dt className="text-gray-500">{label}</dt>
            <dd className="text-gray-800">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
