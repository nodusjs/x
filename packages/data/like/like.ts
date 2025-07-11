import { around } from "@middleware";
import { Headless } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { dispatch } from "./interface";

/**
 * @class Like
 *
 * @summary
 * Um componente "headless" que filtra itens em um `x-dataset` pai com base
 * em uma string de busca e dispara um evento com os itens correspondentes.
 *
 * @description
 * O `x-like` atua como um motor de busca para um `x-dataset`. Ele deve ser um
 * filho direto de um `x-dataset`. Quando sua propriedade `value` é alterada
 * (geralmente por um evento de `Echo` de um campo de busca), ele usa esse
 * valor para filtrar os itens no `dataset` pai, verificando se o valor da
 * propriedade-alvo (definida por `key`) contém a string de busca.
 *
 * Após a filtragem, ele dispara um evento `like` no barramento do `Echo` com
 * o array de itens encontrados no `detail`, permitindo que um `<x-render>`
 * ou outro componente exiba os resultados da busca.
 *
 * @element x-like
 * @extends {Echo(Headless(HTMLElement))}
 */
@define("x-like")
class Like extends Echo(Headless(HTMLElement)) {
  #key;
  #value;

  /**
   * Obtém o nome da propriedade que será usada como alvo da busca.
   * @returns {string} O nome da chave.
   */
  get key() {
    return this.#key;
  }

  /**
   * Define o nome da propriedade a ser usada como alvo na busca (ex: 'name').
   * @param {string} value - O nome da chave.
   */
  @attributeChanged("key")
  set key(value) {
    this.#key = value;
  }

  /**
   * Obtém o valor/termo de busca atual.
   * @returns {string} O termo de busca.
   */
  get value() {
    return (this.#value ??= "");
  }

  /**
   * Define o valor/termo a ser usado para filtrar o `dataset` pai.
   * Alterar esta propriedade aciona o processo de filtro e o disparo
   * do evento `like`.
   * @param {string} value - O termo de busca.
   */
  @attributeChanged("value")
  @around(dispatch)
  set value(value) {
    this.#value = value;
  }

  /**
   * @private
   * Método assíncrono, acionado pelo middleware `@around`, que realiza a
   * filtragem e dispara o evento `like`.
   *
   * @description
   * Ele aguarda a definição do `dataset` pai, chama o método `filter` no
   * array de dados do pai, e compara o valor da chave de cada item (em
   * minúsculas) com o termo de busca (também em minúsculas). Por fim,
   * despacha um evento `like` com o array de resultados no `detail`.
   */
  async [dispatch]() {
    await customElements.whenDefined(this.parentElement?.localName);
    const detail = this.parentElement.value.filter(({ [this.key]: value }) =>
      value.toLowerCase().includes(this.value.toLowerCase()),
    );
    const init = { bubbles: true, cancelable: true, detail };
    const event = new CustomEvent("like", init);
    this.parentElement.dispatchEvent(event);
    return this;
  }
}

export default Like;
