import { css } from "@nodusjs/std/dom";

export const style = (select) =>
  css`
    :host {
      align-items: start;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      width: ${select.width};
      width: var(--width-${select.width}, ${select.width});


      wrap {
        position: relative;
        width: inherit;

        select {
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
          padding: var(--spacing-md) var(--spacing-5xl) var(--spacing-md) var(--spacing-lg);
          width: 100%;


          &:active,
          &:hover {
            outline: 0;
          }

          &:focus {
            border-color: var(--border-brand);
            outline: 0;
          }

          &:disabled,
          &:[readonly] {
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

        x-icon {
          color: var(--fg-quaternary);
          position: absolute;
          right: var(--spacing-md);
          top: var(--spacing-md);
        }
      }
    }

    :host(:state(hidden)) {
      display: none;
    }

    :host(:state(invalid)) {
      select {
        border-color: var(--border-error) !important;
      }
    }
  `;
