import { css } from "@nodusjs/std/dom";

/**
 * @function token
 *
 * @returns {CSSStyleSheet} A folha de estilo contendo todos os tokens de tamanho do ícone.
 *
 * @description
 * Gera uma folha de estilo (`CSSStyleSheet`) que define os Design Tokens
 * para o componente `x-icon`. Estes tokens são variáveis CSS que controlam
 * o tamanho da fonte do ícone para diferentes valores da propriedade `size`.
 *
 * A estrutura dos tokens segue o padrão:
 * `--icon-font-size-[size]`
 *
 * - `size`: O token de tamanho (ex: `sm`, `md`, `lg`, `xl`).
 */
export const token = () =>
  css`
    :host {
      --icon-font-size-sm: 20px;
      --icon-font-size-md: 24px;
      --icon-font-size-lg: 28px;
      --icon-font-size-xl: 32px;
    }
  `;
