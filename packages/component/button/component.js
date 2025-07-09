import { html } from "@nodusjs/std/dom";

/**
 * @function component
 *
 * @returns {string} Uma string de template HTML que representa o DOM do botão.
 *
 * @description
 * Define a estrutura HTML base para o componente `x-button`.
 *
 * Utiliza o helper `html` do `@nodusjs/std/dom` para criar um template
 * declarativo. O uso de `<slot>` permite que os usuários do componente
 * insiram seu próprio conteúdo de texto ou ícones dentro do botão.
 */
export const component = () => html`<button><slot></slot></button>`;
