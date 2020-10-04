import {
  knobTypes,
} from '../knobs/constants';

const KNOBS = [
  {
    name: 'debug',
    type: knobTypes.BOOL,
    default: true,
    disableRandomization: true,
  },
  {
    name: 'width',
    type: knobTypes.RANGE,
    disableRandomization: true,
    min: 500,
    step: 50,
    max: 2000,
    default: 1000,
  },
  {
    name: 'height',
    type: knobTypes.RANGE,
    disableRandomization: true,
    min: 500,
    step: 50,
    max: 2000,
    default: 1000,
  },
  {
    name: 'radio',
    type: knobTypes.RADIO,
    options: [
      'one',
      'two',
      'three',
    ],
  },
  {
    name: 'mainSeed',
    type: knobTypes.SEED,
  },
];

export default KNOBS;
