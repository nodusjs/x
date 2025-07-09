import { Height, Hidden, Width } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, retouch } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { style } from "./style";

/**
 * @class Card
 *
 * @summary
 * Um componente de contêiner flexível usado para agrupar conteúdo
 * relacionado em uma superfície visualmente distinta.
 *
 * @description
 * O `x-card` é um Web Component que serve como uma base para layouts,
 * permitindo o agrupamento de informações. Ele é composto por mixins
 * que controlam sua altura, largura e visibilidade, e sua aparência
 * é customizável através de propriedades reativas e Design Tokens.
 *
 * @element x-card
 * @extends {Echo(Height(Hidden(Width(HTMLElement))))}
 *
 * @see {@link define} - Para o registro do custom element.
 * @see {@link paint} - Para a renderização inicial do componente.
 * @see {Echo} - Para a integração com o sistema de dataflow.
 * @see {Height} - Para o gerenciamento da altura do componente.
 * @see {Hidden} - Para o gerenciamento do estado 'hidden'.
 * @see {Width} - Para o gerenciamento da largura do componente.
 */
@define("x-card")
@paint(component, style)
class Card extends Echo(Height(Hidden(Width(HTMLElement)))) {
  /**
   * @private
   * @type {ElementInternals}
   * Armazena a instância de ElementInternals para futuras interações com APIs de formulário.
   */
  #internals;

  /**
   * @private
   * @type {string}
   * Armazena o valor do espaçamento interno (padding) do card.
   */
  #spacing;

  /**
   * Obtém a instância de `ElementInternals` do componente.
   * A inicialização é feita sob demanda (lazy).
   * @returns {ElementInternals} A instância de `ElementInternals`.
   */
  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  /**
   * Obtém o token de espaçamento interno (padding) do card.
   * @returns {string} O token de espaçamento. O padrão é '2xl'.
   */
  get spacing() {
    return (this.#spacing ??= "2xl");
  }

  /**
   * Define o token de espaçamento interno (padding) do card.
   * Utiliza os tokens de espaçamento do Design System. Aciona um retoque (`@retouch`)
   * para atualizar os estilos quando o valor é alterado.
   * @param {('none'|'xxs'|'xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'|'6xl'|'7xl'|'8xl'|'9xl'|'10xl'|'11xl')} value - O novo token de espaçamento.
   */
  @attributeChanged("spacing")
  @retouch
  set spacing(value) {
    this.#spacing = value;
  }

  /**
   * O construtor é chamado quando uma instância do elemento é criada.
   * Ele anexa o Shadow DOM para encapsulamento de estilo e DOM.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

export default Card;
