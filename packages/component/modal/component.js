import { html } from "@nodusjs/std/dom";

/**
 * @function component
 *
 * @param {object} modal - A instância do componente `x-modal`.
 * @returns {string} Uma string de template HTML que representa o DOM do modal.
 *
 * @description
 * Define a estrutura HTML fundamental para o componente `x-modal`.
 *
 * A estrutura consiste em um contêiner `overflow` (o overlay escuro)
 * e um elemento `<dialog>` que atua como o corpo principal do modal.
 * A visibilidade do modal é controlada dinamicamente:
 *
 * - O atributo `open` do `<dialog>` é adicionado ou removido com base na
 * propriedade booleana `modal.opened`.
 * - O `<slot>` permite que os usuários insiram o conteúdo customizado
 * que deve aparecer dentro do modal.
 */
export const component = (modal) =>
  html`
    <overflow>
      <dialog ${modal.opened ? "open" : ""}>
        <slot></slot>
      </dialog>
    </overflow>
  `;
