/**
 * Symbol usado para identificar o hook de ocultação de componentes.
 *
 * @type {symbol}
 *
 * @description
 * O símbolo `hideble` marca um método que é invocado sempre que o atributo
 * `hidden` de um componente é alterado. Esse hook atualiza internamente o
 * estado de ocultação no ElementInternals e ajusta o pseudo-estado `:hidden`
 * no host, garantindo que o componente seja renderizado ou removido da exibição
 * conforme o valor booleano de `hidden`.
 *
 * @example
 * import { hideble } from '@interface/hideble'
 *
 * @define('x-my-element')
 * class MyElement extends HTMLElement {
 *   #hidden = false
 *   #internals
 *
 *   get hidden() {
 *     return (this.#hidden ||= false)
 *   }
 *
 *   @attributeChanged('hidden', truthy)
 *   @around(hideble)
 *   set hidden(value) {
 *     this.#hidden = value
 *   }
 *
 *   [hideble]() {
 *     this.hidden
 *       ? this.internals.states.add('hidden')
 *       : this.internals.states.delete('hidden');
 *     return this
 *   }
 * }
 *
 * // Em uso:
 * const el = document.createElement('x-my-element')
 * document.body.append(el)
 * el.hidden = true    // Oculta o componente
 * el.hidden = false   // Exibe o componente novamente
 */
export const hideble = Symbol("hideble");
