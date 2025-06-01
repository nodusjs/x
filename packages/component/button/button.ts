import { disableable, emitter, hideble } from "@interface";
import { around } from "@middleware";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, repaint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import on from "@nodusjs/std/event";
import { truthy } from "@nodusjs/std/spark";
import { stop } from "@spark";
import { component } from "./component";
import { style } from "./style";
import { token } from "./token";

/**
 * `<x-button>` — componente de botão estilizado com suporte a formulários, estados e eventos.
 *
 * @class Button
 * @extends HTMLElement
 * @mixes Echo
 *
 * @description
 * Botão custom element que pode ser associado a formulários (form-associated),
 * suportando estados `disabled`, `hidden`, variações de `color`, `size`, `variant`,
 * largura (`width`) e ícone apenas (`only-icon`). Emite eventos de clique e aciona
 * ações de `submit` ou `reset` no formulário associado.
 *
 * @example
 * <!-- Botão de confirmação -->
 * <x-button color="brand" size="md" variant="solid" width="fill">
 *   Confirmar
 * </x-button>
 *
 * <!-- Botão de erro apenas ícone, desabilitado -->
 * <x-button
 *   color="error"
 *   variant="ghost"
 *   only-icon
 *   disabled
 *   value="delete"
 * >
 *   <svg>…</svg>
 * </x-button>
 */
@define("x-button")
@paint(component, token, style)
class Button extends Echo(HTMLElement) {
  #color;
  #disabled;
  #hidden;
  #internals;
  #onlyIcon;
  #size;
  #type;
  #value;
  #variant;
  #width;

  /**
   * Cor semântica do botão.
   *
   * @type {'brand'|'error'|'warning'|'success'}
   * @default 'brand'
   * @returns {string}
   */
  get color() {
    return (this.#color ??= "brand");
  }

  /**
   * Define a cor semântica do botão.
   *
   * @param {string} value Token de cor ('brand','error','warning','success')
   * @returns {void}
   */
  @attributeChanged("color")
  @repaint
  set color(value) {
    this.#color = value;
  }

  /**
   * Estado de desabilitado.
   *
   * @type {boolean}
   * @default false
   * @returns {boolean}
   */
  get disabled() {
    return (this.#disabled ??= false);
  }

  /**
   * Ativa ou desativa o estado `disabled`.
   *
   * @param {boolean} value
   * @returns {void}
   */
  @attributeChanged("disabled", truthy)
  @around(disableable)
  set disabled(value) {
    this.#disabled = value;
  }

  /**
   * Estado de oculto.
   *
   * @type {boolean}
   * @default false
   * @returns {boolean}
   */
  get hidden() {
    return (this.#hidden ??= false);
  }

  /**
   * Ativa ou desativa o estado `hidden`.
   *
   * @param {boolean} value
   * @returns {void}
   */
  @attributeChanged("hidden", truthy)
  @around(hideble)
  set hidden(value) {
    this.#hidden = value;
  }

  /**
   * APIs de form-associated internals.
   *
   * @type {ElementInternals}
   * @returns {ElementInternals}
   */
  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  /**
   * Se o botão exibe apenas ícone (sem texto).
   *
   * @type {boolean}
   * @default false
   * @returns {boolean}
   */
  get onlyIcon() {
    return (this.#onlyIcon ??= false);
  }

  /**
   * Ativa ou desativa o modo ícone apenas.
   *
   * @param {boolean} value
   * @returns {void}
   */
  @attributeChanged("only-icon", truthy)
  @repaint
  set onlyIcon(value) {
    this.#onlyIcon = value;
  }

  /**
   * Tamanho do botão.
   *
   * @type {'sm'|'md'|'lg'|'xl'}
   * @default 'md'
   * @returns {string}
   */
  get size() {
    return (this.#size ??= "md");
  }

  /**
   * Define o tamanho do botão (sm, md, lg, xl).
   *
   * @param {string} value
   * @returns {void}
   */
  @attributeChanged("size")
  @repaint
  set size(value) {
    this.#size = value;
  }

  /**
   * Tipo do botão para form (submit|reset).
   *
   * @type {'submit'|'reset'}
   * @default 'submit'
   * @returns {string}
   */
  get type() {
    return (this.#type ??= "submit");
  }

  /**
   * Define o tipo do botão para ações de formulário.
   *
   * @param {string} value
   * @returns {void}
   */
  @attributeChanged("type")
  set type(value) {
    this.#type = value;
  }

  /**
   * Valor de detalhe enviado no evento de clique.
   *
   * @type {any}
   * @returns {any}
   */
  get value() {
    return this.#value;
  }

  /**
   * Define o valor de detalhe do evento.
   *
   * @param {any} value
   * @returns {void}
   */
  @attributeChanged("value")
  set value(value) {
    this.#value = value;
  }

  /**
   * Variante visual do botão.
   *
   * @type {'solid'|'outlined'|'ghost'|'link'}
   * @default 'solid'
   * @returns {string}
   */
  get variant() {
    return (this.#variant ??= "solid");
  }

  /**
   * Define a variante visual (solid, outlined, ghost, link).
   *
   * @param {string} value
   * @returns {void}
   */
  @attributeChanged("variant")
  @repaint
  set variant(value) {
    this.#variant = value;
  }

  /**
   * Largura do botão.
   *
   * @type {'fill'|'hug'|string}
   * @default 'auto'
   * @returns {string}
   */
  get width() {
    return (this.#width ??= "auto");
  }

  /**
   * Define a largura do botão (fill, hug, px, %).
   *
   * @param {string} value
   * @returns {void}
   */
  @attributeChanged("width")
  @repaint
  set width(value) {
    this.#width = value;
  }

  /**
   * Habilita form association nativo.
   *
   * @static
   * @type {boolean}
   */
  static get formAssociated() {
    return true;
  }

  /**
   * Inicializa shadow DOM e estado inicial.
   *
   * @returns {void}
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  /**
   * Manipulador de clique interno.
   *
   * Emite um evento 'click' com `detail = this.value`,
   * interrompe a propagação se necessário e aciona o form.
   *
   * @returns {this}
   */
  @on.click(":host *", stop)
  @around(emitter)
  click() {
    const init = { bubbles: true, cancelable: true, detail: this.value };
    const event = new CustomEvent("click", init);
    this.dispatchEvent(event);
    return this;
  }

  /**
   * Hook chamado após alteração de `disabled`.
   *
   * @returns {this}
   */
  [disableable]() {
    this.disabled
      ? this.internals.states.add("disabled")
      : this.internals.states.delete("disabled");
    return this;
  }

  /**
   * Hook que emite ação de formulário (`submit` ou `reset`).
   *
   * @returns {this}
   */
  [emitter]() {
    ({
      reset: () => this.internals.form?.reset?.(),
      submit: () => this.internals.form?.requestSubmit?.(),
    })[this.type]?.();
    return this;
  }

  /**
   * Hook chamado após alteração de `hidden`.
   *
   * @returns {this}
   */
  [hideble]() {
    this.hidden
      ? this.internals.states.add("hidden")
      : this.internals.states.delete("hidden");
    return this;
  }
}

export default Button;
