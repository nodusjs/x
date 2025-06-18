export const mismatch = (path) => {
  const rule = path.replace(/:\w+/g, "([a-z0-9-_]+)");
  const pattern = new RegExp(`^${rule}$`, "i");
  return !pattern.test(location.pathname);
};
