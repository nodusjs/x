import { css } from "@nodusjs/std/dom";

export const style = (input) =>
  css`
    :host {
      align-items: start;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      width: ${input.width};
      width: var(--width-${input.width}, ${input.width});

      input {
        appearance: none;
        background-color: var(--bg-primary);
        border: 1px solid var(--border-primary);
        border-radius: var(--radius-md);
        box-sizing: border-box;
        color: var(--text-primary);
        font-family: var(--font-family-base);
        font-size: var(--font-size-text-md);
        font-weight: var(--font-weight-regular);
        height: 40px;
        line-height: var(--line-height-text-md);
        padding: var(--spacing-md) var(--spacing-lg);
        width: 100%;


        &[type="number"] {
          -moz-appearance: textfield;
        }

        &:active,
        &:hover {
          outline: 0;
        }

        &:focus {
          border-color: var(--border-brand);
          outline: 0;
        }

        &:disabled,
        &:read-only {
          background-color: var(--bg-secondary);
          border-color: var(--border-primary);
          box-shadow: none;
          color: var(--text-disabled);
        }

        &::placeholder {
          color: var(--text-placeholder);
        }

        &::-webkit-autofill,
        &::-webkit-autofill:hover, 
        &::-webkit-autofill:focus, 
        &::-webkit-autofill:active {
          transition: background-color 9999999999s ease-in-out 0s
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }

    :host(:state(hidden)) {
      display: none;
    }

    :host(:state(invalid)) {
      input {
        border-color: var(--border-error);
        padding-right: 40px;
      }
    }
  `;
