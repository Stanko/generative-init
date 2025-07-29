import { originalRandom } from '..';
import random from './random';
import { words } from './words';

export default function generateSeed() {
  return [1, 2, 3]
    .map(() => {
      const index = random(0, words.length - 1, originalRandom, 0);
      return words[index];
    })
    .join('-');
}
