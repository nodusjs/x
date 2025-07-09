import { html } from "@nodusjs/std/dom";

/**
 * @function component
 *
 * @returns {string} Uma string de template HTML que representa o DOM do cabeçalho.
 *
 * @description
 * Define a estrutura HTML fundamental para o componente `x-header`.
 *
 * A estrutura cria um layout contido dentro de um `<x-container>` e
 * oferece dois "slots" para a inserção de conteúdo customizado:
 *
 * 1.  **Slot Padrão**: A área principal do cabeçalho, ideal para o logotipo
 * da aplicação ou o título da página.
 * 2.  **Slot "action"**: Uma área designada para elementos de ação, como
 * o menu do usuário, botões de login ou de navegação principal.
 */
export const component = () =>
  html`
    <header>
      <x-container>
        <content>
          <slot></slot>
          <action>
            <slot name="action"></slot>
          </action>
        </content>
      </x-container>
    </header>
  `;
