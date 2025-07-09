import { around } from "@middleware";
import { Headless } from "@mixin";
import { attributeChanged, connected, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { truthy } from "@nodusjs/std/spark";
import { trigger } from "./interface";

/**
 * @class Macro
 *
 * @summary
 * Um componente "headless" que executa código JavaScript dinamicamente em
 * resposta a eventos do dataflow.
 *
 * @description
 * O `x-macro` funciona como um "escape hatch" ou uma "função como componente".
 * Ele permite que os desenvolvedores injetem lógica JavaScript imperativa
 * diretamente no fluxo de dados declarativo do Nodus.
 *
 * Ele é acionado por um evento (via `x-on`), executa o código fornecido no
 * atributo `execute`, e então dispara um evento `ok` com o resultado da
 * execução ou um evento `error` se ocorrer uma falha.
 *
 * <strong>Aviso de Segurança:</strong> Este componente utiliza `new Function()` para
 * executar código a partir de uma string, o que pode apresentar riscos de
 * segurança se o conteúdo do atributo `execute` for gerado a partir de
 * fontes não confiáveis. Use com cautela.
 *
 * @element x-macro
 * @extends {Echo(Headless(HTMLElement))}
 */
@define("x-macro")
class Macro extends Echo(Headless(HTMLElement)) {
  #autorun;
  #execute;

  /**
   * Obtém o estado do autorun.
   * @returns {boolean} `true` se a macro deve executar automaticamente ao carregar.
   */
  get autorun() {
    return (this.#autorun ??= false);
  }

  /**
   * Define se a macro deve ser executada automaticamente assim que o
   * componente for conectado ao DOM.
   * @param {boolean} value - Convertido pelo spark `truthy`.
   */
  @attributeChanged("autorun", truthy)
  set autorun(value) {
    this.#execute = value;
  }

  /**
   * Obtém o código JavaScript a ser executado.
   * @returns {string} A string de código.
   */
  get execute() {
    return (this.#execute ??= "");
  }

  /**
   * Define o código JavaScript que a macro irá executar.
   * @param {string} value - A string de código JavaScript.
   */
  @attributeChanged("execute")
  set execute(value) {
    this.#execute = value;
  }

  /**
   * Executa o código JavaScript definido no atributo `execute`.
   * Este método é geralmente acionado por um evento via `x-on`.
   * O código executado tem acesso ao payload do evento através das
   * variáveis `X` e `$0`.
   * @param {*} $0 - O payload do evento que acionou a macro.
   * @returns {this} A própria instância.
   */
  run($0) {
    try {
      const X = { args, params };
      const detail = new Function("X", "$0", `return ${this.execute}`)(X, $0);
      this.dispatchEvent(new CustomEvent("ok", { detail }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent("error", { detail: error.message }));
    }
    return this;
  }

  /**
   * @private
   * Método acionado pelo decorator `@connected` quando o elemento é inserido no DOM.
   * Ele agenda a execução do método `run()` se a propriedade `autorun` for `true`.
   */
  @connected
  [trigger]() {
    requestIdleCallback(() => {
      this.autorun && this.run();
    });
    return this;
  }
}

export default Macro;
