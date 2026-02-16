import type { Pattern } from '../../types';

interface HeaderProps {
  savedPatterns: Pattern[];
  onLoadPattern: (pattern: Pattern) => void;
  onNewPattern: () => void;
}

export function Header({ savedPatterns, onLoadPattern, onNewPattern }: HeaderProps) {
  return (
    <header className="bg-teal-600 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          Amigurumi Pattern Generator
        </h1>
        <div className="flex items-center gap-3">
          {savedPatterns.length > 0 && (
            <select
              className="bg-teal-700 text-white text-sm rounded px-2 py-1 border border-teal-400"
              defaultValue=""
              onChange={(e) => {
                const p = savedPatterns.find(p => p.id === e.target.value);
                if (p) onLoadPattern(p);
                e.target.value = '';
              }}
            >
              <option value="" disabled>Patrones guardados ({savedPatterns.length})</option>
              {savedPatterns.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          )}
          <button
            onClick={onNewPattern}
            className="bg-white text-teal-600 text-sm font-medium rounded px-3 py-1 hover:bg-teal-50 transition-colors"
          >
            Nuevo
          </button>
        </div>
      </div>
    </header>
  );
}
