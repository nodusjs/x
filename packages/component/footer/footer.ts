import { Hidden } from "@mixin";
import { define } from "@nodusjs/std/directive";
import { paint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { style } from "./style";

/**
 * @class Footer
 *
 * @summary
 * Um componente de layout que representa a seção de rodapé de uma página
 * ou de um contêiner de aplicação.
 *
 * @description
 * O `x-footer` atua como um contêiner para conteúdo de final de página,
 * como links de navegação, informações de copyright, e outros elementos.
 * Construído sobre `@nodusjs/std`, ele é composto por mixins que gerenciam
 * seu estado de visibilidade (`Hidden`) e sua integração com o sistema de
 * dataflow (`Echo`).
 *
 * @element x-footer
 * @extends {Echo(Hidden(HTMLElement))}
 *
 * @see {@link define} - Para o registro do custom element.
 * @see {@link paint} - Para a renderização inicial do componente.
 * @see {Echo} - Para a integração com o sistema de dataflow.
 * @see {Hidden} - Para o gerenciamento do estado 'hidden'.
 */
@define("x-footer")
@paint(component, style)
class Footer extends Echo(Hidden(HTMLElement)) {
  #internals;

  /**
   * Obtém a instância de `ElementInternals` do componente,
   * inicializando-a na primeira chamada. A API `ElementInternals`
   * permite que o componente interaja com formulários e APIs de acessibilidade.
   * @returns {ElementInternals} A instância de `ElementInternals`.
   */
  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  /**
   * O construtor da classe Footer. Chama o construtor da classe pai
   * e anexa um Shadow DOM para encapsular o DOM e os estilos do componente,
   * prevenindo conflitos com o resto da página.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

export default Footer;
