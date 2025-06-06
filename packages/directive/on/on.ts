import { hideble, reportable } from "@interface";
import { around } from "@middleware";
import { attributeChanged, connected, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { connectArc, disconnectArc } from "./interface";

/**
 * `<x-on>` – diretiva declarativa para anexar fluxos de comandos a eventos do elemento pai.
 *
 * @class On
 * @extends HTMLElement
 *
 * @description
 * O elemento `<x-on>` permite ligar e desligar “arcos” de comandos no seu componente pai
 * sempre que o atributo `value` mudar. Cada valor deve especificar:
 * 1. Um identificador de arco (prefixo antes da barra `/`)
 * 2. O evento alvo (após o identificador, separado por `/`, antes de `:`)
 * 3. Um comando de atributo ou hook (após `:`), eventualmente encadeado por `|`
 *
 * Internamente, ao definir `value`, ele:
 * 1. Aguarda o componente pai estar registrado (customElements.whenDefined).
 * 2. Desconecta o arco anterior (se existir) usando `disconnectArc`.
 * 3. Cria e conecta um novo arco com o valor atual via `connectArc`.
 *
 * @example
 * <x-button name="one">
 *   <!-- no clique, define variant="solid" e executa always('solid') -->
 *   <x-on value="one/click:attribute/variant|always=solid"></x-on>
 * </x-button>
 */
@define("x-on")
class On extends Echo(HTMLElement) {
  #oldValue;
  #newValue;

  /**
   * Atualiza o “arco” de comando para o evento e instruções especificados.
   *
   * @param {string} value String de instruções no formato`<id>/<event>:<command>/<arg>[|<hook>=<param>]…`.
   * @returns {void}
   */
  @attributeChanged("value")
  @around(reportable)
  set value(value) {
    this.#oldValue = this.newValue;
    this.#newValue = value;
  }

  @connected
  async [reportable]() {
    this.parentElement?.[disconnectArc]?.(this.#oldValue);
    this.parentElement?.[connectArc]?.(this.#newValue);
    return this;
  }

  /**
   * Ciclo de vida: esconde o `<x-on>` no DOM após ser conectado.
   *
   * @returns {this} Retorna a própria instância para encadeamento.
   */
  @connected
  [hideble]() {
    this.style.setProperty("display", "none");
    return this;
  }
}

export default On;
