import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, repaint } from "@nodusjs/std/dom";
import Text, { component, style } from "@typography/text";
import { style as restyle } from "./style";

/**
 * `<x-heading>` — componente de título que estende `<x-text>`.
 *
 * @class Heading
 * @extends Text
 *
 * @description
 * Especialização de `<x-text>` para renderizar títulos (<h1>, <h2>, <h3>, etc.).
 * Define por padrão a tag `h1` e aplica estilos base de texto mais ajustes de
 * tipografia via `restyle`.
 *
 * @example
 * <!-- Título principal -->
 * <x-heading>
 *   Meu Título H1
 * </x-heading>
 *
 * <!-- Subtítulo H2 em cor secundária e tamanho grande -->
 * <x-heading as="h2" color="secondary" size="lg">
 *   Meu Subtítulo H2
 * </x-heading>
 */
@define("x-heading")
@paint(component, style, restyle)
class Heading extends Text {
  #as;

  /**
   * Obtém a tag HTML usada para renderizar o heading.
   *
   * @description
   * Retorna o elemento de título atual (h1, h2, h3...), padrão é "h1".
   *
   * @returns {string} Tag HTML de título, default `"h1"`.
   */
  get as() {
    return (this.#as ??= "h1");
  }

  /**
   * Define a tag HTML para renderização do heading.
   *
   * @description
   * Permite alterar o nível do título (`h1`, `h2`, `h3`, etc.), refletindo no
   * atributo e disparando repaint para aplicar estilos.
   *
   * @param {string} value Nome da tag de título a usar (ex.: "h2", "h3").
   * @returns {void}
   */
  @attributeChanged("as")
  @repaint
  set as(value) {
    this.#as = value;
  }
}

export default Heading;
