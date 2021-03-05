// import { IS_BROWSER, IS_NODE } from './constants/env';
import knobs, { randomize } from './knobs';
import render from './drawing/render';


function main(options) {
  console.log(options);
  render(options);
}

knobs(main);

document.querySelector('.randomize').addEventListener('click', randomize);