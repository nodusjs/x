import { define } from "@nodusjs/std/directive";
import { attributeChanged } from "@nodusjs/std/directive";
import { paint, repaint } from "@nodusjs/std/dom";
import { willPaint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { render, textContent } from "./interface";
import { request } from "./request";
import { style } from "./style";

/**
 * @class Include
 *
 * @summary
 * Um componente para incluir e renderizar conteúdo de arquivos HTML externos
 * de forma declarativa.
 *
 * @description
 * O `x-include` funciona de maneira similar a um "Server-Side Include" (SSI),
 * mas no lado do cliente. Ele recebe um caminho para um arquivo HTML através
 * do seu atributo `src`, busca o conteúdo desse arquivo e o renderiza em seu lugar.
 *
 * Isso é extremamente útil para modularizar o HTML, permitindo a reutilização
 * de componentes de página como cabeçalhos e rodapés sem a necessidade de
 * criar um Web Component completo para cada um.
 *
 * @element x-include
 * @extends {Echo(HTMLElement)}
 *
 * @see {@link define} - Para o registro do custom element.
 * @see {@link paint} - Para a renderização inicial do componente.
 * @see {@link willPaint} - Para acionar a busca do conteúdo antes da pintura.
 */
@define("x-include")
@paint(component, style)
class Include extends Echo(HTMLElement) {
  #src;
  #textContent;

  /**
   * Obtém a URL do arquivo HTML a ser incluído.
   * @returns {string} A URL do conteúdo externo.
   */
  get src() {
    return (this.#src ??= "");
  }

  /**
   * Define a URL do arquivo HTML a ser incluído. Alterar este valor
   * aciona uma nova renderização com o novo conteúdo.
   * @param {string} value - A URL do conteúdo externo.
   */
  @attributeChanged("src")
  @repaint
  set src(value) {
    this.#src = value;
  }

  /**
   * Obtém o conteúdo HTML buscado que será renderizado.
   * @returns {string} O conteúdo do arquivo HTML.
   */
  get [textContent]() {
    return (this.#textContent ??= "");
  }

  /**
   * O construtor da classe Include.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  /**
   * @private
   * Método acionado pelo decorator `@willPaint` antes da renderização.
   * Sua responsabilidade é buscar o conteúdo do arquivo HTML definido
   * no atributo `src` e armazená-lo para a renderização.
   * @returns {Promise<this>} A própria instância após a conclusão da busca.
   */
  @willPaint
  async [render]() {
    this.#textContent = await request(this.src);
    return this;
  }
}

export default Include;
