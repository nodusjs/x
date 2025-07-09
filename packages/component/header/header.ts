import { Hidden } from "@mixin";
import { define } from "@nodusjs/std/directive";
import { paint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { style } from "./style";

/**
 * @class Header
 *
 * @summary
 * Um componente de layout que representa a seção de cabeçalho de uma página
 * ou de um contêiner de aplicação.
 *
 * @description
 * O `x-header` atua como um contêiner para conteúdo de topo de página,
 * como o logotipo do site, navegação principal, e ações do usuário.
 * Construído sobre `@nodusjs/std`, ele é composto por mixins que gerenciam
 * seu estado de visibilidade (`Hidden`) e sua integração com o sistema de
 * dataflow (`Echo`).
 *
 * @element x-header
 * @extends {Echo(Hidden(HTMLElement))}
 *
 * @see {@link define} - Para o registro do custom element.
 * @see {@link paint} - Para a renderização inicial do componente.
 * @see {Echo} - Para a integração com o sistema de dataflow.
 * @see {Hidden} - Para o gerenciamento do estado 'hidden'.
 */
@define("x-header")
@paint(component, style)
class Header extends Echo(Hidden(HTMLElement)) {
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
   * O construtor da classe Header. Chama o construtor da classe pai
   * e anexa um Shadow DOM para encapsular o DOM e os estilos do componente,
   * prevenindo conflitos com o resto da página.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

export default Header;
