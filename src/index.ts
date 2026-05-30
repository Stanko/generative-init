import render from './drawing/render';
import { downloadSVG } from './utils/download-svg';
import setTitle from './utils/set-title';
import { controls } from './drawing/options';

// CSS
import '@stanko/ctrls/dist/ctrls.css';
import './scss/index.scss';

// Backup reference to the browser's Math.random method
export const originalRandom = Math.random;

// Get title from the HTML
const title = document.querySelector('title')?.textContent || '';

// UI elements
const controlsDiv = document.querySelector('.controls') as HTMLDivElement;
const drawingDiv = document.querySelector('.drawing') as HTMLDivElement;

const downloadIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg>`;

const buildUI = () => {
  controlsDiv.appendChild(controls.element);

  // <div class="ctrls__control-no-label">
  // <button class="ctrls__randomize ctrls__btn ctrls__btn--lg">
  // Randomize
  // </button>
  // </div>
  const saveButtonWrapper = document.createElement('div');
  saveButtonWrapper.classList.add('ctrls__control-no-label');
  const saveButton = document.createElement('button');
  saveButton.classList.add('controls-save', 'ctrls__btn', 'ctrls__btn--lg');
  saveButton.innerHTML = 'Save ' + downloadIcon;
  saveButton.addEventListener('click', () => {
    const svg = drawingDiv.querySelector('svg') as SVGElement;
    downloadSVG(svg, `drawing-${window.location.hash.replace('#/', '').replace(/(\/|,)/g, '_')}.svg`);
  });
  saveButtonWrapper.appendChild(saveButton);
  (controls.element.querySelector('.ctrls__controls-inner') as HTMLElement).appendChild(saveButtonWrapper);

  // Add global keyboard shortcuts
  document.addEventListener('keypress', (e: KeyboardEvent) => {
    // Check if document.activeElement is not a text input
    const active = document.activeElement;
    const isTextInput = active instanceof HTMLInputElement && active.type === 'text';

    if (isTextInput) {
      return;
    }

    if (e.key === 'r') {
      e.preventDefault();
      controls.randomize();
    } else if (e.key === 'c') {
      e.preventDefault();
      controlsDiv.classList.toggle('controls--hidden');
    }
  });
};

const draw = async () => {
  const options = controls.getValues();

  // Swap random method for a seeded RNG
  Math.random = options.mainSeedRng;

  // Set unique favicon and title
  setTitle(options, title);

  // Render the image
  const svg = await render(options);

  drawingDiv.replaceChildren(svg);
};

// Redraw on options change
controls.onChange = draw;

// Initialize
buildUI();
draw();
