import { html } from "@nodusjs/std/dom";

/**
 * @function component
 *
 * @returns {string} Uma string de template HTML que representa o DOM do rodapé.
 *
 * @description
 * Define a estrutura HTML fundamental para o componente `x-footer`.
 *
 * A estrutura cria um layout contido dentro de um `<x-container>` e
 * oferece dois "slots" para a inserção de conteúdo customizado:
 *
 * 1.  **Slot Padrão**: A área principal do rodapé, ideal para textos de
 * copyright, links de navegação ou outras informações.
 * 2.  **Slot "action"**: Uma área designada para elementos de ação, como
 * botões de "Salvar" ou "Cancelar".
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
