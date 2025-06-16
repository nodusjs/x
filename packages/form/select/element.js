import { isPainted } from "./interface";

const element = {
  from(select) {
    function get(target, key) {
      if (!select[isPainted]) return target[key];

      if (/^(value|validationMessage|validity)$/i.test(key)) {
        return select.shadowRoot.querySelector("select")[key];
      }

      if (/^(append)$/i.test(key)) {
        return (...children) =>
          select.shadowRoot.querySelector("select").append(...children);
      }

      return select.shadowRoot.querySelector("select").getAttribute(key);
    }

    function set(target, key, value) {
      if (!select[isPainted]) {
        target[key] = value;
        return true;
      }

      if (/^(innerHTML|value)$/i.test(key)) {
        select.shadowRoot.querySelector("select")[key] = value || "";
        return this;
      }

      return value
        ? select.shadowRoot.querySelector("select").setAttribute(key, value)
        : select.shadowRoot.querySelector("select").removeAttribute(key);
    }

    return new Proxy({}, { get, set });
  },
};

export default element;
