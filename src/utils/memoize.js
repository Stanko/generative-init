import mem from 'mem';

export default function memoize(fn) {
  return mem(fn, {
    cacheKey: (args) => {
      const key = args
        .map((arg) => {
          if (typeof arg === 'function') {
            return arg.displayName ? arg.displayName : arg.toString();
          } else {
            return JSON.stringify(arg);
          }
        })
        .join(',');

      return key;
    },
  });
}
