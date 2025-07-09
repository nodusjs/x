import { css } from "@nodusjs/std/dom";

/**
 * @function style
 *
 * @param {object} button - A instância do componente `x-button`. Suas
 * propriedades (`button.color`, `button.variant`, etc.) são usadas para
 * selecionar os tokens corretos.
 * @returns {CSSStyleSheet} A folha de estilo final e reativa para o botão.
 *
 * @description
 * Gera a folha de estilo (`CSSStyleSheet`) dinâmica para o componente `x-button`.
 * Esta função é reativa: ela consome as propriedades atuais do componente
 * (como `color`, `variant`, `size`) para construir os nomes das variáveis CSS
 * (Design Tokens) que serão aplicadas, permitindo que a aparência do botão
 * mude em resposta a alterações de estado.
 */
export const style = (button) =>
  css`
    :host {
      width: ${button.onlyIcon ? `var(--button-width-${button.size})` : button.width};

      button {
        align-items: center;
        aspect-ratio: ${button.onlyIcon ? "1/1" : "auto"};
        background-color: var(--button-background-color-${button.color}-${button.variant});
        border: var(--button-border-${button.color}-${button.variant});
        border-radius: var(--radius-md);
        box-sizing: border-box;
        color: var(--button-color-${button.color}-${button.variant});
        cursor: pointer;
        display: inline-flex;
        font-family: var(--font-family-base);
        font-size: var(--button-font-size-${button.size});
        font-weight: var(--font-weight-semibold);
        gap: var(--button-gap-${button.size});
        height: var(--button-height-${button.size});
        justify-content: center;
        line-height: 1;
        padding: 0 ${button.onlyIcon ? 0 : "var(--spacing-lg)"};
        transition: all 0.2s ease-out;
        width: ${button.onlyIcon ? `var(--button-width-${button.size})` : button.width};
        width: ${button.onlyIcon ? `var(--button-width-${button.size})` : `var(--width-${button.width}, ${button.width})`};

        &:hover {
          background-color: var(--button-background-color-${button.color}-${button.variant}_hover);
          color: var(--button-color-${button.color}-${button.variant}_hover);
        }

        &:focus-visible {
          box-shadow: var(--button-box-shadow-${button.color});
          outline: 0;
        }
      }
    }

    :host(:state(disabled)) {
      button {
        background-color: var(--bg-disabled);
        border: 1px solid var(--border-disabled_subtle);
        color: var(--fg-disabled);
        cursor: auto;
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
