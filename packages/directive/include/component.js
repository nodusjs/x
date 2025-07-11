import { html } from "@nodusjs/std/dom";
import { textContent } from "./interface";

/**
 * @function component
 *
 * @description
 * Define a estrutura HTML para o componente `x-include`.
 *
 * A função é reativa e renderiza o conteúdo da propriedade `textContent`
 * da instância do componente `Include`. O `textContent` é preenchido
 * de forma assíncrona pelo método `render` da classe, que busca o
 * conteúdo do arquivo HTML externo.
 *
 * Quando a propriedade `src` do `x-include` é alterada, o decorator
 * `@repaint` garante que esta função seja re-executada para exibir o novo
 * conteúdo.
 *
 * @param {object} include - A instância do componente `x-include`.
 * @returns {string} Uma string de template HTML que contém o conteúdo do arquivo externo.
 */
export const component = (include) => html`${include[textContent]}`;
