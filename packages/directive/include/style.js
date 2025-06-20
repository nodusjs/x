import { css } from "@nodusjs/std/dom";

export const style = () =>
  css`
    :host {
      box-sizing: border-box;
      container-type: inline-size;
      display: block;
    }
  `;
