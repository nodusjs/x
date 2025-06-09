import { css } from "@nodusjs/std/dom";

export const style = (icon) =>
  css`
    :host {
      color: currentcolor;
      font-family: 'Material Symbols Outlined';
      font-style: normal;
      font-size: var(--icon-font-size-${icon.size});
      font-weight: normal;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -moz-font-feature-settings: 'liga';
      -moz-osx-font-smoothing: grayscale;
    }
  `;
