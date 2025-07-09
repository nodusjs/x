import { css } from "@nodusjs/std/dom";

/**
 * @function style
 *
 * @returns {CSSStyleSheet} A folha de estilo final para o contêiner de ação.
 *
 * @description
 * Gera a folha de estilo (`CSSStyleSheet`) para o componente `x-action`.
 *
 * Esta função define o layout do contêiner de ações, estabelecendo-o como
 * um contêiner flexível. Ela alinha os elementos de ação à direita
 * (`justify-content: end`) e aplica um espaçamento padrão entre eles
 * usando um token de espaçamento (`--spacing-2xl`).
 */
export const style = () =>
  css`
    :host {
      display: flex;
      gap: var(--spacing-2xl);
      justify-content: end;
    }
  `;
