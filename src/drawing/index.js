import memoizee from 'memoizee';

import random from '../utils/random';

const getCircle = memoizee((mainSeed, width, height) => {
  return {
    x: random(width * 0.1, width * 0.9, null, 0),
    y: random(height * 0.1, height * 0.9, null, 0),
    r: 30,
  };
});

const getAsyncCircle = memoizee(
  (mainSeed, width, height) => {
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
  },
  { promise: true }
);

export default async function getDrawingData(options) {
  const { width, height, mainSeed, format } = options;

  // --------- Main logic
  const circle = getCircle(mainSeed, width, height);
  const asyncCircle = await getAsyncCircle(mainSeed, width, height);

  return {
    circle,
    asyncCircle,
  };
}
