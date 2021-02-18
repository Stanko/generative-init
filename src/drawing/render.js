import p5constructor from 'p5';

import getDrawingData from './index';
import setMainSeed from '../utils/set-main-seed';
import setTitle from '../utils/set-title';

// Globals
const sketchWrapperElement = document.querySelector('.sketch');

let sketchInstance;
let svgElement;


function createSVG(options) {
  // Create SVG element
  if (!svgElement) {
    sketchWrapperElement.innerHTML = '<svg class="svg"></svg>';
    svgElement = document.querySelector('.svg');
  }

  svgElement.setAttribute('viewBox', `0 0 ${options.width} ${options.height}`);
  svgElement.setAttribute('width', options.width);
  svgElement.setAttribute('height', options.height);
}

export default async function render(options) {
  const {
    width,
    height,
    mainSeed,
    format,
  } = options;

  const renderSVG = format === 'svg' || format === 'both';
  const renderCanvas = format === 'canvas' || format === 'both';
  
  // Swap Math.random for a seeded rng
  setMainSeed(mainSeed);
  setTitle(options, '');

  // --------- Main logic
  const data = await getDrawingData(options);
  
  // --------- SVG
  if (renderSVG) {
    createSVG(options);

    let svgContent = '';
    
    svgContent += `<circle cx="${data.circle.x}" cy="${data.circle.y}" r="${data.circle.r}" fill="none" stroke="black" />`;
    svgContent += `<circle cx="${data.asyncCircle.x}" cy="${data.asyncCircle.y}" r="${data.asyncCircle.r}" fill="none" stroke="black" />`;

    svgElement.innerHTML = svgContent;
  } else if (svgElement) {
    // Remove previous SVG element
    svgElement.remove();
    svgElement = null;
  }

  // --------- P5
  // Destroy previous p5 sketch
  if (sketchInstance) {
    sketchInstance.remove();
  }

  if (renderCanvas) {
    sketchInstance = new p5constructor((sketch) => {
      // Set sketch as global variable
      window.p5 = sketch;

      p5.setup = () => {
        p5.noLoop();
    
        p5.createCanvas(width, height);
    
        p5.background(255);
      };
    
      p5.draw = () => {
        p5.circle(data.circle.x, data.circle.y, data.circle.r * 2);
        p5.circle(data.asyncCircle.x, data.asyncCircle.y, data.asyncCircle.r * 2);
      };
    }, sketchWrapperElement);
  }
}