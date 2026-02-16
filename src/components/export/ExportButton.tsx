import type { Round } from '../../types';
import { GAUGE_SWATCH_CM } from '../../types';
import { useNotation } from '../../context/NotationContext';
import { formatPattern } from '../../notation';
import { yarnTypes } from '../../data/yarn-types';
import { stitchProperties } from '../../engine/stitches';
import type { PatternSummaryData } from '../pattern/PatternView';

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

function buildSummaryText(summary: PatternSummaryData): string {
  const { gauge, stitchType, dimensions, calibration } = summary;
  const yarn = yarnTypes.find(y => y.weight === gauge.yarnWeight);
  const stitch = stitchProperties[stitchType];
  const lines = [
    `Figura: ${shapeLabels[dimensions.shape]} — ${formatDimensions(dimensions)}`,
    `Punto: ${stitch.labelEs}`,
    `Hilo: ${yarn ? `${yarn.labelEs} (${yarn.label})` : gauge.yarnWeight}`,
    `Ganchillo: ${gauge.hookSizeMm} mm`,
    `Muestra: ${gauge.stitchesPer5cm} pts × ${gauge.rowsPer5cm} vtas en ${GAUGE_SWATCH_CM} cm`,
    `Método: ${gauge.method === 'spiral' ? 'Espiral continua' : 'Vueltas cerradas'}`,
  ];
  if (calibration) {
    lines.push(`Calibración: ${calibration.stitchFactor.toFixed(2)}x puntos, ${calibration.rowFactor.toFixed(2)}x vueltas`);
  }
  return lines.join('\n');
}

interface ExportButtonProps {
  rounds: Round[];
  patternName: string;
  summary: PatternSummaryData;
}

export function ExportButton({ rounds, patternName, summary }: ExportButtonProps) {
  const { dictionary } = useNotation();

  const getExportText = () => {
    const header = `=== ${patternName || 'Amigurumi Pattern'} ===\n\n`;
    const summaryBlock = buildSummaryText(summary) + '\n\n---\n\n';
    return header + summaryBlock + formatPattern(rounds, dictionary);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getExportText());
    alert('Patrón copiado al portapapeles');
  };

  const handleDownload = () => {
    const text = getExportText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${patternName || 'pattern'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleCopy}
        className="flex-1 bg-gray-100 text-gray-700 font-medium rounded-lg py-2 text-sm hover:bg-gray-200 transition-colors"
      >
        Copiar texto
      </button>
      <button
        onClick={handleDownload}
        className="flex-1 bg-gray-100 text-gray-700 font-medium rounded-lg py-2 text-sm hover:bg-gray-200 transition-colors"
      >
        Descargar .txt
      </button>
    </div>
  );
}
