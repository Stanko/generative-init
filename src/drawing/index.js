import random from '../utils/random';
import memoize from '../utils/memoize';
import { difference, init, intersection, offset, union, xor } from '../utils/clipper';

export default async function getDrawingData(options) {
  const { width, height, mainSeed, easing, easingFn } = options;

  // Init clipper
  await init();

  // --------- Main logic
  const A = [
    { x: 100, y: 0 },
    { x: 200, y: 100 },
    { x: 100, y: 300 },
    { x: 0, y: 100 },
  ];

  const A1 = [
    A,
    [
      { x: 100, y: 20 },
      { x: 180, y: 100 },
      { x: 100, y: 260 },
      { x: 20, y: 100 },
    ].reverse(),
  ];

  const B = [
    { x: 150, y: 0 },
    { x: 350, y: 100 },
    { x: 150, y: 200 },
    { x: 50, y: 100 },
  ];

  const B1 = [
    B,
    [
      { x: 150, y: 20 },
      { x: 310, y: 100 },
      { x: 150, y: 180 },
      { x: 70, y: 100 },
    ],
  ];

  const C = B.map((p) => {
    return {
      x: p.x + 20,
      y: p.y + 120,
    };
  });

  return {
    polygons: [A1, B1, [C]],
    unionTest: difference([A1, B1, [C]]),
    offsetTest: offset(A1, 5, 'square', 'polygon'),
  };
}
