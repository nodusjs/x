import { css } from "@nodusjs/std/dom";

/**
 * @function style
 *
 * @returns {CSSStyleSheet} A folha de estilo final para o contêiner de inclusão.
 *
 * @description
 * Gera a folha de estilo (`CSSStyleSheet`) para o componente `x-include`.
 *
 * Esta função define os estilos base para o contêiner do conteúdo incluído,
 * garantindo um comportamento de layout previsível.
 */
export const style = () =>
  css`
    :host {
      box-sizing: border-box;
      container-type: inline-size;
      display: block;
    }
  `;
