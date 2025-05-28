import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, repaint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { truthy } from "@nodusjs/std/spark";
import { component } from "./component";
import { style } from "./style";

/**
 * `<x-text>` — componente de texto estilizado conforme tokens do design system.
 *
 * @class Text
 * @extends HTMLElement
 *
 * @description
 * Componente que renderiza um elemento de texto (<p>, <span>, etc.) com
 * alinhamento, cor, tamanho e peso configuráveis via atributos HTML. Suporta
 * quebra de linha e inversão de cor para fundos de marca.
 *
 * @example
 * <!-- Texto padrão -->
 * <x-text>Olá, mundo!</x-text>
 *
 * <!-- Texto em vermelho, centralizado e negrito -->
 * <x-text color="error-primary" align="center" weight="bold">
 *   Erro: operação falhou.
 * </x-text>
 * ```
 */
@define("x-text")
@paint(component, style)
class Text extends Echo(HTMLElement) {
  #align;
  #as;
  #color;
  #onBrand;
  #size;
  #wrap;
  #weight;

  /**
   * Obtém o alinhamento do texto.
   *
   * @returns {'left'|'center'|'right'|'justify'} Valor atual de alinhamento,
   * default "left".
   */
  get align() {
    return (this.#align ??= "left");
  }

  /**
   * Ajusta o alinhamento do texto e dispara repaint.
   *
   * @param {'left'|'center'|'right'|'justify'} value
   * @returns {void}
   */
  @attributeChanged("align")
  @repaint
  set align(value) {
    this.#align = value;
  }

  /**
   * Obtém a tag HTML usada para renderizar o texto.
   *
   * @returns {string} Valor de "as", default "p".
   */
  get as() {
    return (this.#as ??= "p");
  }

  /**
   * Define a tag HTML para renderização (ex.: "p", "span", "div").
   *
   * @param {string} value Nome da tag
   * @returns {void}
   */
  @attributeChanged("as")
  @repaint
  set as(value) {
    this.#as = value;
  }

  /**
   * Obtém o token de cor do texto.
   *
   * @returns {string} Nome do token de cor, default "primary".
   */
  get color() {
    return (this.#color ??= "primary");
  }

  /**
   * Define o token de cor do texto (ex.: "secondary", "error-primary").
   *
   * @param {string} value Nome do token
   * @returns {void}
   */
  @attributeChanged("color")
  @repaint
  set color(value) {
    this.#color = value;
  }

  /**
   * Indica se deve inverter a cor para uso sobre fundos de marca.
   *
   * @returns {boolean} `true` se estiver em modo “on-brand”, default false.
   */
  get onBrand() {
    return (this.#onBrand ??= false);
  }

  /**
   * Ativa/desativa o modo “on-brand” (inversão de cor).
   *
   * @param {boolean} value
   * @returns {void}
   */
  @attributeChanged("on-brand", truthy)
  @repaint
  set onBrand(value) {
    this.#onBrand = value;
  }

  /**
   * Obtém o tamanho tipográfico.
   *
   * @returns {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'} Valor atual, default "md".
   */
  get size() {
    return (this.#size ??= "md");
  }

  /**
   * Define o tamanho tipográfico (ex.: "sm", "2xl").
   *
   * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'} value
   * @returns {void}
   */
  @attributeChanged("size")
  @repaint
  set size(value) {
    this.#size = value;
  }

  /**
   * Obtém a política de quebra de linha.
   *
   * @returns {'wrap'|'no-wrap'} Valor atual, default "wrap".
   */
  get wrap() {
    return (this.#wrap ??= "wrap");
  }

  /**
   * Define a política de quebra de linha ("wrap" ou "no-wrap").
   *
   * @param {'wrap'|'no-wrap'} value
   * @returns {void}
   */
  @attributeChanged("wrap")
  @repaint
  set wrap(value) {
    this.#wrap = value;
  }

  /**
   * Obtém o peso da fonte.
   *
   * @returns {'regular'|'medium'|'semibold'|'bold'} Valor atual, default "medium".
   */
  get weight() {
    return (this.#weight ??= "medium");
  }

  /**
   * Define o peso da fonte (ex.: "semibold", "bold").
   *
   * @param {'regular'|'medium'|'semibold'|'bold'} value
   * @returns {void}
   */
  @attributeChanged("weight")
  @repaint
  set weight(value) {
    this.#weight = value;
  }

  /**
   * Cria a sombra de dom em modo aberto.
   *
   * @returns {void}
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

export default Text;
