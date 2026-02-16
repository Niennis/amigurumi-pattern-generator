import { useState } from 'react';
import type { CalibrationData } from '../../types';
import { calculateCalibration } from '../../types';

interface CalibrationModalProps {
  flatStitchesPerCm: number;
  flatRowsPerCm: number;
  existing: CalibrationData | null;
  onSave: (cal: CalibrationData) => void;
  onClear: () => void;
  onClose: () => void;
}

const SUGGESTED_STITCHES = 24;
const SUGGESTED_ROUNDS = 10;

export function CalibrationModal({
  flatStitchesPerCm,
  flatRowsPerCm,
  existing,
  onSave,
  onClear,
  onClose,
}: CalibrationModalProps) {
  const [stitches, setStitches] = useState(existing?.tubeStitchesPerRound ?? SUGGESTED_STITCHES);
  const [rounds, setRounds] = useState(existing?.tubeRounds ?? SUGGESTED_ROUNDS);
  const [circumference, setCircumference] = useState(existing?.measuredCircumferenceCm ?? 0);
  const [height, setHeight] = useState(existing?.measuredHeightCm ?? 0);

  const expectedCirc = flatStitchesPerCm > 0 ? stitches / flatStitchesPerCm : 0;
  const expectedHeight = flatRowsPerCm > 0 ? rounds / flatRowsPerCm : 0;

  const canSave = stitches > 0 && rounds > 0 && circumference > 0 && height > 0
    && flatStitchesPerCm > 0 && flatRowsPerCm > 0;

  const preview = canSave
    ? calculateCalibration(stitches, rounds, circumference, height, flatStitchesPerCm, flatRowsPerCm)
    : null;

  const handleSave = () => {
    if (!preview) return;
    onSave(preview);
    onClose();
  };

  const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-5 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">Calibrar para circular</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>

        {/* Instructions */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 mb-4 text-sm text-teal-900 space-y-2">
          <p className="font-medium">Instrucciones:</p>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>Con el mismo hilo y ganchillo de tu muestra plana, haz un <strong>anillo mágico</strong></li>
            <li>Aumenta hasta tener <strong>{stitches} puntos</strong> por vuelta</li>
            <li>Teje <strong>{rounds} vueltas planas</strong> en espiral (sin aumentos ni disminuciones)</li>
            <li>Mide la <strong>circunferencia</strong> del tubo (con cinta métrica, o aplastado x 2)</li>
            <li>Mide la <strong>altura</strong> solo de la sección plana (sin contar la base de aumentos)</li>
          </ol>
        </div>

        {/* Tube parameters */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Puntos por vuelta</label>
            <input
              type="number" min={6} max={60} step={6}
              value={stitches || ''}
              onChange={e => setStitches(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Vueltas planas tejidas</label>
            <input
              type="number" min={5} max={30} step={1}
              value={rounds || ''}
              onChange={e => setRounds(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
        </div>

        {expectedCirc > 0 && (
          <p className="text-xs text-gray-400 mb-3">
            Seg&uacute;n tu muestra plana, deber&iacute;a medir ~{expectedCirc.toFixed(1)} cm de circunferencia
            y ~{expectedHeight.toFixed(1)} cm de alto
          </p>
        )}

        {/* Measurements */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Circunferencia real (cm)</label>
            <input
              type="number" min={0.5} max={50} step={0.1}
              value={circumference || ''}
              onChange={e => setCircumference(parseFloat(e.target.value) || 0)}
              className={inputClass}
              placeholder="ej. 5.2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Altura real (cm)</label>
            <input
              type="number" min={0.5} max={30} step={0.1}
              value={height || ''}
              onChange={e => setHeight(parseFloat(e.target.value) || 0)}
              className={inputClass}
              placeholder="ej. 3.8"
            />
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4 text-xs text-gray-600 space-y-1">
            <p className="font-medium text-gray-700">Factores calculados:</p>
            <p>Puntos: {preview.stitchFactor.toFixed(2)}x {preview.stitchFactor > 1 ? '(en circular los puntos son m\u00e1s angostos)' : preview.stitchFactor < 1 ? '(en circular los puntos son m\u00e1s anchos)' : '(sin cambio)'}</p>
            <p>Vueltas: {preview.rowFactor.toFixed(2)}x {preview.rowFactor > 1 ? '(en circular las vueltas son m\u00e1s cortas)' : '(en circular las vueltas son m\u00e1s altas)'}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {existing && (
            <button
              onClick={() => { onClear(); onClose(); }}
              className="border border-red-300 text-red-600 text-sm font-medium rounded-lg px-3 py-2 hover:bg-red-50 transition-colors"
            >
              Borrar
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg py-2 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="flex-1 bg-teal-600 text-white text-sm font-medium rounded-lg py-2 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
