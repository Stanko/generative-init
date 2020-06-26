import { Lines } from '../../../generative-utils/lines/lines';

let fs;

const isNode = typeof window === 'undefined';
const isBrowser = !isNode;

if (isNode) {
  fs = require('fs');
} else {
  require('p5');
}

import seedrandom from 'seedrandom';

const l = new Lines();

let seed = 'seed';

if (isBrowser) {
  const hash = window.location.hash.replace('#', '');

  if (hash) {
    seed = hash;
  } else {
    seed = Math.random().toString(32).substr(2);
    window.location.hash = seed;
  }

  window.addEventListener('hashchange', () => {
    window.location.reload();
  });
}

const rng = seedrandom(seed);
Math.random = rng;

const w = 3000;
const h = 3000;

function main() {
}

if (typeof window === 'undefined') {
  main();
  console.log('Total lines: ', l.lines.length);
  console.log('Removed double lines: ', l.skippedLinesCount);

  const file = fs.openSync(`./svg/{ seed }.svg`, 'w');

  fs.writeSync(
    file, 
    `<svg viewBox="0 0 ${ w } ${ h }" xmlns="http://www.w3.org/2000/svg">\n<g stroke="black">`
  );

  l.lines.forEach(line => {
    fs.writeSync(file, `<path d="M ${ line.x1 }, ${ line.y1 } L ${ line.x2 }, ${ line.y2 }" />\n`);
  });

  fs.writeSync(file, `</g>\n</svg>`);
} else {
  window.setup = function() {
    createCanvas(w, h);
    background(255);
  };

  window.draw = function() {
    noLoop();
    main();
  }
}