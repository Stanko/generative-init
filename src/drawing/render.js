import getDrawingData from './index';
import setMainSeed from '../utils/set-main-seed';

// Globals
let sketchWrapperElement;
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
  sketchWrapperElement = document.querySelector('.sketch');

  const { width, height, mainSeed } = options;

  // Swap Math.random for a seeded rng
  setMainSeed(mainSeed);

  // --------- Main logic
  const data = await getDrawingData(options);

  // --------- SVG
  createSVG(options);

  let svgContent = '';

  data.circles.forEach((circle) => {
    svgContent += `<circle cx="${circle.x}" cy="${circle.y}" r="${circle.r}" fill="none" stroke="black" />`;
  });

  svgContent += `<circle cx="${data.asyncCircle.x}" cy="${data.asyncCircle.y}" r="${data.asyncCircle.r}" fill="none" stroke="black" />`;

  svgElement.innerHTML = svgContent;
}
