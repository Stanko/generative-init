import seedrandom from 'seedrandom';

// Backup reference to the browsers Math.random method
export const originalRandom = Math.random;

export default function setMainSeed(seed) {
  const rng = seedrandom(seed);
  Math.random = rng;
}