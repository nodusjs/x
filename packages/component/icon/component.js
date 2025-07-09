import { html } from "@nodusjs/std/dom";

/**
 * @function component
 *
 * @param {object} icon - A instância do componente `x-icon`.
 * @returns {string} Uma string de template HTML que representa o DOM do ícone.
 *
 * @description
 * Define a estrutura HTML fundamental para o componente `x-icon`.
 *
 * A função é reativa e utiliza a propriedade `use` da instância do ícone
 * para renderizar o conteúdo. O valor da propriedade `use` normalmente
 * corresponde a um ID de um elemento `<symbol>` SVG em um "sprite sheet",
 * mas pode conter qualquer string ou HTML.
 *
 * Quando a propriedade `use` é alterada, o decorator `@repaint` na classe
 * `Icon` garante que esta função seja re-executada para exibir o novo ícone.
 */
export const component = (icon) => html`${icon.use}`;
