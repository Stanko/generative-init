import p5 from 'p5';
import setMainSeed from '../utils/set-main-seed';

let sketchInstance;

export default function drawing(options) {
  const {
    width,
    height,
    mainSeed,
  } = options;
  
  // Swap Math.random for a seeded rng
  setMainSeed(mainSeed);

  // Destroy p5 sketch
  if (sketchInstance) {
    sketchInstance.remove();
  }

  sketchInstance = new p5((sketch) => {
    sketch.setup = () => {
      sketch.noLoop();
  
      sketch.createCanvas(width, height);
  
      sketch.background(0);
    };
  
    sketch.draw = () => {
      sketch.fill('white')
      sketch.circle(100, 100, 40);
    };
  }, document.querySelector('.sketch'));
}