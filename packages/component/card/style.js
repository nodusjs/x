import { css } from "@nodusjs/std/dom";

/**
 * @function style
 *
 * @param {object} card - A instância do componente `x-card`. As propriedades
 * deste objeto são usadas para construir os estilos.
 * @returns {CSSStyleSheet} A folha de estilo final para o card.
 *
 * @description
 * Gera a folha de estilo (`CSSStyleSheet`) dinâmica para o componente `x-card`.
 *
 * Esta função consome as propriedades reativas da instância do card
 * (como `height`, `width` e `spacing`) para definir sua aparência.
 * Ela também implementa a lógica para esconder o componente quando ele
 * está no estado `:state(hidden)`.
 */
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
