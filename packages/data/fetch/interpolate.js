export const interpolate = (url, data) =>
  url.replace(/\{(.*?)\}/g, (_, namespace) => {
    if (namespace === "") return data;
    return new Function("data", `return data.${namespace}`)(data);
  });
