import random from '../utils/random';
import memoize from '../utils/memoize';
import type { Options } from '..';
// import { initClipper } from '../utils/clipper';

// TODO fix up types for memoize
// It would be cleaner to be able to write
// const getCircles = memoize(async (options: Options) => {
// instead of casting manually
const getCircles = memoize(async (o) => {
  const circles: { x: number; y: number; r: number }[] = [];

  const options = o as Options;

  for (let i = 0; i <= 20; i++) {
    const circle = {
      x: options.distributionEasing(i / 20) * options.width,
      y: options.height * 0.5,
      r: random(options.radius.min, options.radius.max),
    };
    circles.push(circle);
  }

  return circles;
}) as (options: Options) => Promise<{ x: number; y: number; r: number }[]>;

export default async function getDrawingData(options: Options) {
  // const { width, height, mainSeed, easing, easingEasing } = options;

  // Init clipper
  // await initClipper();

  // --------- Main logic
  const circles = await getCircles(options);

  return {
    circles,
  };
}
