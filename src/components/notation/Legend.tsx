import { useState } from 'react';
import { getDictionary } from '../../notation';

export function LegendButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 bg-teal-600 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-teal-700 transition-colors text-lg"
        title="Leyenda de abreviaciones"
        aria-label="Abrir leyenda"
      >
        ?
      </button>

      {open && <LegendModal onClose={() => setOpen(false)} />}
    </>
  );
}

function LegendModal({ onClose }: { onClose: () => void }) {
  const es = getDictionary('es');
  const en = getDictionary('en');
  const sym = getDictionary('symbol');

  const rows: { desc: string; es: string; en: string; sym: string }[] = [
    { desc: 'Punto bajo / Single crochet',       es: es.stitches.sc,  en: en.stitches.sc,  sym: sym.stitches.sc },
    { desc: 'Media vareta / Half double crochet', es: es.stitches.hdc, en: en.stitches.hdc, sym: sym.stitches.hdc },
    { desc: 'Vareta / Double crochet',            es: es.stitches.dc,  en: en.stitches.dc,  sym: sym.stitches.dc },
    { desc: 'Doble vareta / Treble crochet',      es: es.stitches.tr,  en: en.stitches.tr,  sym: sym.stitches.tr },
    { desc: 'Aumento / Increase',                 es: es.actions.increase,   en: en.actions.increase,   sym: sym.actions.increase },
    { desc: 'Disminución / Decrease',              es: es.actions.decrease,   en: en.actions.decrease,   sym: sym.actions.decrease },
    { desc: 'Cadena / Chain',                      es: es.actions.chain,      en: en.actions.chain,      sym: sym.actions.chain },
    { desc: 'Punto deslizado / Slip stitch',       es: es.actions.slipStitch, en: en.actions.slipStitch, sym: sym.actions.slipStitch },
    { desc: 'Anillo mágico / Magic ring',          es: es.actions.magicRing,  en: en.actions.magicRing,  sym: sym.actions.magicRing },
    { desc: 'Grupo de repetición / Repeat group',  es: '* ... *',             en: '* ... *',             sym: '* ... *' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-5"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">Leyenda / Abbreviation Key</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200 text-left">
                <th className="pb-2 pr-3 text-gray-500 font-medium">Concepto</th>
                <th className="pb-2 px-3 text-gray-500 font-medium">ES</th>
                <th className="pb-2 px-3 text-gray-500 font-medium">EN</th>
                <th className="pb-2 pl-3 text-gray-500 font-medium">Simbolo</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.desc} className="border-b border-gray-100 last:border-0">
                  <td className="py-1.5 pr-3 text-gray-600 text-xs">{r.desc}</td>
                  <td className="py-1.5 px-3 font-mono font-semibold text-teal-700 whitespace-nowrap">{r.es}</td>
                  <td className="py-1.5 px-3 font-mono font-semibold text-teal-700 whitespace-nowrap">{r.en}</td>
                  <td className="py-1.5 pl-3 font-mono font-semibold text-teal-700 whitespace-nowrap text-center">{r.sym}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
