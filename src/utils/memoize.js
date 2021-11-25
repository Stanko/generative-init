import mem from 'mem/dist/index';

export default function memoize(fn) {
  return mem(fn, {
    cacheKey: (args) => args.map((arg) => JSON.stringify(arg)).join(','),
  });
}
