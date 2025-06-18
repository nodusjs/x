import { css } from "@nodusjs/std/dom";

export const style = (text) =>
  css`
    :host {
      box-sizing: border-box;
      display: inline-flex;

      a {
        color: var(--text-brand-secondary);
        cursor: pointer;
        display: inline-flex;
        font-family: var(--font-family-base);
        font-size: var(--font-size-text-${text.size});
        font-weight: var(--font-weight-semibold);
        line-height: var(--line-height-text-${text.size});
        margin: 0;
        max-width: var(--paragraph-max-width);
        text-wrap: ${text.wrap};
        transition: all 0.2s ease-out;
        width: auto;

        &:hover {
          color: var(--text-brand-secondary_hover);
        }
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
