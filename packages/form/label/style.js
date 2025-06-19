import { css } from "@nodusjs/std/dom";

export const style = () =>
  css`
    :host {
      color: var(--text-secondary);
      display: inline-flex;
      font-family: var(--font-family-base);
      font-size: var(--font-size-text-sm);
      font-weight: var(--font-weight-medium);
      gap: var(--spacing-sm);
      line-height: var(--line-height-text-sm); 
    }
  `;
