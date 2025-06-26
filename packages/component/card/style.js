import { css } from "@nodusjs/std/dom";

export const style = (card) =>
  css`
    :host {
      align-items: start;
      background-color: var(--bg-primary);
      border: 1px solid var(--border-secondary);
      border-radius: var(--radius-xl);
      box-sizing: border-box;
      container-type: inline-size;
      display: flex;
      flex-direction: column;
      height: ${card.height};
      padding: var(--spacing-${card.spacing});
      width: ${card.width};
      width: var(--width-${card.width}, ${card.width});
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
