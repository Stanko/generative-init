import p5 from 'p5';
// import { IS_BROWSER, IS_NODE } from './constants/env';
import knobs, { randomize } from './knobs';

let sketchInstance;

function main(options) {
  if (sketchInstance) {
    sketchInstance.remove();
  }
  console.log(options);

  new p5((sketch) => {
    sketchInstance = sketch;

    sketch.setup = () => {
      sketch.noLoop();
  
      sketch.createCanvas(options.width, options.height); // p5.P2D
  
      sketch.background(0);
    };
  
    sketch.draw = () => {
      sketch.fill('white')
      sketch.circle(100, 100, 40);
    };
  
  
  }, document.querySelector('.sketch'));
}

knobs((options) => {
  main(options);
});

document.querySelector('.randomize').addEventListener('click', randomize);