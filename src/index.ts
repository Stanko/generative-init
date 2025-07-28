import '@stanko/dual-range-input/dist/index.css';
import render from './drawing/render';
// import setTitle from './utils/set-title';

import './scss/index.scss';

// import knobs from './knobs';

// function main(options) {
//   setTitle(options, 'INIT');
//   console.log(options);

//   render(options);
// }

// // Reset template
// document.querySelector('.app').innerHTML = `
// <div class="sketch"></div>
// <div class="knobs"></div>
// `;

// knobs(main);

import { Controls } from './controls/controls.ts';

const controls = new Controls([
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
    type: 'dual-range',
    name: 'minMax',
    defaultValue: {
      min: 20,
      max: 80,
    },
    options: {
      min: 0,
      max: 100,
      step: 1,
    },
  },
  {
    type: 'radio',
    name: 'shape',
    defaultValue: 0,
    options: {
      items: [
        {
          label: 'rect',
          value: 'rect',
        },
        {
          label: 'circle',
          value: 'circle',
        },
        {
          label: 'triangle',
          value: 'triangle',
        },
      ],
    },
  },
  {
    type: 'easing',
    name: 'easing',
  },
]);

const controlsDiv = document.querySelector('.controls') as HTMLDivElement;
// const drawingDiv = document.querySelector('.drawing') as HTMLDivElement;

controls.addToContainer(controlsDiv);

document.addEventListener('keypress', (e: KeyboardEvent) => {
  if (document.activeElement === document.body) {
    e.preventDefault();

    if (e.key === 's') {
      document.body.classList.toggle('hide-controls');
    } else if (e.key === 'r') {
      controls.randomize();
    }
  }
});

controls.onChange = () => {
  const options = controls.getOptions();
  render(options);
};
