import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, repaint } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import on from "@nodusjs/std/event";
import { truthy } from "@nodusjs/std/spark";
import { component } from "./component";
import { style } from "./style";

/**
 * @class Modal
 * 
 * @summary
 * Um componente de UI que exibe conteúdo em uma camada sobreposta à página,
 * bloqueando a interação com o conteúdo principal.
 *
 * @description
 * O `x-modal` é usado para focar a atenção do usuário em uma tarefa ou
 * informação importante, como formulários, alertas ou galerias de imagens.
 * Ele gerencia seu próprio estado de visibilidade (`opened`) e fornece
 * métodos para ser aberto (`show`) e fechado (`hide`), que podem ser
- * acionados por eventos do dataflow do Echo.
 *
 * @element x-modal
 * @extends {Echo(HTMLElement)}
 */
@define("x-modal")
@paint(component, style)
class Modal extends Echo(HTMLElement) {
  #opened;

  /**
   * Obtém o estado de visibilidade atual do modal.
   * @returns {boolean} `true` se o modal estiver aberto, senão `false`. O padrão é `false`.
   */
  get opened() {
    return (this.#opened ??= false);
  }

  /**
   * Define o estado de visibilidade do modal.
   * A alteração desta propriedade aciona uma nova renderização (`@repaint`)
   * para mostrar ou esconder o modal.
   * @param {boolean} value - O novo estado de visibilidade.
   */
  @attributeChanged("opened", truthy)
  @repaint
  set opened(value) {
    this.#opened = value;
  }

  /**
   * O construtor da classe Modal.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Fecha o modal.
   * Este método é acionado pelo decorator `@on.click('overflow')`,
   * permitindo que o modal seja fechado ao clicar na área externa (overlay).
   * @returns {this} A própria instância para encadeamento.
   */
  @on.click("overflow")
  hide() {
    this.opened = false;
    return this;
  }

  /**
   * Abre o modal, tornando-o visível.
   * Este método pode ser acionado por um evento de `Echo` para abrir o modal
   * de forma programática a partir de outro componente.
   * @returns {this} A própria instância para encadeamento.
   */
  show() {
    this.opened = true;
    return this;
  }
}

export default Modal;
