// Algorithm by Johannes Baagøe
// Slim TypeScript version of this implementation:
// https://github.com/coverslide/node-alea

const getMash = () => {
  let n = 0xefc8249d;

  const mash = (seed: string): number => {
    for (let i = 0; i < seed.length; i++) {
      n += seed.charCodeAt(i);
      let h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
};

const Alea = (seed: string = Date.now().toString()): (() => number) => {
  let s = [0, 0, 0];
  let c = 1;

  let mash = getMash();

  s.forEach((_, i) => {
    s[i] = mash(' ') - mash(seed);

    if (s[i] < 0) {
      s[i] += 1;
    }
  });

  const random = () => {
    const t = 2091639 * s[0] + c * 2.3283064365386963e-10; // 2^-32
    c = t | 0;
    s[0] = s[1];
    s[1] = s[2];
    s[2] = t - c;
    return s[2];
  };

  return random;
};

export default Alea;
