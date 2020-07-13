import p5 from 'p5';
// import { IS_BROWSER, IS_NODE } from './constants/env';
import knobs, { randomize } from './knobs';
import drawing from './drawing'

let sketchInstance;

function main(options) {
  if (sketchInstance) {
    sketchInstance.remove();
  }
  console.log(options);

  drawing(options);
}

knobs((options) => {
  main(options);
});

document.querySelector('.randomize').addEventListener('click', randomize);