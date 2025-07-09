import { connected, define } from "@nodusjs/std/directive";
import { paint } from "@nodusjs/std/dom";
import { component } from "./component";
import { slottable } from "./interface";
import { style } from "./style";

/**
 * @class Action
 *
 * @summary
 * Um componente de layout auxiliar, projetado para agrupar elementos
 * de ação e alocá-los automaticamente no slot "action" de um contêiner pai.
 *
 * @description
 * O `x-action` funciona como um wrapper para um ou mais elementos (como
 * botões) que devem aparecer na seção de ações de um componente pai,
 * como o `<x-header>` ou `<x-footer>`.
 *
 * Ele utiliza o decorator `@connected` e um método especial para
 * definir programaticamente seu próprio atributo `slot="action"`, garantindo
 * que ele seja renderizado no local correto sem que o desenvolvedor precise
 * adicionar o atributo manualmente.
 *
 * @element x-action
 * @extends {HTMLElement}
 *
 * @see {@link define} - Para o registro do custom element.
 * @see {@link paint} - Para a renderização inicial do componente.
 * @see {@link connected} - Para acionar a lógica de alocação de slot.
 */
@define("x-action")
@paint(component, style)
class Action extends HTMLElement {
  /**
   * O construtor da classe Action. Chama o construtor da classe pai
   * e anexa um Shadow DOM para encapsulamento. A opção `delegatesFocus`
   * melhora a acessibilidade do foco para os elementos internos.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  /**
   * @private
   * Método acionado pelo decorator `@connected` quando o elemento é
   * inserido no DOM.
   *
   * @description
   * A única responsabilidade deste método é auto-atribuir o atributo
   * `slot="action"` a si mesmo. Isso faz com que o `x-action` e todo
   * o seu conteúdo sejam projetados para dentro do `<slot name="action">`
   * do componente pai (ex: `<x-header>`).
   * @returns {this} A própria instância para encadeamento.
   */
  @connected
  [slottable]() {
    this.setAttribute("slot", "action");
    return this;
  }
}

export default Action;
