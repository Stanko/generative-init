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
    defaultValue: 420,
    isRandomizationDisabled: true,
    options: {
      min: 50,
      max: 1000,
      step: 1,
    },
  },
  {
    type: 'range',
    name: 'height',
    defaultValue: 297,
    isRandomizationDisabled: true,
    options: {
      min: 50,
      max: 1000,
      step: 1,
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
    options: {
      min: 0.5,
      max: 15,
      step: 0.5,
    },
  },
] as const satisfies readonly TypedControlConfig[];
