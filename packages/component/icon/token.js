import { css } from "@nodusjs/std/dom";

export const token = () =>
  css`
    :host {
      --icon-font-size-sm: 20px;
      --icon-font-size-md: 24px;
      --icon-font-size-lg: 28px;
      --icon-font-size-xl: 32px;
    }
  `;
