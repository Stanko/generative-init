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

  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);

  console.time((timer = 'svg render'));
  let svgContent = '';

  // data.circles.forEach((circle) => {
  //   svgContent += svg.circle(circle, circle.r, {
  //     fill: 'none',
  //     stroke: 'black',
  //   });
  // });

  // svgContent += svg.circle(data.asyncCircle, data.asyncCircle.r, {
  //   fill: 'none',
  //   stroke: 'black',
  // });

  const colors = ['blue', 'red'];
  data.polygons.forEach((polygon, i) => {
    svgContent += svg.complexPath(polygon, true, {
      fill: 'none',
      stroke: colors[i % colors.length],
    });
  });

  svgContent += svg.complexPath(data.unionTest, true, {
    fill: 'rgb(0 0 255 / 0.3)',
    stroke: 'black',
    'stroke-width': 5,
  });

  svgContent += svg.complexPath(data.offsetTest, true, {
    fill: 'rgb(255 0 0 / 0.1)',
    stroke: 'black',
    'stroke-width': 1,
  });

  svgElement.innerHTML = svgContent;
  console.timeEnd(timer);

  document.querySelector('.drawing').replaceChildren(svgElement);
}
