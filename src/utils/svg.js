function create(options) {
  const wrapper = document.querySelector('.sketch');
  let svg = document.querySelector('.svg');

  // Create SVG element
  if (!svg) {
    wrapper.innerHTML = '<svg class="svg"></svg>';
    svg = document.querySelector('.svg');
  }

  svg.setAttribute('viewBox', `0 0 ${options.width} ${options.height}`);
  svg.setAttribute('width', options.width);
  svg.setAttribute('height', options.height);

  return svg;
}

function path(path, isClosed = true, props = {}) {
  const points = path.map((p) => `${p.x} ${p.y}`).join(' L ');

  const d = `M ${points} ${isClosed ? 'Z' : ''}`;
  const attributes = [];

  for (const key in props) {
    const value = props[key];
    attributes.push(`${key}="${value}"`);
  }

  return `<path d="${d}" ${attributes.join(' ')} />`;
}

function circle(center, r, props = {}) {
  const attributes = [];

  for (const key in props) {
    const value = props[key];
    attributes.push(`${key}="${value}"`);
  }

  return `<circle cx="${center.x}" cy="${center.y}" r="${r}" ${attributes.join(' ')} />`;
}

const svg = {
  create,
  circle,
  path,
};

export default svg;
