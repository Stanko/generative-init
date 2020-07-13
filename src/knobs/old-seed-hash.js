import seedrandom from 'seedrandom';

let seed = 'seed';

if (IS_BROWSER) {
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