/**
 * Symbol para identificar o hook de gerenciamento do estado `disabled`.
 *
 * @type {symbol}
 *
 * @description
 * Usado como chave de método em componentes form-associated para:
 * 1. Adicionar o estado `disabled` em ElementInternals quando `disabled = true`.
 * 2. Remover o estado `disabled` em ElementInternals quando `disabled = false`.
 *
 * @example
 * import { disableable } from '@interface/disableable'
 *
 * class MyButton extends HTMLElement {
 *   #disabled
 *
 *   get disabled() {
 *     return (this.#disabled ??= false)
 *   }
 *
 *   @attributeChanged('disabled', truthy)
 *   @around(disableable)
 *   set disabled(val) {
 *     this.#disabled = val
 *   }
 *
 *   [disableable]() {
 *     this.disabled
 *       ? this.internals.states.add('disabled')
 *       : this.internals.states.delete('disabled')
 *     return this
 *   }
 * }
 *
 * // Atribuindo disabled dispara o hook:
 * const btn = new MyButton()
 * btn.disabled = true   // internals.states.add('disabled')
 * btn.disabled = false  // internals.states.delete('disabled')
 */
export const disableable = Symbol("disableable");
