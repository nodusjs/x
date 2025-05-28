import { html } from "@nodusjs/std/dom";

/**
 * Gera o template HTML para o `<x-text>`, encapsulando o slot dentro da
 * tag configurada em `text.as`.
 *
 * @param {Object} text        Instância do componente Text.
 * @param {string} text.as     Tag HTML a ser usada (ex.: "p", "span", "div").
 * @returns {DocumentFragment} Fragmento contendo a marcação `<as><slot/></as>`.
 *
 * @description
 * Retorna um fragmento de template que renderiza o conteúdo do slot
 * dentro do elemento HTML especificado por `text.as`, garantindo que
 * o texto seja projetado corretamente no Shadow DOM.
 *
 * @example
 * import Text from "./text.js";
 * import { component } from "./component.js";
 *
 * const txt = new Text();
 * txt.as = "span";
 *
 * // Cria um container temporário para renderizar
 * const container = document.createElement("div");
 * container.innerHTML = component(txt);
 *
 * console.log(container.innerHTML);
 * // "<span><slot></slot></span>"
 */
export const component = (text) => html`<${text.as}><slot></slot></${text.as}>`;
