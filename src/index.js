import knobs from './knobs';
import render from './drawing/render';
import setTitle from './utils/set-title';

function main(options) {
  setTitle(options, '');
  console.log(options);

  render(options);
}

// Reset template
document.querySelector('.app').innerHTML = `
<div class="sketch"></div>
<div class="knobs"></div>
`;

knobs(main);
