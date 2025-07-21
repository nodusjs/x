import { css } from "@nodusjs/std/dom";

/**
 * @function style
 *
 * @returns {CSSStyleSheet} A folha de estilo final para o cabeçalho.
 *
 * @description
 * Gera a folha de estilo (`CSSStyleSheet`) para o componente `x-header`.
 *
 * Esta função define o layout principal do cabeçalho, estabelecendo-o como um
 * contêiner flexível de largura total com uma altura fixa e responsiva.
 * Ela também organiza as seções internas de 'content' e 'action' e gerencia
 * o estado de visibilidade do componente através da pseudo-classe `:state(hidden)`.
 */
export const style = () =>
  css`
    :host {
      align-items: center;
      box-sizing: border-box;
      display: flex;
      height: 72px;
      width: 100%;

      header {
        container-type: inline-size;
        width: 100%;

        content {
          align-items: center;
          display: flex;
          gap: var(--spacing-2xl);
          justify-content: start;

          action {
            display: flex;
            flex: 2;
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
