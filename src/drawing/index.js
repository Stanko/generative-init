import random from '../utils/random';
import memoize from '../utils/memoize';
import { getClipperInstance } from '../utils/clipper';

// Global instance on js-angusj-clipper
let clipper;

const getCircles = memoize((mainSeed, width, height, easing) => {
  const circles = [];
  const step = 1 / 100;

  for (let i = 0; i <= 1; i += step) {
    const t = easing(i);

    circles.push({
      x: t * width,
      y: height * 0.5,
      r: 2,
    });
  }

  return circles;
});

const getAsyncCircle = memoize((mainSeed, width, height) => {
  return new Promise((resolve, reject) => {
    const circle = {
      x: random(width * 0.1, width * 0.9, null, 0),
      y: random(height * 0.1, height * 0.9, null, 0),
      r: 30,
    };

    setTimeout(() => {
      resolve(circle);
    }, 100);
  });
});

export default async function getDrawingData(options) {
  const { width, height, mainSeed, easing, easingFn } = options;

  clipper = getClipperInstance();

  // --------- Main logic
  const circles = getCircles(mainSeed, width, height, easingFn);
  const asyncCircle = await getAsyncCircle(mainSeed, width, height);

  return {
    circles,
    asyncCircle,
  };
}
