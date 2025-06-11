import { css } from "@nodusjs/std/dom";

export const style = () =>
  css`
    :host {
      display: block;
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
