import { Hidden } from "@mixin";
import { define } from "@nodusjs/std/directive";
import { attributeChanged } from "@nodusjs/std/directive";
import { paint, retouch } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { style } from "./style";
import { token } from "./token";

/**
 * @class Icon
 *
 * @summary
 * Um componente para exibir ícones SVG de forma consistente e acessível.
 *
 * @description
 * O `x-icon` renderiza um ícone com base em um nome fornecido, buscando o
 * SVG correspondente. Ele é construído sobre `@nodusjs/std` e é composto
 * por mixins que gerenciam seu estado de visibilidade (`Hidden`) e sua
 * integração com o sistema de dataflow (`Echo`). Sua aparência, como o
 * tamanho, pode ser customizada via atributos.
 *
 * @element x-icon
 * @extends {Echo(Hidden(HTMLElement))}
 *
 * @see {@link define} - Para o registro do custom element.
 * @see {@link paint} - Para a renderização inicial do componente.
 * @see {Echo} - Para a integração com o sistema de dataflow.
 * @see {Hidden} - Para o gerenciamento do estado 'hidden'.
 */
@define("x-icon")
@paint(component, token, style)
class Icon extends Echo(Hidden(HTMLElement)) {
  #internals;
  #size;
  #use;

  /**
   * Obtém a instância de `ElementInternals` do componente.
   * A API `ElementInternals` permite interações com formulários e APIs
   * de acessibilidade. A inicialização é feita sob demanda.
   * @returns {ElementInternals} A instância de `ElementInternals`.
   */
  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  /**
   * Obtém o tamanho do ícone.
   * @returns {string} O tamanho do ícone. O padrão é 'md'.
   */
  get size() {
    return (this.#size ??= "md");
  }

  /**
   * Define o tamanho do ícone, que afeta suas dimensões (width e height).
   * Aciona um retoque (`@retouch`) para atualizar os estilos.
   * @param {('sm'|'md'|'lg'|'xl')} value - O novo tamanho do ícone.
   */
  @attributeChanged("size")
  @retouch
  set size(value) {
    this.#size = value;
  }

  /**
   * Obtém o nome ou ID do ícone a ser renderizado.
   * @returns {string} O nome do ícone. O padrão é uma string vazia.
   */
  get use() {
    return (this.#use ??= "");
  }

  /**
   * Define o nome ou ID do ícone a ser renderizado.
   * Aciona uma nova renderização completa (`@repaint`) para buscar
   * e exibir o novo SVG.
   * @param {string} value - O nome/ID do ícone.
   */
  @attributeChanged("use")
  @repaint
  set use(value) {
    this.#use = value;
  }

  /**
   * O construtor da classe Icon. Chama o construtor da classe pai e
   * anexa um Shadow DOM para encapsular o DOM e os estilos do componente.
   * A opção `delegatesFocus` melhora a acessibilidade do foco.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }
}

export default Icon;
