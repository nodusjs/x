export const size = (value) => {
  if (/^[0-9]+(%|px)$/.test(value)) return value;
  if (/^(xxs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl)$/.test(value)) return value;
  if (/^hug$/i.test(value)) return "auto";
  if (/^fill$/i.test(value)) return "100%";
  return "auto";
};
