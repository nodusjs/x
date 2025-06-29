import { css } from "@nodusjs/std/dom";

export const style = (form) =>
  css`
    :host {
      box-sizing: border-box;
      display: block;
      width: ${form.width};
      width: var(--width-${form.width}, ${form.width});

      form {
        container-type: inline-size;
        width: 100%;
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
