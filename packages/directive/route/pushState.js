import "@polyfill/setImmediate";

history.pushState = new Proxy(history.pushState, {
  apply(original, context, args) {
    setImmediate(() => {
      const [state, title, url] = args;

      window.dispatchEvent(
        new CustomEvent("pushstate", {
          detail: { state, title, url },
        }),
      );
    });

    return original.apply(context, args);
  },
});
