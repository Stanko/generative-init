import seedrandom from 'seedrandom';

const getIcon = (color) => {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const context = canvas.getContext('2d');
  context.fillStyle = color;
  context.roundRect(0, 0, 16, 16, 4);
  context.fill();
  return canvas.toDataURL();
};

const setTitle = (options = null, title = '') => {
  if (title) {
    title += ' • ';
  }

  const rng = seedrandom(JSON.stringify(options));

  const h = parseInt(rng() * 360, 10);
  const color = `hsl(${h}, 60%, 60%)`;
  const icon = getIcon(color);

  console.log('%c  ', `background: ${color}`, options.mainSeed);

  document.querySelector('.favicon').setAttribute('href', icon);

  document.title = title + options.mainSeed;
};

export default setTitle;
