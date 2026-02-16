import { useState } from 'react';
import type { GaugeData, YarnWeight, CrochetMethod, StitchType, CalibrationData } from '../../types';
import { GAUGE_SWATCH_CM } from '../../types';
import { yarnTypes } from '../../data/yarn-types';
import { hookSizes } from '../../data/hook-sizes';
import { StitchSelector } from '../stitch/StitchSelector';
import { CalibrationModal } from './CalibrationModal';

interface GaugeFormProps {
  gauge: GaugeData;
  onChange: (gauge: GaugeData) => void;
  stitchType: StitchType;
  onStitchTypeChange: (st: StitchType) => void;
  calibration: CalibrationData | null;
  onCalibrationChange: (cal: CalibrationData | null) => void;
  onNext: () => void;
}

export function GaugeForm({
  gauge, onChange, stitchType, onStitchTypeChange,
  calibration, onCalibrationChange, onNext,
}: GaugeFormProps) {
  const update = (partial: Partial<GaugeData>) => onChange({ ...gauge, ...partial });
  const [showCalibration, setShowCalibration] = useState(false);

  const isValid = gauge.stitchesPer5cm > 0 && gauge.rowsPer5cm > 0 && gauge.hookSizeMm > 0;
  const flatStPerCm = gauge.stitchesPer5cm / GAUGE_SWATCH_CM;
  const flatRowsPerCm = gauge.rowsPer5cm / GAUGE_SWATCH_CM;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Paso 1: Muestra y punto</h2>
        <p className="text-sm text-gray-500">
          Teje una muestra de {GAUGE_SWATCH_CM} x {GAUGE_SWATCH_CM} cm con el punto elegido y cuenta los puntos y vueltas.
        </p>
      </div>

      <StitchSelector selected={stitchType} onChange={onStitchTypeChange} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Puntos en {GAUGE_SWATCH_CM} cm
          </label>
          <input
            type="number"
            min={1}
            max={100}
            step={1}
            value={gauge.stitchesPer5cm || ''}
            onChange={e => update({ stitchesPer5cm: parseFloat(e.target.value) || 0 })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
            placeholder="ej. 25"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vueltas en {GAUGE_SWATCH_CM} cm
          </label>
          <input
            type="number"
            min={1}
            max={100}
            step={1}
            value={gauge.rowsPer5cm || ''}
            onChange={e => update({ rowsPer5cm: parseFloat(e.target.value) || 0 })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
            placeholder="ej. 25"
          />
        </div>
      </div>

      {gauge.stitchesPer5cm > 0 && gauge.rowsPer5cm > 0 && (
        <p className="text-xs text-gray-500">
          = {flatStPerCm.toFixed(1)} puntos/cm
          {' '}&times;{' '}
          {flatRowsPerCm.toFixed(1)} vueltas/cm
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de hilo</label>
        <select
          value={gauge.yarnWeight}
          onChange={e => update({ yarnWeight: e.target.value as YarnWeight })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
        >
          {yarnTypes.map(yt => (
            <option key={yt.weight} value={yt.weight}>
              {yt.labelEs} ({yt.label})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tamaño de ganchillo</label>
        <select
          value={gauge.hookSizeMm}
          onChange={e => update({ hookSizeMm: parseFloat(e.target.value) })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
        >
          {hookSizes.map(h => (
            <option key={h.mm} value={h.mm}>
              {h.mm} mm {h.us !== '-' ? `(US ${h.us})` : ''}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Método</label>
        <div className="flex gap-4">
          {(['spiral', 'joined'] as CrochetMethod[]).map(m => (
            <label key={m} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="method"
                value={m}
                checked={gauge.method === m}
                onChange={() => update({ method: m })}
                className="text-teal-600 focus:ring-teal-400"
              />
              <span className="text-sm text-gray-700">
                {m === 'spiral' ? 'Espiral continua' : 'Vueltas cerradas'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Calibration section */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Calibración circular</p>
            <p className="text-xs text-gray-400">
              {calibration
                ? `Calibrado (${calibration.stitchFactor.toFixed(2)}x puntos, ${calibration.rowFactor.toFixed(2)}x vueltas)`
                : 'Opcional \u2014 mejora la precisi\u00f3n de figuras 3D'}
            </p>
          </div>
          <button
            onClick={() => setShowCalibration(true)}
            disabled={!isValid}
            className={`text-sm font-medium rounded-lg px-3 py-1.5 transition-colors ${
              calibration
                ? 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                : 'border border-teal-400 text-teal-600 hover:bg-teal-50'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {calibration ? 'Recalibrar' : 'Calibrar'}
          </button>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isValid}
        className="w-full bg-teal-600 text-white font-medium rounded-lg py-2.5 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Siguiente
      </button>

      {showCalibration && (
        <CalibrationModal
          flatStitchesPerCm={flatStPerCm}
          flatRowsPerCm={flatRowsPerCm}
          existing={calibration}
          onSave={onCalibrationChange}
          onClear={() => onCalibrationChange(null)}
          onClose={() => setShowCalibration(false)}
        />
      )}
    </div>
  );
}
