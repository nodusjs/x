import { uuid } from "./uuid";

/**
 * @class Storage
 *
 * @summary
 * Uma classe auxiliar para gerenciar uma coleção de dados em memória,
 * utilizando um Map para armazenamento chave-valor.
 *
 * @description
 * A classe `Storage` abstrai a lógica de manipulação de um conjunto de dados.
 * Ela é projetada para ser usada pelo componente `x-dataset` e fornece
 * métodos para adicionar, atualizar (upsert), remover e limpar dados, além
 * de um método estático de fábrica para facilitar sua instanciação.
 */
export class Storage {
  /**
   * @private
   * @type {Map<any, object>}
   * Armazena os dados, usando uma chave única para cada objeto.
   */
  #map = new Map();

  /**
   * @private
   * @type {object}
   * Uma referência à instância do componente `Dataset` pai.
   */
  #dataset;

  /**
   * Obtém todos os valores armazenados como um array.
   * @returns {any[]} Um novo array contendo todos os objetos de dados.
   */
  get values() {
    return [...this.#map.values()];
  }

  /**
   * @constructor
   * @param {object} dataset - A instância do `Dataset` que está usando este storage.
   */
  constructor(dataset) {
    this.#dataset = dataset;
  }

  /**
   * Remove um item do storage com base na sua chave.
   * @param {*} key - A chave do item a ser removido.
   * @returns {this} A própria instância para encadeamento.
   */
  delete(key) {
    this.#map.delete(key);
    return this;
  }

  /**
   * Adiciona um novo item ou atualiza um item existente (upsert).
   *
   * @param {object|object[]} payload - Um único objeto de dados ou um array de objetos.
   * @returns {this} A própria instância para encadeamento.
   *
   * @description
   * Itera sobre o payload de dados. Para cada item, ele determina a chave:
   * 1. Tenta usar o valor da propriedade definida em `dataset.upsert` (ex: `data.id`).
   * 2. Se a chave não existir, gera um novo `uuid`.
   *
   * Se um item com a mesma chave já existe, ele mescla os dados novos
   * com os existentes; caso contrário, insere um novo item.
   */
  push(payload) {
    [].concat(payload).forEach((data) => {
      const key = data[this.#dataset.upsert] ?? uuid();
      const value = this.#map.get(key) ?? {};
      this.#map.set(key, {
        ...Object.assign(value, data),
        [this.#dataset.upsert]: key,
      });
    });

    return this;
  }

  /**
   * Remove todos os itens do storage.
   * @returns {this} A própria instância para encadeamento.
   */
  clear() {
    this.#map.clear();
    return this;
  }

  /**
   * Método de fábrica estático para criar uma nova instância de `Storage`.
   * @param {object} dataset - A instância do `Dataset` pai.
   * @returns {Storage} Uma nova instância de `Storage`.
   */
  static from(dataset) {
    return new Storage(dataset);
  }
}
