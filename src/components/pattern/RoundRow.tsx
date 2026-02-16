import type { Round } from '../../types';
import { useNotation } from '../../context/NotationContext';
import { formatRound } from '../../notation';

interface RoundRowProps {
  round: Round;
  onEditNote: (note: string) => void;
  isEditing: boolean;
  onToggleEdit: () => void;
}

export function RoundRow({ round, onEditNote, isEditing, onToggleEdit }: RoundRowProps) {
  const { dictionary } = useNotation();
  const text = formatRound(round, dictionary);

  return (
    <div className="group flex items-start gap-2 py-1.5 px-2 rounded hover:bg-teal-50 transition-colors">
      <div className="flex-1 text-sm text-gray-800 font-mono">{text}</div>
      <button
        onClick={onToggleEdit}
        className="opacity-0 group-hover:opacity-100 text-xs text-teal-500 hover:text-teal-700 transition-opacity shrink-0"
        title="Editar nota"
      >
        {isEditing ? 'OK' : 'Nota'}
      </button>
      {isEditing && (
        <input
          type="text"
          value={round.notes || ''}
          onChange={e => onEditNote(e.target.value)}
          placeholder="Agregar nota..."
          className="text-xs border border-gray-300 rounded px-2 py-1 w-40 focus:ring-1 focus:ring-teal-400 outline-none"
          autoFocus
        />
      )}
    </div>
  );
}
