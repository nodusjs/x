import { css } from "@nodusjs/std/dom";

export const style = (icon) =>
  css`
    :host {
      color: currentcolor;
      direction: ltr;
      display: inline-block;
      font-family: 'Material Symbols Outlined';
      font-style: normal;
      font-size: var(--icon-font-size-${icon.size});
      font-weight: normal;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      white-space: nowrap;
      word-wrap: normal;
      -moz-font-feature-settings: 'liga';
      -moz-osx-font-smoothing: grayscale;
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
