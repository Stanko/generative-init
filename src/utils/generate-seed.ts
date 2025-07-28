import { generate } from 'random-words';

export default function generateSeed() {
  return (generate(3) as string[]).join('-');
}
