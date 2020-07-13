import {
  knobDefaultValues,
  knobParsers,
  knobRandomValueGenerators,
} from './constants';

import KNOBS from './knobs';

const DEFAULT_VALUES = {};

KNOBS.forEach((knob) => {
  const hasUserDefaultValue = typeof knob.default !== 'undefined';

  DEFAULT_VALUES[knob.name] = hasUserDefaultValue
    ? knob.default
    : knobDefaultValues[knob.type];
});

function getStateFromHash() {
  const params = window.location.hash.replace('#', '').split('/');
  params.shift();

  const state = {};

  if (params.length !== KNOBS.length) {
    // Hash is invalid
    return null;
  }

  for (let index = 0; index < KNOBS.length; index++) {
    const knob = KNOBS[index];
    const key = knob.name;
    const value = params[index];

    const hasValue = typeof value !== 'undefined';
    const parser = knobParsers[knob.type];

    if (hasValue) {
      state[key] = parser ? parser(value) : value;
    } else {
      // Hash is invalid
      return null;
    }
  }

  return state;
}

function setHash(hashState = {}) {
  window.location.hash = KNOBS.reduce((hash, item) => {
    const key = item.name;
    return (hash += `/${hashState[key]}`);
  }, '');
};

export function randomize() {
  const randomValues = {};
  const currentValues = getStateFromHash();

  KNOBS.forEach((knob) => {
    if (!knob.disableRandomization) {
      randomValues[knob.name] = knobRandomValueGenerators[knob.type](knob);
    } else {
      randomValues[knob.name] = currentValues[knob.name];
    }
  });

  setHash(randomValues);
}

export default function knobs(callback) {
  const state = getStateFromHash();
  const isValidHash = state !== null;

  const options = {
    ...DEFAULT_VALUES,
    ...state,
  };

  if (isValidHash) {
    callback(options);
  } else {
    setHash(options);
  }

  window.addEventListener('hashchange', () => {
    const state = getStateFromHash();
  
    const options = {
      ...DEFAULT_VALUES,
      ...state,
    };

    callback(options);
  });
}
