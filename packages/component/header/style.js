import { css } from "@nodusjs/std/dom";

export const style = () =>
  css`
    :host {
      align-items: center;
      box-sizing: border-box;
      display: flex;
      height: 72px;
      width: 100%;

      @content (min-width: 768px) {
        height: 80px;
      }

      header {
        container-type: inline-size;
        width: 100%;

        content {
          align-items: center;
          display: flex;
          gap: var(--spacing-2xl);
          justify-content: space-between;

          action {
            display: flex;
            gap: var(--spacing-2xl);
            justify-content: end;
          }
        }
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
