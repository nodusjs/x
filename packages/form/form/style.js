import { css } from "@nodusjs/std/dom";

export const style = () =>
  css`
    :host {
      form {
        align-items: start;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
