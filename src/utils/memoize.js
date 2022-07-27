import mem from 'mem';

export default function memoize(fn) {
  return mem(fn, {
    cacheKey: (args) => args.map((arg) => JSON.stringify(arg)).join(','),
  });
}
