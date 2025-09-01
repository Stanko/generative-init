import seedrandom from 'seedrandom';
import random from './random';
import type { Options } from './options-type';

const getIcon = (color: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.fillStyle = color;
  context.roundRect(0, 0, 64, 64, 32);
  context.fill();
  return canvas.toDataURL();
};

const setTitle = (options: Options, title = '') => {
  if (title) {
    title += ' • ';
  }

  const rng = seedrandom(JSON.stringify(options));

  const l = random(0.6, 0.8, rng, 2).toString();
  const c = random(0.2, 0.4, rng, 2).toString();
  const h = random(0, 360, rng, 0).toString();
  const color = `oklch(${l} ${c} ${h})`;
  const icon = getIcon(color);

  console.log('%c  ', `background: ${color}`, options.mainSeed);

  const iconElement = document.querySelector('link[rel="icon"]') as HTMLLinkElement;

  // Probably should be removed
  // Testing colors for now
  const controlsElement = document.querySelector('.controls') as HTMLElement;
  controlsElement.style.setProperty('--ctrls-h', h);

  iconElement.setAttribute('href', icon);

  document.title = title + options.mainSeed;
};

export default setTitle;
