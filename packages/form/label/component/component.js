import { html } from "@nodusjs/std/dom";

/**
 * Gera o template HTML para o conteúdo de `<x-label>`, projetando tudo que
 * for colocado dentro da tag no seu próprio `<slot>` no Shadow DOM.
 *
 * @returns {DocumentFragment} Fragmento contendo `<slot></slot>` para projeção do conteúdo filho.
 *
 * @example
 * import { component } from "./component.js";
 *
 * // Em um Custom Element definido com render(component):
 * const tpl = component();
 * console.log(tpl.firstChild.outerHTML);
 * // => "<slot></slot>"
 */
export const component = () => html`<slot></slot>`;
