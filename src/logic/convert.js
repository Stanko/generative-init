import { getRectBrightness } from './helpers';
import { getDistanceBetweenPoints } from '../../../generative-utils/points'

const DEBUG = true;

const svgGroup = document.querySelector('g');

function getRectCornerFromCenter(center, rectangleSize) {
  return {
    x: center.x - (rectangleSize / 2),
    y: center.y - (rectangleSize / 2),
  };
}

function drawImageOnCanvas(
  imageSrc:string,
  size: number,
  callback:(canvas:HTMLCanvasElement) => void,
) {
  const canvas:HTMLCanvasElement = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx:CanvasRenderingContext2D = canvas.getContext('2d');

  const image = new Image();

  image.addEventListener('load', () => {
    // Get the largest square from the image
    let yOffset = 0;
    let xOffset = 0;
    let imageSize;

    // TODO add ratio
    if (image.height > image.width) {
      yOffset = (image.height - image.width) / 2;
      imageSize = image.width;
    } else {
      xOffset = (image.width - image.height) / 2;
      imageSize = image.height;
    }

    ctx.drawImage(image, xOffset, yOffset, imageSize, imageSize, 0, 0, size, size);

    if (callback) {
      callback(canvas);
    }
  });

  // Load image
  image.src = imageSrc;
}

export default function convert(
  imageSrc:string,
  lines: [[]],
  defaultOptions: {},
  callback:() => void
) {
  const size = 800;

  // const options = {
  //   ...defaultOptions,
  //   ...customOptions,
  // };

  drawImageOnCanvas(imageSrc, size, (canvas) => {
    const ctx:CanvasRenderingContext2D = canvas.getContext('2d');

    const rectangleSize = 3;

    const helperRectangles = [];

    lines.forEach((line:any, i) => {
      let lineBrightness = 0;
      let previous = null;

      line.forEach((p, j) => {
        const corner = getRectCornerFromCenter(p, rectangleSize);

        const brightness = getRectBrightness(ctx, corner.x, corner.y, rectangleSize);

        const b = 1 - brightness / 255;
        const r = b * 4 + 1;

        if (!previous) {
          // First point
          p.r = r;
          previous = p;
        } else {
          const d = getDistanceBetweenPoints(previous, p);
          
          // Check if circles are overlapping
          if (previous.r + r < d) {
            p.r = r;
            previous = p;
          }
        }

        lineBrightness += brightness;

        if (DEBUG) {
          helperRectangles.push(corner)
        }
      });
      
      line.lineBrightness = lineBrightness / line.length;
    });

    // TODO
    // callback();

    let html = '';

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);

    lines.forEach((line:any, i) => {
      const fill = `rgb(${ Math.round(line.lineBrightness) },${ Math.round(line.lineBrightness) },${ Math.round(line.lineBrightness) })`;
      let lineHtml = `<g fill="${ fill }">`;

      line.forEach((p:any, i) => {
        if (p.r) {
          
          lineHtml += `<circle cx="${ p.x }" cy="${ p.y }" r="${ p.r }"  />`
          // ctx.fillStyle = fill;
          // ctx.beginPath();
          // ctx.ellipse(p.x, p.y, p.r, p.r, 0, 0, 2 * Math.PI);
          // ctx.stroke();
        }
      });

      lineHtml += '</g>';

      html += lineHtml;
    });

    svgGroup.innerHTML = html;

    // ctx.stroke();


    if (DEBUG) {
      ctx.strokeStyle = 'orange';

      // helperRectangles.forEach(rect => {
      //   ctx.strokeRect(rect.x, rect.y, rectangleSize, rectangleSize);
      // });

      // document.querySelector('.debug').innerHTML = '';
      document.querySelector('.debug').appendChild(canvas);
    }
  });
}