import { css } from "@nodusjs/std/dom";

export const style = (render) =>
  css`
    :host, {
    :host[layout="list"], {
      box-sizing: border-box;
      container-type: inline-size;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-${render.gap});
      width: 100%;
    }

    .host[layout="grid"] {
      display: grid;
      grid-template-columns: repeat(1, 1fr);

      @content (min-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @content (min-width: 720px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @content (min-width: 960px) {
        grid-template-columns: repeat(4, 1fr);
      }

      @content (min-width: 1200px) {
        grid-template-columns: repeat(5, 1fr);
      }

      @content (min-width: 1440px) {
        grid-template-columns: repeat(6, 1fr);
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
