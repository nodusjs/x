import { Headless } from "@mixin";
import { attributeChanged, connected, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { extractArgs } from "./extractArgs";
import { extractParams } from "./extractParams";
import { handle } from "./interface";
import { mismatch } from "./mismatch";
import { urlState } from "./urlState";

/**
 * @class Route
 *
 * @summary
 * Um componente "headless" que representa uma rota em um sistema de
 * roteamento no lado do cliente.
 *
 * @description
 * O `x-route` é projetado para ser usado como filho de um componente
 * `<x-include>`. Sua principal responsabilidade é comparar seu atributo
 * `path` com a URL atual do navegador. Se houver uma correspondência,
 * ele define o atributo `src` de seu elemento pai (`<x-include>`) com
 * o valor de seu próprio atributo `src`.
 *
 * Isso permite que o `<x-include>` busque e renderize o conteúdo HTML
 * associado à rota correspondente, criando um sistema de roteamento
 * para Single-Page Applications (SPAs) de forma declarativa.
 *
 * @element x-route
 * @extends {Echo(Headless(HTMLElement))}
 *
 * @see {@link define} - Para o registro do custom element.
 */
@define("x-route")
class Route extends Echo(Headless(HTMLElement)) {
  #path;
  #src;

  /**
   * Obtém o padrão de caminho da rota.
   * @returns {string} O padrão de caminho (ex: '/users/:id').
   */
  get path() {
    return (this.#path ??= "");
  }

  /**
   * Define o padrão de caminho que esta rota deve corresponder.
   * @param {string} value - O padrão de caminho.
   */
  @attributeChanged("path")
  set path(value) {
    this.#path = value;
  }

  /**
   * Obtém a URL do arquivo HTML a ser carregado quando a rota corresponde.
   * @returns {string} A URL do arquivo de conteúdo.
   */
  get src() {
    return (this.#src ??= "");
  }

  /**
   * Define a URL do arquivo HTML a ser carregado quando a rota corresponde.
   * @param {string} value - A URL do arquivo de conteúdo.
   */
  @attributeChanged("src")
  set src(value) {
    this.#src = value;
  }

  /**
   * @private
   * Método assíncrono acionado pelo decorator `@connected` e pelo `@urlState`.
   * Ele contém a lógica principal para verificar a correspondência da rota.
   *
   * @description
   * Este método primeiro verifica se o caminho da rota corresponde à URL atual
   * usando a função `mismatch`. Se não houver correspondência, ele para.
   * Se houver, ele extrai quaisquer argumentos da URL, aguarda o elemento pai
   * (`x-include`) ser definido, e então define o atributo `src` do pai com a
   * URL do conteúdo desta rota, acionando a renderização da página.
   * @returns {Promise<this>} A própria instância para encadeamento.
   */
  @connected
  @urlState
  async [handle]() {
    if (mismatch(this.path)) return this;
    extractParams(this.path);
    extractArgs();
    await customElements.whenDefined(this.parentElement?.localName);
    this.parentElement.setAttribute("src", this.src);
    return this;
  }
}

export default Route;
