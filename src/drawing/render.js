import getDrawingData from './index';
import setMainSeed from '../utils/set-main-seed';
import svg from '../utils/svg';

let timer;

export default async function render(options) {
  const { width, height, mainSeed } = options;

  // Swap Math.random for a seeded rng
  setMainSeed(mainSeed);

  // --------- Main logic
  const data = await getDrawingData(options);

  // --------- Render

  const svgElement = svg.create(options);
  console.time((timer = 'svg render'));
  let svgContent = '';

  data.circles.forEach((circle) => {
    svgContent += svg.circle(circle, circle.r, {
      fill: 'none',
      stroke: 'black',
    });
  });

  svgContent += svgContent += svg.circle(data.asyncCircle, data.asyncCircle.r, {
    fill: 'none',
    stroke: 'black',
  });

  svgElement.innerHTML = svgContent;
  console.timeEnd(timer);
}
