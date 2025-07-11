import { html } from "@nodusjs/std/dom";
import { textContent } from "./interface";

/**
 * @function component
 *
 * @param {object} render - A instância do componente `x-render`.
 * @returns {string} Uma string de template HTML que contém o conteúdo final a ser renderizado.
 *
 * @description
 * Define a estrutura HTML para o componente `x-render`.
 *
 * A função é reativa e renderiza o conteúdo da propriedade `textContent`,
 * que é acessada através de um Symbol para evitar conflitos. O `textContent`
 * é preenchido de forma assíncrona pelo método `render` da classe, que
 * interpola os dados em um template.
 */
export const component = (render) => html`${render[textContent]}`;
