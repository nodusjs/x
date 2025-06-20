import { css } from "@nodusjs/std/dom";

export const style = () =>
  css`
    :host {
      display: flex;
      gap: var(--spacing-2xl);
      justify-content: end;
    }
  `;
