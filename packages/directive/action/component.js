import { html } from "@nodusjs/std/dom";

/**
 * @function component
 *
 * @returns {string} Uma string de template HTML que representa o DOM do contêiner de ação.
 *
 * @description
 * Define a estrutura HTML fundamental para o componente `x-action`.
 *
 * A estrutura consiste em um único elemento `<slot>`. Isso permite que o
 * `x-action` funcione como um contêiner "wrapper", agrupando um ou mais
 * elementos de ação (como botões) que serão então projetados para o
 * slot 'action' de um componente pai.
 */
export const component = () => html`<slot></slot>`;
