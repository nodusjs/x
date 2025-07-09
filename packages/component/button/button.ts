import { around } from "@middleware";
import { Disabled, Hidden, Width } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, retouch } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import on from "@nodusjs/std/event";
import { truthy } from "@nodusjs/std/spark";
import { size, stop } from "@spark";
import { component } from "./component";
import { emitter } from "./interface";
import { style } from "./style";
import { token } from "./token";

/**
 * @class Button
 *
 * @summary
 * Um componente de botão customizável e acessível, projetado para ser
 * o bloco de construção fundamental para interações em um Design System.
 *
 * @description
 * O `x-button` é um Web Component completo que encapsula lógica de
 * renderização, reatividade, associação com formulários e estilização
 * dinâmica. Ele é construído sobre a biblioteca `@nodusjs/std` e é
 * composto por vários mixins (`Disabled`, `Echo`, `Hidden`, `Width`)
 * que lhe conferem comportamentos reutilizáveis.
 *
 * A aparência do botão é controlada por um conjunto de propriedades
 * reativas e Design Tokens, permitindo uma customização profunda para
 * se adaptar a diferentes contextos de UI.
 *
 * @element x-button
 * @extends {Disabled(Echo(Hidden(Width(HTMLElement))))}
 *
 * @see {@link define} - Para o registro do custom element.
 * @see {@link paint} - Para a renderização inicial do componente.
 * @see {Echo} - Para a integração com o sistema de dataflow.
 * @see {Disabled} - Para o gerenciamento do estado 'disabled'.
 * @see {Hidden} - Para o gerenciamento do estado 'hidden'.
 * @see {Width} - Para o gerenciamento da largura do componente.
 */
@define("x-button")
@paint(component, token, style)
class Button extends Disabled(Echo(Hidden(Width(HTMLElement)))) {
  #color;
  #internals;
  #onlyIcon;
  #size;
  #type;
  #value;
  #variant;

  /**
   * Obtém o tema de cor atual do botão.
   * @returns {string} O tema de cor. O padrão é 'brand'.
   */
  get color() {
    return (this.#color ??= "brand");
  }

  /**
   * Define o tema de cor do botão, que influencia sua aparência.
   * Aciona um retoque (`@retouch`) para atualizar os estilos sem
   * reconstruir o DOM.
   * @param {('brand'|'error')} value - O novo tema de cor.
   */
  @attributeChanged("color")
  @retouch
  set color(value) {
    this.#color = value;
  }

  /**
   * Obtém a instância de `ElementInternals` do componente.
   * `ElementInternals` é uma API que permite ao componente participar
   * de formulários, entre outras coisas.
   * @returns {ElementInternals} A instância de `ElementInternals`.
   */
  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  /**
   * Verifica se o botão deve ser renderizado apenas como um ícone,
   * sem texto visível.
   * @returns {boolean} `true` se o botão for apenas um ícone, `false` caso contrário. O padrão é `false`.
   */
  get onlyIcon() {
    return (this.#onlyIcon ??= false);
  }

  /**
   * Define se o botão deve ser renderizado apenas como um ícone.
   * Aciona um retoque (`@retouch`) para ajustar os estilos.
   * @param {boolean} value - O novo estado de "apenas ícone".
   */
  @attributeChanged("only-icon", truthy)
  @retouch
  set onlyIcon(value) {
    this.#onlyIcon = value;
  }

  /**
   * Obtém o tamanho (dimensões) do botão.
   * @returns {string} O tamanho do botão. O padrão é 'md'.
   */
  get size() {
    return (this.#size ??= "md");
  }

  /**
   * Define o tamanho do botão, afetando seu padding e font-size.
   * Aciona um retoque (`@retouch`) para atualizar os estilos.
   * @param {('sm'|'md'|'lg'|'xl')} value - O novo tamanho do botão.
   */
  @attributeChanged("size")
  @retouch
  set size(value) {
    this.#size = value;
  }

  /**
   * Obtém o tipo funcional do botão, que define sua ação
   * padrão dentro de um formulário.
   * @returns {string} O tipo do botão. O padrão é 'submit'.
   */
  get type() {
    return (this.#type ??= "submit");
  }

  /**
   * Define o tipo funcional do botão.
   * @param {('submit'|'reset')} value - O novo tipo funcional do botão.
   */
  @attributeChanged("type")
  set type(value) {
    this.#type = value;
  }

  /**
   * Obtém o valor associado ao botão.
   * @returns {*} O valor do botão.
   */
  get value() {
    return this.#value;
  }

  /**
   * Define o valor associado ao botão, que pode ser enviado
   * junto com os dados do formulário.
   * @param {*} value - O novo valor.
   */
  @attributeChanged("value")
  set value(value) {
    this.#value = value;
  }

  /**
   * Obtém a variante visual do botão (sólido, contornado, etc.).
   * @returns {string} A variante do botão. O padrão é 'solid'.
   */
  get variant() {
    return (this.#variant ??= "solid");
  }

  /**
   * Define a variante visual do botão.
   * Aciona um retoque (`@retouch`) para atualizar os estilos.
   * @param {('solid'|'outline'|'ghost'|'link')} value - A nova variante visual.
   */
  @attributeChanged("variant")
  @retouch
  set variant(value) {
    this.#variant = value;
  }

  /**
   * Propriedade estática que habilita a associação do componente
   * com formulários, permitindo que ele funcione como um input nativo.
   * @returns {boolean} Sempre `true`.
   */
  static get formAssociated() {
    return true;
  }

  /**
   * O construtor é chamado quando uma instância do elemento é criada.
   * Ele anexa o Shadow DOM para encapsulamento de estilo e DOM.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  /**
   * Manipula o evento de clique no componente.
   * O decorator `@on.click` garante que este método seja chamado.
   * O decorator `@around(emitter)` envolve este método, executando
   * a lógica do `emitter` após a conclusão deste.
   */
  @on.click("*", stop)
  @around(emitter)
  click() {
    if (super.disabled) return this;

    const init = { bubbles: true, cancelable: true, detail: this.value };
    const event = new CustomEvent("click", init);
    this.dispatchEvent(event);

    return this;
  }

  /**
   * Método especial (identificado pelo Symbol `emitter`) que é executado
   * como parte do middleware `around` no método `click`.
   * Ele executa a ação de formulário correspondente ao tipo do botão.
   */
  [emitter]() {
    if (super.disabled) return this;

    ({
      reset: () => this.internals.form?.reset?.(),
      submit: () => this.internals.form?.requestSubmit?.(),
    })[this.type]?.();

    return this;
  }
}

export default Button;
