export const resize = (target, propertyKey) => {
  const controller = new AbortController();

  target.connectedCallback = new Proxy(target.connectedCallback || (() => {}), {
    apply(original, context, args) {
      original.apply(context, args);
      window.addEventListener("resize", () => context[propertyKey](), {
        signal: controller.signal,
      });
    },
  });

  target.disconnectedCallback = new Proxy(
    target.disconnectedCallback || (() => {}),
    {
      apply(original, context, args) {
        original.apply(context, args);
        controller.abort();
      },
    },
  );
};
