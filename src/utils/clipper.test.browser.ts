import type { MainModule } from 'clipper2-wasm/dist/clipper2z';
import { initClipper, union, xor, difference, intersection, type Point, offset } from './clipper';
import { describe, it, expect, beforeAll } from 'vitest';

const A: Point[][] = [
  [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 10, y: 10 },
    { x: 0, y: 10 },
  ],
];

const B: Point[][] = [
  [
    { x: 5, y: 5 },
    { x: 15, y: 5 },
    { x: 15, y: 15 },
    { x: 5, y: 15 },
  ],
];

// Because the SCALE is set to 100 the rounding error can be up to 0.01
const EPSILON = 0.01;

const isClose = (a: number, b: number): boolean => {
  return Math.abs(a - b) < EPSILON;
};

const checkPaths = (a: Point[], b: Point[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }
  for (let index in a) {
    const point = a[index];
    const found = b.find((p) => isClose(p.x, point.x) && isClose(p.y, point.y));

    if (!found) {
      return false;
    }
  }

  return true;
};

describe('clipper2 utils', () => {
  let clipper: MainModule;

  beforeAll(async () => {
    clipper = await initClipper();
  });

  it('should return a clipper2 instance', () => {
    expect(clipper).toBeDefined();
  });

  it('should perform union operation', () => {
    const result = union([A, B]);

    const expected = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 5 },
      { x: 15, y: 5 },
      { x: 15, y: 15 },
      { x: 5, y: 15 },
      { x: 5, y: 10 },
      { x: 0, y: 10 },
    ];

    expect(checkPaths(result[0], expected)).toBe(true);
  });

  it('should perform difference operation', () => {
    const result = difference([A, B]);

    const expected = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 5 },
      { x: 5, y: 5 },
      { x: 5, y: 10 },
      { x: 0, y: 10 },
    ];

    expect(checkPaths(result[0], expected)).toBe(true);
  });

  it('should perform intersection operation', () => {
    const result = intersection([A, B]);

    const expected = [
      { x: 5, y: 5 },
      { x: 10, y: 5 },
      { x: 10, y: 10 },
      { x: 5, y: 10 },
    ];

    expect(checkPaths(result[0], expected)).toBe(true);
  });

  it('should perform xor operation', () => {
    const result = xor([A, B]);

    const expected1 = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 5 },
      { x: 5, y: 5 },
      { x: 5, y: 10 },
      { x: 0, y: 10 },
    ];
    const expected2 = [
      { x: 10, y: 5 },
      { x: 15, y: 5 },
      { x: 15, y: 15 },
      { x: 5, y: 15 },
      { x: 5, y: 10 },
      { x: 10, y: 10 },
    ];

    expect(checkPaths(result[0], expected1) || checkPaths(result[0], expected2)).toBe(true);
    expect(checkPaths(result[1], expected1) || checkPaths(result[1], expected2)).toBe(true);
  });

  it('should perform offset operation on a line', () => {
    const line = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    ];

    const result1 = offset([line], 5, 'square', 'butt');

    const expected1 = [
      { x: 0, y: -5 },
      { x: 10, y: -5 },
      { x: 10, y: 5 },
      { x: 0, y: 5 },
    ];

    expect(checkPaths(result1[0], expected1)).toBe(true);

    const result2 = offset([line], 5, 'square', 'square');

    const expected2 = [
      { x: -5, y: -5 },
      { x: 15, y: -5 },
      { x: 15, y: 5 },
      { x: -5, y: 5 },
    ];

    expect(checkPaths(result2[0], expected2)).toBe(true);
  });

  it('should perform offset operation on a polygon', () => {
    const result = offset(A, 5, 'miter', 'polygon');

    const expected = [
      { x: -5, y: -5 },
      { x: 15, y: -5 },
      { x: 15, y: 15 },
      { x: -5, y: 15 },
    ];

    expect(checkPaths(result[0], expected)).toBe(true);
  });
});
