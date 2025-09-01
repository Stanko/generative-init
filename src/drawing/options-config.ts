import type { TypedControlConfig } from '../controls/controls';

export const config = [
  {
    type: 'boolean',
    name: 'debug',
    defaultValue: true,
    isRandomizationDisabled: true,
  },
  {
    type: 'seed',
    name: 'mainSeed',
  },
  {
    type: 'range',
    name: 'width',
    defaultValue: 420, // A3 width in mm
    isRandomizationDisabled: true,
    min: 50,
    max: 1000,
    step: 1,
  },
  {
    type: 'range',
    name: 'height',
    defaultValue: 297, // A3 height in mm
    isRandomizationDisabled: true,
    min: 50,
    max: 1000,
    step: 1,
  },
  {
    type: 'radio',
    name: 'shape',
    items: {
      circle: 'circle',
      square: 'square',
      triangle: 'triangle',
    },
  },
  {
    type: 'easing',
    name: 'distribution',
  },
  {
    type: 'dual-range',
    name: 'radius',
    defaultValue: {
      min: 4,
      max: 8,
    },
    min: 0.5,
    max: 15,
    step: 0.5,
  },
] as const satisfies readonly TypedControlConfig[];
