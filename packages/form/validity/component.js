import { html } from "@nodusjs/std/dom";

/**
 * Gera o template de slot para exibir mensagens de validação.
 *
 * @param {void} _ - Nenhum parâmetro é necessário para este template.
 * @returns {DocumentFragment} Fragmento contendo o slot nomeado "validity".
 *
 * @description
 * Cria um slot nomeado que permite projetar mensagens de erro ou feedback de
 * validação dentro do campo personalizado `<x-input>`. Esse slot deve ser
 * preenchido via light DOM pelo componente pai para exibir o texto de validade.
 *
 * @example
 * import { component } from "./component.js";
 *
 * const fragment = component();
 * const container = document.createElement("div");
 * container.appendChild(fragment.cloneNode(true));
 *
 * console.log(container.innerHTML);
 * // => '<slot></slot>'
 */
export const component = () => html`<slot></slot>`;
