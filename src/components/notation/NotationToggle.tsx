import type { NotationLang } from '../../types';
import { useNotation } from '../../context/NotationContext';

const options: { value: NotationLang; label: string }[] = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'symbol', label: 'Símbolos' },
];

export function NotationToggle() {
  const { lang, setLang } = useNotation();

  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => setLang(opt.value)}
          className={`
            px-3 py-1 text-sm rounded-md transition-all
            ${lang === opt.value
              ? 'bg-white text-teal-600 font-medium shadow-sm'
              : 'text-gray-600 hover:text-gray-800'}
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
