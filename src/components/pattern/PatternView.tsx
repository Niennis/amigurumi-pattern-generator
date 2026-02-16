import { useState } from 'react';
import type { Round, GaugeData, ShapeDimensions, StitchType, CalibrationData } from '../../types';
import { RoundRow } from './RoundRow';
import { PatternSummary } from './PatternSummary';

export interface PatternSummaryData {
  gauge: GaugeData;
  stitchType: StitchType;
  dimensions: ShapeDimensions;
  calibration: CalibrationData | null;
}

interface PatternViewProps {
  rounds: Round[];
  onUpdateRound: (index: number, round: Round) => void;
  patternName: string;
  onNameChange: (name: string) => void;
  summary: PatternSummaryData;
}

export function PatternView({ rounds, onUpdateRound, patternName, onNameChange, summary }: PatternViewProps) {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const maxStitches = Math.max(...rounds.map(r => r.totalStitches));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del patrón</label>
        <input
          type="text"
          value={patternName}
          onChange={e => onNameChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
          placeholder="Mi amigurumi"
        />
      </div>

      <PatternSummary summary={summary} />

      <div className="flex gap-4 text-sm text-gray-600">
        <span>Total vueltas: <strong>{rounds.length}</strong></span>
        <span>Puntos máx: <strong>{maxStitches}</strong></span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
        {rounds.map((round, i) => (
          <RoundRow
            key={round.number}
            round={round}
            isEditing={editingRow === i}
            onToggleEdit={() => setEditingRow(editingRow === i ? null : i)}
            onEditNote={(note) => onUpdateRound(i, { ...round, notes: note })}
          />
        ))}
      </div>
    </div>
  );
}
