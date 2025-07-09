import { around } from "@middleware";
import { Headless } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { dispatch } from "./interface";

/**
 * @class Find
 *
 * @summary
 * Um componente "headless" que busca um item específico em um `x-dataset`
 * pai e dispara um evento com o item encontrado.
 *
 * @description
 * O `x-find` atua como um gatilho de busca para um `x-dataset`. Ele deve ser
 * um filho direto de um `x-dataset`. Quando sua propriedade `value` é alterada
 * (geralmente por um evento de `Echo`), ele usa esse valor para encontrar o
 * item correspondente no `dataset` pai, utilizando a chave (`key`) configurada.
 *
 * Após encontrar o item, ele dispara um evento `find` no barramento do `Echo`,
 * permitindo que outros componentes (como um formulário de edição em um `<x-render>`)
 * recebam os dados do item e se atualizem.
 *
 * @element x-find
 * @extends {Echo(Headless(HTMLElement))}
 */
@define("x-find")
class Find extends Echo(Headless(HTMLElement)) {
  #key;
  #value;

  /**
   * Obtém o nome da propriedade que será usada como chave de busca.
   * @returns {string} O nome da chave.
   */
  get key() {
    return this.#key;
  }

  /**
   * Define o nome da propriedade a ser usada como chave na busca (ex: 'id').
   * @param {string} value - O nome da chave.
   */
  @attributeChanged("key")
  set key(value) {
    this.#key = value;
  }

  /**
   * Obtém o valor atual que está sendo buscado.
   * @returns {*} O valor da busca.
   */
  get value() {
    return this.#value;
  }

  /**
   * Define o valor a ser buscado no `dataset` pai.
   * Alterar esta propriedade aciona o processo de busca e o disparo
   * do evento `find`.
   * @param {*} value - O valor a ser encontrado.
   */
  @attributeChanged("value")
  @around(dispatch)
  set value(value) {
    this.#value = value;
  }

  /**
   * @private
   * Método assíncrono, acionado pelo middleware `@around`, que realiza a busca
   * e dispara o evento `find`.
   *
   * @description
   * Ele aguarda a definição do `dataset` pai, chama o método `find` do
   * pai passando o valor e a chave, e então despacha um evento `find`
   * com o resultado (o item encontrado) no `detail`.
   */
  async [dispatch]() {
    await customElements.whenDefined(this.parentElement?.localName);
    const detail = this.parentElement.value.find(
      ({ [this.key]: value }) => value === this.value,
    );
    const init = { bubbles: true, cancelable: true, detail };
    const event = new CustomEvent("find", init);
    this.parentElement.dispatchEvent(event);
    return this;
  }
}

export default Find;
