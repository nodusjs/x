import { around } from "@middleware";
import { Headless } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import { dispatch } from "./interface";
import { Storage } from "./storage";

/**
 * @class Dataset
 *
 * @summary
 * Um componente "headless" para gerenciamento de estado (state management)
 * reativo e local no lado do cliente.
 *
 * @description
 * O `x-dataset` funciona como um banco de dados ou um "store" na página.
 * Ele não possui uma representação visual, mas ouve eventos para manipular
 * uma coleção de dados (adicionar, atualizar, remover).
 *
 * Sempre que seus dados são alterados, ele dispara um evento `change` no
 * barramento de eventos do Echo, permitindo que outros componentes (`x-render`,
 * `x-button`, etc.) reajam e atualizem suas próprias UIs de forma declarativa.
 *
 * @element x-dataset
 * @extends {Echo(Headless(HTMLElement))}
 */
@define("x-dataset")
class Dataset extends Echo(Headless(HTMLElement)) {
  #storage = Storage.from(this);
  #upsert;

  /**
   * Obtém a chave de "upsert" (update or insert).
   * @returns {string} A chave usada para identificar itens únicos.
   */
  get upsert() {
    return this.#upsert;
  }

  /**
   * Define a chave de "upsert". Quando o método `push` é chamado,
   * ele usará esta chave para verificar se um item com o mesmo valor de chave
   * já existe. Se existir, ele atualiza o item; caso contrário, insere um novo.
   * @param {string} value - O nome da propriedade a ser usada como chave (ex: 'id').
   */
  @attributeChanged("upsert")
  set upsert(value) {
    this.#upsert = value;
  }

  /**
   * Obtém a lista completa de dados armazenados no dataset.
   * @returns {any[]} Um array com todos os objetos de dados.
   */
  get value() {
    return this.#storage.values;
  }

  /**
   * Remove um item do dataset com base no valor de sua chave.
   * Após a remoção, um evento `change` é disparado.
   * @param {*} key - O valor da chave do item a ser removido.
   * @returns {this} A própria instância para encadeamento.
   */
  @around(dispatch)
  delete(key) {
    this.#storage.delete(key);
    return this;
  }

  /**
   * Método privado-like, acionado pelo middleware `@around`.
   * É responsável por notificar outros componentes sobre uma mudança nos dados,
   * disparando um evento `change` com a lista completa de dados no `detail`.
   */
  [dispatch]() {
    const init = { bubbles: true, cancelable: true, detail: this.value };
    const event = new CustomEvent("change", init);
    this.dispatchEvent(event);
    return this;
  }

  /**
   * Adiciona um novo item ou atualiza um item existente no dataset.
   * Se a chave `upsert` estiver definida, ela será usada para determinar se
   * a operação é uma inserção ou uma atualização. Após a operação,
   * um evento `change` é disparado.
   * @param {object} data - O objeto de dados a ser adicionado ou atualizado.
   * @returns {this} A própria instância para encadeamento.
   */
  @around(dispatch)
  push(data) {
    this.#storage.push(data);
    return this;
  }

  /**
   * Limpa completamente o dataset, removendo todos os itens.
   * Após a limpeza, um evento `change` é disparado com um array vazio.
   * @returns {this} A própria instância para encadeamento.
   */
  @around(dispatch)
  reset() {
    this.#storage.clear();
    return this;
  }
}

export default Dataset;
