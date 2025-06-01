import { html } from "@nodusjs/std/dom";

/**
 * Gera o template de renderização para o `<x-input>`, incluindo o rótulo,
 * o elemento `<input>` com seus atributos refletidos e um slot para mensagens de validade.
 *
 * @param {import("./input").default} input Instância do componente `<x-input>` cujas propriedades
 * serão usadas para definir os atributos do elemento `<input>`.
 * @returns {import("@nodusjs/std/dom").TemplateResult} Fragmento de template pronto para injeção
 * no Shadow DOM do componente.
 *
 * @description
 * Esta função monta o HTML do `<x-input>` usando a API de template do `@nodusjs/std/dom`.
 * Ela garante que os atributos (como `id`, `name`, `type`, `value`, `max`, `min`, `readonly`,
 * `required`, etc.) estejam sempre sincronizados com as propriedades do componente, além de
 * fornecer um `<slot name="validity">` para exibição de mensagens de validação.
 *
 * @example
 * import Input from "./input.js";
 * import { component as inputTemplate } from "./component.js";
 *
 * const inp = new Input();
 * inp.id = "email";
 * inp.type = "email";
 * inp.placeholder = "Digite seu e-mail";
 *
 * // Em um contêiner temporário:
 * const container = document.createElement("div");
 * container.innerHTML = inputTemplate(inp);
 * console.log(container.innerHTML);
 * // → '<label for="email"><slot name="label"></slot></label>'
 * //    '<input id="email" type="email" placeholder="Digite seu e-mail">'
 * //    '<slot name="validity"></slot>'
 */
export const component = (input) => html`
  <label for="${input.id}">
    <slot name="label"></slot>
  </label>
  <input
    ${input.id ? `id="${input.id}"` : ""}
    ${input.inputMode ? `inputmode="${input.inputMode}"` : ""}
    ${input.max ? `max="${input.max}"` : ""}
    ${input.maxLength ? `maxlength="${input.maxLength}"` : ""}
    ${input.min ? `min="${input.min}"` : ""}
    ${input.minLength ? `minlength="${input.minLength}"` : ""}
    ${input.name ? `name="${input.name}"` : ""}
    ${input.type ? `type="${input.type}"` : ""}
    ${input.value ? `value="${input.value}"` : ""}
    ${input.readonly ? "readonly" : ""}
    ${input.required ? "required" : ""}
  />
  <slot name="validity"></slot>
`;
