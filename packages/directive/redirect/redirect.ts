import { Headless } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";

/**
 * @class Redirect
 *
 * @summary
 * Um componente "headless" que realiza um redirecionamento de URL
 * no lado do cliente, usando a History API.
 *
 * @description
 * O `x-redirect` é projetado para alterar a URL na barra de endereços do
 * navegador sem recarregar a página. Ele é tipicamente acionado por um
 * evento do `Echo`, como o clique em um link ou a submissão de um formulário.
 *
 * Ao executar seu método `go()`, ele utiliza `history.pushState()` para
 * navegar para a URL definida em seu atributo `href`, permitindo que
 * componentes de roteamento, como o `<x-include>` com `<x-route>`,
 * atualizem a visualização da página.
 *
 * @element x-redirect
 * @extends {Echo(Headless(HTMLElement))}
 */
@define("x-redirect")
class Redirect extends Echo(Headless(HTMLElement)) {
  #href;

  /**
   * Obtém a URL de destino para o redirecionamento.
   * @returns {string} A URL. O padrão é '#'.
   */
  get href() {
    return (this.#href ??= "#");
  }

  /**
   * Define a URL de destino para o redirecionamento.
   * @param {string} value - A nova URL de destino.
   */
  @attributeChanged("href")
  set href(value) {
    this.#href = value;
  }

  /**
   * Executa o redirecionamento para a URL definida no atributo `href`.
   * Utiliza `history.pushState` para alterar a URL do navegador sem
   * um recarregamento de página.
   * @returns {this} A própria instância para encadeamento.
   */
  go() {
    history.pushState({}, "", this.href);
    return this;
  }
}

export default Redirect;
