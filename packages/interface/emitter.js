/**
 * Symbol para identificar o hook de emissão de ação de formulário.
 *
 * @type {symbol}
 *
 * @description
 * Usado como chave de método em componentes form-associated para:
 * 1. Disparar a ação correta (`submit` ou `reset`) no form associado após o clique.
 * 2. Invocar `internals.form.requestSubmit()` quando `type="submit"`.
 * 3. Invocar `internals.form.reset()` quando    `type="reset"`.
 *
 * @example
 * import { emitter } from '@interface/emitter'
 *
 * class MyButton extends HTMLElement {
 *   #type
 *   #internals
 *
 *   get type() {
 *     return (this.#type ??= 'submit')
 *   }
 *
 *   @attributeChanged('type')
 *   set type(val) {
 *     this.#type = val
 *   }
 *
 *   @around(emitter)
 *   click() {
 *     // lógica de evento click
 *     return this
 *   }
 *
 *   [emitter]() {
 *     ({
 *       submit: () => this.internals.form?.requestSubmit?.(),
 *       reset:  () => this.internals.form?.reset?.()
 *     })[this.type]?.()
 *     return this
 *   }
 * }
 *
 * // Ao chamar click(), o hook é disparado:
 * const btn = new MyButton()
 * btn.type = 'reset'
 * btn.click() // internals.form.reset()
 */
export const emitter = Symbol('emitter')
