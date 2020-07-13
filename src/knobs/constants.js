import generateRandomString from '../utils/generate-random-string';
import random from '../utils/random';

export const knobTypes = {
  BOOL: 'checkbox',
  RANGE: 'range',
  SEED: 'text',
};

export const knobDefaultValues = {
  [knobTypes.BOOL]: true,
  [knobTypes.SEED]: generateRandomString(),
  [knobTypes.RANGE]: 0,
};

export const knobParsers = {
  [knobTypes.BOOL]: value => value === 'true',
  [knobTypes.RANGE]: value => parseFloat(value),
};

export const knobRandomValueGenerators = {
  [knobTypes.BOOL]: () => Math.random() > 0.5 ? true : false,
  [knobTypes.SEED]: generateRandomString,
  [knobTypes.RANGE]: ({ min, max, step = 1 }) => {
    const decimalPlaces = step % 1 === 0 ? 0 : 2;

    return random(min, max, decimalPlaces);
  },
};