import { isPainted } from "@interface";

/**
 * Cria um proxy para manipular o `<input>` interno de `<x-input>` após a
 * pintura. O proxy encaminha leituras e gravações para o elemento real,
 * permitindo isolar a lógica de acesso ao Shadow DOM.
 *
 * @param {Input} input
 *   Instância de `<x-input>` para a qual o proxy deve delegar operações.
 * @returns {Proxy<object>}
 *   Um objeto proxy cujo trap de `get` retorna propriedades e atributos
 *   do `<input>` interno, e trap de `set` atualiza valor ou atributos
 *   conforme o elemento esteja pintado.
 *
 * @example
 * import element from "./element.js";
 * import Input from "./input.js";
 *
 * const textField = new Input();
 * // antes de pintar no DOM, proxies acessam o target interno:
 * const elProxy = element.from(textField);
 * console.log(elProxy.value); // undefined, vem do objeto alvo
 *
 * // após paint/render:
 * await textField.whenPainted;
 * elProxy.value = "foo"; // atualiza input interno no shadowRoot
 * console.log(textField.shadowRoot.querySelector("input").value); // "foo"
 */
const element = {
  from(input) {
    function get(target, key) {
      if (!input[isPainted]) return target[key];

      // atributos que refletem propriedades devem ser lidos diretamente
      if (/^(value|validationMessage|validity)$/i.test(key)) {
        return input.shadowRoot.querySelector("input")[key];
      }
      // demais chaves virão de atributos HTML
      return input.shadowRoot.querySelector("input").getAttribute(key);
    }

    function set(target, key, value) {
      if (!input[isPainted]) {
        target[key] = value;
        return true;
      }

      // valores diretos (como `value`) atribuídos ao elemento
      if (/^(value)$/i.test(key)) {
        input.shadowRoot.querySelector("input")[key] = value || "";
        return this;
      }

      // se `value` for truthy, define atributo; caso contrário, remove
      return value
        ? input.shadowRoot.querySelector("input").setAttribute(key, value)
        : input.shadowRoot.querySelector("input").removeAttribute(key);
    }

    return new Proxy({}, { get, set });
  },
};

export default element;
