import { css } from "@nodusjs/std/dom";

export const style = () =>
  css`
    :host {
      align-items: start;
      box-sizing: border-box;
      display: flex;
      gap: var(--spacing-sm);
      width: var(--width-xxs);

      wrap {
        align-items: start;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }

      input {
        background-color: var(--bg-primary);
        border: 1px solid var(--border-primary);
        border-radius: var(--radius-md);
        box-sizing: border-box;
        display: block;
        height: 16px;
        margin: 4px 0 0 0;
        resize: none;
        width: 16px;

        &:checked {
          accent-color: var(--bg-brand-solid);
        }

        &:focus-visible {
          box-shadow: var(--focus-ring);
          outline: 0;
        }

        &:active,
        &:hover {
          outline: 0;
        }

        &:disabled,
        &:read-only {
          background-color: var(--bg-secondary);
          border-color: var(--border-primary);
          box-shadow: none;
        }

        &::-webkit-autofill,
        &::-webkit-autofill:hover, 
        &::-webkit-autofill:focus, 
        &::-webkit-autofill:active {
          transition: background-color 9999999999s ease-in-out 0s
        }
      }
    }

    :host(:state(hidden)) {
      display: none;
    }

    :host(:state(invalid)) {
      input {
        border-color: var(--border-error);
      }
    }
  `;
