import knobs, { randomize } from './knobs';
import render from './drawing/render';
import setTitle from './utils/set-title';

function main(options) {
  console.log(options);

  setTitle(options, '');
  render(options);
}

knobs(main);

document.querySelector('.randomize').addEventListener('click', randomize);
