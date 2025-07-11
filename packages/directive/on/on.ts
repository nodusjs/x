import { Headless } from "@mixin";
import { attributeChanged, connected, define } from "@nodusjs/std/directive";
import { connectArc, setter } from "./interface";

/**
 * @class On
 *
 * @summary
 * Um componente "headless" que permite anexar um listener de dataflow
 * (`Echo`) a qualquer componente pai, de forma declarativa.
 *
 * @description
 * O `x-on` é um componente de utilidade que resolve um caso de uso
 * específico: como fazer um componente que não foi construído com o mixin `Echo`
 * (como um componente nativo ou de terceiros) ouvir eventos do barramento do Nodus.
 *
 * Ao ser colocado como filho de um componente, o `x-on` espera o pai ser
 * definido e então chama programaticamente o método `connectArc` do pai,
 * passando a string de dataflow definida em seu próprio atributo `value`.
 * Isso efetivamente "anexa" a capacidade de escuta de eventos ao pai.
 *
 * @element x-on
 * @extends {Headless(HTMLElement)}
 *
 * @see {@link define} - Para o registro do custom element.
 * @see {@link connected} - Para acionar a lógica de conexão com o pai.
 */
@define("x-on")
class On extends Headless(HTMLElement) {
  #value;

  /**
   * Obtém a string de dataflow do Echo.
   * @returns {string} A string de dataflow (ex: "users/change:method/render").
   */
  get value() {
    return (this.#value ??= "");
  }

  /**
   * Define a string de dataflow do Echo que será anexada ao componente pai.
   * @param {string} value - A string de dataflow.
   */
  @attributeChanged("value")
  set value(value) {
    this.#value = value;
  }

  /**
   * @private
   *
   * Método acionado pelo decorator `@connected` quando o `x-on` é inserido no DOM.
   *
   * @returns {Promise<this>} A própria instância após a conclusão da conexão.
   *
   * @description
   * Este método assíncrono aguarda a definição do elemento pai e, em seguida,
   * invoca o método `connectArc` do pai, passando a string de dataflow
   * contida na propriedade `value` do `x-on`. Isso efetivamente registra o
   * listener de evento no componente pai.
   */
  @connected
  async [setter]() {
    await customElements.whenDefined(this.parentElement?.localName);
    this.parentElement?.[connectArc]?.(this.value);
    return this;
  }
}

export default On;
