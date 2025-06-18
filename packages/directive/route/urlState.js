import { handle } from "./interface";

export const urlState = (target) => {
  const controller = new AbortController();

  target.connectedCallback = new Proxy(target.connectedCallback || (() => {}), {
    apply(original, context, args) {
      original.apply(context, args);
      const listener = () => context[handle]();
      const options = { signal: controller.signal };
      window.addEventListener("popstate", listener, options);
      window.addEventListener("pushstate", listener, options);
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
