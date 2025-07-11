import { around } from "@middleware";
import { Headless } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { match } from "./interface";
import { resize } from "./resize";

/**
 * @class Responsive
 *
 * @summary
 * Um componente "headless" que aplica atributos a um elemento pai
 * com base em media queries de CSS.
 *
 * @description
 * O `x-responsive` permite a criação de layouts e comportamentos
 * responsivos de forma declarativa, diretamente no HTML. Ele ouve o evento
 * de redimensionamento da janela (`resize`) e avalia uma media query
 * fornecida.
 *
 * Se a media query for atendida, o componente percorre seus próprios
 * atributos e os aplica ao seu elemento pai. Isso permite alterar
 * dinamicamente as propriedades de um componente pai conforme o tamanho
 * da tela muda.
 *
 * @element x-responsive
 * @extends {Headless(HTMLElement)}
 *
 * @see {@link define} - Para o registro do custom element.
 */
@define("x-responsive")
class Responsive extends Headless(HTMLElement) {
  #media;

  /**
   * Obtém a string da media query a ser avaliada.
   * @returns {string} A media query (ex: '(min-width: 768px)').
   */
  get media() {
    return (this.#media ??= "");
  }

  /**
   * Define a media query que acionará a mudança de atributos.
   * @param {string} value - A nova media query.
   */
  @attributeChanged("media")
  @around(match)
  set media(value) {
    this.#media = value;
  }

  /**
   * @private
   * Método acionado pelo middleware `@around` ou pelo evento de resize.
   * Ele avalia a media query e aplica os atributos ao pai se a
   * condição for atendida.
   * @returns {this} A própria instância para encadeamento.
   */
  [match]() {
    window.matchMedia(this.media).matches &&
      Array.from(this.attributes)
        .filter(({ name }) => !/^(on|is|class|style|media)$/.test(name))
        .forEach(({ name, value }) => {
          this.parentElement.setAttribute(name, value);
        });
    return this;
  }
}

export default Responsive;
