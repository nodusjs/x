import { html } from "@nodusjs/std/dom";

/**
 * @function component
 *
 * @returns {string} Uma string de template HTML que representa o DOM do card.
 *
 * @description
 * Define a estrutura HTML fundamental para o componente `x-card`.
 *
 * A estrutura consiste em um único elemento `<slot>`. Isso transforma o `x-card`
 * em um "contêiner" genérico, permitindo que os desenvolvedores insiram
 * qualquer conteúdo customizado (como texto, imagens ou outros componentes)
 * diretamente dentro da tag `<x-card>` no HTML.
 */
export const component = () => html`<slot></slot>`;
