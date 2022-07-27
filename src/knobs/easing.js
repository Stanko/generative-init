const size = 100;

function getPath(x1, y1, x2, y2) {
  return `M 0 ${size} C ${x1} ${y1} ${x2} ${y2} ${size} 0`;
}

function render(knob, value, handler) {
  const x1 = value[0] * size;
  const y1 = size - value[1] * size;
  const x2 = value[2] * size;
  const y2 = size - value[3] * size;

  const x1percentage = (x1 / size) * 100;
  const y1percentage = (y1 / size) * 100;
  const x2percentage = (x2 / size) * 100;
  const y2percentage = (y2 / size) * 100;

  const svg = `
    <svg viewBox="0 0 ${size} ${size}">
      <g 
        stroke-width="1"
        stroke-linecap="round"
        stroke="#ddd"
        fill="none"
      >
        <rect  
          vector-effect="non-scaling-stroke"
          x="0" y="0" 
          width="${size}" height="${size}" 
          fill="white"
        />
        <line 
          vector-effect="non-scaling-stroke"
          class="easing-line easing-line-1" 
          x1="0" y1="${size}" x2="${x1}" y2="${y1}" 
        />
        <line 
          vector-effect="non-scaling-stroke"
          class="easing-line easing-line-2" 
          x1="${size}" y1="0" x2="${x2}" y2="${y2}" 
        />
        <path 
          vector-effect="non-scaling-stroke"
          class="easing-bezier" d="${getPath(x1, y1, x2, y2)}" 
          fill="none" stroke="#3172e0" 
          stroke-width="2"
        />
      </g>
    </svg>`;

  const buttons = `
    <span
      style="left: ${x1percentage}%; top: ${y1percentage}%"
      class="easing-button easing-button-1"
    >
    </span>
    <span
      style="left: ${x2percentage}%; top: ${y2percentage}%"
      class="easing-button easing-button-2"
    >
    </span>`;

  const input = document.createElement('div');
  input.className = 'easing';
  input.innerHTML = `${svg}${buttons}`;
  input.setAttribute('data-value', value.join(','));

  function addListeners(button, line, index) {
    let dragging = false;
    let dragStart;
    let positionStart;
    let ratio;

    button.addEventListener('mousedown', (e) => {
      dragStart = { x: e.clientX, y: e.clientY };
      positionStart = { x: parseInt(button.style.left), y: parseInt(button.style.top) };
      dragging = true;
      ratio = size / input.clientWidth;
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mouseup', (e) => {
      if (dragging) {
        document.body.style.userSelect = '';
        dragging = false;

        const leftOffset = e.clientX - dragStart.x;
        const topOffset = e.clientY - dragStart.y;

        const x = positionStart.x + leftOffset * ratio;
        const y = positionStart.y + topOffset * ratio;

        const newValue = input.getAttribute('data-value').split(',');
        newValue[index] = parseFloat((x / size).toFixed(2));
        newValue[index + 1] = parseFloat((1 - y / size).toFixed(2));

        // Cap x values
        if (newValue[index] < 0) newValue[index] = 0;
        if (newValue[index] > 1) newValue[index] = 1;

        handler(knob.name, newValue.join(','));
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (dragging) {
        const leftOffset = e.clientX - dragStart.x;
        const topOffset = e.clientY - dragStart.y;

        const x = positionStart.x + leftOffset * ratio;
        const y = positionStart.y + topOffset * ratio;

        line.setAttribute('x2', x);
        line.setAttribute('y2', y);

        button.style.left = `${x}%`;
        button.style.top = `${y}%`;
      }
    });
  }

  // const bezier = input.querySelector('.easing-bezier');

  const button1 = input.querySelector('.easing-button-1');
  const line1 = input.querySelector('.easing-line-1');

  const button2 = input.querySelector('.easing-button-2');
  const line2 = input.querySelector('.easing-line-2');

  addListeners(button1, line1, 0);
  addListeners(button2, line2, 2);

  return input;
}

function update(input, value) {
  let x1 = value[0] * size;
  const y1 = size - value[1] * size;
  let x2 = value[2] * size;
  const y2 = size - value[3] * size;

  // Cap x values
  if (x1 < 0) x1 = 0;
  if (x1 > size) x1 = size;
  if (x2 < 0) x2 = 0;
  if (x2 > size) x2 = size;

  const line1 = input.querySelector('.easing-line-1');
  line1.setAttribute('x2', x1);
  line1.setAttribute('y2', y1);

  const line2 = input.querySelector('.easing-line-2');
  line2.setAttribute('x2', x2);
  line2.setAttribute('y2', y2);

  const button1 = input.querySelector('.easing-button-1');
  button1.style.left = `${x1}%`;
  button1.style.top = `${y1}%`;

  const button2 = input.querySelector('.easing-button-2');
  button2.style.left = `${x2}%`;
  button2.style.top = `${y2}%`;

  const bezier = input.querySelector('.easing-bezier');
  bezier.setAttribute('d', getPath(x1, y1, x2, y2));

  input.setAttribute('data-value', value.join(','));
}

export default { render, update };
