import { css } from "@nodusjs/std/dom";

export const token = () =>
  css`
    :host {
      --button-background-color-brand-solid: var(--bg-brand-solid);
      --button-background-color-brand-outlined: var(--bg-primary);
      --button-background-color-brand-ghost: transparent !important;
      --button-background-color-brand-link: transparent !important;

      --button-background-color-brand-solid_hover: var(--bg-brand-solid_hover);
      --button-background-color-brand-outlined_hover: var(--bg-primary_hover);
      --button-background-color-brand-ghost_hover: var(--bg-primary_hover);
      --button-background-color-brand-link_hover: transparent !important;

      --button-border-brand-solid: 1px solid var(--bg-brand-solid);
      --button-border-brand-outlined: 1px solid var(--border-disabled_subtle);
      --button-border-brand-ghost: none !important;
      --button-border-brand-link: nonde !important;

      --button-color-brand-solid: var(--color-base-white);
      --button-color-brand-outlined: var(--text-secondary);
      --button-color-brand-ghost: var(--text-tertiary);
      --button-color-brand-link: var(--text-brand-secondary);

      --button-color-brand-solid_hover: var(--color-base-white);
      --button-color-brand-outlined_hover: var(--text-secondary_hover);
      --button-color-brand-ghost_hover: var(--text-tertiary_hover);
      --button-color-brand-link_hover: var(--text-brand-secondary_hover);

      --button-background-color-error-solid: var(--bg-error-solid);
      --button-background-color-error-outlined: var(--bg-primary);
      --button-background-color-error-ghost: transparent !important;
      --button-background-color-error-link: transparent !important;

      --button-background-color-error-solid_hover: var(--bg-error-solid_hover);
      --button-background-color-error-outlined_hover: var(--bg-error-primary);
      --button-background-color-error-ghost_hover: var(--bg-error-primary);
      --button-background-color-error-link_hover: transparent !important;

      --button-border-error-solid: 1px solid var(--bg-error-solid_hover);
      --button-border-error-outlined: 1px solid var(--border-error_subtle);
      --button-border-error-ghost: none !important;
      --button-border-error-link: nonde !important;

      --button-color-error-solid: var(--color-base-white);
      --button-color-error-outlined: var(--text-error-primary);
      --button-color-error-ghost: var(--text-error-primary);
      --button-color-error-link: var(--text-error-primary);

      --button-color-error-solid_hover: var(--color-base-white);
      --button-color-error-outlined_hover: var(--text-error-primary_hover);
      --button-color-error-ghost_hover: var(--text-error-primary_hover);
      --button-color-error-link_hover: var(--text-error-primary_hover);

      --button-font-size-sm: var(--font-size-text-sm);
      --button-font-size-md: var(--font-size-text-sm);
      --button-font-size-lg: var(--font-size-text-md);
      --button-font-size-xl: var(--font-size-text-md);

      --button-gap-sm: var(--spacing-xs);
      --button-gap-md: var(--spacing-xs);
      --button-gap-lg: var(--spacing-sm);
      --button-gap-xl: var(--spacing-sm);

      --button-line-height-sm: var(--line-height-text-sm);
      --button-line-height-md: var(--line-height-text-sm);
      --button-line-height-lg: var(--line-height-text-md);
      --button-line-height-xl: var(--line-height-text-md);

      --button-height-sm: 36px;
      --button-height-md: 40px;
      --button-height-lg: 44px;
      --button-height-xl: 48px;

      --button-width-sm: 36px;
      --button-width-md: 40px;
      --button-width-lg: 44px;
      --button-width-xl: 48px;

      --button-box-shadow-brand: var(--focus-ring);
      --button-box-shadow-error: var(--focus-ring-error);
    }
  `;
