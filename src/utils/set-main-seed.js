import seedrandom from 'seedrandom';

export default function setMainSeed(seed) {
  const rng = seedrandom(seed);
  Math.random = rng;
}