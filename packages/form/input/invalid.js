export const invalid =
  (...filters) =>
  (target, method) => {
    const controller = new AbortController();

    target.connectedCallback = new Proxy(
      target.connectedCallback ?? (() => {}),
      {
        apply: (original, context, args) => {
          context.addEventListener(
            "invalid",
            (event) => {
              context[method](filters.reduce((x, filter) => filter(x), event));
            },
            { signal: controller.signal },
          );
          return original.apply(context, args);
        },
      },
    );

    target.disconnectedCallback = new Proxy(
      target.disconnectedCallback ?? (() => {}),
      {
        apply: (original, context, args) => {
          controller.abort();
          return original.apply(context, args);
        },
      },
    );
  };

export default invalid;
