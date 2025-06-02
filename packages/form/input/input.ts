import {
  bindable,
  disableable,
  hideble,
  reflactable,
  reportable,
  validable,
} from "@interface";
import { after } from "@middleware";
import {
  attributeChanged,
  define,
  disconnected,
  formAssociated,
  formReset,
} from "@nodusjs/std/directive";
import { didPaint, paint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import on from "@nodusjs/std/event";
import { truthy } from "@nodusjs/std/spark";
import { prevent, value } from "@spark";
import { component } from "./component";
import Element from "./element";
import { invalid } from "./invalid";
import { style } from "./style";

/**
 * `<x-input>` — componente de campo de texto customizado que encapsula um `<input>` nativo
 * dentro de Shadow DOM, fornecendo suporte avançado a form-association, validação e estados.
 *
 * @class Input
 * @extends HTMLElement
 *
 * @description
 * Componente de campo de texto que encapsula um `<input>` nativo em Shadow DOM, refletindo atributos HTML
 * nas propriedades internas, gerenciando automaticamente estados de validação e visibilidade via
 * ElementInternals, emitindo eventos `change` sempre que o valor muda e integrando-se nativamente a
 * workflows de formulário (submissão, reset e report de validade).
 *
 * @example
 * <x-input
 *   name="email"
 *   type="email"
 *   placeholder="Digite seu e-mail"
 *   required>
 *   </x-input>
 */
@define("x-input")
@paint(component, style)
class Input extends Echo(HTMLElement) {
  #controller;
  #element;
  #hidden;
  #internals;

  /**
   * Retorna o AbortController associado ao componente, usado para cancelar operações
   * como listeners de formulário.
   *
   * @returns {AbortController}
   */
  get controller() {
    return (this.#controller ??= new AbortController());
  }

  /**
   * Indica se o campo está desabilitado.
   *
   * @returns {boolean}
   */
  get disabled() {
    return this.element.disabled;
  }

  /**
   * Define se o campo deve ficar desabilitado. Reflete no atributo HTML e no estado interno.
   *
   * @param {boolean} value
   */
  @attributeChanged("disabled", truthy)
  @after(disableable)
  set disabled(value) {
    this.element.disabled = value;
  }

  /**
   * Proxy para o elemento `<input>` interno que encapsula.
   *
   * @returns {HTMLElement}
   */
  get element() {
    return (this.#element ??= Element.from(this));
  }

  /**
   * Formulário associado via ElementInternals.
   *
   * @returns {HTMLFormElement}
   */
  get form() {
    return this.internals.form;
  }

  /**
   * Indica se o campo está oculto (via atributo e estado interno).
   *
   * @returns {boolean}
   */
  get hidden() {
    return (this.#hidden ??= false);
  }

  /**
   * Define se o campo deve ficar oculto. Atualiza atributo e estado interno.
   *
   * @param {boolean} value
   */
  @attributeChanged("hidden", truthy)
  @after(hideble)
  set hidden(value) {
    this.#hidden = value;
  }

  /**
   * ID do elemento interno.
   *
   * @returns {string}
   */
  get id() {
    return this.element.id;
  }

  /**
   * Define o ID do elemento interno.
   *
   * @param {string} value
   */
  @attributeChanged("id")
  set id(value) {
    this.element.id = value;
  }

  /**
   * Modo de operação interno do elemento (elementMode).
   *
   * @returns {string}
   */
  get elementMode() {
    return this.element.elementMode;
  }

  /**
   * Define o modo de operação interno do elemento.
   *
   * @param {string} value
   */
  @attributeChanged("elementmode")
  set elementMode(value) {
    this.element.elementMode = value;
  }

  /**
   * Instância de ElementInternals para form-association e estados.
   *
   * @returns {ElementInternals}
   */
  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  /**
   * Valor máximo permitido (`max`).
   *
   * @returns {string}
   */
  get max() {
    return (this.element.max ??= "");
  }

  /**
   * Define o valor máximo permitido e dispara validação/reflexão.
   *
   * @param {string} value
   */
  @attributeChanged("max")
  @after(validable)
  @after(reflactable)
  set max(value) {
    this.element.max = value;
  }

  /**
   * Comprimento máximo permitido (`maxlength`).
   *
   * @returns {string}
   */
  get maxLength() {
    return (this.element.maxlength ??= "");
  }

  /**
   * Define o comprimento máximo permitido e aciona validação/reflexão.
   *
   * @param {string} value
   */
  @attributeChanged("maxlength")
  @after(validable)
  @after(reflactable)
  set maxLength(value) {
    this.element.maxlength = value;
  }

  /**
   * Valor mínimo permitido (`min`).
   *
   * @returns {string}
   */
  get min() {
    return (this.element.min ??= "");
  }

  /**
   * Define o valor mínimo permitido e aciona validação/reflexão.
   *
   * @param {string} value
   */
  @attributeChanged("min")
  @after(validable)
  @after(reflactable)
  set min(value) {
    this.element.min = value;
  }

  /**
   * Comprimento mínimo permitido (`minlength`).
   *
   * @returns {string}
   */
  get minLength() {
    return (this.element.minlength ??= "");
  }

  /**
   * Define o comprimento mínimo permitido e aciona validação/reflexão.
   *
   * @param {string} value
   */
  @attributeChanged("minlength")
  @after(validable)
  @after(reflactable)
  set minLength(value) {
    this.element.minlength = value;
  }

  /**
   * Nome do campo (`name`).
   *
   * @returns {string}
   */
  get name() {
    return (this.element.name ??= "");
  }

  /**
   * Define o nome do campo.
   *
   * @param {string} value
   */
  @attributeChanged("name")
  set name(value) {
    this.element.name = value;
  }

  /**
   * Expressão regular de validação (`pattern`).
   *
   * @returns {string}
   */
  get pattern() {
    return this.element.pattern;
  }

  /**
   * Define a expressão regular de validação e aciona validação/reflexão.
   *
   * @param {string} value
   */
  @attributeChanged("pattern")
  @after(validable)
  @after(reflactable)
  set pattern(value) {
    this.element.pattern = value;
  }

  /**
   * Texto placeholder exibido no campo.
   *
   * @returns {string}
   */
  get placeholder() {
    return this.element.placeholder;
  }

  /**
   * Define o placeholder do campo.
   *
   * @param {string} value
   */
  @attributeChanged("placeholder")
  set placeholder(value) {
    this.element.placeholder = value;
  }

  /**
   * Indica se o campo é somente leitura.
   *
   * @returns {boolean}
   */
  get readonly() {
    return this.element.readonly;
  }

  /**
   * Define se o campo deve ser somente leitura.
   *
   * @param {boolean} value
   */
  @attributeChanged("readonly", truthy)
  set readonly(value) {
    this.element.readonly = value;
  }

  /**
   * Indica se o campo é obrigatório.
   *
   * @returns {boolean}
   */
  get required() {
    return this.element.required;
  }

  /**
   * Define se o campo deve ser obrigatório e dispara validação/reflexão.
   *
   * @param {boolean} value
   */
  @attributeChanged("required", truthy)
  @after(validable)
  @after(reflactable)
  set required(value) {
    this.element.required = value;
  }

  /**
   * Incremento de valor para tipos numéricos (`step`).
   *
   * @returns {string}
   */
  get step() {
    return this.element.step;
  }

  /**
   * Define o incremento de valor e aciona validação/reflexão.
   *
   * @param {string} value
   */
  @attributeChanged("step")
  @after(validable)
  @after(reflactable)
  set step(value) {
    this.element.step = value;
  }

  /**
   * Tipo do input (`text`, `email`, etc.).
   *
   * @returns {string}
   */
  get type() {
    return this.element.type;
  }

  /**
   * Define o tipo do input e dispara validação/reflexão.
   *
   * @param {string} value
   */
  @attributeChanged("type")
  @after(validable)
  @after(reflactable)
  set type(value) {
    this.element.type = value;
  }

  /**
   * Mensagem de validação padrão do navegador.
   *
   * @returns {string}
   */
  get validationMessage() {
    return this.internals.validationMessage;
  }

  /**
   * Estado de validade do input.
   *
   * @returns {ValidityState}
   */
  get validity() {
    return this.internals.validity;
  }

  /**
   * Valor atual do campo.
   *
   * @returns {string}
   */
  get value() {
    return this.element.value;
  }

  /**
   * Define o valor do campo, refletindo atributo e acionando validação/reflexão.
   *
   * @param {string} value
   */
  @attributeChanged("value")
  @after(validable)
  @after(reflactable)
  set value(value) {
    this.element.value = value;
  }

  /**
   * Indica se o campo será validado pelo navegador.
   *
   * @returns {boolean}
   */
  get willValidate() {
    return this.internals.willValidate;
  }

  /**
   * Indica que este componente participa de form-associated custom elements.
   *
   * @returns {boolean}
   */
  static get formAssociated() {
    return true;
  }

  /**
   * Cria o elemento `<x-input>`, inicializa o Shadow DOM e configura o foco delegado.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  /**
   * Atualiza o valor do componente a partir do evento de entrada do usuário e dispara o emissor de mudança.
   *
   * @param {string} val Novo valor vindo do evento de input.
   * @returns {this}
   */
  @on.input("input", value)
  [bindable](detail) {
    this.value = detail;
    this.dispatchEvent(new CustomEvent("change", { detail }));
    return this;
  }

  /**
   * Verifica a validade atual do campo usando ElementInternals.
   *
   * @returns {boolean} Resultado da verificação de validade.
   */
  checkValidity() {
    return this.internals.checkValidity();
  }

  /**
   * Atualiza o estado interno “disabled” refletindo a propriedade `disabled`.
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
   * Atualiza o estado interno “hidden” refletindo a propriedade `hidden`.
   *
   * @returns {this}
   */
  [hideble]() {
    this.hidden
      ? this.internals.states.add("hidden")
      : this.internals.states.delete("hidden");
    return this;
  }

  /**
   * Conecta-se ao ciclo de vida de desconexão do elemento, remove do DOM e aborta pendências.
   *
   * @returns {this}
   */
  @disconnected
  remove() {
    super.remove();
    this.controller.abort();
    return this;
  }

  /**
   * Solicita ao navegador que exiba a mensagem de validação caso o campo seja inválido.
   *
   * @returns {boolean} Indicador se a mensagem foi exibida.
   */
  reportValidity() {
    return this.internals.reportValidity();
  }

  /**
   * Redefine o valor do campo ao estado inicial e limpa o estado interno “invalid”.
   *
   * @returns {this}
   */
  @formReset
  @after(reflactable)
  reset() {
    this.element.value = "";
    this.removeAttribute("value");
    this.internals.states.delete("invalid");
    this.dispatchEvent(new Event("reset"));
    return this;
  }

  /**
   * Atualiza o estado interno de validade sempre que ocorre um evento `invalid` no campo.
   *
   * @returns {this}
   */
  @invalid(prevent)
  [validable]() {
    this.validity.valid
      ? this.internals.states.delete("invalid")
      : this.internals.states.add("invalid");
    return this;
  }

  /**
   * Inscreve o valor do campo no formulário associado quando o formulário é serializado.
   *
   * @param {HTMLFormElement} form Formulário ao qual o campo pertence.
   * @returns {this}
   */
  @formAssociated
  [reportable](form) {
    const event = "formdata";
    const listener = (event) =>
      this.disabled || event.formData.set(this.name, this.value);
    const options = { signal: this.controller.signal };
    form.addEventListener(event, listener, options);
    return this;
  }

  /**
   * Reflete o estado de validação visual no campo, atualizando mensagens e estados internos.
   *
   * @returns {this}
   */
  @didPaint
  [reflactable]() {
    const { validationMessage, validity } = this.element;
    this.internals.setValidity(validity, validationMessage);
    return this;
  }
}

export default Input;
