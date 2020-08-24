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

export const knobInputGenerator = {
  [knobTypes.BOOL]: (knob, value, handler) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = value;
    input.addEventListener('change', () => handler(knob.name, input.checked));

    return input;
  },
  [knobTypes.SEED]: (knob, value, handler) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', value);
    input.addEventListener('change', () => handler(knob.name, input.value));

    return input;
  },
  [knobTypes.RANGE]: (knob, value, handler) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'range');
    input.setAttribute('min', knob.min);
    input.setAttribute('max', knob.max);
    input.setAttribute('step', knob.step);
    input.setAttribute('value', value);
    input.addEventListener('change', () => handler(knob.name, input.value));

    return input;
  },
};