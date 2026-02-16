import { useState, useCallback } from 'react';
import type { GaugeData, ShapeType, StitchType, ShapeDimensions, Round, Pattern, CalibrationData } from '../types';
import { generatePattern } from '../engine/pattern-generator';

const defaultGauge: GaugeData = {
  stitchesPer5cm: 25,
  rowsPer5cm: 25,
  yarnWeight: 'worsted',
  hookSizeMm: 4,
  method: 'spiral',
};

const defaultDimensions: ShapeDimensions = { shape: 'sphere', diameter: 6 };

export function usePattern() {
  const [gauge, setGauge] = useState<GaugeData>(defaultGauge);
  const [shape, setShape] = useState<ShapeType>('sphere');
  const [stitchType, setStitchType] = useState<StitchType>('sc');
  const [dimensions, setDimensions] = useState<ShapeDimensions>(defaultDimensions);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [patternName, setPatternName] = useState('');
  const [step, setStep] = useState(1);
  const [calibration, setCalibration] = useState<CalibrationData | null>(null);

  const handleShapeChange = useCallback((newShape: ShapeType) => {
    setShape(newShape);
    switch (newShape) {
      case 'sphere':
        setDimensions({ shape: 'sphere', diameter: 6 });
        break;
      case 'cylinder':
        setDimensions({ shape: 'cylinder', diameter: 4, height: 10 });
        break;
      case 'cone':
        setDimensions({ shape: 'cone', topDiameter: 1, bottomDiameter: 6, height: 8 });
        break;
      case 'flat-circle':
        setDimensions({ shape: 'flat-circle', diameter: 10 });
        break;
      case 'flat-rectangle':
        setDimensions({ shape: 'flat-rectangle', width: 15, height: 20 });
        break;
    }
  }, []);

  const generate = useCallback(() => {
    const result = generatePattern(shape, dimensions, gauge, stitchType, calibration);
    setRounds(result);
    setStep(3);
  }, [shape, dimensions, gauge, stitchType, calibration]);

  const updateRound = useCallback((index: number, round: Round) => {
    setRounds(prev => {
      const next = [...prev];
      next[index] = round;
      return next;
    });
  }, []);

  const toPattern = useCallback((): Pattern => ({
    id: crypto.randomUUID(),
    name: patternName || 'Sin nombre',
    shape,
    gauge,
    stitchType,
    dimensions,
    rounds,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }), [patternName, shape, gauge, stitchType, dimensions, rounds]);

  const loadPattern = useCallback((p: Pattern) => {
    setGauge(p.gauge);
    setShape(p.shape);
    setStitchType(p.stitchType);
    setDimensions(p.dimensions);
    setRounds(p.rounds);
    setPatternName(p.name);
    setStep(3);
  }, []);

  const reset = useCallback(() => {
    setGauge(defaultGauge);
    setShape('sphere');
    setStitchType('sc');
    setDimensions(defaultDimensions);
    setRounds([]);
    setPatternName('');
    setCalibration(null);
    setStep(1);
  }, []);

  return {
    gauge, setGauge,
    shape, setShape: handleShapeChange,
    stitchType, setStitchType,
    dimensions, setDimensions,
    rounds, updateRound,
    patternName, setPatternName,
    step, setStep,
    calibration, setCalibration,
    generate,
    toPattern,
    loadPattern,
    reset,
  };
}
