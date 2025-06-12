export const around = (method) => (_target, _propertyKey, descriptor) => {
  const type = descriptor.set ? "set" : "value";

  descriptor[type] = new Proxy(descriptor[type], {
    apply(original, context, args) {
      const output = original.apply(context, args);
      context[method](...args);
      return output;
    },
  });
};
