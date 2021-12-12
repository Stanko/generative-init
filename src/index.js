import knobs, { hashCallback } from './knobs';
import render from './drawing/render';
import setTitle from './utils/set-title';

function main(options) {
  console.log(options);

  setTitle(options, '');
  render(options);
}

// Reset template
document.querySelector('.app').innerHTML = `
<div class="sketch"></div>
<div class="knobs"></div>
`;

knobs(main);

if (module.hot) {
  module.hot.dispose(() => {
    // Remove hash change on HMR
    window.removeEventListener('hashchange', hashCallback);
  });
}
