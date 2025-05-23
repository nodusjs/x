import { css } from "@nodusjs/std/dom";

export const style = (text) =>
	css`
    :host {
      font-size: var(--font-size-display-${text.size});
      line-height: var(--line-height-display-${text.size});
    }
  `;
