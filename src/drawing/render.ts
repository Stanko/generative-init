import getDrawingData from './index';
import svgUtils from '../utils/svg-utils';
import type { Options } from '../utils/options-type';

export default async function render(options: Options): Promise<SVGElement> {
  const { width, height } = options;

  // ----- SVG init ----- //
  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svgElement.setAttribute('preserveAspectRatio', 'none');

  // ----- Main logic ----- //
  // TODO add default memoization for "getDrawingData"
  console.time('drawing data');
  const data = await getDrawingData(options);
  console.timeEnd('drawing data');

  // ----- Render ----- //
  console.time('svg render');
  // Add current URL with parameters into the SVG
  let svgContent = `\n<!-- ${window.location.href} -->\n`;

  svgContent += data.circles
    .map((circle) => {
      return svgUtils.getCircle(circle, circle.r, {
        fill: 'none',
        stroke: 'black',
      });
    })
    .join('\n');

  svgElement.innerHTML = svgContent;
  console.timeEnd('svg render');

  return svgElement;
}
