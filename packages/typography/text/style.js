import { css } from "@nodusjs/std/dom";

export const style = (text) =>
	css`
    :host {
      color: var(--text-${text.color}${text.onBrand ? "_on-brand" : ""});
      display: inline-flex;
      font-family: var(--font-family-base);
      font-size: var(--font-size-text-${text.size});
      font-weight: var(--font-weight-${text.weight});
      line-height: var(--line-height-text-${text.size});
      text-align: ${text.align};
      text-wrap: ${text.wrap};
      width: var(--paragraph-max-width);
    }

    :host:hover {
      color: var(--text-${text.color}_hover);
    }
  `;
