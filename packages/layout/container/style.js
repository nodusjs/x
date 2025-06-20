import { css } from "@nodusjs/std/dom";

export const style = () =>
  css`
    :host {
      box-sizing: border-box;
      container-type: inline-size;
      display: block;
      margin: 0 auto;
      max-width: var(--width-4xl);
      padding: 0 var(--spacing-xl);
      width: 100%;

      @container (min-width: 768px) {
        padding: 0 var(--spacing-4xl);
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
