import { css } from "@nodusjs/std/dom";

/**
 * @function style
 *
 * @param {object} icon - A instância do componente `x-icon`. A propriedade
 * `icon.size` é usada para determinar o `font-size`.
 * @returns {CSSStyleSheet} A folha de estilo final para o ícone.
 *
 * @description
 * Gera a folha de estilo (`CSSStyleSheet`) dinâmica para o componente `x-icon`.
 *
 * Esta função define a aparência base para a renderização de um ícone,
 * configurando a fonte para 'Material Symbols Outlined' e outros padrões
 * de texto. O tamanho do ícone é controlado dinamicamente pela propriedade
 * `size` da instância do componente, que seleciona o token de tamanho
 * apropriado.
 */
export const style = (icon) =>
  css`
    :host {
      color: currentcolor;
      direction: ltr;
      display: inline-block;
      font-family: 'Material Symbols Outlined';
      font-style: normal;
      font-size: var(--icon-font-size-${icon.size});
      font-weight: normal;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      white-space: nowrap;
      word-wrap: normal;
      -moz-font-feature-settings: 'liga';
      -moz-osx-font-smoothing: grayscale;
    }

    :host(:state(hidden)) {
      display: none;
    }
  `;
