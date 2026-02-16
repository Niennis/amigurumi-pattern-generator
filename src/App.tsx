import { useMemo } from 'react';
import type { Pattern, ShapeDimensions } from './types';
import { NotationProvider } from './context/NotationContext';
import { Layout } from './components/layout/Layout';
import { Header } from './components/layout/Header';
import { GaugeForm } from './components/gauge/GaugeForm';
import { ShapeSelector } from './components/shape/ShapeSelector';
import { DimensionsForm } from './components/shape/DimensionsForm';
import { PatternView } from './components/pattern/PatternView';
import type { PatternSummaryData } from './components/pattern/PatternView';
import { NotationToggle } from './components/notation/NotationToggle';
import { LegendButton } from './components/notation/Legend';
import { ExportButton } from './components/export/ExportButton';
import { usePattern } from './hooks/usePattern';
import { useLocalStorage } from './hooks/useLocalStorage';

function AppContent() {
  const pattern = usePattern();

  const summaryData: PatternSummaryData = useMemo(() => ({
    gauge: pattern.gauge,
    stitchType: pattern.stitchType,
    dimensions: pattern.dimensions,
    calibration: pattern.calibration,
  }), [pattern.gauge, pattern.stitchType, pattern.dimensions, pattern.calibration]);
  const [savedPatterns, setSavedPatterns] = useLocalStorage<Pattern[]>('amigurumi-patterns', []);

  const handleSave = () => {
    const p = pattern.toPattern();
    setSavedPatterns(prev => {
      const existing = prev.findIndex(x => x.name === p.name);
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = { ...p, id: prev[existing].id, createdAt: prev[existing].createdAt };
        return next;
      }
      return [...prev, p];
    });
  };

  const handleDelete = (id: string) => {
    setSavedPatterns(prev => prev.filter(p => p.id !== id));
  };

  const isDimensionsValid = () => {
    const d = pattern.dimensions;
    switch (d.shape) {
      case 'sphere': return d.diameter > 0;
      case 'cylinder': return d.diameter > 0 && d.height > 0;
      case 'cone': return d.bottomDiameter > 0 && d.height > 0;
      case 'flat-circle': return d.diameter > 0;
      case 'flat-rectangle': return d.width > 0 && d.height > 0;
    }
  };

  return (
    <Layout>
      <Header
        savedPatterns={savedPatterns}
        onLoadPattern={pattern.loadPattern}
        onNewPattern={pattern.reset}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => s < pattern.step && pattern.setStep(s)}
                disabled={s > pattern.step}
                className={`
                  w-8 h-8 rounded-full text-sm font-medium transition-all
                  ${s === pattern.step
                    ? 'bg-teal-600 text-white'
                    : s < pattern.step
                      ? 'bg-teal-200 text-teal-700 cursor-pointer hover:bg-teal-300'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                `}
              >
                {s}
              </button>
              {s < 3 && (
                <div className={`w-12 h-0.5 ${s < pattern.step ? 'bg-teal-300' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {pattern.step === 1 && (
            <GaugeForm
              gauge={pattern.gauge}
              onChange={pattern.setGauge}
              stitchType={pattern.stitchType}
              onStitchTypeChange={pattern.setStitchType}
              calibration={pattern.calibration}
              onCalibrationChange={pattern.setCalibration}
              onNext={() => pattern.setStep(2)}
            />
          )}

          {pattern.step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Paso 2: Forma y dimensiones</h2>
                <p className="text-sm text-gray-500">Selecciona la forma y sus medidas.</p>
              </div>

              <ShapeSelector
                selected={pattern.shape}
                onChange={(s) => pattern.setShape(s)}
              />

              <DimensionsForm
                shape={pattern.shape}
                dimensions={pattern.dimensions}
                onChange={(d: ShapeDimensions) => pattern.setDimensions(d)}
              />

              <div className="flex gap-3">
                <button
                  onClick={() => pattern.setStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium rounded-lg py-2.5 hover:bg-gray-50 transition-colors"
                >
                  Anterior
                </button>
                <button
                  onClick={pattern.generate}
                  disabled={!isDimensionsValid()}
                  className="flex-1 bg-teal-600 text-white font-medium rounded-lg py-2.5 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Generar patrón
                </button>
              </div>
            </div>
          )}

          {pattern.step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">Paso 3: Patrón generado</h2>
                  <p className="text-sm text-gray-500">Revisa, edita notas y exporta tu patrón.</p>
                </div>
                <NotationToggle />
              </div>

              <PatternView
                rounds={pattern.rounds}
                onUpdateRound={pattern.updateRound}
                patternName={pattern.patternName}
                onNameChange={pattern.setPatternName}
                summary={summaryData}
              />

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-teal-600 text-white font-medium rounded-lg py-2.5 hover:bg-teal-700 transition-colors"
                >
                  Guardar patrón
                </button>
                {savedPatterns.some(p => p.name === pattern.patternName) && (
                  <button
                    onClick={() => {
                      const p = savedPatterns.find(x => x.name === pattern.patternName);
                      if (p) handleDelete(p.id);
                    }}
                    className="border border-red-300 text-red-600 font-medium rounded-lg px-4 py-2.5 hover:bg-red-50 transition-colors"
                  >
                    Eliminar
                  </button>
                )}
              </div>

              <ExportButton rounds={pattern.rounds} patternName={pattern.patternName} summary={summaryData} />

              <button
                onClick={() => pattern.setStep(2)}
                className="w-full border border-gray-300 text-gray-700 font-medium rounded-lg py-2.5 hover:bg-gray-50 transition-colors"
              >
                Volver a configurar
              </button>
            </div>
          )}
        </div>
      </main>
      <LegendButton />
    </Layout>
  );
}

function App() {
  return (
    <NotationProvider>
      <AppContent />
    </NotationProvider>
  );
}

export default App;
