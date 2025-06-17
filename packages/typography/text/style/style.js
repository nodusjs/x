import { css } from "@nodusjs/std/dom";

export const style = (text) =>
  css`
    :host {
      box-sizing: border-box;
      display: inline-flex;

      ${text.as} {
        color: var(--text-${text.color}${text.onBrand ? "_on-brand" : ""});
        display: inline-flex;
        font-family: var(--font-family-base);
        font-size: var(--font-size-text-${text.size});
        font-weight: var(--font-weight-${text.weight});
        line-height: var(--line-height-text-${text.size});
        margin: 0;
        max-width: var(--paragraph-max-width);
        text-align: ${text.align};
        text-wrap: ${text.wrap};
        transition: all 0.2s ease-out;
        width: auto;
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
