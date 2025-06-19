import { css } from "@nodusjs/std/dom";

export const style = () =>
  css`
    :host {
      box-sizing: border-box;
      display: block;
      max-xwidth: var(--width-4xl);
      width: 100%;
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
