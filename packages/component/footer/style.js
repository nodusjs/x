import { css } from "@nodusjs/std/dom";

/**
 * @function style
 *
 * @returns {CSSStyleSheet} A folha de estilo final para o rodapé.
 *
 * @description
 * Gera a folha de estilo (`CSSStyleSheet`) para o componente `x-footer`.
 *
 * Esta função define o layout principal do rodapé, estabelecendo-o como um
 * contêiner flexível de largura total com uma altura fixa e responsiva.
 * Ela também gerencia o estado de visibilidade do componente através da
 * pseudo-classe `:state(hidden)`.
 */
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

      footer {
        container-type: inline-size;
        width: 100%;

        content {
          display: flex;
          gap: var(--spacing-2xl);
          justify-content: end;
        }
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
