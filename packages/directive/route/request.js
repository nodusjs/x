const memoize = new Map();

export const request = (src) => {
  if (!memoize.has(src))
    memoize.set(
      src,
      fetch(src).then((response) => response.text()),
    );
  return memoize.get(src);
};
